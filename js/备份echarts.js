createTrendOption = {
    grid: [
        {x: '7%', y: '8%', width: '86%', height: '38%'},
        {x: '7%', y2: '16%', width: '86%', height: '38%'}
    ],
    legend:[
        {
            icon: 'rect',
            itemWidth: 20,
            itemHeight: 5,
            itemGap: 20,
            data: ['20粒','25粒'],
            right: '7%',
            top:'10px',
            textStyle: {
                fontSize: 12,
                color: '#000000'
            }
        }
    ],
    dataZoom: [
        {
            show: true,
            type: 'slider',
            left: '7%',
            width: '86%',
            height: '10px',
            bottom: '10px',
            backgroundColor:'rgba(0,0,0,0.05)',
            borderColor:'rgba(0,0,0,0)',
            fillerColor:'rgba(24,144,255,1)',
            start: 0,
            end: 90,
            zoomLock:true,//禁止缩放
            xAxisIndex: [0,1],
            filterMode: 'empty',
            showDataShadow: false,
            throttle:300,
            showDetail:false//不显示文字
        }
    ],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter:function(params){
            var index = params[0].dataIndex;
            var name = params[0].name;
            for(var i = 0;i<params.length;i++){
                name += ('<br/>'+params[i].marker+params[i].seriesName+params[i].data);
            };
            return name;
        },
        extraCssText: 'padding:5px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
    },
    xAxis: [
        {   
            show:false,
            gridIndex: 0,
            data:[1,2,3,4,5,6,7,8,9,10,11]
        },
        {   
            gridIndex:1,
            axisLine:{
                show:false
            },
            data:[1,2,3,4,5,6,7,8,9,10,11]
        }
    ],
    yAxis: [
        {gridIndex: 0, min: 0, max: 15,name:'生产量(件)'},
        {gridIndex: 1, min: 0, max: 15,inverse:true,name:'采摘量(公斤)'}
    ],
    series: [
        {
            name: '20粒',
            type: 'bar',
            barCategoryGap: '0px',
            barGap:'0px',
            barWidth:'15px',
            data: [10.0,8.0,13.0,9.0,11.0,14.0,6.0,4.0,12.0,7.0,5.0]
        },
        {
            name: '25粒',
            type: 'bar',
            barCategoryGap: '0px',
            barGap:'0px',
            barWidth:'15px',
            data: [10.0,4.0,12.0,7.0,5.0,8.0,13.0,9.0,11.0,14.0,6.0]
        },
        {
            name: '采摘量',
            type: 'bar',
            barCategoryGap: '0px',
            barWidth:'15px',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [10.0,14.0,6.0,4.0,12.0,7.0,5.0,8.0,13.0,9.0,11.0]
        }
    ]
};



xAxis: [{
    type: 'category',
    boundaryGap: false,
    axisLine: {
        lineStyle: {
            color: '#ffffff'
        }
    },
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
}],
yAxis: [{
    type: 'value',
    name: '单位（条）',
    axisTick: {
        show: false
    },
    axisLine: {
        lineStyle: {
            color: '#ffffff'
        }
    },
    axisLabel: {
        margin: 10,
        textStyle: {
            fontSize: 14
        }
    },
    splitLine: {
        lineStyle: {
            color: '#ffffff'
        }
    }
}],
series: [{
    name: '种植信息',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
        normal: {
            width: 2
        }
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(92, 182, 92, 1)'
            }, {
                offset: 0.7,
                color: 'rgba(92, 182, 92, 0.3)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
        }
    },
    itemStyle: {
        normal: {
            color: 'rgb(92, 182, 92)',
            borderColor: 'rgba(92, 182, 92,0.27)',
            borderWidth: 12
        }
    },
    data: [0,0,1,0,1,0,0,0,0,0,0,0]            }, {
    name: '施肥记录',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
        normal: {
            width: 2
        }
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(240, 173, 78, 1)'
            }, {
                offset: 0.7,
                color: 'rgba(240, 173, 78, 0.3)'
            }], false),
            shadowColor: 'rgba(227, 91, 91, 0.1)',
            shadowBlur: 10,
        }
    },
    itemStyle: {
        normal: {
            color: 'rgb(240, 173, 78)',
            borderColor: 'rgba(227, 91, 91,0.2)',
            borderWidth: 12
        }
    },
    data: [158,59,52,166,565,248,302,150,0,0,0,0]            }, {
    name: '农药记录',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
        normal: {
            width: 2
        }
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(217, 83, 79, 1)'
            }, {
                offset: 0.7,
                color: 'rgba(217, 83, 79, 0.3)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
        }
    },
    itemStyle: {
        normal: {
            color: 'rgb(217, 83, 79)',
            borderColor: 'rgba(68, 182, 174,0.2)',
            borderWidth: 12
        }
    },
    data: [183,84,428,209,510,268,451,23,0,0,0,0]            },{
    name: '生长记录',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
        normal: {
            width: 2
        }
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(79, 217, 183, 1)'
            }, {
                offset: 0.7,
                color: 'rgba(79, 217, 183, 0.3)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
        }
    },
    itemStyle: {
        normal: {
            color: 'rgb(79, 217, 183)',
            borderColor: 'rgba(135, 117, 167,0.2)',
            borderWidth: 12
        }
    },
    data: [196,69,3,0,0,5,0,40,74,0,0,0]            },{
    name: '灾害记录',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
        normal: {
            width: 2
        }
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(92, 192, 222, 1)'
            }, {
                offset: 0.7,
                color: 'rgba(92, 192, 222, 0.3)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
        }
    },
    itemStyle: {
        normal: {
            color: 'rgb(92, 192, 222)',
            borderColor: 'rgba(20, 170, 228,0.2)',
            borderWidth: 12
        }
    },
    data: [0,0,0,0,0,0,0,0,0,0,0,0]            },{
    name: '采摘记录',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
        normal: {
            width: 2
        }
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(251, 240, 145, 1)'
            }, {
                offset: 0.7,
                color: 'rgba(251, 240, 145, 0.3)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
        }
    },
    itemStyle: {
        normal: {
            color: 'rgb(251, 240, 145)',
            borderColor: 'rgba(79, 92, 101,0.2)',
            borderWidth: 12
        }
    },
    data: [0,0,0,0,0,5,0,3,0,0,0,0]            }, 
]