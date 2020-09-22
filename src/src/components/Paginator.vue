<template>
    <div class="paginator">
        <div
            v-for="(displayPage, index) in displayPages"
            :key="index"
            class="page-item">
            <slot name="pageitem" :page="displayPage">
                <div v-if="selectedPage === displayPage" class="selected">
                    <span>{{ displayPage }}</span>
                </div>
                <div v-else @click="$emit('changepage', displayPage)"> 
                    <span class="clickable-text">{{ displayPage }}</span>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
  name: `Paginator`,
  props: {
    displayPages: {
        type: Array,
        default: () => []
    },
    selectedPage: {
        type: Number,
        default: () => 0
    }
  }
}
</script>

<style scoped>
.paginator {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.page-item {
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-radius: 2px;
    border-style: solid;
    border-color: rgb(186, 191, 199);
    margin-right: 2px;
}
.page-item > div {
    padding: 8px;
}
.selected {
    background-color: rgb(252, 252, 252);
}
.clickable-text {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
}
</style>
