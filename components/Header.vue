<template>
  <div class="header--text--wrapper">
    <h1>
      Northern
      <span><img src="~/assets/images/lights.svg" />Climate</span>
      Reports
    </h1>
    <h2>
      Ecological futures <span>in</span> stories, charts, <span>and</span> data
    </h2>
  </div>
</template>

<style lang="scss" scoped>
.header--text--wrapper {
  // Note: some of these styles are interdependent with
  // styles defined in the `layouts/default` component,
  // which wraps this and the Header component.
  align-self: flex-end;
  position: relative;
  top: -3rem;
  font-weight: 800;
  max-height: 12rem;
  h1 {
    font-size: 2.80rem;
    position: relative;
    left: -3px;

    span {
      color: #f7ae06;
      display: inline-block;

      img {
        position: relative;
        top: 30px;
      }
    }
  }

  h2 {
    font-size: 1.4rem;
    margin-top: -0.7rem;
    span {
      text-transform: lowercase;
    }
  }
}
</style>

<script>
export default {}
</script>
