<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <nuxt-link :to="{ name: 'index' }" exact-active-class="is-active">
          Home
        </nuxt-link>
      </div>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarMenu"
        @click="toggleBurger"
        v-bind:class="{ 'is-active': burgerActive }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div
      id="navbarMenu"
      class="navbar-menu"
      v-bind:class="{ 'is-active': burgerActive }"
    >
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

  .navbar-item {
    a {
      color: white;
      &.is-active {
        font-weight: bold;
        text-decoration: underline rgb(54, 79, 119) 5px;
      }
    }
  }
  // Menu background needs to be dark when burger is active
  .navbar-menu.is-active {
    background-color: rgb(28, 28, 28);
  }
  .navbar-burger span {
    color: #fff;
  }
}
</style>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      burgerActive: false,
    }
  },
  methods: {
    toggleBurger() {
      this.burgerActive = !this.burgerActive
    },
  },
}
</script>
