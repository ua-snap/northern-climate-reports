<template>
  <client-only>
    <PrintReport />
  </client-only>
</template>

<script>
import PrintReport from '~/components/print/PrintReport'

export default {
  name: 'PrintPage',
  layout: 'print',
  components: {
    PrintReport,
  },
}
</script>
