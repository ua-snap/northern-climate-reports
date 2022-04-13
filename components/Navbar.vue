<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <nuxt-link :to="{ name: 'index' }" exact-active-class="is-active"> Home </nuxt-link>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <nuxt-link :to="{ name: 'about' }" exact-active-class="is-active"
            >What are climate projections?</nuxt-link
          >
        </div>
        <div class="navbar-item">
          <nuxt-link :to="{ name: 'data' }" exact-active-class="is-active"
            >What data and places are shown here?</nuxt-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {

  background-color: #fafafa;
  padding-right: 1rem;
  padding-left: 1rem;
  
  .navbar-item a.is-active {
    font-weight: bold;
  }
}
</style>

<script>
export default {
  name: 'Navbar',
}
</script>
