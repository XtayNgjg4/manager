<!--  -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div id="main" style="width:600px;height:400px"></div>
    </el-card>

    <el-card>
      <chart-card></chart-card>
    </el-card>
  </div>
</template>

<script>
import echarts from "@/plugins/echarts";
import _ from 'lodash'
import ChartCard from "@/components/Charts/ChartCard";
export default {
  data() {
    return {
      loading: true,
      options:{
        title:{text:'用户来源'},
        tooltip:{
          trigger:'axis',
          axisPointer:{
            type:'cross',
            label:{
              backgroundColor:'#e9eef3'
            }
          }
        },
        grid:{
          left:'3%',
          right:'4%',
          bottom:'3%',
          containLabel:true
        },
        xAxis:[
          {
            boundaryGap:false
          }
        ],
        yAxis:[
          {
            type:'value'
          }
        ]
      }
    }
  },

  components: {
    ChartCard
  },
  async mounted() {
    var myChart = echarts.init(document.getElementById("main"));

   const {data:res} = await this.$http.get('reports/type/1')
     
     if (res.meta.status!==200) {
       return this.$msg.error("失败")
     }

     const result = _.merge(res.data,this.options)

    // var option = {
    //   title: {
    //     text: "ECharts 入门示例"
    //   },
    //   tooltip: {},
    //   legend: {
    //     data: ["销量"]
    //   },
    //   xAxis: {
    //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: "销量",
    //       type: "bar",
    //       data: [5, 20, 36, 10, 10, 20]
    //     }
    //   ]
    // };

    myChart.setOption(result);
  },
  methods: {}
};
</script>
<style lang='scss' scoped>
</style>