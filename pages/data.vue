<template>
  <div>
    <HeaderBlock title="Data" blurb="Data sources and academic references" />
    <div class="columns mb-6 px-5-mobile">
      <div class="column is-three-fifths is-offset-one-fifth mt-6">
        <div class="content is-size-5">
          <p>
            Use this page to access the datasets that are presented via this
            tool, including metadata and academic papers about these datasets.
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content is-size-6">
        <div class="mt-6">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Resolution</th>
                <th scope="col">Source + academic reference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Demographics and Health</th>
                <td>
                  Borough/census tract(s), census-designated place (CDP),
                  incorporated place
                </td>
                <td>
                  <p>
                    Derived from the 2020 U.S. Census Demographics and Housing
                    Characteristics File (DHC), the 2019-2023 U.S. Census
                    American Community Survey (ACS) 5-year dataset, the 2024 CDC
                    PLACES dataset, and the 2017-2021 CDC Non-Medical Factor
                    Measures dataset.
                  </p>
                  <p>Citations:</p>
                  <ul>
                    <li>
                      U.S. Census Bureau (2020). Demographics and Housing
                      Characteristics File. Accessed November 2024, from
                      <a
                        href="https://www.census.gov/data/tables/2023/dec/2020-census-dhc.html"
                        >https://www.census.gov/data/tables/2023/dec/2020-census-dhc.html</a
                      >
                    </li>
                    <li>
                      U.S. Census Bureau (2023). 2019-2023 American Community
                      Survey 5-year estimates. Accessed March 2025, from
                      <a
                        href="https://www.census.gov/programs-surveys/acs/data.html"
                        >https://www.census.gov/programs-surveys/acs/data.html</a
                      >
                    </li>
                    <li>
                      PLACES. Centers for Disease Control and Prevention.
                      Accessed November 2024, from
                      <a href="https://www.cdc.gov/places"
                        >https://www.cdc.gov/places</a
                      >
                    </li>
                    <li>
                      2017-2021 CDC Non-Medical Factor Measures. Healthy People
                      2030, U.S. Department of Health and Human Services, Office
                      of Disease Prevention and Health Promotion. Accessed
                      February 2025, from
                      <a
                        href="https://health.gov/healthypeople/objectives-and-data/social-determinants-health"
                      >
                        https://health.gov/healthypeople/objectives-and-data/social-determinants-health</a
                      >
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th scope="row">Elevation</th>
                <td>30&#8239;m</td>
                <td>
                  <p>
                    Derived from the
                    <a href="https://lpdaac.usgs.gov/products/astgtmv003/"
                      >ASTER GDEM 30–meter digital elevation product</a
                    >. Point data are averaged across a 1km square. Area data
                    are averaged across the entire area.
                  </p>
                  <blockquote>
                    NASA/METI/AIST/Japan Spacesystems and U.S./Japan ASTER
                    Science Team (2019).
                    <i>ASTER Global Digital Elevation Model V003</i> [Data set].
                    NASA EOSDIS Land Processes Distributed Active Archive
                    Center. Accessed 2023-09-08 from
                    <a href="https://doi.org/10.5067/ASTER/ASTGTM.003"
                      >https://doi.org/10.5067/ASTER/ASTGTM.003</a
                    >
                  </blockquote>
                </td>
              </tr>
              <tr>
                <th scope="row">Hydrology</th>
                <td>12&#8239;km</td>
                <td>
                  <p>
                    <a
                      href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/2610188c-aa38-4f47-8987-b36ec72cdd0d"
                      >Alaska VIC Hydrologic Model Output (1950-2099): Decadal
                      Averages of Monthly Summaries</a
                    >
                  </p>
                  <blockquote>
                    <a href="https://doi.org/10.5065/c3kn-2y77"
                      >21st Century Hydrologic Projections for Alaska and
                      Hawai&lsquo;i</a
                    >, Mizukami, N., Newman, A. J., Wood, A. W., Gutmann, E. D.,
                    and Hamman, J. J. (2022). Boulder, CO: UCAR/NCAR/RAL.
                    <a href="https://doi.org/10.5065/c3kn-2y77"
                      >https://doi.org/10.5065/c3kn-2y77</a
                    >
                  </blockquote>
                  <blockquote>
                    Mizukami, N., Newman, A. J., Littell, J. S., Giambelluca, T.
                    W., Wood, A. W., Gutmann, E. D., Hamman, J. J., Gergel, D.
                    R., Nijsenn, B., Clark, M. P., and Arnold, J. R. (2022). New
                    projections of 21st century climate and hydrology for Alaska
                    and Hawaiʻi. <i>Climate Services, 27</i>, 100312.
                    <a href="https://doi.org/10.1016/j.cliser.2022.100312"
                      >https://doi.org/10.1016/j.cliser.2022.100312</a
                    >
                  </blockquote>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  Indicators (temperature &amp; precipitation)
                </th>
                <td>12&#8239;km</td>
                <td>
                  <p>
                    <a
                      href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/1c1de476-cc9d-4c7b-b8ab-25e8f68a317e"
                      >Historical and projected climate indicators for Alaska at
                      12km</a
                    >
                  </p>
                  <p>Indicators were derived from this data product:</p>
                  <blockquote>
                    Mizukami, N., Newman, A. J., Wood, A. W., Gutmann, E. D.,
                    and Hamman, J. J. (2022). Boulder, CO: UCAR/NCAR/RAL.
                    <a href="https://doi.org/10.5065/c3kn-2y77"
                      >https://doi.org/10.5065/c3kn-2y77</a
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
                    Walsh J.E., Bhatt U.S., Littell J. S., Leonawicz M.,
                    Lindgren M., Kurkowski T. A., Bieniek P. A., Gray S., & Rupp
                    T. S. (2018). Downscaling of climate model output for
                    Alaskan stakeholders,
                    <i>Environmental Modelling & Software, 110</i>, 38&ndash;51.
                    DOI
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
                    Marchenko, S., Romanovsky, V., & Tipenko, G. (2008).
                    Numerical modeling of spatial permafrost dynamics in Alaska.
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
                <th scope="row">Spruce Beetle Risk</th>
                <td>12&#8239;km</td>
                <td>
                  <p>
                    <a
                      href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/090daa3e-b1f1-4dc5-81f2-b7817bd011ee"
                      >Historical and projected climatic protection of spruce
                      beetle infestation in Alaska</a
                    >
                  </p>
                  <blockquote>
                    Fresco, N., Littell, J., Redilla, K., Moan, J., & Brannoch,
                    S. (in prep). Modeling the loss of climate protection from
                    spruce beetles (<i>Dendroctonus rufipennis</i>) under
                    changing conditions in Alaska’s forests. [submission
                    anticipated November 2023]
                  </blockquote>
                  <p>Underlying climataloglical data provided by:</p>
                  <blockquote>
                    Mizukami, N., Newman, A. J., Wood, A. W., Gutmann, E. D.,
                    and Hamman, J. J. (2022). Boulder, CO: UCAR/NCAR/RAL.
                    <a href="https://doi.org/10.5065/c3kn-2y77"
                      >https://doi.org/10.5065/c3kn-2y77</a
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
                    Walsh J.E., Bhatt U.S., Littell J. S., Leonawicz M.,
                    Lindgren M., Kurkowski T. A., Bieniek P. A., Gray S., & Rupp
                    T. S. (2018). Downscaling of climate model output for
                    Alaskan stakeholders,
                    <i>Environmental Modelling & Software, 110</i>, 38&ndash;51.
                    DOI
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
                  <p>
                    <a
                      href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/eeaaca2c-0280-4226-b126-fda42a2b6214"
                    >
                      ALFRESCO Model Outputs - Relative Flammability</a
                    >
                  </p>

                  <blockquote>
                    Johnstone, J. F., Rupp, T. S., Olson, M. & Verbyla, D.
                    (2011). Modeling impacts of fire severity on successional
                    trajectories and future fire behavior in Alaskan boreal
                    forests.
                    <i>Landscape Ecology, 26</i>, 487&ndash;500.
                    <a href="https://doi.org/10.1007/s10980-011-9574-6"
                      >https://doi.org/10.1007/s10980-011-9574-6</a
                    >
                  </blockquote>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  Wildfire (vegetation type mode and percentage)
                </th>
                <td>1&#8239;km</td>
                <td>
                  <p>
                    <a
                      href="https://catalog.snap.uaf.edu/geonetwork/srv/eng/catalog.search#/metadata/a077b382-c7e5-44a7-8b2a-1cf764c448f6"
                    >
                      ALFRESCO Model Outputs - Vegetation Type</a
                    >
                  </p>
                  <blockquote>
                    Johnstone, J. F., Rupp, T. S., Olson, M. & Verbyla, D.
                    (2011). Modeling impacts of fire severity on successional
                    trajectories and future fire behavior in Alaskan boreal
                    forests.
                    <i>Landscape Ecology, 26</i>, 487&ndash;500.
                    <a href="https://doi.org/10.1007/s10980-011-9574-6"
                      >https://doi.org/10.1007/s10980-011-9574-6</a
                    >
                  </blockquote>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="columns mb-6 px-5-mobile">
        <div class="column is-three-fifths is-offset-one-fifth mt-5">
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
  </div>
</template>
<style lang="scss" scoped></style>

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
