<template>
  <div>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="created_at"
        label="日期"
        sortable
        column-key="date"
        min-width="100px"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户"
        min-width="50px"
      >
      </el-table-column>
      <el-table-column
        prop="content"
        label="转发内容"
        min-width="100px">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRead(scope.$index, scope.row)">阅读</el-button>
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
   /* const url = `/note/forward/list`
    const user = this.user
    axios.post(url, user).then(
      response => {
        console.log(response.data.res_note_forward_list)
        this.tableData = response.data.res_note_forward_list
      }
    ).catch(error => {

    });*/
    this.initTableData(this.currentPage, this.pageSize)

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

      const url = `/note/forward/list?uid=${this.user.id}&curPage=${curPage}&pageSize=${pageSize}`
      axios.get(url).then(
        response => {
          this.tableData = response.data.res_note_forward_list
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
      console.log(index, row);
      this.$router.push(`/note/read/${row.note_id}`)
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
