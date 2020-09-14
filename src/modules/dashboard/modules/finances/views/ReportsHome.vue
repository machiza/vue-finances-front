<template>
  <v-row class="d-flex flex-row flex-wrap">
    <v-col cols="12">
      <toolbar-by-month
        format="MM-YYYY"
        color="primary"
      />
    </v-col>
  </v-row>
</template>

<script>

import { mapActions } from 'vuex'

import ToolbarByMonth from './../components/ToolbarByMonth'

export default {
  name: 'ReportsHome',
  components: {
    ToolbarByMonth
  },
  created () {
    this.setTitle('Relatórios')
  },
  methods: {
    ...mapActions(['setTitle'])
  }
}
</script>
