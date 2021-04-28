<template>
  <div v-if="isLogin">

    <el-select
      v-model="cat_value"
      multiple
      filterable
      default-first-option
      placeholder="请选择文章标签"
      @change="selectTags"
    >
      <el-option
        v-for="item in cat_options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-table
      ref="filterTable"
      :data="tableData"
      max-height="500px"
      >
      <el-table-column
        prop="updated_at"
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



      <el-table-column min-width="300px" label="操作"  >

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
    const tags = this.cat_value.toString()
    this.initTableData(1, this.pageSize, tags)

    // 查询标签
    url = `/note/tag/list?uid=${this.user.id}`
    axios.get(url).then(
      response => {
        this.cat_options = response.data.note_tag_name_list
      }
    ).catch(error => {
    });

    // 查询系统用户信息
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
      cat_options: [],
      cat_value: [],
      dialogFormVisible:false,
      forwardContent: '',
      tableData: [],
      curRow: {},
      tags: [],
      filterDate:[],
      options: [],
      value: '',
      //分页
      currentPage: 1,
      pageSize: 5,
      pageSizes: [5, 7],
      total: 100
    }
  },
  methods: {
    selectTags() {

        let curPage = 1
        let pageSize = this.pageSize
        let tags = this.cat_value.toString()
        this.initTableData(1, pageSize, tags)
    },
    initTableData(curPage=1,pageSize=5, tags='') {
      let url = `/note/list?uid=${this.user.id}&curPage=${curPage}&pageSize=${pageSize}&tags=${tags}`
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
            this.initTableData(this.currentPage, this.pageSize, this.cat_value.toString())
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
    },
    handleSizeChange(val) {
      this.pageSize = val

      console.log(pageSize);
      let pageSize = this.pageSize
      let tags = this.cat_value.toString()
      this.initTableData(1,this.pageSize,tags)

    },
    handleCurrentChange(val) {

      let pageSize = this.pageSize
      let tags = this.cat_value.toString()
      this.initTableData(val,this.pageSize,tags)


    }
  },
}
</script>

<style scoped>

</style>
