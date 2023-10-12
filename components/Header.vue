<template>
  <div class="header--text--wrapper">
    <NuxtLink to="/">
      <h1>
        Northern
        <span><img src="~/assets/images/lights.svg" />Climate</span>
        Reports
      </h1>
      <h2>
        Ecological futures <span>in</span> stories, charts,
        <span>and</span> data
      </h2>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.header--text--wrapper {
  // Note: some of these styles are interdependent with
  // styles defined in the `layouts/default` component,
  // which wraps this and the Header component.
  align-self: flex-end;
  position: relative;
  top: -3rem;
  font-weight: 800;
  max-height: 12rem;
  a {
    color: white !important;
    &:hover {
      text-decoration: none !important;
    }
  }
  h1 {
    font-size: 2.8rem;
    position: relative;
    left: -3px;

    span {
      color: #f7ae06;
      display: inline-block;

      img {
        position: relative;
        top: 30px;
      }
    }
  }

  h2 {
    font-size: 1.4rem;
    margin-top: -0.7rem;
    span {
      text-transform: lowercase;
    }
  }
}

@media screen and (max-width: 1035px) {
  .header--text--wrapper {
    top: 1.75rem;
    padding-bottom: 1.5rem;
    h1 {
      font-size: 1.5rem;
      span img {
        display: none;
      }
    }
    h2 {
      font-size: 1rem;
      margin-top: 0;
    }
  }
}

@media screen and (max-width: 696px) {
  h2 {
    display: none;
  }
}

@media screen and (max-width: 587px) {
  .header--text--wrapper {
    h1 {
      line-height: 1.1;
      font-size: 1.2rem;
    }
  }
}

@media screen and (max-width: 470px) {
  .header--text--wrapper {
    h1 {
      line-height: 1.1;
      font-size: 0.9rem;
    }
  }
}
</style>

<script>
export default {}
</script>
