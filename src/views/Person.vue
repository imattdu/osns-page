<template>
  <div>

    <el-row class="demo-avatar demo-basic">
      <el-col :xs="6" :sm="6" :md="3">
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar shape="square" :size="100" :src="person.avatar"></el-avatar>
          </div>
        </div>
      </el-col>
      <el-col :xs="18" :sm="18" :md="21">
        <el-row>
          <el-col :xs="6" :sm="6" :md="4">
            <div id="name" class="person">{{ person.username }}</div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="14">
            <div class="person" v-model="user.username">{{ person.maxim }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="18" :sm="18" :md="21">
            <div class="person">
              <i class="el-icon-s-home"></i>
              <span class="person">{{ person.address }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="18" :sm="18" :md="21">
            <div class="person">
              <i v-if="person.sex == 1" class="el-icon-male"></i>
              <i v-else class="el-icon-female"></i>
            </div>
          </el-col>
<!--<el-col :span="2">
            <div class="person">
              <el-button plain @click="dialogVisible = true">发私信</el-button>
            </div>
          </el-col>-->
        </el-row>


      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialogVisible"
      width="60%">
      <el-divider></el-divider>
      <div type="primary" class="you chat" >主要按钮主要按钮主要按钮主要
        按钮主要按钮主要按钮主要按钮主要按钮主要按钮主要按
        钮主要按钮主要按钮主要按钮主要按钮主要按钮主要
        按钮主要按钮主要按钮主要按钮主要按钮主要按钮主要按
        钮主要按钮主要按钮主要按钮主要按钮主要按钮主要
        按钮主要按钮主要按钮主要按钮主要按钮主要按钮主要按
        钮主要按钮主要按钮主要按钮主要按钮主要按钮主要
        按钮主要按钮主要按钮主要按钮主要按钮主要按钮主要按
        钮主要按钮主要按钮</div>

      <div type="primary" class="me chat" >主要按钮主要按钮主要按钮主要
        按钮主要按钮主要按钮主要按钮主要按钮主要按钮主要按
        钮主要按钮主要按钮主要按钮主要按钮主要按钮主要
        按钮主要按钮主要按钮主要按钮主要按钮主要按钮主要按
        钮主要按钮主要按钮主要按钮主要按钮主要按钮主要
        按钮主要按钮主要按钮主要按钮主要按钮主要按钮主要按
        钮主要按钮主要按钮主要按钮主要按钮主要按钮主要
        按钮主要按钮主要按钮主要按钮主要按钮主要按钮主要按
        钮主要按钮主要按钮</div>




      <div class="down"></div>
      <el-divider></el-divider>
      <el-input id="myContent" type="textarea" v-model="content"></el-input>

      <span slot="footer" class="dialog-footer"> </span>
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

    if (this.$route.query.uid) {
      this.uid = this.$route.query.uid
    } else {
      this.uid = this.user.id
    }

    const url = `/accounts/user/person?uid=${this.uid}`
    axios.get(url).then(
      response => {
        if (response.data.success) {
          console.log(response.data)
          this.person = response.data.data
        }

      }
    ).catch(error => {

    });

  },
  data() {
    return {
      uid: -1,
      squareUrl: "http://127.0.0.1:9000/static/1619589528.93363833.png",
      sizeList: ["large", "medium", "small"],
      person: {},
      content: '',

      dialogVisible: false

    }
  },
  methods: {

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    }


  }
}
</script>

<style scoped>
.person {
  padding: 15px;
}

#name {
  font-weight: bold;
  font-size: 20px;
}


.chat{
  display:inline-block;
  width: 500px;
  margin: 20px;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);



}


.you{
  background-color: white;
  color: black;
  float: left;
}

.me{
  background-color: #409eff;
  color: white;
  float: right;
}

.down{
  clear:both;
}

#myContent{
  outline-style: none ;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 14px 14px;
  width: 620px;
  font-size: 24px;
  font-family: "Microsoft soft";
}

</style>
