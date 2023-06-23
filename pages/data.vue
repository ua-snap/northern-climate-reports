<template>
  <section class="section">
    <div class="content-wrapper">
      <h1 class="title is-2">Data used in Northern Climate Reports</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Resolution</th>
            <th scope="col">Source</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th scope="row">Elevation</th>
            <td>30m</td>
            <td>
              Derived from the ASTER GDEM 30–meter digital elevation product.
              Point data are averaged across a 1km square. Area data are
              averaged across the entire area.
            </td>
          </tr>
          <tr>
            <th scope="row">Precipitation (monthly and derived)</th>
            <td>2km</td>
            <td>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/9eeef879-42ee-4bbe-a54e-435716ad0c90"
                >Historical - 2km CRU TS 4.0</a
              ><br /><a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/f44595c8-5384-4c02-9ab4-f7a9c43e92eb"
                >Projected - 2km CMIP5/AR5</a
              >
            </td>
          </tr>
          <tr>
            <th scope="row">Permafrost</th>
            <td>1km</td>
            <td>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/c24a957b-8a56-40bf-bc09-43a567182d36"
                >GIPL Model 2.0</a
              >, from the
              <a href="https://permafrost.gi.alaska.edu"
                >Geophysical Institute Permafrost Laboratory</a
              >
              at the University of Alaska Fairbanks
            </td>
          </tr>
          <tr>
            <th scope="row">Temperature (monthly and derived)</th>
            <td>2km</td>
            <td>
              <a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/3b2b24ff-4916-4d92-95b7-c6b2fcefd381"
                >Historical - 2km CRU TS 4.0</a
              >
              <br /><a
                href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/ba834996-ad15-4785-9b43-ef2af86a5ad9"
                >Projected - 2km CMIP5/AR5</a
              >
            </td>
          </tr>
          <tr>
            <th scope="row">Wildfire (flammability)</th>
            <td>1km</td>
            <td>
              See a summarized data product from the ALFRESCO model that&rsquo;s
              based on the same data used here.
            </td>
          </tr>
          <tr>
            <th scope="row">Wildfire (vegetation change)</th>
            <td>1km</td>
            <td>
              See a summarized data product from the ALFRESCO model that&rsquo;s
              based on the same data used here.
            </td>
          </tr>
        </thead>
      </table>
      <h2 class="title is-3 mt-6">License</h2>
      <div class="content is-size-5">
        Unless otherwise specified by source providers, all data available
        through this tool is available through the
        <a href="https://creativecommons.org/licenses/by/4.0/"
          >Creative Commons Attribution 4.0 International (CC by 4.0)</a
        >.
      </div>
      <h2 class="title is-3 mt-6">Data API access</h2>
      <div class="content is-size-5">
        <p>
          All the data used in this web tool may be accessed directly via an
          API. Documentation, examples, and links to source datasets are
          provided on the API site.
        </p>
        <p>
          <a href="https://earthmaps.io">Visit the Data API</a>
        </p>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
p:last-of-type {
  margin-bottom: 2.5rem;
}
#main-title {
  margin-top: 1rem;
}
</style>

<script>
export default {
  name: 'DataPlacesPage',
  layout: 'default',
  mounted() {
    var section = this.$router.currentRoute.hash.replace('#', '')
    if (section && window.document.getElementById(section))
      this.$nextTick(() =>
        window.document.getElementById(section).scrollIntoView()
      )
  },
}
</script>
