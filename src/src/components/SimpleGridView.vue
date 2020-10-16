<template>
  <div class="simple-table-container">
    <table-view
      ref="tableView"
      :settings="settings"
      @pageloaded="pageLoaded($event)">
      <div
        class="column-head"
        slot="columnhead"
        slot-scope="{ column }">
        {{ column.title }}
      </div>
      <div
        class="column-cell"
        slot="commonpaddings"
        slot-scope="{ item }">
        {{ item.value }}
      </div>
    </table-view>
    <div class="bottomtable">
      <span>Page size </span>
      <div class="pagesize">
        <select v-model="selectedPageSize">
          <option v-for="(item, index) in pageSizes" :key="index" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="separator"></div>
      <paginator
        :displayPages="paginationPages"
        :selectedPage="currentPage"
        @changepage="pageSelected($event)"
      />
    </div>
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
      selectedPageSize: 10,
      pageSizes: [5, 10, 15, 20],
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
    pageSelected($event){
      const count = this.items.length;
      const pageSize = this.settings.loadStrategy.metadata.pageSize;
      const countPages = Math.ceil(count / pageSize);

      switch($event)  {
        case `<<`: $event = 1; break;
        case `<`: $event = this.currentPage - 1; break;
        case `>`: $event = this.currentPage + 1; break;
        case `>>`: $event = countPages; break;
        default: break;
      }
      
      this.$refs.tableView.loadPage($event)
    },
    pageLoaded(pageNumber) {
      const count = this.items.length;
      const pageSize = this.settings.loadStrategy.metadata.pageSize;
      const countPages = Math.ceil(count / pageSize);
      this.currentPage = pageNumber;

      const paginationPages = [];
      if (!countPages) return paginationPages;

      const pagesBufferSize = 2;

      if (countPages <= pagesBufferSize * 2 + 1) {
        for (let i = 1; i <= countPages; i++) paginationPages.push(i);
      } else {
        let startPage = this.currentPage - pagesBufferSize;
        if (startPage < 1) startPage = 1;

        if (startPage > 1) {
          paginationPages.push(`<<`);
          paginationPages.push(`<`);
        }

        for (let i = 0; i < pagesBufferSize * 2 + 1; i++) {
          if (startPage + i > countPages) break;
          paginationPages.push(startPage + i);
        }
        
        if (startPage + pagesBufferSize + 1 < countPages - 1) {
          paginationPages.push(`>`);
          paginationPages.push(`>>`);
        }
      }
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
  watch: {
    selectedPageSize(value, oldvalue) {
      if (value === oldvalue) return;
      if (!value) return;

      this.settings.loadStrategy.metadata.pageSize = value;
      this.$refs.tableView.loadPage(1);
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
.separator {
  flex: 1;
}
.bottomtable {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  border-style: solid;
  border-right-width: 1px;
  border-left-width: 1px;
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-color: rgb(186, 191, 199);
  widows: 100%;
}
.pagesize > * {
  width: 100%;
  margin-left: 8px;
}
.column-head {
  display: flex;
  align-items: center;
  padding: 18px;
  font-weight: bold;
}
.column-cell {
  display: flex;
  align-items: center;
  padding: 18px;
}
</style>
