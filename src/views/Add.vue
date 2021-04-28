<template>
  <div>
    <el-row>
      <el-col  :xs="20" :sm="20" :md="20">
        <el-select @change="selectTags"
          v-model="cat_value"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签">
          <el-option
            v-for="item in cat_options"
            :key="item.value"
            :label="item.label"
            :value="item.value" >
          </el-option>
        </el-select>
        <el-tag id="tags"
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>

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
    editor.config.zIndex = 99
    // editor.config.uploadImgServer = 'http://127.0.0.1:8080/api/upload'
    editor.create()

    console.log(this.$route.query.id)
    this.note.id = this.$route.query.id
    let url = `/note/${this.note.id}`
    if (this.$route.query.id) {
      axios.get(url).then(
        response => {
          console.log(response.data)
          // this.dynamicTags = response.data.note.tags
          this.note = response.data
          this.note.id = this.$route.query.id
          this.cat_value = this.note.tags
          editor.txt.html(this.note.content) // 重新设置编辑器内容

        }
      ).catch(error => {

      });
    }

    url = `/note/tag/list?uid=${this.user.id}`
    axios.get(url).then(
      response => {
        this.cat_options = response.data.note_tag_name_list
        console.log(this.cat_options)
      }
    ).catch(error => {

    });



  },
  computed: {
    ...mapState(['user', 'isLogin'])

  },
  data() {
    return {
      cat_options: [],
      cat_value: [],
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
      this.note.user = this.user
      this.note.tags = this.cat_value
      if (!this.note.id) {
        this.note.id = -1
      }
      console.log(this.note)
      const url = '/note/save'

      axios.post(url, this.note).then(
        response => {
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
    },
    selectTags() {
      console.log('dd')
    }
  }
}
</script>

<style scoped>
#tags{
  z-index: 100;
}
</style>
