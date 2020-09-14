<template>
  <div class="simple-table-container">
    <TableView
      :settings="settings">
      <div style="display: flex; align-items: center; padding: 18px; font-weight: bold;" slot="columnhead" slot-scope="{ column }">
        {{ column.title }}
      </div>
      <div style="display: flex; align-items: center; padding: 18px;" slot="commonpaddings" slot-scope="{ item }">
        {{ item.value }}
      </div>
    </TableView>
  </div>
</template>

<script>
import TableView from './TableView.vue'

export default {
  name: `SimpleGridView`,
  data() {
    return {
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
        },
        items: []
      }
    }
  },
  methods: {
    loadPage(pageNumber) {
      if (pageNumber === 5000) return;

      return [
        {
          id: "1",
          name: "GDjhgjf"
        },
        {
          id: "2",
          name: "MUherka"
        },
        {
          id: "3",
          name: "Bluherka"
        }
      ];
    }          
  },
  components: {
    TableView
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
