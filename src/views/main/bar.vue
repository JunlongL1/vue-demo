<template>
  <h3>bar chart</h3>
    <Direction :direction="direction">
      <!-- <div class="bar" style="margin-top: 100px"> -->
      <div id="barRef" ref="barRef" style="width: 400px; height: 400px"></div>
      <div>test</div>
      <div>test</div>
      <el-form label-width="80px">
        <el-form-item class="subForm" label="查询内容">
        </el-form-item>
        <div class="subForm">
          <el-form-item label="匹配度">
          </el-form-item>
          <el-form-item label="匹配数量">
          </el-form-item>
          <div style="flex: 1" />
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <!-- </div> -->
    </Direction>
</template>

<script>
import { defineComponent, onMounted, ref, shallowRef } from 'vue'
import echarts from '../../lib/echarts'
import Direction from '../../components/direction.vue'

export default defineComponent({
  components: {
    Direction
  },
  setup() {
    const barRef = ref(null)
    const chartInstance = shallowRef(null)
    const d = ref('row')
    onMounted(() => {
      chartInstance.value = echarts.init(barRef.value)
      const options = {
          title: {
              text: 'ECharts Getting Started Example'
          },
          tooltip: {},
          legend: {
              // data: ['sales']
          },
          xAxis: {
              data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
          },
          yAxis: {},
          series: [
              {
              // name: 'sales',
              type: 'bar',
              smooth:'true',
              data: [5, 20, 36, 10, 10, 20]
              },
              {
              // name: 'sales',
              type: 'bar',
              smooth:'true',
              data: [10, 20, 32, 13, 1, 2]
              }
          ]
      } 
      chartInstance.value.setOption({ baseOption: options })
      chartInstance.value.resize()
      console.log('bar', d.value)
      })
    
    return {
      barRef,
      direction: d.value
    }
  }
})
</script>

<style>

.bar
{
  animation: mymove 1s;
  /* display: flex;
  flex-direction: row;
  justify-content: flex-end; */
}

/* .direction
{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
} */

@keyframes mymove {
    50% {margin: 50px;}
}
</style>