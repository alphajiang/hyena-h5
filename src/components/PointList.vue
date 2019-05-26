<template>
  <div>
    <div>
      <h2>类型: {{pointType}}</h2>
    </div>
    <div>
      <el-button type="primary" @click="onClickOpenDialog">新增</el-button>
    </div>
    <el-table :data="points">
      <el-table-column prop="uid" label="客户" width="180"></el-table-column>
      <el-table-column prop="point" label="总积分" width="180"></el-table-column>
      <el-table-column prop="available" label="可用" width="180"></el-table-column>
      <el-table-column prop="frozen" label="冻结" width="180"></el-table-column>
      <el-table-column prop="used" label="已使用" width="180"></el-table-column>
      <el-table-column prop="expire" label="已过期" width="180"></el-table-column>
    </el-table>
    <div v-if="showDialog" class="dialog">
      <div>
        客户:
        <input type="text" v-model="newUid">
      </div>
      <div>
        积分:
        <input type="text" v-model="newPoint">
      </div>
      <div>
        <button @click="onClickAddPoint">确定</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.dialog {
  width: 80%;
  height: 80%;
  max-width: 300px;
  max-height: 600px;
  min-width: 100px;
  min-height: 200px;
  border: gray 1px solid;
}
</style>

<script>
export default {
  name: 'PointList',
  //   props : {
  //       pointType : String
  //   },
  components: {
    // list: list
  },
  computed: {
    pointType() {
      return this.$route.query.pointType
    }
  },
  data: function() {
    return {
      showDialog: false,
      points: [],
      newUid: '',
      newPoint: ''
    }
  },
  mounted: function() {
    // this.showDialog = false;
    this.loadPoints()
  },
  methods: {
    loadPoints() {
      this.$http({
        method: 'get',
        url: '/api/hyena/point/listPoint',
        params: {
          type: this.pointType
        }
      }).then(res => {
        console.log(res)
        this.points = res.data.data
      })
    },
    onClickOpenDialog() {
      this.showDialog = true
    },
    onClickAddPoint() {
      this.$http({
        method: 'post',
        url: '/api/hyena/point/increase',
        data: JSON.stringify({
          type: this.pointType,
          uid: this.newUid,
          point: this.newPoint
        })
      }).then(res => {
        console.log(res)
        // this.points = res.data.data;
      })
    }
  }
}
</script>
