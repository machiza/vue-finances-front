<template>
  <v-container fill-height>
    <v-row
      justify="center"
      align="center"
    >

      <v-col
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
      >
        <v-card elevation="12">

          <v-toolbar
            color="primary"
            dark
          >
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                type="email"
                v-model.trim="$v.user.email.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Senha"
                type="password"
                v-model.trim="$v.user.password.$model"
              ></v-text-field>
            </v-form>
            <v-btn
              block
              depressed
              color="secondary"
              @click="log"
            >Criar Conta</v-btn>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="$v.$invalid"
              color="primary"
              large
              @click="submit"
            >Login</v-btn>
          </v-card-actions>

        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>

import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data: () => ({
    user: {
      email: '',
      password: ''
    }
  }),
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    log () {
      console.log('Vuelidate: ', this.$v)
    },
    submit () {
      console.log('User: ', this.user)
    }
  }
}
</script>

<style>
</style>
