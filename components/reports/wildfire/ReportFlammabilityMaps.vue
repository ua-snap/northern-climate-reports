<template>
  <section class="section">
    <h5 class="flammability-minimaps-title has-text-centered">
      Relative flammability,
      <span v-html="place"></span>
    </h5>
    <div class="columns">
      <div class="column is-flex">
        <div class="flammability-minimaps-map" />
        <ReportFlammabilityMap
          historical="true"
          era="1"
          class="flammability-minimaps-map"
        />
        <ReportFlammabilityMap
          historical="false"
          scenario="0"
          model="0"
          era="4"
          class="flammability-minimaps-map"
        />
        <ReportFlammabilityMap
          historical="false"
          scenario="0"
          model="0"
          era="8"
          class="flammability-minimaps-map"
        />
        <div class="flammability-minimaps-map" />
      </div>
    </div>
    <div class="columns">
      <div class="column is-flex">
        <div class="flammability-minimaps-map" />
        <div class="flammability-minimaps-map" />
        <ReportFlammabilityMap
          historical="false"
          scenario="2"
          model="0"
          era="4"
          class="flammability-minimaps-map"
        />
        <ReportFlammabilityMap
          historical="false"
          scenario="2"
          model="0"
          era="8"
          class="flammability-minimaps-map"
        />
        <div class="flammability-minimaps-map" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.flammability-minimaps-title {
  font-size: 150%;
  padding-bottom: 1rem;
}
.flammability-minimaps-map {
  height: 17vw;
  min-width: 10vw;
  width: 20%;
  margin: 5px;
}
</style>

<script>
import ReportFlammabilityMap from './ReportFlammabilityMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportFlammabilityMaps',
  components: {
    ReportFlammabilityMap,
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
    }),
  },
}
</script>
