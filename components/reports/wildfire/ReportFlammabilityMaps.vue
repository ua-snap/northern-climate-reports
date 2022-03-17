<template>
  <section class="section">
    <h5 class="flammability-minimaps-title has-text-centered">
      Relative flammability,
      <span v-html="place"></span>
    </h5>
    <div class="columns">
      <table class="flammability-minimaps">
        <tr>
          <td></td>
          <td><ReportWildfireMapTitle historical="true" /></td>
          <td><ReportWildfireMapTitle model="0" scenario="0" era="4" /></td>
          <td><ReportWildfireMapTitle model="0" scenario="0" era="8" /></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <ReportFlammabilityMap
              historical="true"
              era="1"
              class="flammability-minimaps-map"
            />
          </td>
          <td>
            <ReportFlammabilityMap
              historical="false"
              scenario="0"
              model="0"
              era="4"
              class="flammability-minimaps-map"
            />
          </td>
          <td>
            <ReportFlammabilityMap
              historical="false"
              scenario="0"
              model="0"
              era="8"
              class="flammability-minimaps-map"
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>
            <ReportWildfireMapTitle
              model="0"
              scenario="2"
              era="4"
              class="mt-5"
            />
          </td>
          <td>
            <ReportWildfireMapTitle
              model="0"
              scenario="2"
              era="8"
              class="mt-5"
            />
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>
            <ReportFlammabilityMap
              historical="false"
              scenario="2"
              model="0"
              era="4"
              class="flammability-minimaps-map"
            />
          </td>
          <td>
            <ReportFlammabilityMap
              historical="false"
              scenario="2"
              model="0"
              era="8"
              class="flammability-minimaps-map"
            />
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.flammability-minimaps-title {
  font-size: 150%;
  padding-bottom: 1rem;
}
.flammability-minimaps {
  width: 100%;
  margin-top: 15px;
  td {
    width: 20%;
    padding: 5px;
    vertical-align: middle;
  }
}
</style>

<script>
import ReportWildfireMapTitle from './ReportWildfireMapTitle'
import ReportFlammabilityMap from './ReportFlammabilityMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportFlammabilityMaps',
  components: {
    ReportWildfireMapTitle,
    ReportFlammabilityMap,
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
    }),
  },
}
</script>
