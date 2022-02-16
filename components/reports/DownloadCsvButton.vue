<template>
  <a :href="downloadTarget" class="button is-primary">Download data as CSV</a>
</template>
<style lang="scss" scoped></style>
<script>
export default {
  name: 'DownloadCsvButton',
  computed: {
    downloadTarget() {
      return (
        process.env.apiUrl +
        '/taspr/' +
        this.$store.getters['place/urlFragment'] +
        '?format=csv'
      )
    },
  },
}
</script>
