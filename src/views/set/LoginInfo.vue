<template>
<div>

    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>

</div>
</template>

<script>
import {mapState} from 'vuex'
import axios from "axios";
export default {
  name: "LoginInfo",
  computed: {
    ...mapState(['isLogin', 'user']),
  },
  mounted() {
    const url = `/accounts/user/login/history/${this.user.id}`
    axios.get(url).then(
      response => {
        console.log(response.data.data)
        this.activities = response.data.data
      }
    ).catch(error => {

    });
  },
  data() {
    return {
      reverse: false,
      activities: []
    };
  }
}
</script>

<style scoped>

</style>
