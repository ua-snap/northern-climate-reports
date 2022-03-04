<template>
  <section class="section">
    <h5 class="veg-change-minimaps-title has-text-centered">
      Relative vegetation change,
      <span v-html="place"></span>
    </h5>
    <div class="columns">
      <div class="column is-flex">
        <div class="veg-change-minimaps-map" />
        <ReportVegChangeMap
          historical="true"
          era="1"
          class="veg-change-minimaps-map"
        />
        <ReportVegChangeMap
          historical="false"
          scenario="0"
          model="0"
          era="4"
          class="veg-change-minimaps-map"
        />
        <ReportVegChangeMap
          historical="false"
          scenario="0"
          model="0"
          era="8"
          class="veg-change-minimaps-map"
        />
        <div class="veg-change-minimaps-map" />
      </div>
    </div>
    <div class="columns">
      <div class="column is-flex">
        <div class="veg-change-minimaps-map" />
        <div class="veg-change-minimaps-map" />
        <ReportVegChangeMap
          historical="false"
          scenario="2"
          model="0"
          era="4"
          class="veg-change-minimaps-map"
        />
        <ReportVegChangeMap
          historical="false"
          scenario="2"
          model="0"
          era="8"
          class="veg-change-minimaps-map"
        />
        <div class="veg-change-minimaps-map" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.veg-change-minimaps-title {
  font-size: 150%;
  padding-bottom: 1rem;
}
.veg-change-minimaps-map {
  height: 17vw;
  min-width: 10vw;
  width: 20%;
  margin: 5px;
}
</style>

<script>
import ReportVegChangeMap from './ReportVegChangeMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportVegChangeMaps',
  components: {
    ReportVegChangeMap,
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
    }),
  },
}
</script>
