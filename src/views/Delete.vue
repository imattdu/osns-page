<template>
  <div>

    <el-table
      ref="filterTable"
      :data="tableData"
    >
      <el-table-column
        prop="created_at"
        label="日期"
        sortable
        column-key="date"
        min-width="100px"
      >
      </el-table-column>

      <el-table-column
        prop="title"
        label="标题"
        min-width="300px"
      >
      </el-table-column>


      <el-table-column label="操作" min-width="200px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRead(scope.$index, scope.row)">阅读
          </el-button>
          <el-button
            size="mini"
            @click="handleRestore(scope.$index, scope.row)">还原
          </el-button>
          <el-button
            size="mini" type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from "axios";

export default {
  computed: {
    ...mapState(['isLogin', 'user']),
  },
  mounted() {
    this.initTableData(1,5)
  },
  data() {
    return {
      tableData: [],
      //分页
      currentPage: 1,
      pageSize: 5,
      pageSizes: [5, 7],
      total: 100
    }
  },
  methods: {
    initTableData(curPage=1,pageSize=5) {
      let url = `/note/remove?uid=${this.user.id}&curPage=${curPage}&pageSize=${pageSize}`
      axios.get(url).then(
        response => {
          this.tableData = response.data.res_note_list
          this.total = response.data.total
        }
      ).catch(error => {

      });
    },

    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleRead(index, row) {
      // console.log(index, row);
      this.$router.push(`/note/read/${row.id}`)
    },
    handleRestore(index, row) {

      const url = `/note/restore/${row.id}`
      const note = row
      axios.get(url).then(
        response => {
          this.tableData = response.data.res_note_list
          console.log(response)
          this.$message({
            type: 'success',
            message: '已经恢复'
          });
        }
      ).catch(error => {

      });
    },
    handleDelete(index, row) {
      const url = `/note/remove/forever/${row.id}`
      const note = row
      axios.get(url).then(
        response => {
          this.initTableData(this.currentPage, this.pageSize)
        }
      ).catch(error => {

      });
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(pageSize);
      let pageSize = this.pageSize

      this.initTableData(1,this.pageSize)
    },
    handleCurrentChange(val) {
      let pageSize = this.pageSize
      this.initTableData(val,this.pageSize)
    }


  },
}
</script>

<style scoped>

</style>
