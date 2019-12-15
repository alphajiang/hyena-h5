<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: '/point/list', query: {
          pointType: pointType
        } }"
      >{{pointType}}</el-breadcrumb-item>
      <template v-if="pointRecId">
        <el-breadcrumb-item
          :to="{ path: '/point/rec/list', query: {
          pointType: pointType,
          uid: uid
        } }"
        >积分块 ({{uid}})</el-breadcrumb-item>
        <el-breadcrumb-item>使用详情 ({{pointRecId}})</el-breadcrumb-item>
      </template>
      <template v-if="seqNum">
        <el-breadcrumb-item
          :to="{ path: '/point/log/list', query: {
          pointType: pointType,
          uid: uid
        } }"
        >流水 ({{uid}})</el-breadcrumb-item>
        <el-breadcrumb-item>块详情 ({{seqNum}})</el-breadcrumb-item>
      </template>
    </el-breadcrumb>

    <el-table
      :data="points"
      stripe
      size="medium"
      border
      fit
      highlight-current-row
    >
      <el-table-column fixed type="index" width="30"></el-table-column>
      <el-table-column prop="createTime" fixed label="时间" width="100" header-align="center"></el-table-column>
      <el-table-column label="变动" fixed width="50" header-align="center">
        <template slot-scope="scope">
          <span :class="scope.row.cssClazz">{{scope.row.typeDisplay}}</span>
        </template>
      </el-table-column>
      <el-table-column label="变更" fixed align="right" width="100" header-align="center">
        <template slot-scope="scope">
          <span :class="scope.row.cssClazz">{{scope.row.delta.toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="seqNum" label="seq" width="60" header-align="center"></el-table-column>
      <el-table-column prop="total" label="块总数" align="right" width="120" header-align="center" :formatter="formatScale2"></el-table-column>
      <el-table-column prop="available" label="可用" align="right" width="120" header-align="center" :formatter="formatScale2"></el-table-column>
      <el-table-column prop="frozen" label="冻结" align="right" width="80" header-align="center" :formatter="formatScale2"></el-table-column>
      <el-table-column prop="used" label="已使用" align="right" width="120" header-align="center" :formatter="formatScale2"></el-table-column>
      <el-table-column prop="refund" label="退款" align="right" width="80" header-align="center" :formatter="formatScale2"></el-table-column>
      <el-table-column prop="expire" label="已过期" align="right" width="120" header-align="center" :formatter="formatScale2"></el-table-column>
      <el-table-column label="成本" header-align="center">
        <el-table-column
          prop="deltaCost"
          label="变动"
          align="right"
          width="120"
          header-align="center"
           :formatter="formatScale2"
        ></el-table-column>
        <el-table-column prop="cost" label="总数" align="right" width="120" header-align="center" :formatter="formatScale2"></el-table-column>
        <el-table-column
          prop="frozenCost"
          label="冻结"
          align="right"
          width="120"
          header-align="center"
           :formatter="formatScale2"
        ></el-table-column>
        <el-table-column prop="usedCost" label="已用" align="right" width="120" header-align="center" :formatter="formatScale2"></el-table-column>
        <el-table-column
          prop="refundCost"
          label="已退"
          align="right"
          width="120"
          header-align="center"
           :formatter="formatScale2"
        ></el-table-column>
      </el-table-column>
      <el-table-column prop="recId" label="块ID" width="80" header-align="center"></el-table-column>
      <el-table-column prop="orderNo" label="单号" width="150" header-align="center"></el-table-column>
      <el-table-column prop="sourceType" label="sourceType" width="60" header-align="center"></el-table-column>
      <el-table-column prop="orderType" label="orderType" width="60" header-align="center"></el-table-column>
      <el-table-column prop="payType" label="payType" width="60" header-align="center"></el-table-column>
      <el-table-column prop="note" label="备注" width="200" header-align="center"></el-table-column>
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
  name: 'PointRecLogList',

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
    seqNum() {
      return this.$route.query.seqNum
    },
    pointRecId() {
      return this.$route.query.pointRecId
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
  mounted: function() {
    // this.showDialog = false;
    this.loadPointRecLogList()
  },
  methods: {
    loadPointRecLogList() {
	  var param = {
		  type: this.pointType,
		  uid: this.uid,	  
		  start: (this.page - 1) * this.pageSize,
		  size: this.pageSize
		}
		if ( this.pointRecId ) {
		param.recIdList = [this.pointRecId]
		}
		if(this.seqNum) {
		param.seqNumList = [this.seqNum]
		}
      this.$http({
        method: 'post',
        url: '/api/hyena/point/listPointRecordLog',
        data: JSON.stringify(param)
      }).then(res => {
        console.log(res)
        this.points = res.data.data
        this.total = res.data.total

        this.points.forEach((v, idx) => {
          this.formatType(v, null, v.type, idx)
        })
      })
    },
    formatType(row, col, value, idx) {
      var display = value
      var cssClazz = ''
      if (value === 1) {
        display = '增加'
        cssClazz = 'increase'
      } else if (value === 2) {
        display = '减少'
        cssClazz = 'decrease'
      } else if (value === 3) {
        display = '冻结'
        cssClazz = 'freeze'
      } else if (value === 4) {
        display = '解冻'
        cssClazz = 'unfreeze'
      } else if (value === 5) {
        display = '过期'
        cssClazz = 'expire'
      } else if (value === 6) {
        display = '作废'
        cssClazz = 'cancel'
      } else if (value === 7) {
        display = '退款'
        cssClazz = 'refund'
      }
      if (row.extra != null) {
        var extraDisplay = ''
        for (let [key, value] of Object.entries(row.extra)) {
          extraDisplay = extraDisplay + key + ' : ' + value + '<br />'
        }
        row.extraDisplay = extraDisplay
        row.extraSummary = extraDisplay.split('<br />')[0]
      }
      row.typeDisplay = display
      row.cssClazz = cssClazz
      return display
    },
    onClickPage(val) {
      console.info(val)
      this.page = val
      this.loadPointRecLogList()
    }
  }
}
</script>
