var pie = new d3pie("pieChart-01", {
	"header": {
		"title": {
			"text": "20161221",
			"fontSize": 21,
		},
		"subtitle": {
			"text": "古亭測站資料",
			"color": "#907d7d",
			"fontSize": 12,
		},
		"location": "pie-center",
		"titleSubtitlePadding": 2
	},
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "open sans",
		"location": "bottom-left"
	},
	"size": {
		"canvasHeight": 350,
		"canvasWidth": 350,
		"pieInnerRadius": "53%",
		"pieOuterRadius": "64%"
	},
	"data": {
		"sortOrder": "label-desc",
		"smallSegmentGrouping": {
			"enabled": true,
			"value": 2
		},
		"content": [
			{
				"label": "濃度:0-11",
				"value": 5,
				"color": "#b2fba8"
			},
			{
				"label": "濃度:12-23",
				"value": 3,
				"color": "#49eb28"
			},
			{
				"label": "濃度:24-35",
				"value": 1,
				"color": "#04b12f"
			},
			{
				"label": "濃度:36-41",
				"value": 0,
				"color": "#f2ff03"
			},
			{
				"label": "濃度:42-47",
				"value": 2,
				"color": "#ffc929"
			},
			{
				"label": "濃度:48-53",
				"value": 3,
				"color": "#ff9100"
			},
			{
				"label": "濃度:54-58",
				"value": 1,
				"color": "#fd6b78"
			},
			{
				"label": "濃度:59-64",
				"value": 1,
				"color": "#ff2929"
			},
			{
				"label": "濃度:65-70",
				"value": 3,
				"color": "#c00c0c"
			},
			{
				"label": "濃度: >71",
				"value": 1,
				"color": "#b317b2"
			}
		]
	},
	"labels": {
		"outer": {
			"format": "label-percentage2",
			"hideWhenLessThanPercentage": 8,
			"pieDistance": 14
		},
		"inner": {
			"format": "value",
			"hideWhenLessThanPercentage": 15
		},
		"mainLabel": {
			"color": "#0b0202",
			"fontSize": 12
		},
		"percentage": {
			"color": "#341f1f",
			"fontSize": 13,
			"decimalPlaces": 0
		},
		"value": {
			"color": "#41413a",
			"font": "courier",
			"fontSize": 22
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"tooltips": {
		"enabled": true,
		"type": "placeholder",
		"string": "{label}: {value}, {percentage}%",
		"styles": {
			"fadeInSpeed": 216
		}
	},
	"effects": {
		"load": {
			"speed": 1030
		},
		"pullOutSegmentOnClick": {
			"speed": 460,
			"size": 9
		}
	},
	"misc": {
		"colors": {
			"segmentStroke": "#000000"
		},
		"gradient": {
			"enabled": true,
			"percentage": 100,
			"color": "#d6d6d6"
		},
		"canvasPadding": {
			"top": 2,
			"right": 2,
			"bottom": 2,
			"left": 2
		}
	},
	"callbacks": {
		"onClickSegment": null
	}
});
