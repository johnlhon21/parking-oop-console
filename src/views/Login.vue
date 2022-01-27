<template>
  <v-app>
    <div id="login-wrap">
      <v-main
        id="login-content"
      >
        <v-container>
          <v-row no-gutters>
            <v-col
              cols="12"
              class="text-center"
              md="6"
              offset-md="3"
              lg="6"
              offset-lg="3"
              xl="4"
              offset-xl="4"
            >
              <div
                id="login-card-wrapper"
              >
                <div class="text-center">
                  <img
                    src="../assets/scs_logo.png"
                    height="107"
                    width="147"
                  >
                </div>
                <div class="text-h2 mb-2 primary--text">
                  Steven Construction & Supply
                </div>
                <v-container>
                  <v-sheet
                    min-height="25vh"
                    color="white"
                    light
                    elevation="4"
                    class="rounded-xl"
                  >
                    <v-card-text
                      class="pa-8"
                    >
                      <div class="text-h4 mb-3 grey--text">
                        Login to your account.
                      </div>
                      <v-form
                        class="pa-2"
                      >
                        <v-alert
                          v-show="status === 400"
                          class="pa-3 rounded-lg"
                          dense
                          dismissible
                          type="error"
                          transition="fade-transition"
                        >
                          <h6 class="text-h4">
                            {{ message }}
                          </h6>
                        </v-alert>
                        <v-text-field
                          v-model="email"
                          label="Email"
                          prepend-inner-icon="mdi-email"
                          outlined
                          rounded
                          type="text"
                          :error-messages="emailErrors"
                          required
                          @input="$v.email.$touch()"
                          @blur="$v.email.$touch()"
                        />
                        <v-text-field
                          v-model="password"
                          label="Password"
                          type="password"
                          outlined
                          rounded
                          prepend-inner-icon="mdi-lock"
                          :error-messages="passwordErrors"
                          required
                          @input="$v.password.$touch()"
                          @blur="$v.password.$touch()"
                          @keydown="keyEnterSubmit"
                        />
                        <v-btn
                          class="mb-6"
                          rounded
                          block
                          x-large
                          :disabled="loading"
                          color="primary"
                          @click="doLogin"
                        >
                          {{ !loading ? 'Login' : 'Logging In...' }}
                        </v-btn>
                      </v-form>
                      <a
                        class="text-h4 grey--text text--darken-1"
                        href="/forgot-password"
                      >
                        Forgot Your Password?
                      </a>
                    </v-card-text>
                  </v-sheet>
                </v-container>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <div class="pricing-footer text-center pb-12 mt-10">
          <h4 class="text-h4 grey--text">
            <span>
              &copy; {{ new Date().getFullYear() }} <span> mbagaywa All Rights Reserve</span>
            </span>
          </h4>
        </div>
      </v-main>
    </div>
  </v-app>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  export default {
    name: 'Login',
    mixins: [validationMixin],
    validations: {
      email: { required, email },
      password: { required },
    },
    data: () => ({
      email: null,
      password: null,
    }),
    computed: {
      ...mapState('auth', {
        loading: state => state.loading,
        errors: state => state.errors,
        message: state => state.message,
        isLogin: state => state.login,
        status: state => state.status,
      }),
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        return errors
      },
    },
    async created () {
    },
    methods: {
      ...mapActions('auth', [
        'login',
      ]),
      async doLogin () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          await this.login({
            email: this.email,
            password: this.password,
          })
        }
      },
      keyEnterSubmit (e) {
        if (e.keyCode === 13) {
          this.doLogin()
        }
      },
    },
  }
</script>

<style lang="sass">
  #login-wrap
    background-color: #333333
    height: 100%
  #login-content
    background: url("../assets/construction3.png") no-repeat center / cover !important
    height: 100%
    flex-direction: row
    align-items: center
    justify-content: center
    display: flex
    a
      text-decoration: none
  #login-card-wrapper
    padding: 0
    .page-title-text
      font-size: 4.25rem !important
      font-weight: 300
      line-height: 1.5em
      letter-spacing: -0.0083333333em !important
      margin-top: -50px !important
</style>
