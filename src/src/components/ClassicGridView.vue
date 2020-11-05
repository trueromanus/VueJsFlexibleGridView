<template>
  <div class="simple-table-container">
    <table-view
      ref="tableView"
      :settings="settings"
      @pageloaded="getPaginationPages($event)">
      <div
        class="column-head"
        slot="columnhead"
        slot-scope="{ column }"
        @click="toggleSorting(column.field)">
        <span>{{ column.title }}</span>
        <div v-if="sortingFields[column.field]">
          <span v-if="sortingFields[column.field].descending">&#8593;</span>
          <span v-else>&#8595;</span>
        </div>
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
        @changepage="$refs.tableView.loadPage($event)"
      />
    </div>
  </div>
</template>

<script>
import TableView from './TableView.vue'
import Paginator from './Paginator.vue'
import PaginatorMixin from '../mixins/paginatorMixin.js'
import SortingMixin from '../mixins/sortingMixin.js'

export default {
  name: `ClassicGridView`,
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
      selectedPageSize: 10,
      pageSizes: [5, 10, 15, 20],
      settings: {
        columns: [],
        isAutoLoadFirstPage: true,
        loadStrategy: {
          loadPage: this.loadPage,
          pageFormatter: this.pageFormatter,
          metadata: {
            pageSize: 10
          }
        },
        items: []
      },
      sortingFields: {}
    }
  },
  created() {
    this.refreshColumns(this.columns);
  },
  methods: {
    refreshColumns(columns) {
      this.settings.columns = columns;
    },
    toggleSorting(columnField) {
      const sortingFields = this.sortingFields;
      if (sortingFields[columnField]) {
        const sortingField = sortingFields[columnField];
        let newValue = null;
        if (!sortingField.descending) {
          sortingField.descending = true;
          newValue = sortingField;
          
          this.$set(this.sortingFields, columnField, newValue);
        } else {
          delete sortingFields[columnField];
        }
      } else {
        this.$set(this.sortingFields, columnField, { descending: false });
      }

      this.$refs.tableView.loadPage(1);
    },
    loadPage(pageNumber, metadata) {
      let items = this.items;
      console.log(this.sortingFields);
      if (Object.keys(this.sortingFields).length) items = this.sortingObjectByMultipleField(items, this.sortingFields);

      metadata.totalCount = items.length;
      const count = metadata.totalCount;
      const pageSize = metadata.pageSize;

      const startIndex = (pageNumber - 1) * metadata.pageSize;
      const pageItemsCount = count - startIndex > pageSize ? pageSize : count - startIndex;

      if (startIndex > count) return [];

      return items.slice(startIndex, startIndex + pageItemsCount);
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
  computed: {
    gridMetadata() {
      return this.settings.loadStrategy.metadata;
    }
  },
  mixins: [PaginatorMixin, SortingMixin],
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
.pagesize > * {
  width: 100%;
  margin-left: 8px;
}
.column-head {
  display: flex;
  align-items: center;
  padding: 18px;
  font-weight: bold;
  user-select: none;
}
.column-head > *:first-child {
  flex: 1;
}
.column-cell {
  display: flex;
  align-items: center;
  padding: 18px;
}
</style>
