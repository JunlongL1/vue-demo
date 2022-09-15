```json
{
	// 简要概述
	// 示例：
	// 监测时间点: 20200315，周期：14天
	// 当前周期数量: 83
	// 同比周期数量: 0，同比增长率：100.00%
	// 环比周期数量: 55，环比增长率：50.91%
	"jygs": {
		"time": "20200315",
		"day": 14,
		"period": 2,
		"tbzq": "0",
		"tbzz": "100.00%",
		"hbzq": "0",
		"hbzz": "100.00%"
	},
	// 时间趋势统计
	// chart类型见下
	"sjqstj": []chart,
	// 派出所统计
	"pcstj": []chart,
	// 热词分布
	// 传入对象数组，每个对象包括展示文字"name"以及该文字的占比"value"
	"rcfb": [
		{
			"name": "test1",
			"value": 1
		},
		{
			"name": "test2",
			"value": 2
		}
	],
	// 示例警情
	// 按照文档，传入多个文本
	"sljq": ["示例警情1","示例警情2"],
}
```

```json
// chart表示图标类型
// 若series中包含多个对象，则表示多个图的叠加
// series中的每个对象包含了图的类型与数据
// 图的类型包括："line", "bar", "pie", "scatter"等等
{
	"chart": {
		"title": "标题1",
		"xAxis": ["test1", "test2"],
		"xAxisName": "x坐标名称",
		"yAxisName": "y坐标名称",
		"series": [
			{
				"type": "line",
				"data": [1,2]
			},
			{
				"type": "line",
				"data": [3,4]
			},
		]
	}
}
```