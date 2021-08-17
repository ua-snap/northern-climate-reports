<template>
  <div>
    <HeaderBanner />

    <div class="splash-title columns">
      <div class="splash-title-text column is-half">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-menu">
            <div class="navbar-start">
              <div class="navbar-item">
                <nuxt-link
                  :to="{ name: 'about' }"
                  exact-active-class="is-active"
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
        <h1>Climate<br />Impact<br />Reviews</h1>
        <h2>for Changing<br />Northern Ecosystems</h2>
      </div>
      <div class="splash-title-image column is-half"></div>
    </div>

    <nuxt />

    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.splash-title {
  height: 75vh;
  margin-top: 0;
  font-family: 'Paytone One';
  text-align: center;
  color: #000;
  
  // For the navbar here, we undo some of Bulma's defaults (flexbox layout)
  nav {
    font-family: 'Open Sans';
    font-weight: 600;
    .navbar-menu {
       display: block;
      .navbar-start {
        text-align: center;
        display: block;
        .navbar-item {
          display: inline;
          a {
            font-size: 1.5rem;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .splash-title-text {
    h1 {
      margin-top: 5rem;
      font-size: 5.5rem;
      line-height: 1;
    }
    h2 {
      margin-top: 1.25rem;
      text-transform: uppercase;
      font-size: 1.6rem;
      letter-spacing: 0.35rem;
      line-height: 1.8;
    }
  }
  .splash-title-image {
    background-image: url('~/assets/images/river-mts-bw.png');
    background-size: cover;
  }
}
</style>

<script>
import HeaderBanner from '~/components/HeaderBanner'
import Footer from '~/components/Footer'
export default {
  components: { Footer, HeaderBanner },
}
</script>
