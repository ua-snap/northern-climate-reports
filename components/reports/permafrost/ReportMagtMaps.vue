<template>
  <section class="section">
    <h5 class="permafrost-minimaps-title has-text-centered">
      Mean annual ground temperature,
      <span v-html="place"></span>
    </h5>
    <div class="is-size-6 mb-4">
      <b-field label="Model">
        <b-radio
          v-model="model_selection"
          name="model_selection"
          native-value="3"
          >NCAR CCSM4</b-radio
        >
        <b-radio
          v-model="model_selection"
          name="model_selection"
          native-value="4"
          >MRI CGCM3</b-radio
        >
      </b-field>
    </div>
    <div class="columns">
      <table class="permafrost-minimaps">
        <tr>
          <td>
            <ReportMagtMapTitle :model="model_selection" scenario="0" era="0" />
          </td>
          <td>
            <ReportMagtMapTitle :model="model_selection" scenario="1" era="1" />
          </td>
          <td>
            <ReportMagtMapTitle :model="model_selection" scenario="1" era="2" />
          </td>
          <td>
            <ReportMagtMapTitle :model="model_selection" scenario="1" era="3" />
          </td>
          <td>
            <ReportMagtMapTitle :model="model_selection" scenario="1" era="4" />
          </td>
        </tr>
        <tr>
          <td>
            <ReportMagtMap
              scenario="0"
              model="0"
              era="0"
              class="permafrost-minimaps-map"
            />
          </td>
          <td>
            <ReportMagtMap
              scenario="1"
              :model="model_selection"
              era="1"
              class="permafrost-minimaps-map"
            />
          </td>
          <td>
            <ReportMagtMap
              scenario="1"
              :model="model_selection"
              era="2"
              class="permafrost-minimaps-map"
            />
          </td>
          <td>
            <ReportMagtMap
              scenario="1"
              :model="model_selection"
              era="3"
              class="permafrost-minimaps-map"
            />
          </td>
          <td>
            <ReportMagtMap
              scenario="1"
              :model="model_selection"
              era="4"
              class="permafrost-minimaps-map"
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <ReportMagtMapTitle
              :model="model_selection"
              scenario="2"
              era="1"
              class="mt-5"
            />
          </td>
          <td>
            <ReportMagtMapTitle
              :model="model_selection"
              scenario="2"
              era="2"
              class="mt-5"
            />
          </td>
          <td>
            <ReportMagtMapTitle
              :model="model_selection"
              scenario="2"
              era="3"
              class="mt-5"
            />
          </td>
          <td>
            <ReportMagtMapTitle
              :model="model_selection"
              scenario="2"
              era="4"
              class="mt-5"
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <ReportMagtMap
              scenario="2"
              :model="model_selection"
              era="1"
              class="permafrost-minimaps-map"
            />
          </td>
          <td>
            <ReportMagtMap
              scenario="2"
              :model="model_selection"
              era="2"
              class="permafrost-minimaps-map"
            />
          </td>
          <td>
            <ReportMagtMap
              scenario="2"
              :model="model_selection"
              era="3"
              class="permafrost-minimaps-map"
            />
          </td>
          <td>
            <ReportMagtMap
              scenario="2"
              :model="model_selection"
              era="4"
              class="permafrost-minimaps-map"
            />
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.permafrost-minimaps-title {
  font-size: 150%;
  padding-bottom: 1rem;
}
.permafrost-minimaps {
  width: 100%;
  margin-top: 15px;
  td {
    width: 20%;
    padding: 5px;
    vertical-align: middle;
  }
}
@media (min-width: 1000px) {
  .minimap-line-break {
    display: none;
  }
}
</style>

<script>
import ReportMagtMapTitle from './ReportMagtMapTitle'
import ReportMagtMap from './ReportMagtMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportMagtMaps',
  components: {
    ReportMagtMapTitle,
    ReportMagtMap,
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
    }),
  },
  data() {
    return {
      model_selection: 3,
    }
  },
}
</script>
