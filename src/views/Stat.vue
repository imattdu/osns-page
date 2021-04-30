<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div id="main">1</div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import * as echarts from 'echarts';
import {mapState} from 'vuex'
import axios from "axios";

export default {
  name: "Stat",
  mounted() {
    let url = `/note/stat?uid=${this.user.id}`
    axios.get(url).then(
      response => {
        let stat_data = response.data.data
        let tags = new Array()
        let noteCount = new Array()
        for (let i = 0; i < stat_data.length; i++) {

          tags[i] = stat_data[i].tag_name
          noteCount[i] = stat_data[i].note_count
        }
        console.log(tags)
        console.log(noteCount)


        let myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
          title: {
            text: '笔记分布'
          },
          tooltip: {},
          /*dataZoom: [
            {   // 这个dataZoom组件，默认控制x轴。
              type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
              start: 10,      // 左边在 10% 的位置。
              end: 60         // 右边在 60% 的位置。
            }
          ],*/
          xAxis: {
            data: tags
          },
          yAxis: {},
          series: [{
            name: '笔记数量',
            type: 'bar',
            data: noteCount
          }],
          media: [

        {
          query: {
            maxAspectRatio: 1           // 当长宽比小于1时。
          },
          option: {
            legend: {                   // legend 放在底部中间。
              right: 'center',
                bottom: 0,
                orient: 'horizontal'    // legend 横向布局。
            },
            series: [                   // 两个饼图左右布局。
              {
                radius: [20, '50%'],
                center: ['50%', '30%']
              },
              {
                radius: [30, '50%'],
                center: ['50%', '70%']
              }
            ]
          }
        },
        {
          query: {
            maxWidth: 500               // 当容器宽度小于 500 时。
          },
          option: {
            legend: {
              right: 10,              // legend 放置在右侧中间。
                top: '15%',
                orient: 'vertical'      // 纵向布局。
            },
            series: [                   // 两个饼图上下布局。
              {
                radius: [20, '50%'],
                center: ['50%', '30%']
              },
              {
                radius: [30, '50%'],
                center: ['50%', '75%']
              }
            ]
          }
        },

      ]
        });
      }
    ).catch(error => {
    });


  },
  computed: {
    ...mapState(['isLogin', 'user']),
  },
}
</script>

<style>
#main {
  width: 600px;
  height:400px;
}
</style>
