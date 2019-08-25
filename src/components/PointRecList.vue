<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: '/point/list', query: {
          pointType: pointType
        } }"
      >{{pointType}}</el-breadcrumb-item>
      <el-breadcrumb-item>积分块 ({{uid}})</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="points" stripe>
      <el-table-column fixed type="index" width="30"></el-table-column>
      <el-table-column fixed prop="id" label="块ID" align="right" width="60"></el-table-column>
      <el-table-column fixed prop="seqNum" label="seq" align="right" width="60"></el-table-column>
      <el-table-column prop="total" label="块内总数" align="right" width="150"></el-table-column>
      <el-table-column prop="available" label="可用" align="right" width="150"></el-table-column>
      <el-table-column prop="frozen" label="冻结" align="right" width="80"></el-table-column>
      <el-table-column prop="used" label="已使用" align="right" width="150"></el-table-column>
      <el-table-column prop="expire" label="已过期" align="right" width="150"></el-table-column>
      <el-table-column prop="totalCost" label="总成本" align="right" width="150"></el-table-column>
      <el-table-column prop="usedCost" label="已使用成本" align="right" width="150"></el-table-column>
      <el-table-column label="有效" align='center' width="60">
        <template slot-scope="s">{{s.row.enable | formatStatus}}</template>
      </el-table-column>
      <el-table-column prop="orderNo" label="单号" width="150"></el-table-column>
      <el-table-column prop="tag" label="标签" width="150"></el-table-column>
      <el-table-column prop="sourceType" label="sourceType" width="60"></el-table-column>
      <el-table-column prop="orderType" label="orderType" width="60"></el-table-column>
      <el-table-column prop="payType" label="payType" width="60"></el-table-column>      
      <el-table-column prop="issueTime" label="发放时间" width="150"></el-table-column>
      <el-table-column prop="expireTime" label="有效期" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDetail(scope.$index, scope.row)">详情</el-button>
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
      pageSize: 10
    }
  },
  filters: {
    formatStatus: function(arg) {
      if (arg === true) {
        return '是'
      } else {
        return ''
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
    showDetail(idx, pointRec) {
      console.log(pointRec)
      this.$router.push({
        path: '/point/rec/log/list',
        query: {
          pointType: this.pointType,
          uid: pointRec.uid,
          pointRecId: pointRec.id
        }
      })
    }
  }
}
</script>
