<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item  :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item  :to="{ path: '/point/list', query: {
          pointType: pointType
        } }">{{pointType}}</el-breadcrumb-item>
      <el-breadcrumb-item>积分块 ({{uid}})</el-breadcrumb-item>
    </el-breadcrumb>


    <el-table :data="points" stripe>
    <el-table-column fixed
      type="index"
      width="50">
    </el-table-column>      
      <el-table-column prop="total" label="总数" width="100"></el-table-column>
      <el-table-column prop="available" label="可用" width="100"></el-table-column>
      <el-table-column prop="frozen" label="冻结" width="100"></el-table-column>
      <el-table-column prop="used" label="已使用" width="100"></el-table-column>
      <el-table-column prop="expire" label="已过期" width="100"></el-table-column>
      
      <el-table-column prop="tag" label="标签" width="150"></el-table-column>
      <el-table-column prop="issueTime" label="发放时间" width="150"></el-table-column>
      <el-table-column prop="expireTime" label="有效期" width="150"></el-table-column>
 <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="showDetail(scope.$index, scope.row)">明细</el-button>
      </template>
    </el-table-column>      
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="onClickPage"
    ></el-pagination>

  </div>
</template>

<style scoped lang="scss">
.el-table {
  margin-bottom: 20px;
}
</style>

<script>
export default {
  name: 'PointRecList',

  components: {
    // list: list
  },
  computed: {
    pointType() {
      return this.$route.query.pointType
    },
    uid() {
        return this.$route.query.uid
    }
  },
  data: function() {
    return {
      clickable: true,
      showDialog: false,
      points: [],
      total: 0,
      page: 1,
      pageSize: 10,
      addPointForm: {
        uid: '',
        point: ''
      },
      rules: {
        uid: [
          { required: true, message: '请输入客户ID', trigger: 'blur' },
          { min: 1, max: 32, message: '客户ID不能太长', trigger: 'blur' }
        ],
        point: [
          { required: true, message: '请输入客户积分', trigger: 'blur' },
          { type: 'number', message: '积分必须为数字', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function() {
    // this.showDialog = false;
    this.loadPointRecList()
  },
  methods: {
    loadPointRecList() {
      this.$http({
        method: 'get',
        url: '/api/hyena/point/listPointRecord',
        params: {
          type: this.pointType,
          uid: this.uid,
          start: (this.page - 1) * this.pageSize,
          size: this.pageSize
        }
      }).then(res => {
        console.log(res)
        this.points = res.data.data
        this.total = res.data.total
      })
    },
    onClickPage(val) {
      console.info(val)
      this.page = val
      this.loadPointRecList()
    },
    showDetail(idx, point) {
      console.log(point);
    }
  }
}
</script>
