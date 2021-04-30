<template>
  <div>
    <el-table
      ref="filterTable"
      :data="tableData"
      height="450px"
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
        label="用户">
        <template slot-scope="scope" >
          <el-link @click="handleToPerson(scope.$index, scope.row)" :underline="false">
            <el-avatar shape="square" :size="30" :src="scope.row.avatar"

            ></el-avatar>
          </el-link>

        </template>
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
            @click="handleRead(scope.$index, scope.row)">阅读
          </el-button>

          <!--          <el-button
                      size="mini"
                      @click="handleToPerson(scope.$index, scope.row)">{{scope.row.avatar}}
                    </el-button>-->


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
  computed: {
    ...mapState(['isLogin', 'user']),
  },
  mounted() {
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
    initTableData(curPage = 1, pageSize = 5) {

      const url = `/note/forward/list?uid=${this.user.id}&curPage=${curPage}&pageSize=${pageSize}`
      axios.get(url).then(
        response => {
          if (response.data.success) {
            console.log(response.data.data)
            this.tableData = response.data.data.res_note_forward_list
            this.total = response.data.data.total
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
      console.log(index, row);
      this.$router.push(`/note/read/${row.note_id}`)
    },
    handleToPerson(index, row) {
      const uid =row.forwardUid
      this.$router.push(`/user/person?uid=${uid}`)
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
