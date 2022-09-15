<template>
    <div>
      <h3>line chart</h3>
      <div style="margin-top: 100px">
        <div ref="lineRef" style="width: 400px; height: 400px"></div>
      </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref, shallowRef } from 'vue'
import echarts from '../../lib/echarts'

export default defineComponent({
  setup() {
    const lineRef = ref(null)
    const chartInstance = shallowRef(null)
    onMounted(() => {
      chartInstance.value = echarts.init(lineRef.value)
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
              type: 'scatter',
              smooth:'true',
              data: [5, 20, 36, 10, 10, 20]
              }
          ]
      } 
      chartInstance.value.setOption({ baseOption: options })
      chartInstance.value.resize()
    })
    

    return {
      lineRef
    }
  }
})
</script>