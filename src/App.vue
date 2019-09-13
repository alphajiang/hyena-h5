<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin-left: 20px;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-breadcrumb {
  padding: 20px 0 20px 0;
}

span.increase {
  // 增加积分
  color: red;
}
span.decrease {
  // 减少积分
  color: green;
}
span.freeze {
  // 冻结积分
  color: dodgerblue;
}
span.unfreeze {
  // 解冻积分
  color: palevioletred;
}
span.expire {
  // 过期积分
  color: gray;
}
span.cancel {
  // 作废积分
  color: gray;
}
span.refund {
  color: gray;
}
</style>
