<template>
  <div class="ql-editor my-read"
       v-html="content">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Read",
  mounted() {
    console.log(this.$route.params.id)
    const url = `/note/${this.$route.params.id}`
    axios.get(url).then(
      response => {
        console.log(response.data)
        this.content = response.data.data.content
      }
    ).catch(error => {

    });
  },
  data() {
    return {
      note_id: -1,
      content: '',

    }
  }
}
</script>

<style>


</style>
