<template>
  <v-app>
    <v-main>
      <v-sheet
        min-height="25vh"
        color="primary"
        dark
      >
      <!--  -->
      </v-sheet>
      <v-container>
        <v-row no-gutters>
          <v-col
            cols="12"
            class="text-center"
          >
            <div
              id="pnf-card-wrapper"
            >
              <v-container>
                <v-sheet
                  min-height="25vh"
                  color="white"
                  light
                  elevation="3"
                  rounded
                >
                  <v-card-text
                    class="text-center"
                  >
                    <h1 class="mt-12 red--text text--lighten-1 text-h2">
                      Oops! There's nothing here!
                    </h1>
                    <h4
                      class="mt-12 grey--text text-h3"
                    >
                      <span>Page Not Found</span>
                    </h4>
                  </v-card-text>

                  <div class="mt-12">
                    <v-btn
                      class="mb-12"
                      color="primary"
                      @click="goBack"
                    >
                      Go back
                    </v-btn>
                  </div>
                </v-sheet>
              </v-container>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="pricing-footer text-center pb-12 mt-10">
        <h4 class="text-h4 grey--text">
          <span>
            &copy; {{ new Date().getFullYear() }} <span> Y3Tek All Rights Reserve</span>
          </span>
        </h4>
      </div>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'PageNotFound',
    data: () => ({
      name: '',
    }),
    methods: {
      goBack () {
        this.$router.back()
      },
    },
  }
</script>

<style lang="sass">
  #pnf-card-wrapper
    margin-top: -200px !important
</style>
