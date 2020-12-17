<template>
  <div id="app">
    <div class="titles-container">
      <span class="grid-title">SimpleGridView</span>
      <span class="data-title">Data loaded on frontend completely.</span>
      <span class="features-title">Features: Pagination, selecting page sizes.</span>
    </div>
    <div class="center-grid-view">
      <simple-grid-view
        :items="items"
        :columns="simpleColumns"
      />
    </div>
    <div class="titles-container">
      <span class="grid-title">SimpleBackendGridView</span>
      <span class="data-title">Data loaded from backend.</span>
      <span class="features-title">Features: Pagination, selecting page sizes.</span>
    </div>
    <div class="center-grid-view">
      <simple-backend-grid-view
        :columns="simpleBackendColumns"
      />
    </div>
    <div class="titles-container">
      <span class="grid-title">ClassicGridView</span>
      <span class="data-title">Data loaded on frontend completely.</span>
      <span class="features-title">Features: Pagination, selecting page sizes, multisorting, multifiltering, grouping, custom slots on columns.</span>
    </div>
    <div class="center-grid-view">
      <classic-grid-view
        :items="items"
        :columns="slotedColumns"
        :is-grouping="true">

        <div class="column-cell" slot="idslot" slot-scope="{ item }" style="color: red;">&diams;{{ item.value }}</div>
        <div class="column-cell" slot="nameslot" slot-scope="{ item }" style="color: green;">&hearts;{{ item.value }}</div>
        <div class="column-cell-group" slot="groupslot" slot-scope="{ item }"> Group: {{ item.value }} </div>
      </classic-grid-view>
    </div>
  </div>
</template>

<script>
import SimpleGridView from './components/SimpleGridView.vue'
import SimpleBackendGridView from './components/SimpleBackendGridView.vue'
import ClassicGridView from './components/ClassicGridView.vue'

export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Grovel"
        },
        {
          id: 2,
          name: "Muher"
        },
        {
          id: 3,
          name: "Bluher"
        },
        {
          id: 4,
          name: "Lapahuher"
        },
        {
          id: 5,
          name: "Grovel"
        },
        {
          id: 6,
          name: "MUherka"
        },
        {
          id: 7,
          name: "Bluherka"
        },
        {
          id: 8,
          name: "Grovel"
        },
        {
          id: 9,
          name: "MUherka"
        },
        {
          id: 10,
          name: "Bluherka"
        },
        {
          id: 11,
          name: "Bluherka"
        },
        {
          id: 1,
          name: "Grovel"
        },
        {
          id: 2,
          name: "MUherka"
        },
        {
          id: 3,
          name: "Bluherka"
        },
        {
          id: 4,
          name: "Lapahuherka"
        },
        {
          id: 5,
          name: "Grovel"
        },
        {
          id: 6,
          name: "MUherka"
        },
        {
          id: 7,
          name: "Bluherka"
        },
        {
          id: 8,
          name: "Grovel"
        },
        {
          id: 9,
          name: "MUherka"
        },
        {
          id: 10,
          name: "Bluherka"
        },
        {
          id: 11,
          name: "Bluherka"
        },
        {
          id: 1,
          name: "Grovel"
        },
        {
          id: 2,
          name: "MUherka"
        },
        {
          id: 3,
          name: "Bluherka"
        },
        {
          id: 4,
          name: "Lapahuherka"
        },
        {
          id: 5,
          name: "Grovel"
        },
        {
          id: 6,
          name: "MUherka"
        },
        {
          id: 7,
          name: "Bluherka"
        },
        {
          id: 8,
          name: "Grovel"
        },
        {
          id: 9,
          name: "MUherka"
        },
        {
          id: 10,
          name: "Bluherka"
        },
        {
          id: 11,
          name: "Bluherka"
        },
        {
          id: 1,
          name: "Grovel"
        },
        {
          id: 2,
          name: "MUherka"
        },
        {
          id: 3,
          name: "Bluherka"
        },
        {
          id: 4,
          name: "Lapahuherka"
        },
        {
          id: 5,
          name: "Grovel"
        },
        {
          id: 6,
          name: "MUherka"
        },
        {
          id: 7,
          name: "Bluherka"
        },
        {
          id: 8,
          name: "Grovel"
        },
        {
          id: 9,
          name: "MUherka"
        },
        {
          id: 10,
          name: "Bluherka"
        },
        {
          id: 11,
          name: "Bluherka"
        },
        {
          id: 1,
          name: "Grovel"
        },
        {
          id: 2,
          name: "MUherka"
        },
        {
          id: 3,
          name: "Bluherka"
        },
        {
          id: 4,
          name: "Lapahuherka"
        },
        {
          id: 5,
          name: "Grovel"
        },
        {
          id: 6,
          name: "MUherka"
        },
        {
          id: 7,
          name: "Bluherka"
        },
        {
          id: 8,
          name: "Grovel"
        },
        {
          id: 9,
          name: "MUherka"
        },
        {
          id: 10,
          name: "Bluherka"
        },
        {
          id: 11,
          name: "Bluherka"
        },
        {
          id: 1,
          name: "Grovel"
        },
        {
          id: 2,
          name: "MUherka"
        },
        {
          id: 3,
          name: "Bluherka"
        },
        {
          id: 4,
          name: "Lapahuherka"
        },
        {
          id: 5,
          name: "Grovel"
        },
        {
          id: 6,
          name: "MUherka"
        },
        {
          id: 7,
          name: "Bluherka"
        },
        {
          id: 8,
          name: "Grovel"
        },
        {
          id: 9,
          name: "MUherka"
        },
        {
          id: 10,
          name: "Bluherka"
        },
        {
          id: 11,
          name: "Bluherka"
        },
        {
          id: 1,
          name: "Grovel"
        },
        {
          id: 2,
          name: "MUherka"
        },
        {
          id: 3,
          name: "Bluherka"
        },
        {
          id: 4,
          name: "Lapahuherka"
        },
        {
          id: 5,
          name: "Grovel"
        },
        {
          id: 6,
          name: "MUherka"
        },
        {
          id: 7,
          name: "Bluherka"
        },
        {
          id: 8,
          name: "Grovel"
        },
        {
          id: 9,
          name: "MUherka"
        },
        {
          id: 10,
          name: "Bluherka"
        },
        {
          id: 11,
          name: "Bluherka"
        },
        
      ],
      simpleColumns: [
        {
          field: "id",
          title: "Identifier",
          actualWidth: 130,
          columnPoints: `px`,
          slot: "commonpaddings"
        },
        {
          title: "Name",
          field: "name",
          slot: "commonpaddings"
        }
      ],
      simpleBackendColumns: [
        {
          field: "id",
          title: "Identifier",
          actualWidth: 130,
          columnPoints: `px`,
          slot: "commonpaddings"
        },
        {
          title: "Title",
          field: "title",
          slot: "commonpaddings"
        }
      ],
      slotedColumns: [
        {
          field: "id",
          title: "Identifier",
          actualWidth: 130,
          columnPoints: `px`,
          slot: "idslot"
        },
        {
          title: "Name",
          field: "name",
          slot: "nameslot"
        }
      ]
    }
  },
  components: {
    SimpleGridView,
    SimpleBackendGridView,
    ClassicGridView
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
}
.column-cell {
  display: flex;
  align-items: center;
  padding: 18px;
}
.column-cell-group {
  display: flex;
  align-items: flex-start;
  padding: 18px;
  font-weight: bold;
}
.center-grid-view {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.titles-container {
  padding: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.grid-title {
  font-size: 20px;
  color: #1a73e8;
}
.data-title {
  font-size: 16px;
}
.features-title {
  font-size: 14px;
}
</style>
