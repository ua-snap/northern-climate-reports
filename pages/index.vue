<template>
  <div>
    <div class="container">
      <section class="section">
        <div class="intro-text content is-size-5">
          <p>
            <strong>Monocle ipsum dolor sit amet</strong> perfect artisanal
            Beams sophisticated first-class boutique Porter Muji. Classic
            boulevard bulletin pintxos. Discerning smart Helsinki, Muji Swiss
            iconic Scandinavian impeccable signature premium. Zürich pintxos
            bureaux essential St Moritz efficient. Delightful Baggu hand-crafted
            essential flat white Airbus A380, exquisite Toto.
          </p>
          <p>
            Exclusive boutique remarkable Nordic, cosy liveable Muji bureaux
            Swiss. K-pop conversation perfect flat white liveable sleepy,
            sophisticated global joy emerging impeccable tote bag bulletin
            Boeing 787 first-class. Hand-crafted flat white Baggu Swiss premium
            alluring Asia-Pacific delightful exquisite espresso smart Ettinger
            Sunspel the highest quality.
          </p>
          <p>
            Tote bag bulletin hand-crafted smart the highest quality Sunspel.
            Sleepy Beams Comme des Garçons, Boeing 787 Fast Lane destination hub
            Gaggenau exquisite Nordic. Conversation Tsutaya Baggu sleepy
            emerging Comme des Garçons alluring global cosy vibrant Helsinki
            iconic punctual hand-crafted joy.
          </p>
        </div>
      </section>
    </div>
    <!--
      Place picker / map / report is all wrapped up below.
      This needs to be outside of any `container` or `section` wrappers.
    -->
    <App></App>
  </div>
</template>

<style type="scss" scoped>
.content p {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
  strong {
    font-weight: 600;
  }
}
</style>

<script>
import App from '~/components/App'

export default {
  name: 'HomePage',
  layout: 'home',
  components: {
    App,
  },
}
</script>
