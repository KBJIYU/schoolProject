//画布大小
var width = 400;
var height = 300;

//在 body 里添加一个 SVG 画布
var svg = d3.select("#chart")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

//画布周边的空白
var padding = {left:5, right:5, top:5, bottom:5};

//定义一个数组
var dataset = [13,14,16,14,12,7,7,5,4,5,3,10,11,6,6,4,5,3,1,6,8,10,12,12];

//x轴的比例尺
var xScale = d3.scale.ordinal()
		.domain(d3.range(dataset.length))
		.rangeRoundBands([0, width - padding.left - padding.right]);

//y轴的比例尺
var yScale = d3.scale.linear()
		.domain([0,d3.max(dataset)])
		.range([height - padding.top - padding.bottom, 0]);

//定义x轴
var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");

//定义y轴
var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

//矩形之间的空白
var rectPadding = 4;

//添加矩形元素
var rects = svg.selectAll(".MyRect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class","MyRect")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
				return xScale(i) + rectPadding/2;
		} )
		.attr("width", xScale.rangeBand() - rectPadding )
		.attr("y",function(d){
				var min = yScale.domain()[0];
				return yScale(min);
		})
		.attr("height", function(d){
				return 0;
		})
		.transition()
		.delay(function(d,i){
				return i * 200;
		})
		.duration(2000)
		.ease("bounce")
		.attr("y",function(d){
				return yScale(d);
		})
		.attr("height", function(d){
				return height - padding.top - padding.bottom - yScale(d);
		});

//添加文字元素
var texts = svg.selectAll(".MyText")
		.data(dataset)
		.enter()
		.append("text")
		.attr("class","MyText")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
				return xScale(i) + rectPadding/2;
		} )
		.attr("dx",function(){
				return (xScale.rangeBand() - rectPadding)/2;
		})
		.attr("dy",function(d){
				return 20;
		})
		.text(function(d){
				return d;
		})
		.attr("y",function(d){
				var min = yScale.domain()[0];
				return yScale(min);
		})
		.transition()
		.delay(function(d,i){
				return i * 200;
		})
		.duration(2000)
		.ease("bounce")
		.attr("y",function(d){
				return yScale(d);
		});

//添加x轴
svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
		.call(xAxis);

//添加y轴
svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.call(yAxis);
