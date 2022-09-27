<template>
  <div ref="graphRef" style="width: 1000px; height: 400px"></div>
</template>

<script>
  import { defineComponent, ref, onMounted, shallowRef } from 'vue'
  import echarts from '../../lib/echarts'

  export default defineComponent({
    setup() {
      const graphRef = ref(null)
      const myChart = shallowRef(null)
      const currentGraph = {
        nodes: {},
        links: {}
      }
      const nodeMap = {}
      
      const categories = [{
        name: "a"
      },{
        name: "b"
      },{
        name: "c"
      }]
      // 页面加载时，第一次初始化图
      const init = () => {
        // 根据定义的常量，产生currentGraph的默认数据
        // 遍历全部nodes和links，产生node映射map
        // for (let i = 0; i < graph.nodes.length; i++) {
        //   if (graph.nodes[i].category === defaultCategory) {
        //     currentGraph.nodes[graph.nodes[i].name] = graph.nodes[i]
        //   }
        //   nodeMap[graph.nodes[i].name] = graph.nodes[i]
        //   nodeMap[graph.nodes[i].name]["links"] = {}
        //   nodeMap[graph.nodes[i].name]["nodes"] = {}
        //   nodeMap[graph.nodes[i].name]["hasAppend"] = false
        // }
        // for (let i = 0; i < graph.links.length; i++) {
        //   let link = graph.links[i];
        //   if (nodeMap[link.source] !== undefined && nodeMap[link.target] !== undefined) {
        //     nodeMap[link.source].links[link.target] = link
        //     nodeMap[link.source].nodes[nodeMap[link.target].name] = nodeMap[link.target]
        //   }
        // }
        // for (let i = 0; i < graph.nodes.length; i++) {
        //   graph.nodes[i].itemStyle = null
        //   graph.nodes[i].label = {
        //     normal: {
        //       show: graph.nodes[i].symbolSize > 15,
        //     },
        //   }
        // }
        const newNode = {
          name: '0',
          value: 1,
          category: 'a',
          symbolSize: 100,
          nodes: {},
          links: {},
          hasAppend: false
        }
        nodeMap[newNode.name] = newNode
        currentGraph.nodes[newNode.name] = newNode
        myChart.value.on("click", function (params) {
          console.log(params)
          if (params.dataType === "node") {
            const node = nodeMap[params.data.name]
            if (node.hasAppend === true) {
              remove(node.name)
            } else {
              append(node.name)
            }
          }
        })
        redrawGraph()
      }
      const redrawGraph = () => {
        option.series[0].data = Object.values(currentGraph.nodes)
        option.series[0].links = Object.values(currentGraph.links)
        myChart.value.setOption(option)
        // 参考树节点修改上面的节点折叠
        // if (option && typeof option === "object") {
        //   myChart.value.setOption(option, true);
        //   myChart.value.on("mousedown", (e) => {
        //     const name = e.data.name;
        //     const curNode = myChart.value._chartsViews[0]._data.nodes.find((item) => {
        //       return item.name === name;
        //     });
        //     const depth = curNode.depth;
        //     const curIsExpand = curNode.isExpand;
        //     myChart.value._chartsViews[0]._data.tree._nodes.forEach((item, index) => {
        //       if (item.depth === depth && item.name !== name && !curIsExpand) {
        //         item.isExpand = false;
        //       }
        //     });
        //   });
        // }
        myChart.value.resize()
      }
      // 处理点击节点展开
      const append = (nodeName) => {
        
        // 根据nodeName从nodeMap里拿出对应的nodes和links，并append到currentGraph.nodes currentGraph.links
        let node = nodeMap[nodeName]
        if (node.hasAppend === true || Object.keys(node.nodes).length === 0 || Object.keys(node.links).length === 0) {
          const newNode = {
            name: nodeName + '1',
            value: 1,
            category: 'b',
            symbolSize: 50,
            nodes: {},
            links: {},
            hasAppend: false
          }
          const newLink = {
            source: nodeName,
            target: newNode.name,
            label: {
              show: true,
              formatter: 'test'
            }
          }
          nodeMap[newNode.name] = newNode

          nodeMap[nodeName].nodes[newNode.name] = newNode
          nodeMap[nodeName].links[newNode.name] = newLink
        }
        Object.values(node.nodes).forEach((n) => {
          currentGraph.nodes[n.name] = n;
        })
        Object.values(node.links).forEach((l) => {
          currentGraph.links[l.source + "_" + l.target] = l;
        })
        node.hasAppend = true
        redrawGraph()
      }
      // 处理点击节点收缩
      const remove = (nodeName) => {
        //根据nodeName从nodeMap里拿出对应的nodes和links，从currentGraph.nodes currentGraph.links删除当前节点的nodes和links并且递归
        let node = nodeMap[nodeName];
        Object.values(node.nodes).forEach((n) => {
          delete currentGraph.nodes[n.name]
          if (n.hasAppend === true && Object.keys(n.nodes).length > 0) {
            remove(n.name);
          }
        })
        Object.values(node.links).forEach((l) => {
          delete currentGraph.links[l.source + "_" + l.target]
        })
        // 设置flag 等于false
        node.hasAppend = false

        redrawGraph()
      }
      const option = {
        title: {
          text: 'test',
          top: "top",
          left: "center",
        },
        tooltip: {},
        legend: [],
        animation: false,
        series: [
          {
            type: "graph",
            layout: "force",
            data: Object.values(currentGraph.nodes),
            links: Object.values(currentGraph.links),
            categories: categories,
            roam: false,
            focusNodeAdjacency: false,
            label: {
              position: "right",
              formatter: "{b}",
            },
            lineStyle: {
              color: "target",
              opacity: 0.6,
            },
            emphasis: {
              lineStyle: {
                width: 10,
              },
            },
            force: {
              layoutAnimation: false,
              repulsion: 5000,
            },
          },
        ],
      }

      

      onMounted(() => {
        myChart.value = echarts.init(graphRef.value)
        init()
      })

      return {
        graphRef
      }
    }
  })
</script>