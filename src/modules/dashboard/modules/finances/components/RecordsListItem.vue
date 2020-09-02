<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon :class="[ recordItemColor(record.type), 'lighten-1 white--text' ]">{{ recordItem(record.type) }}</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ record.description }}</v-list-item-title>
      <v-list-item-subtitle>{{ record.category.description }} | {{ record.account.description }}</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <span :class="amountColor(record.amount)">{{ formatCurrency(record.amount) }}</span>
    </v-list-item-action>
  </v-list-item>
</template>

<script>

import amountColorMixins from './../mixins/amount-color'
import formatCurrencyMixins from '@/mixins/format-currency'

export default {
  name: 'RecordsListItem',
  mixins: [
    amountColorMixins,
    formatCurrencyMixins
  ],
  props: {
    record: Object
  },
  methods: {
    recordItem (type) {
      return type === 'CREDIT' ? 'arrow_upward' : 'arrow_downward'
    },
    recordItemColor (type) {
      return type === 'CREDIT' ? 'primary' : 'red'
    }
  }
}
</script>

<style>
</style>
