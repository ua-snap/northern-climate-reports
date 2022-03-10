<template>
  <a :href="downloadTarget" class="button is-primary">{{ text }}</a>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  name: 'DownloadCsvButton',
  props: ['text', 'endpoint'],
  computed: {
    downloadTarget() {
      let endpointPath = this.endpoint
      if (this.endpoint == 'flammability' || this.endpoint == 'veg_change') {
        endpointPath = 'alfresco/' + endpointPath
      }

      let url =
        process.env.apiUrl +
        '/' +
        endpointPath +
        '/' +
        this.$store.getters['place/urlFragment'] +
        '?format=csv'

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
