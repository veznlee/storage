//图表通用配置参数
var gChartOption = {
    axisLine:{
        lineStyle: {
            color: '#919cb6'
        }
    },
    legendColor:'#919cb6',
    tooltip:{
        backgroundColor:'#fff',
        extraCssText: 'box-shadow: 0 0 10px 2px rgba(211,215,224,1);',
        textStyle:{
            color:'#263238'
        }
    },
    tooltipColor:'#263238',
    tooltipBg:'#fff',
    tooltipExtra:'box-shadow: 0 0 20px 4px rgba(211,215,224,0.8);',
}

//乡镇果园面积统计
var townOrchardChart = echarts.init(document.getElementById('townOrchardChart')),
townOrchardOption = {
    tooltip: {
        trigger: 'item',
        // formatter: "{a} <br/>{b}：{c} ({d}%)"
        formatter: function (params) {
            if (params.seriesIndex == 1) {
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 16px;padding-bottom: 7px;margin-bottom: 7px">' +
                            params.seriesName +
                            '</div>' +
                            '<span style="color:' + params.color + '">' +
                            params.name +
                            '</span>：' + params.value + ' 个 （' + params.percent + '%）<br>';
            }else {
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 16px;padding-bottom: 7px;margin-bottom: 7px">' +
                            params.seriesName +
                            '</div>' +
                            '<span style="color:' + params.color + '">' +
                            params.name +
                            '</span>：' + params.value + ' 亩 （' + params.percent + '%）<br>';
            }
        },
        backgroundColor:gChartOption.tooltipBg,
        extraCssText: gChartOption.tooltipExtra,
        textStyle:{
            color:gChartOption.tooltipColor
        }
    },
    series: [{
        name: '果园面积占比',
        type: 'pie',
        selectedMode: 'single',
        avoidLabelOverlap: false,
        radius: ['40%', '50%'],
        center : ['45%', '40%'],
        label: {
            normal: {
                position: 'outer'
            }
        },
        labelLine: {
            normal: {
                show: true
            }
        },
        data: [{
            value: 24872,
            name:'谷堡乡',
            itemStyle:{
                normal: {
                    color: '#4c84ff'
                }
            }
        },{
            value: 9026,
            name:'龙场镇',
            itemStyle:{
                normal: {
                    color: '#815eff'
                }
            }
        },{
            value: 7571,
            name:'六广镇',
            itemStyle:{
                normal: {
                    color: '#ff86ad'
                }
            }
        },{
            value: 6546,
            name:'洒坪镇',
            itemStyle:{
                normal: {
                    color: '#19d4bd'
                }
            }
        }]
    },{
        name: '果园数量占比',
        type: 'pie',
        selectedMode: 'single',
        avoidLabelOverlap: false,
        radius: ['15%', '25%'],
        center : ['45%', '40%'],
        label: {
            normal: {
                position: 'outer'
            }
        },
        labelLine: {
            normal: {
                show: true
            }
        },
        data: [{
            value: 9026,
            name:'谷堡乡',
            itemStyle:{
                normal: {
                    color: '#4c84ff'
                }
            }
        },{
            value: 7896,
            name:'龙场镇',
            itemStyle:{
                normal: {
                    color: '#815eff'
                }
            }
        },{
            value: 24872,
            name:'六广镇',
            itemStyle:{
                normal: {
                    color: '#ff86ad'
                }
            }
        },{
            value: 12345,
            name:'洒坪镇',
            itemStyle:{
                normal: {
                    color: '#19d4bd'
                }
            }
        }]
    }]
};
townOrchardChart.setOption(townOrchardOption);

//农事作业统计
var farmWorkChart = echarts.init(document.getElementById('farmWorkChart')),
farmWorkOption = {
    grid: {
        left: '10px',
        right: '10px',
        bottom: '50px',
        top: '30px',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor:gChartOption.tooltipBg,
        extraCssText: gChartOption.tooltipExtra,
        textStyle:{
            color:gChartOption.tooltipColor
        }
    },
    legend: {
        icon: 'rect',
        itemWidth: 20,
        itemHeight: 5,
        itemGap: 20,
        data: ['施肥记录','农药记录','种植信息'],
        left: 'center',
        bottom:'10px',
        textStyle: {
            color: gChartOption.legendColor
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: gChartOption.axisLine,
        // axisLabel: {
        //     formatter: '{value}k'
        // },
        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    },
    yAxis: {   
        name: '单位(条)',
        type: 'value',
        axisLine: gChartOption.axisLine
    },
    series: [
        {
            name:'施肥记录',
            type:'line',
            smooth:true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            itemStyle: {
                normal: {
                    color: '#4c84ff',
                    borderColor: 'rgba(255, 255, 255,0.8)',
                    borderWidth: 5
                }
            },
            areaStyle: {
                normal:{
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(76, 132, 255, 0.6)'
                    }, {
                        offset: 1,
                        color: 'rgba(76, 132, 255, 0.1)'
                    }],false)
                }
            },
            data:[120, 132, 101, 134, 90, 230, 210, 290, 330, 310, 182, 191]
        },
        {   
            name:'农药记录',
            type:'line',
            smooth:true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            itemStyle: {
                normal: {
                    color: '#fe86ae',
                    borderColor: 'rgba(255, 255, 255,0.8)',
                    borderWidth: 5
                }
            },
            areaStyle: {
                normal:{
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(254, 134, 174, 0.6)'
                    }, {
                        offset: 1,
                        color: 'rgba(254, 134, 174, 0.1)'
                    }],false)
                }
            },
            data:[220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330]
        }
    ]
};
farmWorkChart.setOption(farmWorkOption);

//产品产量统计
var productChart = echarts.init(document.getElementById('productChart')),
productOption = {
    grid:{
        left: '10px', 
        right: '10px', 
        top: '10px', 
        bottom: '10px',
        containLabel: true
    },
    tooltip: {
        trigger: 'item',
        // formatter: "{a} <br/>{b}：{c} ({d}%)"
        formatter: function (params) {
            if (params.seriesIndex == 1) {
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 16px;padding-bottom: 7px;margin-bottom: 7px">' +
                            params.seriesName +
                            '</div>' +
                            '<span style="color:' + params.color + '">' +
                            params.name +
                            '</span>：' + params.value + ' 个 （' + params.percent + '%）<br>';
            }else {
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 16px;padding-bottom: 7px;margin-bottom: 7px">' +
                            params.seriesName +
                            '</div>' +
                            '<span style="color:' + params.color + '">' +
                            params.name +
                            '</span>：' + params.value + ' 亩 （' + params.percent + '%）<br>';
            }
        },
        backgroundColor:gChartOption.tooltipBg,
        extraCssText: gChartOption.tooltipExtra,
        textStyle:{
            color:gChartOption.tooltipColor
        }
    },
    legend:{
        orient: 'vertical',
        right: '40px',
        bottom:'10px',
        textStyle: {
            color: gChartOption.legendColor
        },
        data:['20粒','25粒','28粒','30粒','40粒','50粒','60粒','70粒']
    },
    series: [{
        type: 'pie',
        radius: ['50%', '70%'],
        center : ['40%', '50%'],
        label: {
            normal: {
                show:false,
                position: 'outer'
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: [{
            value: 24872,
            name:'20粒',
            itemStyle:{
                normal: {
                    color: '#EEC47B'
                }
            }
        },{
            value: 9026,
            name:'25粒',
            itemStyle:{
                normal: {
                    color: '#DE5A1B'
                }
            }
        },{
            value: 7571,
            name:'28粒',
            itemStyle:{
                normal: {
                    color: '#7094C9'
                }
            }
        },{
            value: 6546,
            name:'30粒',
            itemStyle:{
                normal: {
                    color: '#c57c59'
                }
            }
        },{
            value: 4598,
            name:'40粒',
            itemStyle:{
                normal: {
                    color: '#129567'
                }
            }
        },{
            value: 3879,
            name:'50粒',
            itemStyle:{
                normal: {
                    color: '#45CA9B'
                }
            }
        },{
            value: 3750,
            name:'60粒',
            itemStyle:{
                normal: {
                    color: '#0d80e1'
                }
            }
        },{
            value: 3456,
            name:'70粒',
            itemStyle:{
                normal: {
                    color: '#DE961B'
                }
            }
        }]
    }]
};
productChart.setOption(productOption);

//生产趋势统计
var createTrendChart = echarts.init(document.getElementById('createTrendChart')),
createTrendOption = {
    color: ['#4c84ff', '#ff86ad', '#815eff', '#fb8332', '#36ac91'],
    grid:{
        left: '50px', 
        right: '10px',
        top: '30px', 
        bottom: '40px'
    },
    legend:{
        icon: 'rect',
        itemWidth: 20,
        itemHeight: 5,
        itemGap: 20,
        data: ['20粒','25粒','30粒','35粒','40粒'],
        right: '10px',
        top:0,
        textStyle: {
            color: gChartOption.legendColor
        }
    },
    dataZoom: [
        {
            show: true,
            type: 'slider',
            left: '50px',
            right: '10px',
            height: '8px',
            bottom: '8px',
            backgroundColor:'rgba(0,0,0,0.05)',
            borderColor:'rgba(0,0,0,0)',
            fillerColor:'rgba(171,184,213,1)',
            start: 0,
            end: 90,
            zoomLock:true,//禁止缩放
            xAxisIndex: 0,
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
        backgroundColor:gChartOption.tooltipBg,
        extraCssText: gChartOption.tooltipExtra,
        textStyle:{
            color:gChartOption.tooltipColor
        }
    },
    xAxis: {
        axisLine: gChartOption.axisLine,
        data:[1,2,3,4,5,6,7,8,9,10,11]
    },
    yAxis:{
        name:'生产量(件)',
        axisLine: gChartOption.axisLine
    },
    series: [
        {
            name: '20粒',
            type: 'bar',
            barCategoryGap: '0px',
            barGap:'0px',
            barWidth:'8px',
            data: [10.0,8.0,13.0,9.0,11.0,14.0,6.0,4.0,12.0,7.0,5.0]
        },
        {
            name: '25粒',
            type: 'bar',
            barCategoryGap: '0px',
            barGap:'0px',
            barWidth:'8px',
            data: [10.0,4.0,12.0,7.0,5.0,8.0,13.0,9.0,11.0,14.0,6.0]
        },
        {
            name: '30粒',
            type: 'bar',
            barCategoryGap: '0px',
            barGap:'0px',
            barWidth:'8px',
            data: [10.0,8.0,13.0,9.0,11.0,14.0,6.0,4.0,12.0,7.0,5.0]
        },
        {
            name: '35粒',
            type: 'bar',
            barCategoryGap: '0px',
            barGap:'0px',
            barWidth:'8px',
            data: [10.0,4.0,12.0,7.0,5.0,8.0,13.0,9.0,11.0,14.0,6.0]
        },
        {
            name: '40粒',
            type: 'bar',
            barCategoryGap: '0px',
            barGap:'0px',
            barWidth:'8px',
            data: [10.0,8.0,13.0,9.0,11.0,14.0,6.0,4.0,12.0,7.0,5.0]
        }
    ]
};
createTrendChart.setOption(createTrendOption);

//采摘量统计
var pickNumChart = echarts.init(document.getElementById('pickNumChart')),
pickNumOption = {
    color: ['#4c84ff', '#ff86ad', '#815eff', '#fb8332', '#36ac91'],
    grid:{
        left: '50px', 
        right: '10px', 
        top: '30px',
        bottom: '40px'
    },
    dataZoom: [
        {
            show: true,
            type: 'slider',
            left: '50px',
            right: '10px',
            height: '8px',
            bottom: '8px',
            backgroundColor:'rgba(0,0,0,0.05)',
            borderColor:'rgba(0,0,0,0)',
            fillerColor:'rgba(171,184,213,1)',
            start: 0,
            end: 60,
            zoomLock:true,//禁止缩放
            xAxisIndex: 0,
            filterMode: 'empty',
            showDataShadow: false,
            throttle:300,
            showDetail:false//不显示文字
        }
    ],
    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type : 'shadow'
        },
        backgroundColor:gChartOption.tooltipBg,
        extraCssText: gChartOption.tooltipExtra,
        textStyle:{
            color:gChartOption.tooltipColor
        }
    },
    xAxis: {
        axisLine: gChartOption.axisLine,
        data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    },
    yAxis:{
        name:'采摘量(公斤)',
        axisLine: gChartOption.axisLine
    },
    series: [
        {
            name: '25粒',
            type: 'bar',
            barCategoryGap: '0px',
            barGap:'0px',
            barWidth:'8px',
            data: [10.0,4.0,12.0,7.0,5.0,8.0,13.0,9.0,11.0,14.0,6.0,10.0,4.0,12.0,7.0,5.0,8.0,13.0,9.0,11.0,14.0,6.0,10.0,4.0,12.0,7.0,5.0,8.0,13.0,9.0,11.0]
        }
    ]
};
pickNumChart.setOption(pickNumOption);

//销售量趋势统计
// var saleTrendChart = echarts.init(document.getElementById('saleTrendChart')),
// saleTrendOption = {
//     grid:{
//         left: '10px', 
//         right: '10px', 
//         top: '30px', 
//         bottom: '10px',
//         containLabel: true
//     },
//     tooltip: {
//         trigger: 'axis',
//         backgroundColor:gChartOption.tooltipBg,
//         extraCssText: gChartOption.tooltipExtra,
//         textStyle:{
//             color:gChartOption.tooltipColor
//         }
//     },
//     xAxis: {
//         type: 'category',
//         boundaryGap: false,
//         axisLine: gChartOption.axisLine,
//         data: ['1', '2', '3', '4', '5', '6', '7']
//     },
//     yAxis: {
//         type: 'value',
//         name: '销售量(公斤)',
//         axisLine: gChartOption.axisLine
//     },
//     series: [{
//         name:'销售量',
//         type:'line',
//         symbol: 'circle',
//         symbolSize: 8,
//         itemStyle: {
//             normal: {
//                 color: '#4c84ff',
//                 borderColor: 'rgba(255, 255, 255,0.8)',
//                 borderWidth: 3
//             }
//         },
//         areaStyle: {
//             normal:{
//                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                     offset: 0,
//                     color: 'rgba(76, 132, 255, 0.6)'
//                 }, {
//                     offset: 1,
//                     color: 'rgba(76, 132, 255, 0.1)'
//                 }],false)
//             }
//         },
//         data:[120, 132, 101, 134, 90, 230, 210]
//     }]
// };
// saleTrendChart.setOption(saleTrendOption);

//销售量趋势统计柱形图
var saleAreaBarChart = echarts.init(document.getElementById('saleAreaBarChart')),
saleAreaBarOption = {
    color: ['#4c84ff'],
    grid:{
        left: '50px', 
        right: '50px', 
        top: '10px', 
        bottom: '10px',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        backgroundColor:gChartOption.tooltipBg,
        extraCssText: gChartOption.tooltipExtra,
        textStyle:{
            color:gChartOption.tooltipColor
        }
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLine: gChartOption.axisLine
    },
    yAxis: {
        type: 'category',
        nameGap: 30,
        axisLine: gChartOption.axisLine,
        data: [
            "江西省",
            "河南省",
            "安徽省",
            "重庆市",
            "云南省",
            "四川省",
            "山东省",
            "福建省",
            "广东省",
            "浙江省",
            "江苏省",
            "北京市",
            "辽宁省"
        ]
    },
    dataZoom: [
        {
            show: true,
            type: 'slider',
            left: '10px',
            width: 10,
            backgroundColor:'rgba(0,0,0,0.05)',
            borderColor:'rgba(0,0,0,0)',
            fillerColor:'rgba(171,184,213,1)',
            start: 70,
            end: 100,
            zoomLock:true,//禁止缩放
            yAxisIndex: 0,
            filterMode: 'empty',
            showDataShadow: false,
            throttle:300,
            showDetail:false//不显示文字
        }
    ],
    series: [
        {
            name: '2012年',
            type: 'bar',
            barWidth:'8px',
            barGap: '30px',
            data: [
                "2019",
                "2773",
                "3541",
                "3817",
                "5142",
                "7526",
                "7641",
                "10869",
                "12267",
                "13895",
                "17472",
                "25149",
                "28907"
            ]
        }
    ]
};
saleAreaBarChart.setOption(saleAreaBarOption);
/** 仅4.0.5以上支持*/
var disasterChart = echarts.init(document.getElementById('disasterChart'));
disasterChart.setOption(disasterOption);

$(window).resize(function(){
    //saleAreaPieChart.resize();
    townOrchardChart.resize();
    farmWorkChart.resize();
    createTrendChart.resize();
    pickNumChart.resize();
    productChart.resize();
    //saleTrendChart.resize();
    saleAreaBarChart.resize();
    disasterChart.resize();
});