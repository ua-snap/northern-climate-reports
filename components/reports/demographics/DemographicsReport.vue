<template>
  <div>
    <div>
      <h3 class="title is-3">Demographics</h3>
      <div class="block content is-size-5">
        
      </div>

      
      <DownloadCsvButton
        text="Download demographics data as CSV"
        endpoint="demographics"
        class="mt-3 mb-5"
      />

      
      <BackToTopButton />
      
    </div>
  </div>
</template>
<style></style>
<script>
import BackToTopButton from '~/components/reports/BackToTopButton'
import DownloadCsvButton from '~/components/reports/DownloadCsvButton'

export default {
  components: {
    BackToTopButton,
    DownloadCsvButton,
  }
}
</script>
