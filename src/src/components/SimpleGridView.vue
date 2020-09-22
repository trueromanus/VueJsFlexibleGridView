<template>
  <div class="simple-table-container">
    <table-view
      ref="tableView"
      :settings="settings"
      @pageloaded="pageLoaded($event)">
      <div style="display: flex; align-items: center; padding: 18px; font-weight: bold;" slot="columnhead" slot-scope="{ column }">
        {{ column.title }}
      </div>
      <div style="display: flex; align-items: center; padding: 18px;" slot="commonpaddings" slot-scope="{ item }">
        {{ item.value }}
      </div>
    </table-view>
    <paginator
      :displayPages="paginationPages"
      :selectedPage="currentPage"
      @changepage="$refs.tableView.loadPage($event)"
    />      
  </div>
</template>

<script>
import TableView from './TableView.vue'
import Paginator from './Paginator.vue'

export default {
  name: `SimpleGridView`,
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      paginationPages: [],
      currentPage: 1,
      settings: {
        columns: [
          {
            field: "id",
            title: "Identifier",
            actualWidth: 100,
            columnPoints: `px`,
            slot: "commonpaddings"
          },
          {
            title: "Name",
            field: "name",
            slot: "commonpaddings"
          },
        ],
        isAutoLoadFirstPage: true,
        loadStrategy: {
          loadPage: this.loadPage,
          metadata: {
            pageSize: 10
          }
        },
        items: [
        ]
      }
    }
  },
  methods: {
    pageLoaded(pageNumber) {
      this.currentPage = pageNumber;
      
      const count = this.items.length;
      const pageSize = this.settings.loadStrategy.metadata.pageSize;
      const countPages = Math.ceil(count / pageSize);

      const paginationPages = pageNumber === 1 ? [pageNumber] : [pageNumber - 1, pageNumber];
      if (pageNumber + 1 <= countPages) paginationPages.push(pageNumber + 1);
      this.paginationPages = paginationPages;
    },
    loadPage(pageNumber, metadata) {
      const startIndex = (pageNumber - 1) * metadata.pageSize;
      const pageSize = metadata.pageSize;
      const count = this.items.length;
      const pageItemsCount = count - startIndex > pageSize ? pageSize : count - startIndex;

      if (startIndex > count) return [];

      return this.items.slice(startIndex, startIndex + pageItemsCount);
    }
  },
  components: {
    TableView,
    Paginator
  }
}
</script>

<style>
.simple-table-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
  width: 500px;  
}
</style>
