//图表 柱状图 月份农事作业总计统计图
var nszyChart = echarts.init(document.getElementById('nszyChart'));
var nszyChartOption = {
    backgroundColor: 'transparent',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#000000'
            }
        },
        formatter: function (params) {
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 16px;padding-bottom: 7px;margin-bottom: 7px">' +
                        params[0].name +
                        '</div>' +
                        '<span style="color:' + params[0].color + '">' +
                        params[0].seriesName +
                        '</span>：' + params[0].value + ' 条<br>' +
                        '<span style="color:' + params[1].color + '">' +
                        params[1].seriesName +
                        '</span>：' + params[1].value + ' 条<br>' +
                        '<span style="color:' + params[2].color + '">' +
                        params[2].seriesName +
                        '</span>：' + params[2].value + ' 条<br>' +
                        '<span style="color:' + params[3].color + '">' +
                        params[3].seriesName +
                        '</span>：' + params[3].value + ' 条<br>' +
                        '<span style="color:' + params[4].color + '">' +
                        params[4].seriesName +
                        '</span>：' + params[4].value + ' 条<br>' +
                        '<span style="color:' + params[5].color + '">' +
                        params[5].seriesName +
                        '</span>：' + params[5].value + ' 条<br>';
        }
    },
    legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['种植信息','施肥记录','农药记录','生长记录','灾害记录','采摘记录'],
        right: '4%',
        textStyle: {
            fontSize: 12,
            color: '#000000'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#000000'
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
                color: '#000000'
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
                color: '#ccc'
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
        data: [0,0,1,0,1,0,0,0,0,0,0,0]
    }, {
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
        data: [141,59,54,157,548,241,89,0,0,0,0,0]
    }, {
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
        data: [165,68,436,211,484,252,82,0,0,0,0,0]
    },{
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
        data: [0,3,0,0,0,5,0,0,0,0,0,0]
    },{
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
        data: [0,0,0,0,0,0,0,0,0,0,0,0]
    },{
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
        data: [0,0,0,0,0,5,0,3,0,0,0,0]            
    }, ]
};
// 使用刚指定的配置项和数据显示图表。
nszyChart.setOption(nszyChartOption);


var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
var yMax = 500;
var dataShadow = [];
for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}
var pesticideOption = {
    title: {
        text: '特性示例：渐变色 阴影 点击缩放',
        subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true
    },
    xAxis: {
        data: dataAxis,
        axisLabel: {
            inside: true,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        {
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: data
        }
    ]
};

// Enable data zoom when user click bar.
var zoomSize = 6;
//图表 柱状图 月份农事作业总计统计图
// var pesticideChart = echarts.init(document.getElementById('pesticideChart'));
// pesticideChart.setOption(pesticideOption);
// pesticideChart.on('click', function (params) {
//     console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
//     pesticideChart.dispatchAction({
//         type: 'dataZoom',
//         startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
//         endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
//     });
// });

// var pesticideChart2 = echarts.init(document.getElementById('pesticideChart2'));
// pesticideChart2.setOption(pesticideOption);
// pesticideChart2.on('click', function (params) {
//     console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
//     pesticideChart2.dispatchAction({
//         type: 'dataZoom',
//         startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
//         endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
//     });
// });