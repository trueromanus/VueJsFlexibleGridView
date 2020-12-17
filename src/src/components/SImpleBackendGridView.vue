<template>
  <div class="simple-table-container">
    <table-view
      ref="tableView"
      :settings="settings"
      @pageloaded="getPaginationPages($event)">
      <div style="display: flex; align-items: center; padding: 18px; font-weight: bold;" slot="columnhead" slot-scope="{ column }">
        {{ column.title }}
      </div>
      <div style="display: flex; align-items: center; padding: 18px;" slot="commonpaddings" slot-scope="{ item }">
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
        @changepage="$refs.tableView.loadPage($event)"
      />
    </div>
  </div>
</template>

<script>
import TableView from './TableView.vue'
import Paginator from './Paginator.vue'
import PaginatorMixin from '../mixins/paginatorMixin.js'

export default {
  name: `SimpleBackendGridView`,
  props: {
    items: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      paginationPages: [],
      currentPage: 1,
      selectedPageSize: 5,
      pageSizes: [5, 10, 15, 20],
      settings: {
        columns: [],
        isAutoLoadFirstPage: true,
        loadStrategy: {
          isAsync: true,
          loadPage: this.loadPage,
          pageFormatter: this.pageFormatter,
          metadata: {
            pageSize: 5
          }
        },
        items: []
      }
    }
  },
  created() {
    this.refreshColumns(this.columns);
  },
  methods: {
    refreshColumns(columns) {
      this.settings.columns = columns;
    },
    async loadPage(pageNumber, metadata) {
      const result = await fetch(`https://trueromanus.github.io/VueJsFlexibleGridView/fakeapi/page${pageNumber}.json`);
      const pageData = await result.json();

      metadata.totalCount = pageData.count;
      return pageData.items;
    }
  },
  watch: {
    selectedPageSize(value, oldvalue) {
      if (value === oldvalue) return;
      if (!value) return;

      this.settings.loadStrategy.metadata.pageSize = value;
      this.$refs.tableView.loadPage(1);
    },
    columns(value) {      
      this.refreshColumns(value);
    }
  },
  mixins: [PaginatorMixin],
  components: {
    TableView,
    Paginator
  }
}
</script>

<style scoped>
.simple-table-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
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
.pagesize > *{
  width: 100%;
  margin-left: 8px;
}
</style>
