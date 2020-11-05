<template>
  <div id="app">
    <span>SimpleGridView, data can be on frontend completely. Only pagination and selecting page sizes.</span>
    <simple-grid-view
      :items="items"
      :columns="simpleColumns"
    />
    <span>SimpleBackendGridView, data loaded from backend. Only pagination and selecting page sizes.</span>
    <simple-backend-grid-view
    />
    <span>ClassicGridView, data can be on frontend completely. Pagination, select page size, multi sorting, multi filtering.</span>
    <classic-grid-view
      :items="items"
      :columns="simpleColumns">
    </classic-grid-view>
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
  width: 500px;  
}
</style>
