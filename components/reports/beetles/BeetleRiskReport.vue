<template>
  <div>
    <div class="content">
      <h3 class="title is-3">Climate Protection from Spruce Beetles</h3>
      <div class="is-size-5">
        <p>
          Alaska&rsquo;s cold climate has historically helped limit spruce
          beetle outbreaks, but warming conditions are affecting this balance.
        </p>
        <p>
          These maps display three broad levels of historical and projected
          climate-related protection from spruce bark beetle (<i
            >Dendroctonus rufipennis</i
          >) outbreaks in &ldquo;forested regions of Alaska&rdquo; as defined by
          the US Forest Service.
        </p>
        <p>
          <a
            href="https://uaf-snap.org/wp-content/uploads/2023/06/20230627_spruce-beetle-climate-model-white-paper.pdf"
            >See more details about how the model was developed</a
          >
        </p>
      </div>
    </div>
    <ReportBeetleRiskTable snowpack="low" />
    <ReportBeetleRiskTable snowpack="medium" />
    <ReportBeetleRiskMaps />
    <DownloadCsvButton
      text="Download climate protection data as CSV"
      endpoint="beetles"
      class="mt-3 mb-5"
    />
  </div>
</template>
<script>
import ReportBeetleRiskMaps from '~/components/reports/beetles/ReportBeetleRiskMaps'
import ReportBeetleRiskTable from '~/components/reports/beetles/ReportBeetleRiskTable'
import ColorTable from '~/components/reports/ColorTable'
import DownloadCsvButton from '~/components/reports/DownloadCsvButton'
import { mapGetters } from 'vuex'

export default {
  name: 'BeetleRiskReport',
  components: {
    ReportBeetleRiskMaps,
    ReportBeetleRiskTable,
    ColorTable,
    DownloadCsvButton,
  },
  computed: {
    ...mapGetters({
      isPointLocation: 'place/isPointLocation',
      place: 'place/name',
    }),
  },
}
</script>
