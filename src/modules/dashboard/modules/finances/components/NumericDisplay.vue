<template>
  <v-card :color="color">

    <v-card-title>
      <v-spacer></v-spacer>
      <h3 class="display-2 font-weight-light pt-3">500 Mtn</h3>
    </v-card-title>

    <v-card-text>
      <v-row class="d-flex flex-row justify-end">
        <v-col
          v-for="btn in buttons"
          :key="btn"
          cols="4"
          class="pa-1"
        >
          <v-btn
            :color="color"
            class="subtitle-1"
            block
          >{{ btn }}</v-btn>
        </v-col>
        <v-col
          cols="4"
          class="pa-1"
        >
          <v-btn
            icon
            block
          >
            <v-icon>backspace</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  name: 'NumericDisplay',
  props: {
    color: String
  },
  data: () => ({
    buttons: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
  })
}
</script>
