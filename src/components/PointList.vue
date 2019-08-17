<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{pointType}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class='head-icon'>
      <el-button type="primary" size="small" @click="showDialog = true">新增</el-button>
    </div>
    <div class='head-icon'>
      <el-input placeholder="请输入搜索关键词" size='small' clearable prefix-icon="el-icon-search" v-model="sk" @clear="searchPoints">
        <el-button slot="append"  icon="el-icon-search" @click="searchPoints"></el-button>
      </el-input>
    </div>
    <el-table :data="points" stripe>
      <el-table-column fixed type="index" width="50"></el-table-column>
      <el-table-column prop="uid" label="UID" fixed width="100"></el-table-column>
      <el-table-column prop="name" label="名称" fixed width="180"></el-table-column>
      <el-table-column prop="point" label="有效积分" align="right" width="150"></el-table-column>
      <el-table-column prop="available" label="可用" align="right" width="150"></el-table-column>
      <el-table-column prop="frozen" label="冻结" align="right" width="100"></el-table-column>
      <el-table-column prop="used" label="已使用" align="right" width="150"></el-table-column>
      <el-table-column prop="expire" label="已过期" align="right" width="150"></el-table-column>
      <el-table-column prop="seqNum" label="seq" align="right" width="60"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="showPointLogList(scope.$index, scope.row)">流水</el-button>
          <el-button size="mini" @click="showPointRecList(scope.$index, scope.row)">积分块</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="page"
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="onClickPage"
    ></el-pagination>
    <el-dialog
      title="新增积分"
      :visible.sync="showDialog"
      :modal="true"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form ref="addPointForm" :model="addPointForm" :rules="rules" label-width="80px">
        <el-form-item label="客户" prop="uid">
          <el-input v-model="addPointForm.uid"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="point">
          <el-input v-model.number="addPointForm.point"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="!clickable"
          @click="onClickAddPoint('addPointForm')"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.el-table {
  margin-bottom: 20px;
}
div.head-icon {
float:left;
margin-right: 30px;
}
</style>

<script>
export default {
  name: 'PointList',

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
      clickable: true,
      showDialog: false,
      points: [],
      total: 0,
      page: 1,
      pageSize: 10,
      sk: '',
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
  beforeMount: function() {
    let lastPointType = sessionStorage.getItem('pointType')
    if (lastPointType === this.pointType) {
      this.page = parseInt(sessionStorage.getItem('POINT_LIST_PAGE'))
      if (isNaN(this.page)) {
        this.page = 1
      }
      this.sk = sessionStorage.getItem('POINT_LIST_SK')
    }
  },
  mounted: function() {
    // this.showDialog = false;

    this.loadPoints()
  },
  beforeDestroy: function() {
    sessionStorage.setItem('pointType', this.pointType)
    sessionStorage.setItem('POINT_LIST_PAGE', this.page)
    sessionStorage.setItem('POINT_LIST_SK', this.sk)
  },
  methods: {
    loadPoints() {
      this.$http({
        method: 'post',
        url: '/api/hyena/point/listPoint',
        data: JSON.stringify({
          type: this.pointType,
          sk: this.sk,
          start: (this.page - 1) * this.pageSize,
          size: this.pageSize
        })
      }).then(res => {
        console.log(res)
        this.points = res.data.data
        this.total = res.data.total
      })
    },
    onClickPage(val) {
      console.info(val)
      this.page = val
      this.loadPoints()
    },
    searchPoints() {
      this.page = 1
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
    addPoint(formName) {
      this.$http({
        method: 'post',
        url: '/api/hyena/point/increase',
        data: JSON.stringify({
          type: this.pointType,
          uid: this.addPointForm.uid,
          point: this.addPointForm.point
        })
      }).then(res => {
        console.log(res)
        this.clickable = true
        // this.points = res.data.data;
        if (res.data.status === 0) {
          this.loadPoints()
          this.$refs[formName].resetFields()
          this.showDialog = false
        } else {
          this.$message.error(res.data.error)
        }
      })
    },
    showPointRecList(idx, point) {
      console.log(point)
      this.$router.push({
        path: '/point/rec/list',
        query: {
          pointType: this.pointType,
          uid: point.uid
        }
      })
    },
    showPointLogList(idx, point) {
      console.log(point)
      this.$router.push({
        path: '/point/log/list',
        query: {
          pointType: this.pointType,
          uid: point.uid
        }
      })
    }
  }
}
</script>
