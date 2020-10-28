<template>
  <div class="table-view-container">
      <div class="table-grid-container" :style="{ 'grid-template-columns': getColumnSizes() }">
        <div
            v-for="(column, index) in visibleColumns"
            :key="column.field"
            :style="headerCell.getHeaderCellStyle(column, index, headerCell)">
          <slot
            name="columnhead"
            :column="column">
              {{ column.title }}
          </slot>
        </div>
        <div
          v-for="(item, index) in gridItems"
          :key="index"
          :style="cell.getCellStyle(item, cell)">
          <slot
            v-if="item.column.slot"
            :name="item.column.slot"
            :item="item">
            {{ item.value }}
          </slot>
          <span v-else>
            {{ item.value }}
          </span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: `TableView`,
  props: {
    settings: {
      type: Object,
      required: true
    },
    themeHeaderCell: {
      type: Object,
      default:  () => {
        return {};
      }
    },
    themeCell: {
      type: Object,
      default:  () => {
        return {};
      }
    }
  },
  data() {
    return {
      headerCell: {
        leftCellStyle: {
          'border-width': `1px 0 1px 1px`,
          'border-style': `solid`,
          'border-bottom-color': `rgb(186, 191, 199)`,
          'border-left-color': `rgb(186, 191, 199)`,
          'border-top-color': `rgb(186, 191, 199)`,
          'border-radius': `3px 0 0 0`
        },
        middleCellStyle: {
          'border-width': `0 0 0 0`,
          'border-style': `solid`,
          'border-bottom-color': `rgb(186, 191, 199)`,
          'border-top-color': `rgb(186, 191, 199)`
        },
        rightCellStyle: {
          'border-width': `1px 1px 1px 0`,
          'border-style': `solid`,
          'border-bottom-color': `rgb(186, 191, 199)`,
          'border-right-color': `rgb(186, 191, 199)`,
          'border-top-color': `rgb(186, 191, 199)`,
          'border-radius': `0 3px 0 0`
        },
        getHeaderCellStyle: this.getHeaderCellStyle
      },
      cell: {
        leftCellStyle: {
            'border-width': `0 0 1px 1px`,
            'border-style': `solid`,
            'border-bottom-color': `rgb(186, 191, 199)`,
            'border-left-color': `rgb(186, 191, 199)`,
            'border-top-color': `rgb(186, 191, 199)`
          },
          middleCellStyle: {
            'border-width': `0 0 0 0`,
            'border-style': `solid`,
            'border-bottom-color': `rgb(186, 191, 199)`,
            'border-top-color': `rgb(186, 191, 199)`
          },
          rightCellStyle: {
            'border-width': `0px 1px 1px 0`,
            'border-style': `solid`,
            'border-bottom-color': `rgb(186, 191, 199)`,
            'border-right-color': `rgb(186, 191, 199)`,
            'border-top-color': `rgb(186, 191, 199)`
          },
          getCellStyle: this.getCellStyle
      }
    }
  },
  created() {
    if (this.themeHeaderCell) {
      for (const key of Object.keys(this.themeHeaderCell)) {
        if (!(key in this.headerCell)) continue;
        
        this.headerCell[key] = this.themeHeaderCell[key];
      }
    }

    if (this.themeCell) {
      for (const key of Object.keys(this.themeCell)) {
        if (!(key in this.cell)) continue;
        
        this.cell[key] = this.themeCell[key];
      }
    }
  },
  mounted() {
    if (this.settings.isAutoLoadFirstPage) this.loadPage(1);
  },
  methods: {
    getColumnSizes() {
      return this.visibleColumns.map(a => a.columnPoints && a.actualWidth ? `${a.actualWidth}${a.columnPoints}` : `1fr`).join(` `);
    },
    getHeaderCellStyle(column, index, theme) {
      const styles = {
        'background-color': `rgb(252, 252, 252)`,
      };

      const lastColumns = this.visibleColumns.length - 1;

      return Object.assign(
        styles,
        index === 0 ? theme.leftCellStyle : (index === lastColumns ? theme.rightCellStyle : theme.middleCellStyle) 
      );
    },
    getCellStyle(cell, theme) {
      const styles = {
        'background-color': cell.rowIndex % 2 === 0 ? `` : `rgb(252, 252, 252)`,
      };

      const lastColumns = this.visibleColumns.length - 1;

      return Object.assign(
        styles,
        cell.columnIndex === 0 ? theme.leftCellStyle : (cell.columnIndex === lastColumns ? theme.rightCellStyle : theme.middleCellStyle) 
      );
    },
    async loadPage(pageNumber) {
      if (!pageNumber) pageNumber = 1;

      if (!(`loadStrategy` in this.settings)) {
        this.$emit(`pageloaded`, { pageNumber });
        return;
      }
      if (!(`loadPage` in this.settings.loadStrategy)) {
        console.warn(`Property 'loadPage' don't specify in settings.loadStrategy!`);
        return [];
      }

      const isAsync = this.settings.loadStrategy.isAsync;
      const loadPage = this.settings.loadStrategy.loadPage;
      const pageFormatter = this.settings.loadStrategy.pageFormatter;
      const metadata = this.settings.loadStrategy.metadata;
      const preprocess = this.settings.loadStrategy.preprocess;

      let result = {};

      if (pageFormatter) pageNumber = pageFormatter(pageNumber, metadata); // it need for features like aliases (as instance `latest`, `first`, `next` etc)

      if (isAsync) {
        result = await loadPage(pageNumber, metadata);
      } else {
        result = loadPage(pageNumber, metadata);
      }

      if (!result) {
        this.settings.items = [];
        return;
      }

      this.settings.items = preprocess ? preprocess(result) : result;

      this.$emit(`pageloaded`, { pageNumber, metadata });
    }
  },
  computed: {
    visibleColumns() {
      if (!(`columns` in this.settings)) {
        console.warn(`Property 'columns' don't specify in settings!`);
        return [];
      }

      return this.settings.columns;
    },
    gridItems() {
      if (!(`items` in this.settings)) {
        console.warn(`Property 'items' don't specify in settings!`);
        return [];
      }    
    
      const columns = this.visibleColumns;
      const result = [];
      let rowIndex = 0;
      for (const item of this.settings.items) {
        let columnIndex = 0;
        for (const column of columns) {
          result.push(
            {
              value: item[column.field],
              rowIndex,
              columnIndex, 
              column: column,
              item
            }
          );
          columnIndex++;
        }
        rowIndex++;
      }

      return result;
    }
  }
}
</script>

<style scoped>
.table-view-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.table-container {
  width: 100%;
  table-layout: fixed;
}
.table-container th {
  background-color: rgb(248, 248, 248);
  border-color:rgb(186, 191, 199);
  border-style: solid;
  border-width: 1px;
}
.table-grid-container {
  display: grid;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
</style>
