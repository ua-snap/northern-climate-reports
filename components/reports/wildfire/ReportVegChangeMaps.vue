<template>
  <section class="section">
    <h5 class="veg-change-minimaps-title has-text-centered">
      Relative vegetation change,
      <span v-html="place"></span>
    </h5>
    <div class="columns">
      <table class="veg-change-minimaps">
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
            <ReportVegChangeMap
              historical="true"
              era="1"
              class="veg-change-minimaps-map"
            />
          </td>
          <td>
            <ReportVegChangeMap
              historical="false"
              scenario="0"
              model="0"
              era="4"
              class="veg-change-minimaps-map"
            />
          </td>
          <td>
            <ReportVegChangeMap
              historical="false"
              scenario="0"
              model="0"
              era="8"
              class="veg-change-minimaps-map"
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
            <ReportVegChangeMap
              historical="false"
              scenario="2"
              model="0"
              era="4"
              class="veg-change-minimaps-map"
            />
          </td>
          <td>
            <ReportVegChangeMap
              historical="false"
              scenario="2"
              model="0"
              era="8"
              class="veg-change-minimaps-map"
            />
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.veg-change-minimaps-title {
  font-size: 150%;
  padding-bottom: 1rem;
}
.veg-change-minimaps {
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
import ReportVegChangeMap from './ReportVegChangeMap'
import { mapGetters } from 'vuex'
export default {
  name: 'ReportVegChangeMaps',
  components: {
    ReportWildfireMapTitle,
    ReportVegChangeMap,
  },
  computed: {
    ...mapGetters({
      place: 'place/name',
    }),
  },
}
</script>
