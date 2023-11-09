// Some properties reused in the OpenGraph tags.
var metas = {
  title: 'Northern Climate Reports',
  description:
    'Warming temperatures, thawing permafrost, and more wildfires are changing landscapes across the North. Explore these changes with easy-to-understand climate model projections.',
  preview: '/preview.png',
  url: 'https://northernclimatereports.org',
}

// NuxtJS Config object!
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Northern Climate Reports for Changing Arctic Ecosystems',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { itemprop: 'name', content: metas.title },
      { itemprop: 'description', content: metas.description },
      { itemprop: 'image', content: metas.preview },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@SNAPandACCAP' },
      { name: 'twitter:title', content: metas.title },
      { name: 'twitter:description', content: metas.description },
      { name: 'twitter:creator', content: '@SNAPandACCAP' },
      { name: 'twitter:image', content: metas.url + metas.preview },
      { property: 'og:title', content: metas.title },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: metas.url },
      { property: 'og:image', content: metas.preview },
      { property: 'og:description', content: metas.description },
      { property: 'og:site_name', content: metas.title },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // Main is the entrypoint for all SCSS in our app.
  css: ['@/assets/scss/main.scss', '@/assets/scss/minimaps.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/plotly.client',
    '~/plugins/leaflet.client.js',
    '~/plugins/vuex-router-sync',
    '~/plugins/axios',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    // We're doing a custom build, so don't include
    // the pre-generated CSS.
    ['nuxt-buefy', { css: false }],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://www.npmjs.com/package/nuxt-leaflet
    'nuxt-leaflet',
    '@nuxt/http',
    'nuxt-umami',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Env vars
  env: {
    geoserverUrl:
      process.env.GEOSERVER_URL || 'https://gs.mapventure.org/geoserver/wms',
    rasdamanUrl:
      process.env.RASDAMAN_URL || 'https://maps.earthmaps.io/rasdaman/ows',
    apiUrl: process.env.SNAP_API_URL || 'https://earthmaps.io',
    localStorageExpiration: 4,
  },

  // Router customizations
  router: {
    extendRoutes(routes, resolve) {
      // Order matters here; lat/lng needs to go last because it's "globby"
      routes.push({
        path: '/report/community/:communityId',
        component: resolve(__dirname, 'pages/index'),
      })
      routes.push({
        path: '/report/area/:areaId',
        component: resolve(__dirname, 'pages/index'),
      })
      routes.push({
        path: '/search/:lat/:lng',
        component: resolve(__dirname, 'pages/index'),
      })
      routes.push({
        path: '/report/:lat/:lng',
        component: resolve(__dirname, 'pages/index'),
      })
    },
  },

  umami: {
    scriptUrl: 'https://umami.snap.uaf.edu/script.js',
    websiteId: '2e69a077-ba5f-49c5-b076-09a44ab6fafd',
    ignoreDnt: false,
    domains: 'northernclimatereports.org',
    ignoreLocalhost: true,
  },
}
