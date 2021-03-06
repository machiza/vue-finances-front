<template>
  <div>

    <total-balance class="mb-2" />

    <toolbar-by-month
      class="mb-2"
      format="MM-YYYY"
      @month="changeMonth"
      :color="toolbarColor"
      :month="month || $route.query.month"
      :showSlot="true"
    >
      <records-filter @filter="filter" />
    </toolbar-by-month>

    <v-card>

      <v-card-text
        class="text-center"
        v-if="mappedRecordsLength === 0"
      >
        <v-icon
          size="100"
          color="grey"
        >assignment</v-icon>
        <p class="font-weight-light subtitle-1 grey--text">
          Nenhum lançamento no período
        </p>
      </v-card-text>

      <v-list
        two-line
        subheader
        v-else
      >
        <template v-for="(records, date, index) in mappedRecords">
          <v-subheader :key="date">{{date}}</v-subheader>
          <recods-list-item
            v-for="record in records"
            :key="record.id"
            :record="record"
          />
          <v-divider
            v-if="showDivider(index, mappedRecords)"
            :key="`${date}-${index}`"
          ></v-divider>
        </template>
      </v-list>

      <v-footer class="pa-2">
        <v-col class="text-right">
          <h3 class="font-weight-light">
            <span>Saldo do mês</span>
            <strong
              class="ml-5"
              :class="amountColor(totalAmount)"
            >{{ formatCurrency(totalAmount) }}</strong>
          </h3>
        </v-col>
      </v-footer>

    </v-card>
  </div>
</template>

<script>

import moment from 'moment'
import { Subject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { createNamespacedHelpers } from 'vuex'
import { groupBy } from '@/utils'
import amountColorMixins from './../mixins/amount-color'
import formatCurrencyMixins from '@/mixins/format-currency'
import RecordsFilter from './RecordsFilter.vue'
import RecodsListItem from './RecordsListItem.vue'
import RecordsService from './../services/records-service'
import ToolbarByMonth from './ToolbarByMonth.vue'
import TotalBalance from './TotalBalance.vue'

const { mapState, mapActions } = createNamespacedHelpers('finances')

export default {
  name: 'RecordsList',
  components: {
    RecordsFilter,
    RecodsListItem,
    ToolbarByMonth,
    TotalBalance
  },
  mixins: [
    amountColorMixins,
    formatCurrencyMixins
  ],
  data: () => ({
    records: [],
    filtersSubject$: new Subject(),
    subscriptions: []
  }),
  computed: {
    ...mapState(['filters', 'month']),
    mappedRecords () {
      return groupBy(this.records, 'date', (record, dateKey) => {
        return moment(record[dateKey].substr(0, 10)).format('DD/MM/YYYY')
      })
    },
    mappedRecordsLength () {
      return Object.keys(this.mappedRecords).length
    },
    totalAmount () {
      return this.records.reduce((sum, record) => sum + record.amount, 0)
    },
    toolbarColor () {
      return this.totalAmount < 0 ? 'error' : 'primary'
    }
  },
  created () {
    this.setRecords()
  },
  destroyed () {
    this.subscriptions.forEach(s => s.unsubscribe())
  },
  methods: {
    ...mapActions(['setMonth']),
    changeMonth (month) {
      this.$router.push({
        path: this.$route.path,
        query: { month }
      })
      this.setMonth({ month })
      this.filter()
    },
    filter () {
      this.filtersSubject$.next({ month: this.month, ...this.filters })
    },
    setRecords () {
      this.subscriptions.push(

        this.filtersSubject$
          .pipe(
            mergeMap(variables => RecordsService.records(variables))
          ).subscribe(records => (this.records = records))
      )
    },
    showDivider (index, object) {
      return index < Object.keys(object).length - 1
    }
  }
}
</script>

<style>
</style>
