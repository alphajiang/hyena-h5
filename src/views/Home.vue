<template>
  <div class="home">
    <div class="title">
      <h2>积分类型</h2>
      <el-button type="primary" size="small" @click="showDialog = true">新增</el-button>
    </div>

    <ul>
      <li
        class="pointType"
        v-for="(item) in pointTypes"
        v-bind:key="item"
        v-on:click="onClickPointType(item)"
      >{{ item }} >></li>
    </ul>

    <el-dialog
      title="新增类型"
      :visible.sync="showDialog"
      :modal="true"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form ref="addPointTypeForm" :model="addPointTypeForm" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addPointTypeForm.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="!clickable"
          @click="onClickAddPointType('addPointTypeForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!--
    <a v-on:click="onClickAaa">fewgewfew</a>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
    <div class='bottom'>v20200705.1</div>
  </div>
</template>

<style lang="scss">
.title {
  margin-left: 25px;
}
.bottom {
  position: fixed;
  bottom : 10px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  text-align: center;
}
</style>
<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: 'home',
  // props: {
  //   items: String
  // },
  mounted: function() {
    this.loadPointTypes()
  },
  components: {
    // HelloWorld
  },
  data: function() {
    return {
      clickable: true,
      showDialog: false,
      pointTypes: [],
      addPointTypeForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入类型名称', trigger: 'blur' },
          { min: 1, max: 32, message: '类型名称不能太长', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onClickPointType(pointType) {
      this.$router.push({
        path: '/point/list',
        query: {
          pointType: pointType
        }
      })
    },
    onClickAddPointType(formName) {
      this.clickable = false
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addPointType(formName)
        } else {
          console.log('error submit!!')
          this.clickable = true
          return false
        }
      })
    },
    loadPointTypes() {
      this.$http({
        method: 'get',
        url: '/api/hyena/system/listPointType'
      }).then(res => {
        console.log(res)
        this.pointTypes = res.data.data
      })
    },
    addPointType(formName) {
      this.$http({
        method: 'post',
        url: '/api/hyena/system/addPointType',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        params: {
          name: this.addPointTypeForm.name
        }
      }).then(res => {
        console.log(res)
        this.clickable = true
        // this.points = res.data.data;
        if (res.data.status === 0) {
          this.loadPointTypes()
          this.$refs[formName].resetFields()
          this.showDialog = false
        } else {
          this.$message.error(res.data.error)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
li {
  height: 30px;
}
</style>
