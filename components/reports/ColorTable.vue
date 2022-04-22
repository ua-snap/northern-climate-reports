<template>
  <div class="content">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" style="min-width: 16rem">Category</th>
          <th scope="col" style="min-width: 10rem">{{ unitLabel }}</th>
          <th scope="col" v-if="showInterpretation()">Interpretation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(threshold, index) in thresholds">
          <th scope="row" class="category">
            <div
              class="swatch"
              :class="{ bordered: ifBordered(index) }"
              :style="{ 'background-color': threshold['color'] }"
            />
            {{ threshold['label'] }}
          </th>
          <td class="numbers">
            <span v-if="threshold['min'] == rangeMin()"
              >&lt;{{ threshold['max'] }}<span v-html="unitSymbol"
            /></span>
            <span v-else-if="threshold['max'] == rangeMax()"
              >&ge;{{ threshold['min'] }}<span v-html="unitSymbol"
            /></span>
            <span v-else
              >&ge;{{ threshold['min'] }}<span v-html="unitSymbol" />, &lt;{{
                threshold['max']
              }}<span v-html="unitSymbol"
            /></span>
          </td>
          <td v-if="showInterpretation()">
            {{ threshold['interpretation'] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.content table th:not([align]) {
  text-align: left;
}
.numbers {
  font-family: 'IBM Plex Mono', monospace;
  vertical-align: middle;
}
.category {
  vertical-align: middle;
}
.swatch {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 2px;

  &.bordered {
    border: 1px solid #ccc;
  }
}
</style>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'ColorTable',
  props: ['thresholds', 'unitLabel', 'unitSymbol', 'borderedColors'],
  methods: {
    ifBordered(index) {
      // Add border around pale colors to increase visibility
      return _.includes(this.borderedColors, index)
    },
    showInterpretation() {
      let interpretations = this.thresholds.map(x => x['interpretation'])
      return !interpretations.every(_.isUndefined)
    },
    rangeMin() {
      let minimums = this.thresholds.map(x => x['min'])
      return _.min(minimums)
    },
    rangeMax() {
      let maximums = this.thresholds.map(x => x['max'])
      return _.max(maximums)
    },
  },
}
</script>
