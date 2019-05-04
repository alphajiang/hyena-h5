<template>
  <div class="home">
    <!--
    <img alt="Vue logo" src="../assets/logo.png">
    -->
    <span>类型</span>
    <ul>
      <li v-for="(item) in pointTypes"
       v-bind:key="item"
       v-on:click="onClickPointType(item)">{{ item }}</li>
    </ul>

<!--
    <a v-on:click="onClickAaa">fewgewfew</a>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
  </div>
</template>

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
      console.log("aaaaaa");
      console.log(pointType);
      this.$http({
        method: "get",
        url: "/api/hyena/system/listPointType",
        data: {
          name: "virus"
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