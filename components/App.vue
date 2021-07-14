<template>
  <div>
    <client-only>
      <div v-show="!this.reportIsVisible" class="place-selector">
        <Map></Map>
      </div>
      <div v-show="this.reportIsVisible" class="report-wrapper">
        <Report></Report>
      </div>
    </client-only>
  </div>
</template>
<style></style>
<script>
import Map from '~/components/Map'
import Report from '~/components/Report'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Map,
    Report,
  },
  computed: {
    ...mapState(['latlng']),
    ...mapGetters(['reportIsVisible']),
  },
}
</script>
