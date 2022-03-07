export default function ({ $axios, redirect }) {
  $axios.defaults.timeout = 30000
}
