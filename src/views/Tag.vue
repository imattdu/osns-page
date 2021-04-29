<template>
  <div id="tag">
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{ tag }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from "axios";
export default {
  name: "Tag",
  mounted() {
   this.init()
  },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    };
  },
  computed: {
    ...mapState(['isLogin', 'user']),
  },
  methods: {
    init() {
      let url = `/note/tag/list?uid=${this.user.id}`
      axios.get(url).then(
        response => {
          if (response.data.success) {
            const note_tag_name_list  = response.data.data
            let tag_list = new Array();
            for (let i = 0; i < note_tag_name_list.length; i++) {
              tag_list[i] = note_tag_name_list[i].value
            }
            this.dynamicTags = tag_list
          } else {

          }

        }
      ).catch(error => {
      });
    },
    handleClose(tag) {
      this.$confirm('确定删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        let url = `/note/tag?uid=${this.user.id}&tag=` + tag
        axios.delete(url).then(
          response => {
            if (response.data.success) {
              this.$message({
                message: '该标签已经删除',
                type: 'success',
                showClose: true,
                duration: 3000
              });
            }

          }
        ).catch(error => {
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      if (!this.dynamicTags.includes(this.inputValue)) {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        let url = `/note/tag`
        let paramData = {}
        paramData.uid = this.user.id
        paramData.tag = this.inputValue
        axios.put(url, paramData).then(
          response => {
            this.init()
          }
        ).catch(error => {
        });
        this.inputVisible = false;
        this.inputValue = '';
      } else {
        this.$message({
          message: '该标签已经存在,请重新输入',
          type: 'warning',
          showClose: true,
          duration: 3000
        });
      }

    }
  },
  watch : {
   /* dynamicTags: function (value) {
      console.log(this.dynamicTags)
      let url = `/note/tag`
      let paramData = {}
      paramData.uid = this.user.id
      paramData.tags = this.dynamicTags
      axios.put(url, paramData).then(
        response => {
          const note_tag_name_list  = response.data.note_tag_name_list

        }
      ).catch(error => {

      });
    }*/
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

#tag {
  height: 400px;
}
</style>
