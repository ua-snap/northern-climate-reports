<template>
  <div class="headerbanner">
    <span class="uaf">University of Alaska Fairbanks</span><br /><span class="spacer"
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
  font-size: 1rem;
  text-align: center;
  letter-spacing: 0.5ex;
  text-transform: uppercase;
  padding: 0.5rem;
  color: white;
  background-color: rgb(54, 79, 119);
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
