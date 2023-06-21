<template>
  <div class="header--text--wrapper">
    <h1 class="">
      Northern
      <span><img src="~/assets/images/lights.svg" />Climate</span> Reports
    </h1>
    <h2 class="">
      Ecological futures <span>in</span> stories, charts, <span>and</span> data
    </h2>
  </div>
</template>

<style lang="scss" scoped>
.header--wrapper {
  position: relative;
  padding: 1rem 1.75rem;

  height: 14rem;

  background-image: url('~/assets/images/topo2.svg');
  background-size: cover;

  font-family: 'Lexend Peta', sans-serif;
  color: white;
  display: flex;
  text-transform: uppercase;

  .header--text--wrapper {
    align-self: flex-end;
    bottom: 0px;
    font-weight: 800;
    h1 {
      font-size: 3.2vw;
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
      font-size: 1.6vw;
      margin-top: -0.6rem;

      span {
        text-transform: lowercase;
      }
    }
  }
}
</style>

<script>
export default {}
</script>
