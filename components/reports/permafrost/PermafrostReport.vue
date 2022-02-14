<template>
  <div>
    <h4 class="title is-3">Permafrost</h4>
    <div class="content is-size-5">
      <span
        v-show="
          permafrostPresent && permafrostDisappears && !permafrostUncertain
        "
      >
        Historical data and model projections indicate that
        <strong
          >this place has permafrost which disappears within
          <span v-html="depthFragment"></span> of the ground surface over
          time.</strong
        >
        Projected permafrost active layer thickness and ground freeze depth
        through the end of the century is shown below. The active layer is the
        layer of soil above permafrost that thaws seasonally.
      </span>
      <span
        v-show="
          permafrostPresent && !permafrostDisappears && !permafrostUncertain
        "
        >Historical data and model projections indicate that
        <strong>this place has permafrost.</strong>
        Projected permafrost active layer thickness through the end of the
        century is shown below. The active layer is the layer of soil above
        permafrost that thaws seasonally.
      </span>
      <span
        v-show="
          !permafrostPresent && permafrostDisappears && !permafrostUncertain
        "
      >
        <strong>
          There is no permafrost within <span v-html="depthFragment"></span> of
          the ground surface at this location</strong
        >. Projected ground freeze depth through the end of the century is shown
        below.
      </span>
      <span v-show="permafrostUncertain">
        <strong
          >The presence or absence of permafrost could not be determined for
          this location</strong
        >
        because the historical mean annual ground temperature falls within the
        threshold of uncertainty (<span v-html="uncertaintyFragment"></span>). A
        chart of the historical and projected mean annual ground temperature is
        provided below.
      </span>
      Results were produced by the GIPL 2.0 permafrost model using five separate
      climate models and two different greenhouse gas scenarios or
      Representative Concentration Pathways (RCPs). RCP4.5 is an optimistic
      future, and RCP8.5 is more pessimistic but also more likely.
      <nuxt-link :to="{ name: 'about' }"
        >Read more about models and RCPs.</nuxt-link
      >
    </div>
    <ReportMagtMaps />
    <div class="chart-wrapper permafrost" v-show="this.permafrostPresent">
      <ReportAltThawChart />
    </div>
    <div class="chart-wrapper permafrost" v-show="this.permafrostDisappears">
      <ReportAltFreezeChart />
    </div>
    <div class="chart-wrapper permafrost" v-show="this.permafrostUncertain">
      <ReportMagtChart />
    </div>
  </div>
</template>
<style></style>
<script>
import ReportMagtMaps from './ReportMagtMaps'
import ReportAltThawChart from './ReportAltThawChart'
import ReportAltFreezeChart from './ReportAltFreezeChart'
import ReportMagtChart from './ReportMagtChart'
import { mapGetters } from 'vuex'

export default {
  name: 'PermafrostReport',
  components: {
    ReportMagtMaps,
    ReportAltThawChart,
    ReportAltFreezeChart,
    ReportMagtChart,
  },
  computed: {
    // The range of uncertainty, within 1ºC of freezing.
    uncertaintyFragment() {
      return this.units == 'imperial'
        ? '30.2&ndash;33.8&deg;F'
        : '&#x00B1;1&deg;C'
    },
    depthFragment() {
      return this.units == 'imperial' ? '9.8ft' : '3m'
    },
    ...mapGetters({
      units: 'units',
      permafrostPresent: 'permafrost/present',
      permafrostDisappears: 'permafrost/disappears',
      permafrostUncertain: 'permafrost/uncertain',
    }),
  },
}
</script>
