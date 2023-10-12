<template>
  <div>
    <HeaderBlock title="Data" blurb="Data sources and academic references" />
    <div class="columns mb-6 px-5-mobile">
      <div class="column is-three-fifths is-offset-one-fifth mt-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Resolution</th>
              <th scope="col">Source + academic reference</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th scope="row">Elevation</th>
              <td>30&#8239;m</td>
              <td>
                <p>
                  Derived from the
                  <a href="https://lpdaac.usgs.gov/products/astgtmv003/"
                    >ASTER GDEM 30–meter digital elevation product</a
                  >. Point data are averaged across a 1km square. Area data are
                  averaged across the entire area.
                </p>
                <blockquote>
                  NASA/METI/AIST/Japan Spacesystems and U.S./Japan ASTER Science
                  Team (2019).
                  <i>ASTER Global Digital Elevation Model V003</i> [Data set].
                  NASA EOSDIS Land Processes Distributed Active Archive Center.
                  Accessed 2023-09-08 from
                  <a href="https://doi.org/10.5067/ASTER/ASTGTM.003"
                    >https://doi.org/10.5067/ASTER/ASTGTM.003</a
                  >
                </blockquote>
              </td>
            </tr>
            <tr>
              <th scope="row">Precipitation (monthly and derived)</th>
              <td>2&#8239;km</td>
              <td>
                <p>
                  <a
                    href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/9eeef879-42ee-4bbe-a54e-435716ad0c90"
                    >Historical - 2km CRU TS 4.0</a
                  ><br /><a
                    href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/f44595c8-5384-4c02-9ab4-f7a9c43e92eb"
                    >Projected - 2km CMIP5/AR5</a
                  >
                </p>
                <blockquote>
                  Walsh J.E., Bhatt U.S., Littell J. S., Leonawicz M., Lindgren
                  M., Kurkowski T. A., Bieniek P. A., Gray S., & Rupp T. S.
                  (2018). Downscaling of climate model output for Alaskan
                  stakeholders, <i>Environmental Modelling & Software, 110</i>,
                  38&ndash;51. DOI
                  <a href="https://doi.org/10.1016/j.envsoft.2018.03.021"
                    >10.1016/j.envsoft.2018.03.021</a
                  >
                </blockquote>
              </td>
            </tr>
            <tr>
              <th scope="row">Permafrost</th>
              <td>1&#8239;km</td>
              <td>
                <p>
                  <a
                    href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/c24a957b-8a56-40bf-bc09-43a567182d36"
                    >GIPL Model 2.0</a
                  >, from the
                  <a href="https://permafrost.gi.alaska.edu"
                    >Geophysical Institute Permafrost Laboratory</a
                  >
                  at the University of Alaska Fairbanks
                </p>
                <blockquote>
                  Marchenko, S., Romanovsky, V., & Tipenko, G. (2008). Numerical
                  modeling of spatial permafrost dynamics in Alaska.
                  <i
                    >Ninth International Conference on Permafrost, Online
                    Proceedings, Volume 2</i
                  >, 1125&ndash;1130. Accessed 2023-09-08 from
                  <a href="https://www.permafrost.org/event/icop9/"
                    >https://www.permafrost.org/event/icop9/</a
                  >
                </blockquote>
              </td>
            </tr>
            <tr>
              <th scope="row">Temperature (monthly and derived)</th>
              <td>2&#8239;km</td>
              <td>
                <p>
                  <a
                    href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/3b2b24ff-4916-4d92-95b7-c6b2fcefd381"
                    >Historical - 2km CRU TS 4.0</a
                  >
                  <br /><a
                    href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/ba834996-ad15-4785-9b43-ef2af86a5ad9"
                    >Projected - 2km CMIP5/AR5</a
                  >
                </p>
                <blockquote>
                  Walsh J.E., Bhatt U.S., Littell J. S., Leonawicz M., Lindgren
                  M., Kurkowski T. A., Bieniek P. A., Gray S., & Rupp T. S.
                  (2018). Downscaling of climate model output for Alaskan
                  stakeholders, <i>Environmental Modelling & Software, 110</i>,
                  38&ndash;51. DOI
                  <a href="https://doi.org/10.1016/j.envsoft.2018.03.021"
                    >10.1016/j.envsoft.2018.03.021</a
                  >
                </blockquote>

              </td>
            </tr>
            <tr>
              <th scope="row">Wildfire (flammability)</th>
              <td>1&#8239;km</td>
              <td>
                See a summarized data product from the ALFRESCO model
                that&rsquo;s based on the same data used here.
              </td>
            </tr>
            <tr>
              <th scope="row">Wildfire (vegetation change)</th>
              <td>1&#8239;km</td>
              <td>
                See a summarized data product from the ALFRESCO model
                that&rsquo;s based on the same data used here.
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
    </div>
  </div>
</template>
<style lang="scss" scoped>
blockquote {
  margin: 0.5rem;
  padding-left: 1rem;
  border-left: 3px solid #ccc;
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
