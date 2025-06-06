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
  props: ['text', 'endpoint', 'staticUrl'],
  computed: {
    downloadTarget() {
      if (this.staticUrl) {
        return this.staticUrl
      }
      let endpointPath = this.endpoint

      // Two kinds of places could have valid demographics:
      // communities and boroughs.  Grab whichever is defined.
      // This code will only run if demographics are available,
      // So we can assume that one or the other is valid.
      if (this.endpoint == 'demographics') {
        let placeId = this.$store.getters['place/communityId']
        if(!placeId) {
          placeId = this.$store.getters['place/areaId']
        }
        url =
          process.env.apiUrl +
          '/demographics/' +
          placeId +
          '?format=csv'
        return url
      }
      
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
