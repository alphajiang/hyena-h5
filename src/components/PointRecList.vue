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
    <!--
    <el-table
      :data="points"
      stripe
      size="medium"
      border="true"
      fit="true"
      highlight-current-row="true"
    >
      <el-table-column fixed type="index" width="30"></el-table-column>
      <el-table-column fixed prop="id" label="块ID" align="right" width="70" header-align="center"></el-table-column>
      <el-table-column
        fixed
        prop="seqNum"
        label="seq"
        align="right"
        width="60"
        header-align="center"
      ></el-table-column>
      <el-table-column prop="total" label="块内总数" align="right" width="120" header-align="center"></el-table-column>
      <el-table-column prop="available" label="可用" align="right" width="120" header-align="center"></el-table-column>
      <el-table-column prop="frozen" label="冻结" align="right" width="80" header-align="center"></el-table-column>
      <el-table-column prop="used" label="已使用" align="right" width="120" header-align="center"></el-table-column>
      <el-table-column prop="refund" label="退款/提现" align="right" width="120" header-align="center"></el-table-column>
      <el-table-column prop="expire" label="已过期" align="right" width="120" header-align="center"></el-table-column>
      <el-table-column prop="totalCost" label="总成本" align="right" width="120" header-align="center"></el-table-column>
      <el-table-column
        prop="usedCost"
        label="已使用成本"
        align="right"
        width="120"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="frozenCost"
        label="已冻结成本"
        align="right"
        width="100"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="refundCost"
        label="已退款成本"
        align="right"
        width="120"
        header-align="center"
      ></el-table-column>
      <el-table-column label="有效" align="center" width="60" header-align="center">
        <template slot-scope="s">{{s.row.enable | formatStatus}}</template>
      </el-table-column>
      <el-table-column prop="orderNo" label="单号" width="150" header-align="center"></el-table-column>
      <el-table-column prop="tag" label="标签" width="150" header-align="center"></el-table-column>
      <el-table-column prop="sourceType" label="sourceType" width="60" header-align="center"></el-table-column>
      <el-table-column prop="orderType" label="orderType" width="60" header-align="center"></el-table-column>
      <el-table-column prop="payType" label="payType" width="60" header-align="center"></el-table-column>
      <el-table-column prop="issueTime" label="发放时间" width="100" header-align="center"></el-table-column>
      <el-table-column prop="expireTime" label="有效期" width="100" header-align="center"></el-table-column>
      <el-table-column label="操作" header-align="center">
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
    -->
    <ul
      class="infinite-list"
      v-infinite-scroll="loadPointRecList"
      infinite-scroll-disabled="disabled"
      style="overflow:auto"
    >
      <el-card
        class="box-card"
        v-for="(item) in points"
        v-bind:key="item"
        body-style="{padding:'10px'}"
      >
        <div slot="header" class="clearfix">
          <div class="left">{{item.idx}}</div>
          <div class="center">
            <span>块ID: {{item.id}}</span>
          </div>
          <div class="right">{{item.statusDisplay}}</div>
        </div>
        <div class="sub-title">
          <span class="left bold">创建</span>
          <span class="right">{{item.issueTime}}</span>
        </div>
        <div>
          <div class="item two-col">
            <span class="title">单号:</span>
            <span>{{item.orderNo}}</span>
          </div>
          <div class="item">
            <span class="title">序号:</span>
            <span>{{item.seqNum}}</span>
          </div>
        </div>
        <div>
          <div class="item three-col">
            <span class="title">标签:</span>
            <span>{{item.tag}}</span>
          </div>
        </div>
        <div class="sub-title bold">基础信息</div>
        <div>
          <div class="item">
            <span class="title">总数:</span>
            <span>{{item.total}}</span>
          </div>
          <div class="item">
            <span class="title">可用:</span>
            <span>{{item.available}}</span>
          </div>
          <div class="item">
            <span class="title">冻结:</span>
            <span>{{item.frozen}}</span>
          </div>
        </div>
        <div>
          <div class="item">
            <span class="title">已使用:</span>
            <span>{{item.used}}</span>
          </div>
          <div class="item">
            <span class="title">退款:</span>
            <span>{{item.refund}}</span>
          </div>
          <div class="item">
            <span class="title">已过期:</span>
            <span>{{item.expire}}</span>
          </div>
        </div>

        <div>
          <div class="item three-col">
            <span class="title">有效期:</span>
            <span>{{item.expireTime}}</span>
          </div>
        </div>
        <div class="sub-title bold">成本</div>
        <div>
          <div class="item">
            <span class="title">总成本:</span>
            <span>{{item.totalCost}}</span>
          </div>
          <div class="item">
            <span class="title">可用:</span>
            <span>{{item.cost}}</span>
          </div>
          <div class="item">
            <span class="title">冻结:</span>
            <span>{{item.frozenCost}}</span>
          </div>
        </div>
        <div>
          <div class="item">
            <span class="title">已使用:</span>
            <span>{{item.usedCost}}</span>
          </div>
          <div class="item">
            <span class="title">已退款:</span>
            <span>{{item.refundCost}}</span>
          </div>
        </div>
        <div class="sub-title bold">其他</div>
        <div>
          <div class="item">
            <span class="title">来源:</span>
            <span>{{item.sourceType}}</span>
          </div>
          <div class="item">
            <span class="title">订单类型:</span>
            <span>{{item.orderType}}</span>
          </div>
          <div class="item">
            <span class="title">支付类型:</span>
            <span>{{item.payType}}</span>
          </div>
        </div>
        <div class="bn-line">
          <el-button class="right" size="mini" @click="showDetail(0, item)">块流水</el-button>
        </div>
      </el-card>
    </ul>

    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<style scoped lang="scss">
.el-table {
  margin-bottom: 20px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
div.left {
  float: left;
}
div.right {
  float: right;
}
.box-card .clearfix {
  text-align: center;
}

.box-card .sub-title {
  display: inline-block;
  font-size: 14px;
  width: 95%;
  padding: 5px 10px 5px 10px;
  border: 1px solid #b4ddea;
  background: #f7faff;
  margin-bottom: 5px;
}

.bold {
  font-weight: bold;
}

.box-card .sub-title span {
  display: inline-block;
}
.right {
  float: right;
}
.center {
  display: inline-block;
}
.box-card .item {
  float: left;
  width: 33%;
  margin-bottom: 10px;
  font-size: 14px;
}

.box-card .two-col {
  width: 66%;
}
.box-card .three-col {
  width: 99%;
}
.box-card {
  width: 480px;
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
}
span.title {
  display: inline-block;
  width: 60px;
  color: #909399;
  font-weight: bold;
  font-size: 13px;
}
.bn-line {
  float: right;
  padding: 10px 20px 10px 0px;
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
      loading: false,
      clickable: true,
      showDialog: false,
      points: [],
      total: 0,
      idx: 1,
      start: 0,
      pageSize: 10
    }
  },
  // computed: {
  //   noMore() {
  //     return this.count >= 20
  //   },
  //   disabled() {
  //     return this.loading || this.noMore
  //   }
  // },
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
        method: 'post',
        url: '/api/hyena/point/listPointRecord',
        data: JSON.stringify({
          type: this.pointType,
          uid: this.uid,
          start: this.start,
          size: this.pageSize
        })
      }).then(res => {
        console.log(res)
        this.points = res.data.data
        this.total = res.data.total
        this.points.forEach(rec => {
          rec.idx = this.idx++
          rec.cost = rec.totalCost - rec.usedCost - rec.refundCost
          rec.statusDisplay = rec.enable === true ? '有效' : '失效'
        })
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
