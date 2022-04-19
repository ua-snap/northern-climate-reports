<template>
  <section class="section">
    <h5 class="minimaps-section-title has-text-centered">
      Mean annual ground temperature,
      <span v-html="place"></span>, 1995&ndash;2100
    </h5>
    <div class="is-size-6 mb-4">
      <b-field label="Model">
        <b-radio
          v-model="magt_model_selection"
          name="magt_model_selection"
          native-value="3"
          >NCAR CCSM4</b-radio
        >
        <b-radio
          v-model="magt_model_selection"
          name="magt_model_selection"
          native-value="4"
          >MRI CGCM3</b-radio
        >
      </b-field>
    </div>
    <div class="columns is-flex-direction-row">
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="0" model="0" era="0" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="1" :model="magt_model_selection" era="1" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="1" :model="magt_model_selection" era="2" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="1" :model="magt_model_selection" era="3" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="1" :model="magt_model_selection" era="4" />
      </div>
    </div>
    <div class="columns is-flex-direction-row">
      <div class="minimap-container my-4 p-1"></div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="2" :model="magt_model_selection" era="1" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="2" :model="magt_model_selection" era="2" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="2" :model="magt_model_selection" era="3" />
      </div>
      <div class="minimap-container my-4 p-1">
        <ReportMagtMap scenario="2" :model="magt_model_selection" era="4" />
      </div>
    </div>
    <table class="magt-legend">
      <tbody>
        <tr>
          <td class="legend-20-below px-2">
            <span class="is-pulled-left">
              <span v-html="legendRedMin"></span>
            </span>
            <span class="is-pulled-right">
              <span v-html="legendRedMax"></span>
            </span>
          </td>
          <td class="legend-0 has-text-centered">
            <span v-html="legendWhite"></span>
          </td>
          <td class="legend-20-above px-2">
            <span class="is-pulled-left">
              <span v-html="legendBlueMin"></span>
            </span>
            <span class="is-pulled-right">
              <span v-html="legendBlueMax"></span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style lang="scss" scoped>
.magt-legend {
  width: 800px;
  height: 26px;
  border: 1px solid #999;
  margin: 40px auto 0 auto;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 3px #000;
  .legend-20-below {
    width: 47.5%;
    background: linear-gradient(90deg, #0000ffff 0%, #a0a0ffff 100%);
  }
  .legend-0 {
    color: #000;
    text-shadow: none;
    width: 5%;
  }
  .legend-20-above {
    width: 47.5%;
    background: linear-gradient(90deg, #ffa0a0ff 0%, #ff0000ff 100%);
  }
}
</style>

<script>
import ReportMagtMap from './ReportMagtMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportMagtMaps',
  components: {
    ReportMagtMap,
  },
  computed: {
    ...mapGetters({
      units: 'units',
      place: 'place/name',
    }),
    legendRedMin() {
      return this.units == 'imperial' ? '-4&deg;F' : '-20&deg;C'
    },
    legendRedMax() {
      return this.units == 'imperial' ? '30.2&deg;F' : '-1&deg;C'
    },
    legendWhite() {
      return this.units == 'imperial' ? '32&deg;F' : '0&deg;C'
    },
    legendBlueMin() {
      return this.units == 'imperial' ? '33.8&deg;F' : '1&deg;C'
    },
    legendBlueMax() {
      return this.units == 'imperial' ? '68&deg;F' : '20&deg;C'
    },
  },
  data() {
    return {
      magt_model_selection: 3,
    }
  },
}
</script>
