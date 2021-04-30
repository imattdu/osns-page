<template>
  <div>
    <el-table
      ref="filterTable"
      :data="tableData"
      height="450px"
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
      <el-table-column label="操作" min-width="300px">
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
        background
        :pager-count="3"
        hide-on-single-page="true"
        layout="sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from "axios";

export default {

  mounted() {
    this.initTableData(1, 5)
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
  computed: {
    ...mapState(['isLogin', 'user']),
  },
  methods: {
    initTableData(curPage = 1, pageSize = 5) {
      let url = `/note/remove?uid=${this.user.id}&curPage=${curPage}&pageSize=${pageSize}`
      axios.get(url).then(
        response => {
          if (response.data.success) {
            this.tableData = response.data.data.res_note_list
            this.total = response.data.data.total
          } else {

          }

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
            message: '恢复成功!',
            duration:  3000,
            showClose: true
          });
        }
      ).catch(error => {

      });
    },
    handleDelete(index, row) {

      this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        const url = `/note/remove/forever/${row.id}`
        const note = row
        axios.get(url).then(
          response => {
            this.$message({
              type: 'success',
              message: '已永久删除不可恢复!',
              duration:  3000,
              showClose: true
            });
            this.initTableData(this.currentPage, this.pageSize)
          }
        ).catch(error => {
        });

      }).catch(() => {
        this.$message({
          message: '已取消删除!',
          duration:  3000,
          showClose: true
        });
      });


    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(pageSize);
      let pageSize = this.pageSize

      this.initTableData(1, this.pageSize)
    },
    handleCurrentChange(val) {
      let pageSize = this.pageSize
      this.initTableData(val, this.pageSize)
    }


  },
}
</script>

<style scoped>

</style>
