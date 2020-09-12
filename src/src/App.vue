<template>
  <div id="app">    
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
import TableView from './components/TableView.vue'

export default {
  name: `App`,
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
          }
        ],
        items: [
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
        ]
      }
    }
  },
  components: {
    TableView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  width: 500px;  
}
</style>
