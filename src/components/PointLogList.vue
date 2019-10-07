<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: '/point/list', query: {
          pointType: pointType
        } }"
      >{{pointType}}</el-breadcrumb-item>
      <el-breadcrumb-item>流水 ({{uid}})</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="points" stripe>
      <el-table-column fixed type="index" width="40"></el-table-column>
      <el-table-column prop="createTime" fixed label="时间" width="100"></el-table-column>
      <el-table-column label="变动" fixed width="50">
        <template slot-scope="scope">
          <span :class="scope.row.cssClazz">{{scope.row.typeDisplay}}</span>
        </template>
      </el-table-column>
      <el-table-column label="变更" align="right" width="150">
        <template slot-scope="scope">
          <span :class="scope.row.cssClazz">{{scope.row.delta}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="point" label="有效积分" align="right" width="150"></el-table-column>
      <el-table-column prop="available" label="可用" align="right" width="150"></el-table-column>
      <el-table-column prop="used" label="已使用" align="right" width="150"></el-table-column>
      <el-table-column prop="frozen" label="冻结" align="right" width="80"></el-table-column>
      <el-table-column prop="refund" label="退款" align="right" width="80"></el-table-column>
      <el-table-column prop="expire" label="过期" align="right" width="150"></el-table-column>
      <el-table-column prop="deltaCost" label="变更成本" align="right" width="150"></el-table-column>
      <el-table-column prop="cost" label="成本" align="right" width="150"></el-table-column>
      <el-table-column prop="frozenCost" label="冻结成本" align="right" width="150"></el-table-column>
      <el-table-column prop="orderNo" label="单号" width="150"></el-table-column>
      <el-table-column prop="tag" label="标签" width="100"></el-table-column>
      <el-table-column prop="seqNum" label="seq" width="60"></el-table-column>
      <el-table-column prop="sourceType" label="sourceType" width="60"></el-table-column>
      <el-table-column prop="orderType" label="orderType" width="60"></el-table-column>
      <el-table-column prop="payType" label="payType" width="60"></el-table-column>
      <el-table-column prop="note" label="备注" width="200"></el-table-column>
      <el-table-column label="额外信息" width="200">
        <template slot-scope="scope">
          <el-popover placement="top-start" title width="200" trigger="hover" content>
            <div v-html="scope.row.extraDisplay"></div>
            <div size="mini" class="extraSummary" slot="reference">{{scope.row.extraSummary}}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDetail(scope.$index, scope.row)">块详情</el-button>
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
.extraSummary {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 120px;
}
</style>

<script>
export default {
  name: 'PointLogList',

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
  mounted: function() {
    // this.showDialog = false;

    this.loadPoints()
  },

  methods: {
    loadPoints() {
      this.$http({
        method: 'post',
        url: '/api/hyena/point/listPointLog',
        data: JSON.stringify({
          type: this.pointType,
          uid: this.uid,
          start: (this.page - 1) * this.pageSize,
          size: this.pageSize
        })
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
      this.loadPoints()
    },
    onClickAddPoint(formName) {
      this.clickable = false
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addPoint(formName)
        } else {
          console.log('error submit!!')
          this.clickable = true
          return false
        }
      })
    },
    showDetail(idx, pointLog) {
      console.log(pointLog)
      this.$router.push({
        path: '/point/rec/log/list',
        query: {
          pointType: this.pointType,
          pid: this.pid,
          uid: this.uid,
          seqNum: pointLog.seqNum
        }
      })
    }
  }
}
</script>
