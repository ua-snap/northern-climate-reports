<template>
	<div>
	
      <Map></Map>
      <Report></Report>
    
	</div>
</template>
<style></style>
<script>
import Map from '~/components/Map'
import Report from '~/components/Report'

export default {
  name: 'App',
  components: {
    Map,
    Report,
  },
}
</script>
