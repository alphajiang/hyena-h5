<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: '/point/list', query: {
          pointType: pointType
        } }"
      >{{pointType}}</el-breadcrumb-item>
      <el-breadcrumb-item>积分块 ({{uid}}-{{subUid}})</el-breadcrumb-item>
    </el-breadcrumb>
    <div >
      <div
        class="infinite-list" style="overflow:auto"
        v-infinite-scroll="loadPointRecList"
        infinite-scroll-disabled="disabled"
        infinite-scroll-delay="500"
        infinite-scroll-distance="0"
      >
        <el-card
          class="box-card"
          v-bind:class="{ exhaust: !item.enable }"
          v-for="item in points"
          v-bind:key="item.id"
          body-style="{padding:'10px'}"
        >
          <div slot="header" class="clearfix" >
            <div class="left">{{item.idx}}</div>
            <div class="center">
              <span>块ID: {{item.id}}</span>
            </div>
            <div class="right" v-if="item.enable">有效</div>
            <div class="right " v-if="!item.enable">失效</div>
          </div>
          <div class="sub-title">
            <span class="left bold">创建信息</span>
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
              <span>{{item.total  | formatScale2}}</span>
            </div>
            <div class="item">
              <span class="title">可用:</span>
              <span>{{item.available| formatScale2}}</span>
            </div>
            <div class="item">
              <span class="title">冻结:</span>
              <span>{{item.frozen | formatScale2}}</span>
            </div>
          </div>
          <div>
            <div class="item">
              <span class="title">已使用:</span>
              <span>{{item.used | formatScale2}}</span>
            </div>
            <div class="item">
              <span class="title">退款:</span>
              <span>{{item.refund | formatScale2}}</span>
            </div>
            <div class="item">
              <span class="title">已过期:</span>
              <span>{{item.expire | formatScale2}}</span>
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
              <span>{{item.totalCost | formatScale2}}</span>
            </div>
            <div class="item">
              <span class="title">可用:</span>
              <span>{{item.cost | formatScale2}}</span>
            </div>
            <div class="item">
              <span class="title">冻结:</span>
              <span>{{item.frozenCost | formatScale2}}</span>
            </div>
          </div>
          <div>
            <div class="item">
              <span class="title">已使用:</span>
              <span>{{item.usedCost | formatScale2}}</span>
            </div>
            <div class="item">
              <span class="title">已退款:</span>
              <span>{{item.refundCost | formatScale2}}</span>
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
      <div v-if="loading">加载中...</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-table {
  margin-bottom: 20px;
}
.exhaust {
  color: gray;
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
  display: inline-block;
  vertical-align: top;
  width: 480px;
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
    },
    subUid() {
      return this.$route.query.subUid
    },
    noMore() {
      return this.loadMore !== true
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  data: function() {
    return {
      loading: false,
      loadMore: true,
      clickable: true,
      showDialog: false,
      points: [],
      total: 0,
      idx: 1,
      start: 0,
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
    // this.loadPointRecList()
  },
  methods: {
    loadPointRecList() {
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/hyena/point/listPointRecord',
        data: JSON.stringify({
          type: this.pointType,
          uid: this.uid,
          subUid: this.subUid,
          start: this.start,
          size: this.pageSize
        })
      }).then(res => {
        console.log(res)
        if (res.data.data.length < this.pageSize) {
          this.loadMore = false
        }
        this.start = this.start + res.data.data.length
        // this.points.push(res.data.data)
        this.total = res.data.total
        res.data.data.forEach(rec => {
          rec.idx = this.idx++
          rec.cost = rec.totalCost - rec.usedCost - rec.refundCost - rec.frozenCost
          this.points.push(rec)
        })
        this.loading = false
        console.info(this.disabled)
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
          uid: this.uid,
          subUid: this.subUid,
          pointRecId: pointRec.id
        }
      })
    }
  }
}
</script>
