<template>
  <div class="headerbanner">
    <span class="uaf">University of Alaska Fairbanks</span><br /><span
      class="spacer"
      >&nbsp;&nbsp;|&nbsp;&nbsp;</span
    >Alaska Climate Adaptation Science Center
  </div>
</template>

<script>
export default {
  name: 'HeaderBanner',
}
</script>

<style lang="scss" scoped>
.headerbanner {
  position: relative; // Needed so z-index is honored
  z-index: 500; // stack over any other elements in headerbar

  padding: 1rem;

  background-color: white;

  color: #333;
  font-size: 0.8rem;
  text-align: center;
  letter-spacing: 0.3ex;
  line-height: 1;
  font-weight: 700;
  text-transform: uppercase;
}

@media screen and (max-width: 860px) {
  .uaf {
    display: inline-block;
    margin-bottom: 0.75rem;
  }
  .spacer {
    display: none;
  }
}
@media screen and (min-width: 861px) {
  br {
    display: none;
  }
}
</style>
