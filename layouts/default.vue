<template>
  <div>
    <HeaderBanner />

    <div class="header--wrapper">
      <Navbar />
      <Header />
    </div>

    <div class="mb-6">
      <nuxt />
    </div>

    <Footer />
  </div>
</template>

<style lang="scss" scoped>
// Note, some styles here are interdependent with the Navbar
// and Header components.  This component needs to be `flex` so
// that one child (Header) can be aligned to the bottom of the
// container.  Check those components when making changes.
.header--wrapper {
  display: flex;
  position: relative;
  padding: 1rem 1.75rem;

  background-image: url('~/assets/images/topo4.svg');
  background-size: cover;

  font-family: 'Lexend Peta', sans-serif;
  color: white;
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
