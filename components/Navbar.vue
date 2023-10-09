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
            >About</nuxt-link
          >
        </div>
        <div class="navbar-item">
          <nuxt-link :to="{ name: 'credits' }" exact-active-class="is-active"
            >Credits</nuxt-link
          >
        </div>
        <div class="navbar-item">
          <nuxt-link :to="{ name: 'data' }" exact-active-class="is-active"
            >Data</nuxt-link
          >
        </div>
        <div class="navbar-item">
          <nuxt-link :to="{ name: 'places' }" exact-active-class="is-active"
            >Places</nuxt-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  // Note: some of these styles are interdependent with
  // styles defined in the `layouts/default` component,
  // which wraps this and the Header component.
  position: absolute;
  top: 0;
  width: calc(100% - (1.75rem * 2));
  padding: 0;
  margin: 0 0 20px 0;
  background: transparent;
  height: 2rem;

  .navbar-burger {
    color: white;
  }
  @media screen and (max-width: 1024px) {
    .navbar-menu {
      float: right;
      border: 2px solid rgb(247, 174, 5);
      width: 20%;
      background-color: #6d31f5;
      color: white;
      min-width: 7rem;
    }
  }

  .navbar-item {
    a {
      color: white;
      &.is-active {
        font-weight: bold;
        text-decoration: underline rgba(255, 255, 255, 0.5) 5px;
      }
    }
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
