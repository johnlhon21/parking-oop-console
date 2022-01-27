<template>
  <v-app>
    <router-view />
    <v-overlay
      z-index="20000"
      :value="progress"
    >
      <v-progress-circular
        indeterminate
        color="white"
        size="50"
        class="mb-0"
      />
    </v-overlay>
    <v-snackbar
      v-model="notify.show"
      :timeout="notify.timeout"
      :color="notify.color"
      :top="!isMobile"
      :right="!isMobile"
      multi-line
    >
      {{ notify.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          v-bind="attrs"
          icon
          @click="notify.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
  import mixins from './services/mixins'
  export default {
    name: 'App',
    mixins: [mixins],
    computed: {
      isMobile () {
        return this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm'
      },
    },
  }
</script>
<style>
</style>
