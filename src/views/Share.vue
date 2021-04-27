<template>
  <div>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="created_at"
        label="日期"
        sortable
        column-key="date"
      >


      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
      >
      </el-table-column>
      <el-table-column
        prop="content"
        label="转发内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">阅读</el-button>
        </template>
      </el-table-column>
    </el-table>



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
    const url = `/note/forward/list`
    const user = this.user
    axios.post(url, user).then(
      response => {
        console.log(response.data.res_note_forward_list)
        this.tableData = response.data.res_note_forward_list
      }
    ).catch(error => {

    });

  },
  data() {
    return {
      tableData: []
    }
  },
  methods: {
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
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push(`/note/read/${row.note_id}`)
    }


  },
}
</script>

<style scoped>

</style>
