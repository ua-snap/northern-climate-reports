<template>
  <div>
    <HeaderBanner />
    <Navbar />

    <div class="container">
      <nuxt />
    </div>

    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import Footer from '~/components/Footer'
import HeaderBanner from '~/components/HeaderBanner'
import Navbar from '~/components/Navbar'
export default {
  components: { Footer, HeaderBanner, Navbar },
}
</script>
