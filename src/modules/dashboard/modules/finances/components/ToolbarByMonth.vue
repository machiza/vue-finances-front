<template>
  <v-toolbar :color="color">
    <v-row class="align-center">
      <v-col cols="1">
        <div class="text-left">
          <v-btn
            icon
            text
            @click="decrement"
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </div>
      </v-col>

      <v-col
        cols="8"
        class="offset-1"
      >
        <v-toolbar-title class="text-center">
          <span class="text-capitalize">{{ currentMonth }}</span>
        </v-toolbar-title>
      </v-col>

      <v-col
        cols="1"
        class="text-right"
        v-if="showSlot"
      >
        <slot />
      </v-col>

      <v-col
        cols="1"
        :class="arrowRightClass"
      >
        <div class="text-right">
          <v-btn
            icon
            text
            @click="increment"
          >
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>

import moment from 'moment'

export default {
  name: 'ToolbarByMonth',
  props: {
    color: String,
    format: String,
    month: String,
    showSlot: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    date: undefined
  }),
  computed: {
    arrowRightClass () {
      return !this.showSlot ? 'offset-md-1' : ''
    },
    columSize () {
      return !this.showSlot ? 'md-10' : 'md-9'
    },
    currentMonth () {
      return this.date.format('MMMM YYYY')
    }
  },
  created () {
    this.setCurrentMonth()
    this.emit()
  },
  methods: {
    emit () {
      this.$emit('month', this.date.format(this.format))
    },
    decrement () {
      this.date = this.date.clone().subtract(1, 'month')
      this.emit()
    },
    increment () {
      this.date = this.date.clone().add(1, 'month')
      this.emit()
    },
    setCurrentMonth () {
      this.date = this.month ? moment(this.month, this.format) : moment()
    }
  }
}
</script>
