<template>
  <v-container class="text-center">
    <v-row class="d-flex flex-row flex-wrap">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <p>Amount</p>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="8"
        lg="8"
      >
        <p>Formulário</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'RecordsAdd',
  created () {
    this.changeTitle(this.$route.query.type)
  },
  beforeRouteUpdate (to, from, next) {
    this.changeTitle(to.query.type)
    next()
  },
  methods: {
    ...mapActions(['setTitle']),
    changeTitle (recordType) {
      let title
      switch (recordType) {
        case 'credit':
          title = 'Nova Receita'
          break
        case 'debit':
          title = 'Nova Despesa'
          break

        default:
          title = 'Novo Lançamento'
      }
      this.setTitle({ title })
    }
  }
}
</script>
