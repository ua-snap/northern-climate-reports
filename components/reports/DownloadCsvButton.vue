<template>
  <a :href="downloadTarget" class="button is-info">{{ text }}</a>
</template>
<style lang="scss" scoped>
a.button.is-info {
  background-color: #f7ae05 !important;
  color: black;
}
</style>
<script>
export default {
  name: 'DownloadCsvButton',
  props: ['text', 'endpoint'],
  computed: {
    downloadTarget() {
      let endpointPath = this.endpoint
      if (_.includes(['flammability', 'veg_type'], this.endpoint)) {
        endpointPath = 'alfresco/' + endpointPath
      }
      if (_.includes(['indicators'], this.endpoint)) {
        endpointPath = endpointPath + '/base'
      }
      let url
      if (_.includes(['permafrost'], this.endpoint)) {
        let latLng = this.$store.getters['place/latLng']
        url =
          process.env.apiUrl +
          '/permafrost/point/' +
          latLng[0] +
          '/' +
          latLng[1] +
          '?format=csv'
      } else {
        url =
          process.env.apiUrl +
          '/' +
          endpointPath +
          '/' +
          this.$store.getters['place/urlFragment']() +
          '?format=csv'
      }
      if (_.includes(['flammability', 'veg_type'], this.endpoint)) {
        url = url.replace('point', 'local')
      }
      if (this.$store.getters['place/type'] == 'community') {
        let communityId = this.$store.getters['place/communityId']
        if (communityId != false) {
          url += '&community=' + communityId
        }
      }

      return url
    },
  },
}
</script>
