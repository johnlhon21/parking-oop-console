<template>
  <v-app>
    <div id="parking-complex-wrap">
      <v-main
        id="parking-complex-content"
      >
        <div>
          <v-row no-gutters>
            <v-col
              cols="12"
              class="text-center"
            >
              <div
                id="parking-complex-wrapper"
              >
                <div class="text-h1 mb-2 primary--text pa-4">
                  Y3 Kidz Parking Complex
                </div>
                <div
                  class="pa-8"
                >
                  <v-sheet
                    min-height="70vh"
                    color="white"
                    light
                    elevation="4"
                    class="rounded-lg pa-0"
                    style="overflow: auto"
                  >
                    <v-card-text
                      class="pa-"
                    >
                      <div class="text-h2 green--text">
                        Parking Dashboard
                      </div>
                    </v-card-text>
                    <v-card-text v-if="parking_slots.length > 0 && status === 200">
                      <table
                        style="width: 100%"
                      >
                        <tr>
                          <td
                            v-for="(entryPoint2, index2) in parkingSlots"
                            :key="index2"
                          >
                            <table width="100%">
                              <tr>
                                <td
                                  v-for="item in entryPoint2"
                                  :key="item.id"
                                  class="parking-slots"
                                >
                                  <div style="height: 140px; margin-top: 10px;">
                                    <h4
                                      class="grey--text"
                                    >
                                      {{ item.name}}
                                    </h4>
                                    <v-icon
                                      x-large
                                      :color="!item.is_available ? 'red' : 'grey'"
                                    >
                                      mdi-car
                                    </v-icon>
                                    <h4
                                      v-if="item.parked_car !== null"
                                      class="red--text mt-2"
                                    >
                                      {{ item.parked_car.car_plate}}
                                    </h4>
                                    <small
                                      v-if="item.parked_car !== null"
                                      class="green--text"
                                    >
                                      {{ item.parked_car.parked_at_diff }}
                                    </small>
                                    <br>
                                    <small
                                      v-if="item.parked_car !== null"
                                      class="grey--text"
                                    >
                                      {{ item.parked_car.is_continuous === 1 ? 'Continuous' : '' }}
                                    </small>
                                  </div>
                                  <div
                                    class="justify-center"
                                    style="height: 20px"
                                  >
                                    <v-btn
                                      v-if="item.parked_car !== null"
                                      small
                                      text
                                      color="red"
                                      @click="unpark(item.parked_car.id, item.parked_car.car_plate)"
                                    >
                                      Exit
                                    </v-btn>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            v-for="(entryPoint, index) in parkingSlots"
                            :key="index"
                            style="padding: 10px; text-align: center"
                          >
                            <a
                              target="_blank"
                              :href="'/entry-point?coverage=' + entryPoint[0].entry_point_coverage + '&name=' + index"
                            >
                              <h4 class="entry-point">
                                <span class="grey--text">||</span>
                                <br>
                                {{ index }}
                                <br>
                                <span class="grey--text">||</span>
                                <br>
                                <br>
                                <span class="grey--text">||</span>
                              </h4>
                            </a>
                          </td>
                        </tr>
                      </table>
                    </v-card-text>
                    <v-card-text v-else>
                      Loading....
                    </v-card-text>
                  </v-sheet>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="pricing-footer text-center pb-12 mt-10">
          <h4 class="text-h4 grey--text">
            <span>
              &copy; {{ new Date().getFullYear() }} <span> Y3kidz <br> All Rights Reserve</span>
            </span>
          </h4>
        </div>
      </v-main>
    </div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h3">
          Parking Receipt
        </v-card-title>
        <v-card-text v-if="unparked === true">
          <v-row>
            <v-col>Car Plate No.</v-col>
            <v-col> {{ parkingFee.car_plate }} </v-col>
          </v-row>
          <v-row>
            <v-col>Entry Time </v-col>
            <v-col> {{ parkingFee.entry_time }} </v-col>
          </v-row>
          <v-row>
            <v-col>Exit Time </v-col>
            <v-col> {{ parkingFee.exit_time }} </v-col>
          </v-row>
          <v-row>
            <v-col>Parking Slot Size </v-col>
            <v-col> {{ parkingFee.parking_size }} </v-col>
          </v-row>
          <v-row>
            <v-col>Total Parking Hours </v-col>
            <v-col> {{ parkingFee.total_hours }} </v-col>
          </v-row>
          <v-row v-if="parkingFee.twenty_four_hour_parking > 0">
            <v-col>Twenty Four Hour Rate  {{ parkingFee.twenty_four_hours_rate }} x {{ parkingFee.twenty_four_hour_parking }} </v-col>
            <v-col> {{ parkingFee.twenty_four_hour_parking_fee }} </v-col>
          </v-row>
          <v-row v-else>
            <v-col>Flat Rate  {{ parkingFee.flat_rate }} @ {{ parkingFee.flat_rate_hours }} hrs. </v-col>
            <v-col> {{ parkingFee.flat_rate }} </v-col>
          </v-row>
          <v-row>
            <v-col>Hourly Rate {{ parkingFee.hourly_rate }} x  {{ parkingFee.succeeding_hours }} hrs.</v-col>
            <v-col> {{ parkingFee.total_hourly_rate }} </v-col>
          </v-row>
          <hr>
          <v-row
            v-if="parkingFee.previous_payment !== null"
            class="grey--text"
          >
            <v-col>Continuous Rate Payment </v-col>
            <v-col> - {{ parkingFee.previous_payment }} </v-col>
          </v-row>
          <v-row class="font-weight-bold">
            <v-col>Total Parking Fee </v-col>
            <v-col> {{ parkingFee.total_parking_fee }} </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else>
          <span class="red--text">Parking Fee Details Not Found</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import mixins from '../services/mixins'
  import Swal from 'sweetalert2'
  import { mapActions, mapState } from 'vuex'
  import _ from 'lodash'
  export default {
    name: 'Login',
    mixins: [mixins],
    data: () => ({
      parkingSlots: [],
      loaded: false,
      dialog: false,
      unparked: false,
      parkingFee: {},
    }),
    computed: {
      ...mapState('parkingSlots', {
        loading: state => state.loading,
        errors: state => state.errors,
        message: state => state.message,
        status: state => state.status,
        parking_slots: state => state.parking_slots,
      }),
    },
    async created () {
      await this.getParkingSlots()
    },
    methods: {
      ...mapActions('parkingSlots', [
        'GET_PARKING_SLOTS',
      ]),
      ...mapActions('parking', [
        'UNPARK',
      ]),
      async getParkingSlots () {
        this.PROGRESS(true)
        this.NOTIFY({
          color: 'info',
          message: 'Initializing...',
        })
        this.loaded = false
        const response = await this.GET_PARKING_SLOTS()
        this.PROGRESS(false)
        if (response.status === 200) {
          this.loaded = true
          this.NOTIFY({
            color: 'success',
            message: response.message,
          })
          this.parkingSlots = _.groupBy(response.data.parking_slots, 'nearest_entry_point')
        }
      },
      async unpark (id, carPlate) {
        this.dialog = false
        this.unparked = false
        Swal.fire({
          title: carPlate,
          text: 'Do you want to to continue to exit parking?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085D6',
          confirmButtonText: 'Yes!, Continue',
        }).then(async (confirm) => {
          if (confirm.value === true) {
            this.PROGRESS(true)
            const response = await this.UNPARK({
              id: id,
            })
            if (response.status === 200) {
              this.dialog = true
              this.parkingFee = response.data.parking_fee_details
              this.unparked = response.data.unparked
            }
            this.PROGRESS(false)
            this.NOTIFY({
              message: response.status === 200 ? response.message : response.errors.message,
              color: response.status === 200 ? 'success' : 'error',
            })
            this.getParkingSlots()
          }
        })
      },
    },
  }
</script>

<style lang="sass">
  #parking-complex-wrap
    background-color: #000000
    height: 100%
  #parking-complex-content
    background: url("../assets/parking.png") no-repeat center / cover !important
    height: 100%
    flex-direction: row
    align-items: center
    justify-content: center
    display: flex
    a
      text-decoration: none
  #parking-complex-wrapper
    padding: 0
    .page-title-text
      font-size: 4.25rem !important
      font-weight: 300
      line-height: 1.5em
      letter-spacing: -0.0083333333em !important
      margin-top: -20px !important
  .entry-point
    border-left: dashed 2px #ccc
    border-right: dashed 2px #ccc
    height: 120px
    width: 50%
    margin: 100px auto
    padding: 20px
  .parking-slots
    border: solid 2px #fff168
    height: 160px
    border-bottom: none
    text-align: center
</style>
