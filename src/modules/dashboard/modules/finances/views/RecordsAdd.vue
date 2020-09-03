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
        <v-btn @click="log">Log</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import moment from 'moment'
import { decimal, minLength, required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'RecordsAdd',
  data () {
    return {
      record: {
        type: this.$route.query.type.toUpperCase(),
        amount: 0,
        date: moment().format('YYYY-MM-DD'),
        accountId: '',
        categoryId: '',
        description: '',
        tags: '',
        note: ''
      }
    }
  },
  validations: {
    record: {
      type: { required },
      amount: { required, decimal, different: value => value !== 0 },
      date: { required },
      accountId: { required },
      categoryId: { required },
      description: { required, minLength: minLength(8) }
    }
  },
  created () {
    this.changeTitle(this.$route.query.type)
  },
  beforeRouteUpdate (to, from, next) {
    const { type } = to.query
    this.changeTitle(type)
    this.record.type = type.toUpperCase()
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
    },
    log () {
      console.log('Form: ', this.record)
    }
  }
}
</script>
