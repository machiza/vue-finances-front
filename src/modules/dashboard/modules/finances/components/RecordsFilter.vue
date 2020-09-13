<template>
  <div>
    <v-row class="d-flex flex-row">
      <v-col cols="6">
        <v-btn text>
          <v-icon>close</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6">
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
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'RecordsFilter',
  data: () => ({
    showFilterDialog: false
  })
}
</script>
