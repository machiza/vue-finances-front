<template>
  <v-row class="d-flex flex-row flex-wrap">
    <v-col cols="12">
      <toolbar-by-month
        format="MM-YYYY"
        color="primary"
        :month="month || $route.query.month"
        @month="changeMonth"
      />
    </v-col>
  </v-row>
</template>

<script>

import { mapActions, mapState } from 'vuex'

import ToolbarByMonth from './../components/ToolbarByMonth'

export default {
  name: 'ReportsHome',
  components: {
    ToolbarByMonth
  },
  computed: {
    ...mapState('finances', ['month'])
  },
  created () {
    this.setTitle('Relatórios')
  },
  methods: {
    ...mapActions(['setTitle']),
    ...mapActions('finances', ['setMonth']),
    changeMonth (month) {
      this.$router.push({
        path: this.$route.path,
        query: { month }
      })
      this.setMonth({ month })
    }
  }
}
</script>
