<template>
  <footer class="footer">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="content is-size-5">
          <img src="~/assets/images/UAFLogo_A_black_horiz.svg" alt="UAF Logo" />

          <p>
            Developed by the
            <a href="https://www.snap.uaf.edu/" title="🥦🥦🥦"
              >Scenarios Network for Alaska + Arctic Planning</a
            >
            at the
            <a href="https://uaf-iarc.org"
              >International Arctic Research Center</a
            >.
          </p>

          <p>
            Funding was provided by the
            <a href="https://akcasc.org"
              >Alaska Climate Adaptation Science Center</a
            >
            and the
            <a
              href="https://www.usgs.gov/programs/climate-adaptation-science-centers"
              >United States Geological Survey</a
            >.
          </p>

          <p>
            Portions of this tool were developed in collaboration with the
            University of Alaska Anchorage
            <a
              href="https://www.uaa.alaska.edu/academics/college-of-health/departments/population-health-sciences/institute-for-circumpolar-health-studies"
              >Institute for Circumpolar Health Studies</a
            >, and the University of Washington
            <a href="https://cdrc.uw.edu"
              >Center for Disaster Resilient Communities</a
            >. Development was partially funded by
            <a
              href="https://cfpub.epa.gov/ncer_abstracts/index.cfm/fuseaction/display.abstractDetail/abstract_id/11349"
              >EPA Grant Number R840479</a
            >.
          </p>
          <p>
            <strong
              >Please contact
              <a href="mailto:uaf-snap-data-tools@alaska.edu"
                >uaf-snap-data-tools@alaska.edu</a
              >
              with questions or comments.</strong
            >
            <a href="https://uaf-snap.org">Visit the SNAP website</a>
            to see all of our climate tools.
          </p>
          <p>
            Usage of data provided through this tool is subject to license
            constraints. See the <nuxt-link to="/data">data page</nuxt-link> for
            details.
          </p>
          <p>
            UA is committed to providing accessible websites.
            <a href="https://www.alaska.edu/webaccessibility/"
              >Learn more about UA's notice of web accessibility.</a
            >
            If we can help you access this website’s content,
            <a href="mailto:uaf-snap-data-tools@alaska.edu"
              >please email us at uaf-snap-data-tools@alaska.edu</a
            >.
          </p>
          <p>
            Copyright &copy; {{ year }} University of Alaska Fairbanks. All
            rights reserved.
            <br />
            The <a href="https://www.alaska.edu/">University of Alaska</a> is an Equal
            Opportunity/Equal Access Employer and Educational Institution. The
            University is committed to a
            <a href="https://www.alaska.edu/nondiscrimination/"
              >policy of non-discrimination</a
            >
            against individuals on the basis of any legally protected status.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>

<style lang="scss" scoped>
.footer {
  background-image: url('~/assets/images/footer-image_2000.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  text-align: center;
  padding-bottom: 14rem;
  border-top: 0.8rem solid #5a4f72;
  border-bottom: 3rem solid #6e30f5;
  color: #5a4f72;

  img {
    width: 17rem;
  }
}
</style>
