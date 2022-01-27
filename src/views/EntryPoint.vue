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
                <div class="text-h2 mb-2 primary--text">
                  Y3 Kidz Parking Complex
                </div>
                <v-container>
                  <v-sheet
                    min-height="30vh"
                    color="white"
                    light
                    elevation="4"
                    class="rounded-xl"
                  >
                    <v-card-text
                      class="pa-8"
                    >
                      <div class="text-h3 mb-3 grey--text">
                        {{ entryPointName}}
                      </div>
                      <v-form
                        class="pa-2"
                      >
                        <v-text-field
                          v-model="carPlate"
                          class="centered-input"
                          label="Car Plate No."
                          maxlength="8"
                          outlined
                          rounded
                          type="text"
                          :disabled="loading"
                          :error-messages="errors.car_plate"
                          style="text-align: center"
                          @keypress.enter="park"
                        />
                        <v-select
                          v-model="carSize"
                          class="text-center"
                          :items="sizes"
                          :disabled="loading"
                          label="Car Size"
                          :error-messages="errors.car_size"
                          rounded
                          outlined
                          style="text-align: center"
                        />
                        <v-btn
                          class="mb-6"
                          rounded
                          block
                          x-large
                          :disabled="loading"
                          color="primary"
                          @click="park"
                        >
                          {{ !loading ? 'Parking Entry' : 'Please wait...' }}
                        </v-btn>
                      </v-form>

                      <v-alert
                        v-if="status === 200"
                        class="pa-3 rounded-lg"
                        dense
                        dismissible
                        color="grey--darken-2"
                        transition="fade-transition"
                        outlined
                      >
                        <span>Your parking slot no is</span>
                        <h3 class="text-h3 green--text">
                          {{ parking_details.parking_slot.name }}
                        </h3>
                        <span>Time : {{ parking_details.parked_at }}</span>
                        <br>
                        <span>Thank You!</span>
                      </v-alert>
                      <v-alert
                        v-if="status === 400 || status === 500"
                        class="pa-3 rounded-lg"
                        dense
                        dismissible
                        color="error"
                        transition="fade-transition"
                        outlined
                      >
                        <h3 class="text-h3 red--text">
                          Sorry!
                        </h3>
                        <h3 class="text-h3 red--text">
                          {{ message }}
                        </h3>
                      </v-alert>
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
              &copy; {{ new Date().getFullYear() }} <span> Y3kidz All Rights Reserve</span>
            </span>
          </h4>
        </div>
      </v-main>
    </div>
  </v-app>
</template>

<script>
  import mixins from '../services/mixins'
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'EntryPoint',
    mixins: [mixins],
    data: () => ({
      carPlate: null,
      carSize: null,
      entryPointName: '',
      entryPointCoverage: null,
      sizes: ['small', 'medium', 'large'],
    }),
    computed: {
      ...mapState('parking', {
        loading: state => state.loading,
        errors: state => state.errors,
        message: state => state.message,
        status: state => state.status,
        parking_details: state => state.parking_details,
      }),
    },
    async created () {
      this.entryPointName = this.$router.currentRoute.query.name
      this.entryPointCoverage = this.$router.currentRoute.query.coverage
    },
    methods: {
      ...mapActions('parking', [
        'PARK',
      ]),
      async park () {
        this.PROGRESS(true)
        await this.PARK({
          car_plate: this.carPlate,
          car_size: this.carSize,
          entry_point_coverage: this.entryPointCoverage,
        })
        this.PROGRESS(false)
      },
      clearMe (input) {
        if (typeof this.errors[input] !== 'undefined') {
          delete this.errors[input]
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
    background: url("../assets/parking.png") no-repeat center / cover !important
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
  .centered-input
      input
        text-align: center
        padding: 15px !important
        font-size: 30px
</style>
