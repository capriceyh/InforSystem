<template>
    <div>
      <el-row :gutter="10" style="margin-bottom: 40px">
        <el-col :span="6">
          <el-card style="color: #409EFF">
            <div><i class="el-icon-user-solid"></i>用户总数</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              100
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #F56C6C">
            <div><i class="el-icon-money" />销售总量</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              ￥ 1000000
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #67C23A">
            <div><i class="el-icon-bank-card" />收益总额</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              ￥ 100000
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="color: #E6A23C">
            <div><i class="el-icon-s-shop" />门店总数</div>
            <div style="padding: 10px 0; text-align: center; font-weight: bold">
              1000
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :span="12">
        <el-col :span="12">
          <el-card class="box-card">
            <div id="main" style="width: 500px; height: 450px"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div id="pie" style="width: 500px; height: 450px"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';


export default {
  name: "Home",
  data() {
    return {

    }
  },
  mounted() {
    // 折线和柱状图
    let chartDom = document.getElementById('main');
    let myChart = echarts.init(chartDom);
    let option = {
      title: {
        text: '各季度会员数量统计',
        subtext: '趋势图',
        left: 'center'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: ["第一季度", "第二季度", "第三季度", "第四季度"]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'a',
          data: [],
          type: 'line'
        },
        {
          name: 'a',
          data: [],
          type: 'bar'
        },
        {
          name: 'b',
          data: [],
          type: 'line'
        },
        {
          name: 'b',
          data: [],
          type: 'bar'
        }
      ]
    };

    // 饼图
    let pieChartDom = document.getElementById('pie');
    let pieMyChart = echarts.init(pieChartDom);
    let pieOption = {
      title: {
        text: '各季度会员数量统计',
        subtext: '比例图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: '60%',
          label:{       // 饼图图形上的文本标签
            normal:{
              show:true,
              position:'inner',  // 标签的位置
              textStyle: {
                fontWeight: 300,
                fontSize: 16,  // 文字的字体大小
                color: '#fff'
              },
              formatter: '{d}%'
            }
          },
          data: [], // 填空
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    this.request.get("/echarts/members").then(res => {
      option.series[0].data = res.data
      option.series[1].data = res.data
      option.series[2].data = [5,6,7,8]
      option.series[3].data = [5,6,7,8]
      myChart.setOption(option);

      pieOption.series[0].data = [
        {name: "第一季度", value: res.data[0]},
        {name: "第二季度", value: res.data[1]},
        {name: "第三季度", value: res.data[2]},
        {name: "第四季度", value: res.data[3]},
      ]
      pieMyChart.setOption(pieOption)
    })
  }
}
</script>

<style scoped>

.box-card {
  width: 580px;
}
</style>