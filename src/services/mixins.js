import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('mixins', [
      'progress',
      'notify',
    ]),
  },
  methods: {
    ...mapActions('mixins', [
      'PROGRESS',
      'NOTIFY',
    ]),
  },
}
