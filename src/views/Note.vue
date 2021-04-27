<template>
  <div v-if="isLogin">
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table
      ref="filterTable"
      :data="tableData"
      >
      <el-table-column
        prop="updated_at"
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

      <el-table-column
        prop="tag"
        label="标签"

        :filters="tags"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag

            disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column  >

        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="handleRead(scope.$index, scope.row)">阅读</el-button>
          <el-button
            size="mini"
            @click="handleForward(scope.$index, scope.row)">分享</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>



    <el-dialog title="转发内容" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item>

          <el-select v-model="value" clearable placeholder="用户">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.username"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>

          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入转发内容"
            v-model="forwardContent">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="forward">转 发</el-button>
      </div>
    </el-dialog>


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
    let url = `/note/list?uid=${this.user.id}`
    axios.get(url).then(
      response => {
        this.tableData = response.data.res_note_list

      }
    ).catch(error => {

    });

    url = `/note/tag/list?uid=${this.user.id}`
    axios.get(url).then(
      response => {
        this.tags = response.data.note_tag_name_list
        console.log(this.tags)
      }
    ).catch(error => {

    });

    url = `/accounts/user/list?uid=${this.user.id}`
    axios.get(url).then(
      response => {
        this.options = response.data.user_list
      }
    ).catch(error => {

    });

  },
  data() {
    return {
      dialogFormVisible:false,
      forwardContent: '',
      tableData: [],
      curRow: {},
      tags: [],
      filterDate:[],
      options: [{
        id: '选项1',
        username: '黄金糕'
      }],
      value: ''
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
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push(`/note/add?id=${row.id}`)
    },
    handleRead(index, row) {
      console.log(index, row);
      this.$router.push(`/note/read/${row.id}`)
    },
    handleForward(index, row) {
      console.log(index, row, 'share');
      this.dialogFormVisible = true
      this.curRow = row
    },
    handleDelete(index, row) {
      console.log(index, row);

      this.$confirm(`此操作将删除标题为${row.title}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        const url = `/note/remove/${row.id}`
        const note = row
        axios.get(url).then(
          response => {
            this.tableData = response.data.res_note_list
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration:  500,
              showClose: true
            });
          }
        ).catch(error => {

        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration:  500,
          showClose: true
        });
      });


    },
    forward() {

      if (this.value === '') {
        this.$message({
          type: 'error',
          message: '转发失败，请选择转发用户！！！',
          duration:  500,
          showClose: true
        });
        return;
      }

      this.dialogFormVisible = false
      const url = `/note/forward/save`
      const data = {
        from_id: this.user.id,
        to_id: this.value,
        noteId: this.curRow.id,
        forwardContent: this.forwardContent
      }
      axios.post(url, data).then(
        response => {
          this.forwardContent = ''
          this.value = ''
          this.$message({
            type: 'success',
            message: '转发成功!',
            duration: 500
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
