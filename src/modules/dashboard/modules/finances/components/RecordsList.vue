<template>
  <div>

    <toolbar-by-month class="mb-2" />

    <v-card>

      <v-list
        two-line
        subheader
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
import { groupBy } from '@/utils'
import amountColorMixins from './../mixins/amount-color'
import formatCurrencyMixins from '@/mixins/format-currency'
import RecodsListItem from './RecordsListItem.vue'
import RecordsService from './../services/records-service'
import ToolbarByMonth from './ToolbarByMonth.vue'

export default {
  name: 'RecordsList',
  components: {
    RecodsListItem,
    ToolbarByMonth
  },
  mixins: [
    amountColorMixins,
    formatCurrencyMixins
  ],
  data: () => ({
    records: []
  }),
  computed: {
    mappedRecords () {
      return groupBy(this.records, 'date', (record, dateKey) => {
        return moment(record[dateKey]).format('DD/MM/YYYY')
      })
    },
    totalAmount () {
      return this.records.reduce((sum, record) => sum + record.amount, 0)
    }
  },
  async created () {
    this.records = await RecordsService.records()
  },
  methods: {
    showDivider (index, object) {
      return index < Object.keys(object).length - 1
    }
  }
}
</script>

<style>
</style>
