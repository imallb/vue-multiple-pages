<template>
  <div class="d3">
    <p></p>
    <p></p>
    <p></p>
  </div>
</template>
<script>
const jsons = require("./json/country.json");
import * as d3 from "d3";
export default {
  name: "vue-line-chart",
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      var dataset = ["so cute", "cute", "fat"];
      const p = d3.select(".d3").selectAll("p");
      p.data(dataset).text(function(d, i) {
        return "第" + i + "个动物" + d;
      });
    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
svg {
  margin: 25px;
}
path {
  fill: none;
  stroke: #76bf8a;
  stroke-width: 3px;
}
</style>
