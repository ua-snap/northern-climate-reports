<template>
  <section class="section">
    <div class="columns">
      <div class="column is-flex">
        <ReportMagtMap
          scenario="0"
          model="0"
          era="0"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="1"
          model="1"
          era="1"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="1"
          model="1"
          era="2"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="1"
          model="1"
          era="3"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="1"
          model="1"
          era="4"
          class="report--deltamap--map"
        />
      </div>
    </div>
    <div class="columns">
      <div class="column is-flex">
        <div class="report--deltamap--map" />
        <ReportMagtMap
          scenario="2"
          model="1"
          era="1"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="2"
          model="1"
          era="2"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="2"
          model="1"
          era="3"
          class="report--deltamap--map"
        />
        <ReportMagtMap
          scenario="2"
          model="1"
          era="4"
          class="report--deltamap--map"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 3rem;
}
.report--deltamap--map {
  height: 17vw;
  min-width: 10vw;
  width: 20%;
  margin: 5px;
}
</style>

<script>
import ReportMagtMap from './ReportMagtMap'
export default {
  name: 'ReportMagtMaps',
  components: {
    ReportMagtMap,
  },
}
</script>
