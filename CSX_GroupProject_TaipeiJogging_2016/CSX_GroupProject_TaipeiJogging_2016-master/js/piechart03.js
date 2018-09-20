var pie = new d3pie("pieChart-03", {
	"header": {
		"title": {
			"text": "20161204",
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
				"label": "濃度:0-35",
				"value": 24,
				"color": "#67de57"
			},
		
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
