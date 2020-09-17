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

    <v-col
      v-for="chart in charts"
      :key="chart.title"
      cols="12"
      sm="6"
      md="6"
      lg="6"
      xl="6"
    >
      <v-card>
        <v-card-text>
          <h2 class="font-weight-light mb-4">{{ chart.title }}</h2>
          <canvas :ref="chart.refId"></canvas>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import Chart from 'chart.js'

import { mapActions, mapState } from 'vuex'
import { Subject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

import { generateChartConfings } from '@/utils'
import RecordsService from './../services/records-service'
import ToolbarByMonth from './../components/ToolbarByMonth'

export default {
  name: 'ReportsHome',
  components: {
    ToolbarByMonth
  },
  data: () => ({
    chartIncomesExpenses: undefined,
    charts: [
      { title: 'Receitas vs Despesas', refId: 'chartIncomesExpenses' },
      { title: 'Despesas por Categoria', refId: 'chatCategoryExpenses' }
    ],
    monthSubject$: new Subject(),
    records: [],
    subscriptions: []
  }),
  computed: {
    ...mapState('finances', ['month'])
  },
  created () {
    this.setTitle('Relatórios')
    this.setRecords()
  },
  destroyed () {
    this.subscriptions.forEach(s => s.unsubscribe())
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
      this.monthSubject$.next(month)
    },
    createChart (chartId, options) {
      const ref = Array.isArray(this.$refs[chartId])
        ? this.$refs[chartId][0]
        : this.$refs[chartId]
      const ctx = ref.getContext('2d')
      return new Chart(ctx, options)
    },
    setCharts () {
      const chartIncomesExpensesConfigs = generateChartConfings({
        type: 'bar',
        items: this.records,
        keyToGroup: 'type',
        keyOfValue: 'amount',
        aliases: { CREDIT: 'Receitas', DEBIT: 'Despesas' },
        backgroundColors: [
          this.$vuetify.theme.themes.dark.error,
          this.$vuetify.theme.themes.dark.primary
        ]
      })

      if (this.chartIncomesExpenses) {
        this.chartIncomesExpenses.data.datasets = chartIncomesExpensesConfigs.data.datasets
        this.chartIncomesExpenses.update()
      } else {
        this.chartIncomesExpenses =
          this.createChart('chartIncomesExpenses', chartIncomesExpensesConfigs)
      }
    },
    setRecords () {
      this.subscriptions.push(
        this.monthSubject$
          .pipe(
            mergeMap(month => RecordsService.records({ month }))
          ).subscribe(records => {
            this.records = records
            this.setCharts()
          })
      )
    }
  }
}
</script>
