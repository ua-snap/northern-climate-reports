<template>
  <div>
    <HeaderBanner />
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <nuxt-link :to="{ name: 'index' }">
            <div class="logo-type">
              <div class="logo-type-title">Climate Impact Reports</div>
              <div class="logo-type-subtitle">
                For Changing Northern Ecosystems
              </div>
            </div>
          </nuxt-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start"></div>
          <div class="navbar-end">
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

    <div class="container">
      <nuxt />
    </div>
    
    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped>
.logo-type {
  color: rgb(107, 112, 114);
  font-family: 'Paytone One';

  .logo-type-title {
    font-size: 2.75rem;
  }
  .logo-type-subtitle {
    text-transform: uppercase;
    font-size: 1.15rem;
    letter-spacing: 0.4ex;
    margin-top: -0.5rem;
  }
}

.navbar-end {
  .navbar-item {
    font-weight: 600;
    text-decoration: underline;
    font-size: 1.5rem;
  }
}
</style>

<script>
import Footer from '~/components/Footer'
import HeaderBanner from '~/components/HeaderBanner'
export default {
  components: { Footer, HeaderBanner },
}
</script>
