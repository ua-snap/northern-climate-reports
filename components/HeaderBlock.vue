<template>
  <div>
    <div v-if="title" class="columns headerblock">
      <div class="column is-one-fifth">
        <img src="~assets/images/block.svg" />
        <h1 v-html="title"></h1>
      </div>
      <div class="column blurb"><h2 v-html="blurb"></h2></div>
    </div>
    <div v-else class="title-only">
      <img src="~assets/images/block.svg" class="is-pulled-left" />
      <span v-html="blurb"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-only {

  background-color: #6e2ff5;
  color: white;
  margin-top: 0.25rem;

  img {
    height: 3rem;
    margin: 1rem 0.4rem 0.2rem 2rem;
  }

  span {
    display: inline-block;
    padding: 0.6rem;
    font-size: 1.25rem;
  }
}

.headerblock {
  background-color: #6e2ff5;
  color: white;
  margin-top: 0.25rem;

  img {
    height: 3rem;
    margin: 0.2rem 0.4rem 0.2rem 2rem;
    vertical-align: middle;
  }

  h1 {
    font-family: 'Lexend Peta', sans-serif;
    display: inline-block;
    font-size: 1.5rem;
    line-height: 1;
    vertical-align: bottom;
    text-transform: uppercase;
  }

  .blurb {
    display: flex;
    align-items: flex-end;
    h2 {
      display: inline-block;
      font-size: 1.25rem;
      position: relative;
      top: 0.2rem;
    }
  }
}
</style>

<script>
export default {
  name: 'HeaderBlock',
  props: ['title', 'blurb'],
}
</script>
