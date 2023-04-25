<template>
  <section class="section">
    <div class="content-wrapper">
      <BetaFeedback />
      <h2 id="main-title" class="title is-2">
        What data and places are shown here?
      </h2>
      <div class="content is-size-5">
        <ul class="toc">
          <li>
            <nuxt-link :to="{ hash: 'data-overview' }"
              >Data used in this tool</nuxt-link
            >
          </li>
          <li>
            <nuxt-link :to="{ hash: 'places' }"
              >Places available to search</nuxt-link
            >
          </li>
          <li>
            <nuxt-link :to="{ hash: 'access-api' }"
              >Access the data via an API</nuxt-link
            >
          </li>
        </ul>
        <h2 id="data-overview" class="title is-3">
          About the data available in this tool
        </h2>
        <p>
          Data used in this tool includes inputs and outputs from the
          <a
            href="https://uaf-snap.org/project/iem-an-integrated-ecosystem-model-for-alaska-and-northwest-canada/"
            >Integrated Ecosystem Management</a
          >
          (IEM) project, which originally sought to couple several models: the
          Terrestrial Ecosystem Model (TEM), the Geophysical Institute
          Permafrost Lab (GIPL) model, and ALFRESCO, a stochastic wildfire and
          landscape model.
        </p>
        <p>
          Data available through this tool are subject to the
          <a href="https://creativecommons.org/licenses/by/4.0/"
            >Creative Commons Attribution 4.0</a
          >
          license.
        </p>
        <h2 id="datasets" class="title is-3">
          What datasets are shown in this tool?
        </h2>
        <h3 class="title is-4">Temperature &amp; Precipitation</h3>
        <ul>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/historical-monthly-and-derived-temperature-products-downscaled-from-cru-ts-data-via-the-delta-m"
              >Historical Monthly and Derived Temperature Products &ndash; 2km
              CRU TS 4.0</a
            >
          </li>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/historical-monthly-and-derived-precipitation-products-downscaled-from-cru-ts-data-via-the-delta"
              >Historical Monthly and Derived Precipitation Products &ndash; 2km
              CRU TS 4.0</a
            >
          </li>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/projected-monthly-and-derived-temperature-products-2km-cmip5-ar5"
              >Projected Monthly and Derived Temperature Products &ndash; 2km
              CMIP5/AR5</a
            >
          </li>
          <li>
            <a
              href="http://ckan.snap.uaf.edu/dataset/projected-monthly-and-derived-precipitation-products-2km-cmip5-ar5"
              >Projected Monthly and Derived Precipitation Products &ndash; 2km
              CMIP5/AR5</a
            >
          </li>
        </ul>
        <h3 class="title is-4">Permafrost</h3>
        <ul>
          <li>
            <a href="https://doi.org/10.1073/pnas.1611056113"
              >Geophysical Institute Permafrost Lab (GIPL) Model 2.0, Melvin et
              al. (2017)</a
            >
          </li>
        </ul>
        <h3 class="title is-4">Wildfire</h3>
        <ul>
          <li>
            <strong>Flammability</strong>. A summarized data product using the
            same underlying data shown in this app is available here:
            <a
              href="http://ckan.snap.uaf.edu/dataset/alfresco-model-outputs-relative-flammability"
              >ALFRESCO Model outputs &ndash; Relative Flammability</a
            >.
          </li>
          <li>
            <strong>Vegetation</strong>. A summarized data product using the
            same underlying data shown in this app is available here:
            <a
              href="http://ckan.snap.uaf.edu/dataset/alfresco-model-outputs-relative-vegetation-change"
              >ALFRESCO Model outputs &ndash; Relative Vegetation Change</a
            >.
          </li>
        </ul>
        <h3 class="title is-4">Elevation</h3>
        <p>
          Elevation data is derived from the
          <a href="https://lpdaac.usgs.gov/products/astgtmv003/">ASTER GDEM</a>
          30&ndash;meter digital elevation product. Elevation data for points is
          averaged across a 1km square, and elevation for areas is averaged
          across the entire area.
        </p>
        <h3 class="subtitle is-4">Notes</h3>
        <p>
          This tool doesn&rsquo;t offer the full range of data produced for the
          IEM project. If you are looking for models or scenarios not present on
          this site, you can download source data.
        </p>
        <p>
          Note that the precision of the data shown in this tool depends on the
          grid resolution (pixel size) of the underlying dataset. Temperature
          and precipitation products are at 2km resolution, the GIPL outputs are
          4km and ALFRESCO outputs are at 1km resolution.
        </p>

        <h2 id="places" class="title is-3">
          What places are available in this tool?
        </h2>
        <p>
          The highlighted area on the map shows the full domain of the IEM
          research project. Within this area, this tool has a variety of places
          which can be chosen for reports:
        </p>
        <ul>
          <li><strong>communities</strong>,</li>
          <li>
            <strong>watersheds/hydrological units</strong> at the HU&ndash;8
            level (subbasin), searchable by name or HUC code (&ldquo;Middle
            Copper River&rdquo; or &ldquo;HUC 19020102&rdquo;, for example),
          </li>
          <li>
            <strong>protected areas</strong> such as National Parks, National
            Forests, Wilderness Areas, National Wildlife Refuges, State Parks
            and more, searchable by name and agency (NPS, USFS, etc),
          </li>
          <li>
            <strong
              ><a
                href="https://dhss.alaska.gov/ocs/Documents/icwa/AKNativeRegionalCorps.pdf"
                >Alaska Native Corporation geographic boundaries</a
              ></strong
            >
          </li>
          <li><strong>Alaska Fire Management Units</strong></li>
          <li><strong>Alaska Boroughs</strong></li>
          <li><strong>Alaska Census Areas</strong></li>
          <li>
            <strong
              ><a href="https://www.uaf.edu/anla/collections/map/"
                >Ethnolinguistic regions</a
              ></strong
            >
            of Alaska
          </li>
          <li>
            <strong
              ><a href="https://sites.google.com/a/alaska.edu/climatedivisions/"
                >Alaska Climate Divisions</a
              ></strong
            >
          </li>
          <li>
            <strong>First Nation Traditional Territories of the Yukon</strong>
          </li>
          <li>
            <strong>Alaska Game Management Units (GMUs)</strong>, e.g. GMU19a,
            etc.
          </li>
        </ul>
        <h2 id="access-api" class="title is-3">Data API access</h2>
        <p>
          All the data used in this web tool may be accessed directly via an
          API. Documentation, examples, and links to source datasets are
          provided on the API site.
        </p>
        <p>
          <a class="button is-link" href="https://earthmaps.io"
            >Visit the Data API</a
          >
        </p>
        <h2 class="title is-3">Contact us</h2>
        <p>
          Email us at
          <a href="mailto:uaf-snap-data-tools@alaska.edu"
            >uaf&ndash;snap&ndash;data&ndash;tools@alaska.edu</a
          >
          with questions about these data, data access, or using these data in
          your work.
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
