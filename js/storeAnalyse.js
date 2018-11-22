//农事作业统计
var farmWorkChart = echarts.init(document.getElementById('farmWorkChart')),
farmWorkOption = {
    // title: {
    //     text: '折线图堆叠'
    // },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['产品总库存','鲜果总库存']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    },
    yAxis: [
        {   
            name: '产品库存(盒)',
            type: 'value'
        },
        {   
            name: '鲜果库存(公斤)',
            type: 'value'
        }
    ],
    series: [
        {
            name:'产品总库存',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210, 290, 330, 310, 182, 191]
        },
        {   
            yAxisIndex:1,
            name:'鲜果总库存',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330]
        }
    ]
};
farmWorkChart.setOption(farmWorkOption);