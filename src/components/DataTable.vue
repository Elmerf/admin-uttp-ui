<template>
  <v-data-table
    :headers="header"
    :items="data"
    loading="!data.length"
    loading-text="Loading... Please wait"
    class="elevation-4 mt-4"
  >
    <template v-slot:[`item.action`]>
      <v-icon medium class="mr-2"> mdi-pencil </v-icon>
      <v-icon medium> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    header: Array,
    data: Array,
  },
};
</script>

<style></style>
