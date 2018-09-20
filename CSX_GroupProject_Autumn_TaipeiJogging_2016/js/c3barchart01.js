var chart = c3.generate({
    size: {
        height: 300,
        width: 400
    },
    data: {
        columns: [
            ['最低前五名的次數',13,14,16,14,12,7,7,5,4,5,3,10,11,6,6,4,5,3,1,6,8,10,12,12],
        ],
        type: 'bar'
    },
    colors: {
        最低前五名的次數:'rgb(122, 162, 240)'
    },
    bar: {
        // width: {
        //     ratio: 0.1 // this makes bar width 50% of length between ticks
        // }
        // or
        width: 10 // this makes bar width 100px
    },
		axis: {
	y: {
		label: { // ADD
			text: '次數',
			position: 'outer-middle'
		}
	},
}
});
