<template>
  <div>
    <v-row class="d-flex flex-row">
      <v-col
        cols="6"
        v-if="isFiltering"
      >
        <v-btn
          text
          @click="filter('clear')"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="6"
        :class="bottomFilterClass"
      >
        <v-btn
          text
          @click="showFilterDialog = true"
        >
          <v-icon>filter_list</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      v-model="showFilterDialog"
      max-width="350px"
    >
      <v-card>
        <v-card-title>
          <h3 class="subtitle-1">Filtros</h3>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="showFilterDialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="filter"
          >
            <v-icon>check</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-list
            dense
            three-line
          >

            <v-list-item dense>
              <v-list-item-content>
                <v-list-item-title>Tipo de Lançamento</v-list-item-title>
                <v-list-item-subtitle>
                  <v-select
                    placeholder="Todos os Lançamentos"
                    chips
                    deletable-chips
                    :items="operations"
                    item-text="description"
                    item-value="value"
                    @change="localFilters.type = $event"
                    :value="filters && filters.type"
                  ></v-select>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item dense>
              <v-list-item-content>
                <v-list-item-title>Conta</v-list-item-title>
                <v-list-item-subtitle>
                  <v-select
                    placeholder="Todas as Contas"
                    chips
                    deletable-chips
                    multiple
                    :items="accounts"
                    item-text="description"
                    item-value="id"
                    @change="localFilters.accountsIds = $event"
                    :value="filters && filters.accountsIds"
                  ></v-select>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item dense>
              <v-list-item-content>
                <v-list-item-title>Categoria</v-list-item-title>
                <v-list-item-subtitle>
                  <v-select
                    placeholder="Todas as Categorias"
                    chips
                    deletable-chips
                    multiple
                    :items="categories"
                    item-text="description"
                    item-value="id"
                    @change="localFilters.categoriesIds = $event"
                    :value="filters && filters.categoriesIds"
                  ></v-select>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'

import AccountServices from './../services/accounts-service'
import CategoriesServices from './../services/categories-service'

const { mapState, mapActions } = createNamespacedHelpers('finances')

export default {
  name: 'RecordsFilter',
  data: () => ({
    accounts: [],
    categories: [],
    operations: [
      { description: 'Receita', value: 'CREDIT' },
      { description: 'Despesa', value: 'DEBIT' }
    ],
    localFilters: {
      accountsIds: [],
      categoriesIds: [],
      type: undefined
    },
    showFilterDialog: false,
    subscriptions: []
  }),
  computed: {
    ...mapState(['filters', 'isFiltering']),
    bottomFilterClass () {
      return !this.isFiltering ? 'offset-6' : ''
    }
  },
  created () {
    this.setItems()
  },
  destroyed () {
    this.subscriptions.forEach(s => s.unsubscribe())
  },
  methods: {
    ...mapActions(['setFilters']),
    filter (type) {
      this.showFilterDialog = false
      this.setFilters({ filters: type !== 'clear' ? this.localFilters : undefined })
      this.$emit('filter')
    },
    setItems () {
      this.subscriptions.push(
        AccountServices.accounts()
          .subscribe(accounts => (this.accounts = accounts))
      )

      this.subscriptions.push(
        CategoriesServices.categories()
          .subscribe(categories => (this.categories = categories))
      )
    }
  }
}
</script>
