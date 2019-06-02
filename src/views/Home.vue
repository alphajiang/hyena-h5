<template>
  <div class="home">

    <h2 class='title'>类型</h2>
    <ul>
      <li class='pointType'
        v-for="(item) in pointTypes"
        v-bind:key="item"
        v-on:click="onClickPointType(item)"
      >{{ item }} >></li>
    </ul>

    <!--
    <a v-on:click="onClickAaa">fewgewfew</a>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
  </div>
</template>

<style lang="scss">

h2 {
  margin-left: 25px;
}
</style>
<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  // props: {
  //   items: String
  // },
  mounted: function() {
    this.loadPointTypes();
  },
  components: {
    // HelloWorld
  },
  data: function() {
    return {
      pointTypes: Array
    };
  },
  methods: {
    onClickPointType(pointType) {
      this.$router.push({
        path: "/point/list",
        query: {
          pointType: pointType
        }
      });
    },
    show() {
      this.$http({
        method: "get",
        url: "/user",
        data: {
          name: "virus"
        }
      });
    },
    loadPointTypes() {
      this.$http({
        method: "get",
        url: "/api/hyena/system/listPointType"
      }).then(res => {
        console.log(res);
        this.pointTypes = res.data.data;
      });
    }
  }
};
</script>

<style scoped lang="scss">
li {
  height: 30px;
}
</style>