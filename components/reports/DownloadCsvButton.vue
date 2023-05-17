<template>
  <a :href="downloadTarget" class="button is-info">{{ text }}</a>
</template>
<style lang="scss" scoped></style>
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
      let url
      if (_.includes(['permafrost'], this.endpoint)) {
        let latLng = this.$store.getters['place/latLng']
        url =
          process.env.apiUrl +
          '/' +
          'permafrost/point/gipl/' +
          latLng[0] +
          '/' +
          latLng[1] +
          'format=csv'
      } else {
        url =
          process.env.apiUrl +
          '/' +
          endpointPath +
          '/' +
          this.$store.getters['place/urlFragment']() +
          '?format=csv'
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
