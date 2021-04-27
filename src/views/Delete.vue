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

      >
      </el-table-column>

      <el-table-column
        prop="title"
        label="标题"
        >
      </el-table-column>


      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRead(scope.$index, scope.row)">阅读</el-button><el-button
            size="mini"
            @click="handleRestore(scope.$index, scope.row)">恢复</el-button>
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
    const url = `/note/remove?uid=${this.user.id}`
    axios.get(url).then(
      response => {
        console.log(response.data.res_note_list)
        this.tableData = response.data.res_note_list
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
    handleRead(index, row) {
      // console.log(index, row);
      this.$router.push(`/note/read/${row.id}`)
    },
    handleRestore(index, row) {
      // console.log(index, row);

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
    }


  },
}
</script>

<style scoped>

</style>
