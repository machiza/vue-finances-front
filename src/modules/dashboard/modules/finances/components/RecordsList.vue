<template>
  <v-list>
    <recods-list-item
      v-for="record in records"
      :key="record.id"
      :record="record"
    />
  </v-list>
</template>

<script>

import RecodsListItem from './RecordsListItem.vue'
import RecordsService from './../services/records-service'

export default {
  name: 'RecordsList',
  components: {
    RecodsListItem
  },
  data: () => ({
    records: []
  }),
  async created () {
    this.records = await RecordsService.records()
  }
}
</script>

<style>
</style>
