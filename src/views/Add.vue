<template>
  <div>
    <el-row>
      <el-col  :xs="20" :sm="20" :md="20">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
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
      </el-col>

    </el-row>
    <div style="margin: 20px 0;"></div>
    <el-row>
      <el-col :span="6">
        <el-input  size="small" v-model="note.title" placeholder="请输入标题"></el-input>
      </el-col>
      <el-col :span="14"><i class="el-icon-edit"></i></el-col>
      <el-col :span="4">
        <el-button @click="saveNote" plain icon="el-icon-circle-check">保存</el-button>
      </el-col>
    </el-row>
    <el-divider><i class="el-icon-magic-stick"></i></el-divider>
    <div id="div1">

    </div>

  </div>

</template>

<script>
import axios from "axios";
import {mapState} from 'vuex'
import E from "wangeditor"
let editor = null
export default {
  name: "Test",

  mounted() {
    editor = new E("#div1")
    editor.config.height = 400
    editor.config.uploadImgServer = '/upload-img'
    editor.create()

    // console.log(this.$route.query.id)
    this.note.id = this.$route.query.id
    const url = `/note/${this.note.id}`
    if (this.$route.query.id) {
      axios.get(url).then(
        response => {
          console.log(response.data)
          // this.dynamicTags = response.data.note.tags
          this.note = response.data
          this.dynamicTags = this.note.tags


        }
      ).catch(error => {

      });
    }


  },
  computed: {
    ...mapState(['user', 'isLogin'])

  },
  data() {
    return {
      id: -1,
      note: {
        id: -1,
        title: '',
        content: '',
        tags:[]
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''

    }
  },
  methods: {
    saveNote() {

      this.note.content = editor.txt.html()
      console.log(this.note.content)
      this.note.user = this.user
      const url = '/note/save'
      this.note.tags = this.dynamicTags
      axios.post(url, this.note).then(
        response => {
          console.log(response.data)

          this.$message({
            message: `标题为${this.note.title}的笔记保存成功`,
            type: 'success'
          });
          this.$router.replace('/note')

        }
      ).catch(error => {

      });
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style scoped>

</style>
