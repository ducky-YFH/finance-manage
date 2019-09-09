<template>
  <div class="fundlist-container">
    <div class="timer">
      <el-form :inline="true" ref="add_data" :model="searchData">
        <el-form-item label="按时间筛选:">
          <el-date-picker
            v-model="searchData.startTime"
            type="datetime"
            placeholder="选择开始时间">
          </el-date-picker>
          <el-date-picker
            v-model="searchData.endTime"
            type="datetime"
            placeholder="选择结束时间">
          </el-date-picker>
          <el-button type="primary" @click="handelSearch">筛选</el-button>
          <el-button @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
      <!-- 添加对话框 -->
    </div>
    <addDialog @update="getData()" :dialog="dialog"></addDialog>
    <div class="table">
      <el-table :data="tableData" border height=600 style="width: 100%" :default-sort = "{ prop: 'date', order: 'descending'}">
        <el-table-column type="index" align="center" label="序号" width="180"></el-table-column>
        <el-table-column align="center" prop="date" label="日期" sortable width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date | dateFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="收入类型" width="180"></el-table-column>
        <el-table-column align="center" prop="describe" label="收入描述" width="180"></el-table-column>
        <el-table-column align="center" prop="income" label="收入" width="180">
          <template slot-scope="scope">
            <span style="color: #00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="expend" label="支出" width="180">
          <template slot-scope="scope">
            <span style="color: #f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="cash" label="账户现金" width="180">
          <template slot-scope="scope">
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注" width="180"></el-table-column>
        <el-table-column align="center" prop="operate" label="操作" v-if="user.identity === 'admin'">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="paginations.page_index"
      :page-sizes="paginations.page_sizes"
      :page-size="paginations.page_size"
      :layout="paginations.layout"
      :total="paginations.total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import addDialog from '../addDialog/addDialog'
export default {
  filters: {
    dateFilter: (dateStr) => {
      let date = new Date(dateStr)
      const y = (date.getFullYear()).toString().padStart(2, 0)
      const m = (date.getMonth() + 1).toString().padStart(2, 0)
      const d = (date.getDate()).toString().padStart(2, 0)
      const H = (date.getHours()).toString().padStart(2, 0)
      const M = (date.getMinutes()).toString().padStart(2, 0)
      const S = (date.getSeconds()).toString().padStart(2, 0)
      return `${y}-${m}-${d} ${H}:${M}:${S}`
    }
  },
  data () {
    return {
      startTime: '',
      endTime: '',
      tableData: [],
      allTableData: [],
      filterTableData: [],
      dialog: {
        show: false,
        title: '',
        option: '',
        formData: {}
      },
      searchData: {
        startTime: '',
        endTime: ''
      },
      paginations: {
        page_index: 1, // 当前页数
        total: 0, // 总页数
        page_size: 10, // 一页显示多少条
        page_sizes: [10, 15, 20], // 每页显示多少条
        layout: 'total,sizes,prev,pager,next,jumper' // 翻页属性
      }
    }
  },
  methods: {
    // formatter (row, column) {
    //   return row.address
    // }
    getData () {
      this.$axios.get('/api/profiles')
        .then((res) => {
          this.allTableData = res.data
          this.filterTableData = res.data
          // 设置分页数据
          this.setPaginations()
        })
        .catch(err => console.log(err))
    },
    setPaginations () {
      // 分页属性设置
      this.paginations.total = this.allTableData.length
      this.paginations.page_index = 1
      this.paginations.page_size = 10
      // 设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },
    handleEdit (index, row) {
      this.dialog = {
        show: true,
        title: '修改资金信息',
        option: 'edit',
        formData: {
          type: row.type,
          describe: row.describe,
          income: row.income,
          expend: row.expend,
          cash: row.cash,
          remark: row.remark,
          id: row._id
        }
      }
    },
    handleDelete (index, row) {
      const url = `/api/profiles/delete/${row._id}`
      this.$axios.delete(url)
        .then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          // 刷新当前页面
          this.getData()
        })
    },
    handleAdd () {
      this.dialog = {
        show: true,
        title: '添加资金信息',
        option: 'add',
        formData: {
          type: '',
          describe: '',
          income: '',
          expend: '',
          cash: '',
          remark: '',
          id: ''
        }
      }
    },
    // eslint-disable-next-line camelcase
    handleSizeChange (page_size) {
      this.paginations.page_index = 1
      // eslint-disable-next-line camelcase
      this.paginations.page_size = page_size
      this.tableData = this.allTableData.filter((item, index) => {
        // eslint-disable-next-line camelcase
        return index < page_size
      })
    },
    // eslint-disable-next-line camelcase
    handleCurrentChange (page_index) {
      // 获取开始数
      // eslint-disable-next-line camelcase
      let page_start = this.paginations.page_size * (page_index - 1)
      // 获取结束数
      // eslint-disable-next-line camelcase
      let page_end = page_index * this.paginations.page_size
      // 定义一个容器
      let table = []
      // eslint-disable-next-line camelcase
      for (let i = page_start; i < page_end; i++) {
        if (this.allTableData[i]) {
          table.push(this.allTableData[i])
        }
      }
      this.tableData = table
    },
    handelSearch () {
      if (!this.searchData.startTime || !this.searchData.endTime) {
        this.$message({
          type: 'warning',
          message: '请选择时间区间'
        })
        this.getData()
      }
      const sTime = this.searchData.startTime.getTime()
      const eTime = this.searchData.endTime.getTime()
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date)
        let time = date.getTime()
        return time >= sTime && time <= eTime
      })
      this.setPaginations()
    }
  },
  created () {
    this.getData()
  },
  components: {
    addDialog
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style lang='scss' scoped>
.fundlist-container{
  padding: 40px;
  .timer{
    display: inline-block;
    margin-bottom: 20px;
  }
  .table{
    margin-bottom: 20px;
  }
  .pagination{
    text-align: center;
  }
}
</style>
