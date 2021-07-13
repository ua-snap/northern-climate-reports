<template>
  <div>
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item">
              <nuxt-link :to="{ name: 'index' }" exact-active-class="is-active"
                >Home</nuxt-link
              >
            </div>            
            <div class="navbar-item">
              <nuxt-link :to="{ name: 'about' }" exact-active-class="is-active"
                >About</nuxt-link
              >
            </div>
            <div class="navbar-item">
              <nuxt-link :to="{ name: 'data' }" exact-active-class="is-active"
                >Get data</nuxt-link
              >
            </div>
          </div>
        </div>
      </nav>
    </div>
    <section class="main-content">
      <div class="container">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>
