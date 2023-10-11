<template>
  <div>
    <div v-if="title" class="columns is-multiline headerblock">
      <div
        class="column is-full-touch is-full-desktop is-one-fifth-widescreen pl-5"
      >
        <img src="~assets/images/block.svg" class="pl-3" />
        <h1 v-html="title" class="pl-3"></h1>
      </div>
      <div
        class="column blurb-wrapper is-full-touch is-full-desktop is-four-fifths-widescreen pt-0"
      >
        <h2 v-html="blurb" class="blurb px-5-until-widescreen"></h2>
      </div>
    </div>
    <div v-else class="blurb-only px-5-tablet">
      <img src="~assets/images/block.svg" class="is-pulled-left" />
      <h2 v-html="blurb" class="blurb"></h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blurb-only {
  background-color: #6e2ff5;
  color: white;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;

  img {
    height: 3rem;
    margin-left: 0.4rem;
  }

  @media (max-width: 768px) {
    img {
      display: none;
    }
  }

  .blurb {
    display: inline-block;
    padding: 0.55rem;
    font-size: 1.25rem;
    padding: 0.55rem 1.8rem;
  }
}

.headerblock {
  background-color: #6e2ff5;
  color: white;
  margin-top: 0.25rem;

  img {
    height: 3rem;
    margin-top: 0.18rem;
    margin-left: 0.4rem;
    vertical-align: middle;
    margin-bottom: 0.18rem;
  }

  h1 {
    font-family: 'Lexend Peta', sans-serif;
    display: inline-block;
    font-size: 1.5rem;
    line-height: 1;
    vertical-align: bottom;
    text-transform: uppercase;
    margin-top: 0.5rem;
  }

  .blurb-wrapper {
    display: flex;
    align-items: flex-end;
    .blurb {
      display: inline-block;
      font-size: 1.25rem;
      position: relative;
      top: 0.2rem;
      @media (max-width: 1215px) {
        padding: 0 1.8rem;
      }
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
