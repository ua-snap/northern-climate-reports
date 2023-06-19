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
          climate&ndash;related protection from spruce bark beetle (<i
            >Dendroctonus rufipennis</i
          >) outbreaks in &ldquo;forested regions of Alaska&rdquo; as defined by
          the US Forest Service.
        </p>
        <p>
          <a href="https://uaf-snap.org/wp-content/uploads/2023/06/20230508_spruce-beetle-climate-model-white-paper.pdf">Read a whitepaper about this model</a>, or
          <a
            href="https://uaf-snap.org/project/modeling-spruce-bark-beetle-outbreaks-in-a-warming-climate/"
            >additional information about the project</a
          >.
        </p>
      </div>
    </div>
    <ReportBeetleRiskTable snowpack="low" />
    <ReportBeetleRiskTable snowpack="medium" />
    <ReportBeetleRiskMaps />

    <div class="content">
      <DownloadCsvButton
        text="Download beetle risk data as CSV"
        endpoint="beetles"
        class="mt-3 mb-5"
      />
      <h4 class="title is-4">What&rsquo;s in the model</h4>
      <div class="is-size-5">
        <p>
          This model incorporates three climate&ndash;based factors, which are
          combined to calculate an overall outbreak risk for a given location
          and year:
        </p>
        <ol>
          <li>
            Beetles&rsquo; rate of maturation in response to increasing summer
            heat
          </li>
          <li>
            Fall beetle survival in autumn based on rate of seasonal cooling
          </li>
          <li>
            Survival of winter extreme cold, with or without insulating snow
          </li>
        </ol>
        <p>
          Modeled climate protection levels are based on conditions during more
          than half the years in a given time period:
        </p>
        <ul>
          <li>
            <strong>high protection</strong> &equals; climate conditions are
            likely to protect forests and prevent major outbreaks even if other
            risk factors exist
          </li>
          <li>
            <strong>minimal protection</strong> &equals; climate conditions may
            provide some protection, but other risk factors can make outbreaks
            likely
          </li>
          <li>
            <strong>no protection</strong> &equals; climate is unlikely to limit beetle populations
          </li>
        </ul>
      </div>
      <h4 class="title is-4 mt-6">What&rsquo;s not in the model</h4>
      <div class="is-size-5">
        <p>
          This model does not include non-climate-related factors that may
          affect outbreaks:
        </p>
        <ul>
          <li>
            Presence and percentage cover of the Alaska tree species most at
            risk of beetle infestation&mdash;white spruce, Sitka spruce, and
            Lutz spruce
          </li>
          <li>Forest age and successional stage</li>
          <li>Forest health, including other stressors, pests, or blights</li>
          <li>
            Forest management, including fire management, harvest, and pest
            control
          </li>
          <li>
            Past and ongoing beetle outbreaks, including potential spread from
            nearby regions
          </li>
        </ul>
      </div>
    </div>
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
