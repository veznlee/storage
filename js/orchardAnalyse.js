var tooltip = {
    trigger: 'item',
    backgroundColor:'#fff',
    extraCssText: 'box-shadow: 0 0 10px 2px rgba(211,215,224,1);',
    textStyle:{
        color:'#263238'
    }
};
var productTrendChart1 = echarts.init(document.getElementById('productTrendChart1')),
productTrendOption1 = {
    tooltip: tooltip,
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
    }]
};
productTrendChart1.setOption(productTrendOption1);



var productTrendChart2 = echarts.init(document.getElementById('productTrendChart2')),
productTrendOption2 = {
    tooltip: tooltip,
    series: [{
        name: '果园数量占比',
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
productTrendChart2.setOption(productTrendOption2);

/*地图通用配置项*/
var cmChartMap = {
    gItemStyle:{
        normal: {
            areaColor: '#fff',
            borderColor: '#4c84ff'
        },
        emphasis: {
            areaColor: 'rgba(0,0,0,0.3)'
        }
    },
    sItemStyle:{
        normal: {
            areaColor: '#ffffff',
            borderColor: '#4c84ff',
            borderWidth:1,
            label: {
                show: true
            }
        },
        emphasis: {
            areaColor: '#19d4bd',
            label: {show: false}
        }
    },
    visualMap: {
        min: 0,
        max: 2000,
        left: 'center',
        top: 'bottom',
        inRange: {
            color: ['rgba(255,255,255,0.3)', 'rgba(255,131,50,1)']
        },
        show:false
    }
}


/*全部乡镇分析*/
echarts.registerMap('XW', XwByMapJson);
// var geoCoordMap = {
//     "六桶镇":[106.453754,27.111663],
//     "大石乡":[106.471803,27.046816],
//     "六广镇":[106.449945,26.98837],
//     "小箐乡":[106.548266,26.946898],
//     "久长镇":[106.665898,26.946286],
//     "扎佐镇":[106.720515,26.858752],
//     "六屯镇":[106.841247,26.95184],
//     "龙场镇":[106.607831,26.835029],
//     "谷堡乡":[106.514695,26.856174],
//     "洒坪镇":[106.465827,26.925255],
//     "白云区":[106.671072,26.717884]
// };
var cityData = {
    "averagePrice": 13.52,
    "maxPrice": 30.8,
    "map": [
        {
            "id": 0,
            "name": "六桶镇",
            "value": 30.8
        },
        {
            "id": 1,
            "name": "大石乡",
            "value": 30.8
        },
        {
            "id": 2,
            "name": "六广镇",
            "value": 30.8
        },
        {
            "id": 3,
            "name": "小箐乡",
            "value": 30.8
        },
        {
            "id": 4,
            "name": "久长镇",
            "value": 30.8
        },
        {
            "id": 5,
            "name": "扎佐镇",
            "value": 30.8
        },
        {
            "id": 6,
            "name": "六屯镇",
            "value": 30.8
        },
        {
            "id": 7,
            "name": "龙场镇",
            "value": 30.8
        },
        {
            "id": 8,
            "name": "洒坪镇",
            "value": 30.8
        },
        {
            "id": 9,
            "name": "谷堡乡",
            "value": 30.8
        }
    ]
};
var cityOption = {
    backgroundColor: 'transparent',
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return params.name + ":" + params.value + '元/斤';
        }
    },
    geo: {
        map: 'XW',
        top:'10px',
        bottom:'10px',
        left:'10%',
        right:'10%',
        roam: false,
        itemStyle: cmChartMap.gItemStyle
    },
    animation: false,
    visualMap: cmChartMap.visualMap,
    series: [
        {
            type: 'map',
            mapType: 'XW',
            top:'10px',
            bottom:'10px',
            left:'10%',
            right:'10%',
            itemStyle: cmChartMap.sItemStyle,
            data:cityData.map
        }
    ]
};

/*全省园区分析*/
var provinceData = {
    "averagePrice": 13.52,
    "maxPrice": 30.8,
    "map": [
        {
            "id": 0,
            "name": "贵阳市",
            "value": 30.8,
            data:[10,20,26]
        },
        {
            "id": 1,
            "name": "安顺市",
            "value": 30.8,
            data:[10,20,26]
        },
        {
            "id": 2,
            "name": "遵义市",
            "value": 30.8,
            data:[10,20,26]
        },
        {
            "id": 3,
            "name": "毕节市",
            "value": 30.8,
            data:[10,20,26]
        },
        {
            "id": 4,
            "name": "铜仁市",
            "value": 30.8,
            data:[10,20,26]
        },
        {
            "id": 5,
            "name": "六盘水市",
            "value": 30.8,
            data:[10,20,26]
        },
        {
            "id": 6,
            "name": "黔西南布依族苗族自治州",
            "value": 30.8,
            data:[10,20,26]
        },
        {
            "id": 7,
            "name": "黔东南苗族侗族自治州",
            "value": 30.8,
            data:[10,20,26]
        },
        {
            "id": 8,
            "name": "黔南布依族苗族自治州",
            "value": 30.8,
            data:[10,20,26]
        }
    ]
};

var provinceOption = {
    backgroundColor: 'transparent',
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            if(params.data.data){
                var d = params.data.data;
                return params.name + "</br>园区数量：" + d[0] + '</br>园区总面积：' + d[1] + '亩</br>预估总产量：' + d[2]+'斤';
            }
            //return params.name + ":" + params.value + '元/斤';
        }
    },
    geo: {
        map: '贵州',
        roam: false,
        itemStyle: cmChartMap.gItemStyle
    },
    animation: false,
    visualMap: cmChartMap.visualMap,
    series: [
        {
            type: 'map',
            mapType: '贵州',
            itemStyle: cmChartMap.sItemStyle,
            data:provinceData.map
        }
    ]
};

/*全国园区分析*/
var countryData = {
    "averagePrice": 13.52,
    "maxPrice": 30.8,
    "map": [
        {
            "id": 1,
            "name": "北京",
            "value": 30.8
        },
        {
            "id": 2,
            "name": "上海",
            "value": 29.5
        },
        {
            "id": 3,
            "name": "天津",
            "value": 27
        },
        {
            "id": 10,
            "name": "新疆",
            "value": 24.33
        },
        {
            "id": 22,
            "name": "四川",
            "value": 22.02
        },
        {
            "id": 23,
            "name": "贵州",
            "value": 19.91
        },
        {
            "id": 29,
            "name": "广东",
            "value": 18.67
        },
        {
            "id": 19,
            "name": "湖北",
            "value": 17.45
        },
        {
            "id": 4,
            "name": "重庆",
            "value": 17
        },
        {
            "id": 20,
            "name": "湖南",
            "value": 16.91
        },
        {
            "id": 28,
            "name": "江西",
            "value": 12.33
        },
        {
            "id": 26,
            "name": "西藏",
            "value": 12.16
        },
        {
            "id": 6,
            "name": "吉林",
            "value": 12.02
        },
        {
            "id": 13,
            "name": "陕西",
            "value": 11.92
        },
        {
            "id": 21,
            "name": "江苏",
            "value": 11.9
        },
        {
            "id": 34,
            "name": "澳门",
            "value": 11.62
        },
        {
            "id": 27,
            "name": "浙江",
            "value": 11.3
        },
        {
            "id": 9,
            "name": "河北",
            "value": 10.96
        },
        {
            "id": 5,
            "name": "黑龙江",
            "value": 1095
        },
        {
            "id": 11,
            "name": "甘肃",
            "value": 1045
        },
        {
            "id": 16,
            "name": "山东",
            "value": 10.26
        },
        {
            "id": 33,
            "name": "香港",
            "value": 9.58
        },
        {
            "id": 7,
            "name": "辽宁",
            "value": 9.32
        },
        {
            "id": 15,
            "name": "河南",
            "value": 916
        },
        {
            "id": 24,
            "name": "云南",
            "value": 9.12
        },
        {
            "id": 17,
            "name": "山西",
            "value": 8.99
        },
        {
            "id": 32,
            "name": "海南",
            "value": 8.83
        },
        {
            "id": 14,
            "name": "宁夏",
            "value": 8.66
        },
        {
            "id": 25,
            "name": "广西",
            "value": 8.64
        },
        {
            "id": 12,
            "name": "青海",
            "value": 8.13
        },
        {
            "id": 31,
            "name": "台湾",
            "value": 7.99
        },
        {
            "id": 8,
            "name": "内蒙古",
            "value": 7.85
        },
        {
            "id": 30,
            "name": "福建",
            "value": 7.77
        },
        {
            "id": 18,
            "name": "安徽",
            "value": 633
        }
    ]
};
countryOption = {
    backgroundColor: 'transparent',
    grid: {
        left: '5%',
        right: '70%',
        bottom: '20%',
        width: '10%',
        containLabel: false
    },
    geo: {
        map: 'china',
        roam: false,
        itemStyle: cmChartMap.gItemStyle
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return params.name + ":" + params.value + '元/斤';
        }
    },
    animation: false,
    visualMap: cmChartMap.visualMap,
    series: [
        {
            type: 'map',
            mapType: 'china',
            //coordinateSystem: 'bmap',
            itemStyle: cmChartMap.sItemStyle,
            data: []
        },
        // {
        //     type: 'scatter',
        //     coordinateSystem: 'bmap',
        // }
    ]
};
countryOption.series[0].data = countryData.map;


var orchardViewChart = echarts.init(document.getElementById('orchardViewChart'));
orchardViewChart.setOption(cityOption);

window.onresize = function(){
    setTimeout(function(){
        productTrendChart1.resize();
        productTrendChart2.resize();
        orchardViewChart.resize();
    },100);
};


