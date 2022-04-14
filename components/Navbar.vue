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
  margin-top: 3px;
  background-color: rgb(28, 28, 28);
  padding-right: 1rem;
  padding-left: 1rem;
  
  .navbar-item a {
    color: white;
    &.is-active {
      font-weight: bold;
      text-decoration: underline rgb(54, 79, 119) 5px;
      
    }
  }
}
</style>

<script>
export default {
  name: 'Navbar',
}
</script>
