<template>
  <div>
    <HeaderBanner />

    <div class="header--wrapper">
      <Header />
    </div>

    <nuxt />

    <Footer />
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
}
</style>

<script>
import HeaderBanner from '~/components/HeaderBanner'
import Footer from '~/components/Footer'
import Navbar from '~/components/Navbar'
import Header from '~/components/Header'
export default {
  components: { Footer, HeaderBanner, Navbar, Header },
}
</script>
