
    //图表对象定义
    (function (win) {
        win.myEcharts = function (id, option) {
            var _this = this;
            _this.mapJsonUrl = typeof (option) == 'undefined' ? '' : option.mapJsonUrl || ''; //地图包数据接口
            _this.dataJsonUrl = typeof (option) == 'undefined' ? '' : option.dataJsonUrl || ''; //用户数据接口
            _this.elem = document.getElementById(id);
            _this.mapName = 'china';
            _this.xAxisData = [];
            _this.yAxisData = [];
            _this.option = {
                //鼠标经过提示
                tooltip: {
                    trigger: 'axis'
                },
                //图表位置,坐标系类型，grid直角坐标
                grid: {
                    top: '21%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: _this.xAxisData,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "rgba(255,255,255,1)",
                            fontSize: "13",
                        },
                        interval: 0,
                        rotate: 40
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "rgba(255,255,255,1)",
                            // fontSize: "1",
                        },
                        formatter: '{value}%'
                    },
                    // 控制网格线是否显示
                    splitLine: {
                        show: true,
                        //  改变轴线颜色
                        lineStyle: {
                            // 使用深浅的间隔色
                            color: ['rgba(255,255,255,.3)']
                        }
                    },
                },
            };
            for (var t in option) {
                _this.option[t] = option[t];
            }
            _this.show();
            win.myEcharts.prototype.resizeObj.push(_this);
        }
        /**
         * 所有对象集合
         */
        win.myEcharts.prototype.resizeObj = [];
        /**
         * 设置AJAX数据地图,并更新显示
         */
        win.myEcharts.prototype.setMap = function () {
            var _this = this;
            $.ajax({
                url: _this.mapJsonUrl,
                datatype: "JSON",
                success: function (res) {
                    echarts.registerMap(_this.mapName, res);
                    _this.show();
                }
            });
            return _this;
        }
        /**
         * 清除并设置容器元素图表
         */
        win.myEcharts.prototype.dispose = function () {
            var _this = this;
            echarts.dispose(_this.elem);
            _this.myChart = echarts.init(_this.elem);
            return _this;
        }
        /**
         * 显示渲染图表
         */
        win.myEcharts.prototype.show = function (option, tool) {
            var _this = this;
            _this.dispose();
            if ((option || _this.option) && typeof ((option || _this.option)) === "object") {
                _this.myChart.setOption((option || _this.option), true);
            }
            //自动轮播tooltip
            if (tool) {
                
                var index = 0; //播放所在下标
                clearInterval(mTime);
                var mTime = setInterval(function () {
                    _this.myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                    });
                    _this.myChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: index
                    });
                    index++;
                    if (index > option.series[0].data.length) {
                        index = 0;
                    }
                }, 3 * 1000);
            }
            return _this;
        }
        /**
         * 重绘图表
         */
        win.myEcharts.prototype.resize = function () {
            var _this = this;
            _this.myChart.resize();
            return _this;
        };
        /**
         * 更新dataJsonUrl
         */
        win.myEcharts.prototype.setDataUrl = function (url) {
            var _this = this;
            if (url) {
                _this.dataJsonUrl = url;
            }
            return _this;
        }
        /**
         * 配置图表类型
         */
        win.myEcharts.prototype.setTable = function (setData) {
            var _this = this;
            $.ajax({
                url: _this.dataJsonUrl,
                datatype: "JSON",
                success: function (res) {
                    if (setData) {
                        _this.temp = setData;
                        _this.temp(res);
                        return;
                    }
                    // console.log(res);
                    try {
                        _this.option.xAxis.data = res.name;
                        if (res.type) {
                            for (var xc in _this.option.series) {
                                _this.option.series[xc].data = res.data[xc];
                            }
                        } else {
                            _this.option.series[0].data = res.data;
                        }
                        _this.show();
                    } catch (e) {
                        //TODO handle the exception
                    }
                }
            });
            return _this;
        }
        /**
         * 更新配置地图数据
         */
        win.myEcharts.prototype.setMapData = function (setData) {
            var _this = this;
            $.ajax({
                url: _this.dataJsonUrl,
                datatype: "JSON",
                success: function (res) {
                    if (setData) {
                        _this.temp = setData;
                        _this.temp(res);
                        return;
                    }
                    try {
                        if (type) {
                            _this.option.series[0].data = res;
                        } else {
                            for (var i in _this.option.series[0].data) {
                                _this.option.series[0].data[i].value = res.data[i];
                            };
                        }
                        _this.show();
                    } catch (e) {

                    }
                }
            });
            return _this;
        }
    })(window);

    //图表置入对象实例
    (function (win) {
        //左上角数据读取
        (function leftTop() {
            $.ajax({
                url: 'json/left/left-top.json',
                success: function (res) {
                    let cts = '-'
                    var html = "";
                    for (var i in res) {
                        html += '<li><h4 class="name">' + res[i].type + '</h4><p class="number">' + res[i].number + '<span class="unit">' + res[i].unit + '</span></p></li>'
                    }
                    $('.left-top').html(html);
                }
            });
        })();

        //左下角滚动
        (function leftBotTable(e, type) {
            $.ajax({
                url: 'json/left/left-bot-table.json',
                success: function (res) {
                    let cts = '-'
                    var html = "";
                    for (var i in res) {
                        let str = res[i].amplitude.indexOf(cts) != -1 ? "fall-number" : "rise-number";
                        html += '<li class="ui-flex table-row"><span>' + res[i].productName + '</span><span>' + res[i].market + '</span><span>' + res[i].price + '</span><span class="number ' + str + '"><b class="num">' + res[i].amplitude + '</b><b class="arrow"></b></span></li>'
                    }
                    $('#left-bot-table').html(html);
                    if (type) {
                        //启用滚动
                        $('.left-bot-table').myScroll({
                            speed: 40, //数值越大，速度越慢
                            rowHeight: 40 //li的高度
                        });
                    }
                }
            });
        })(1, true);

        //左中折线图
        var arrName = [{ name: '农产品指数', value: '109.27', tude: 'top' }, { name: '蔬菜指数', value: '120.04', tude: 'top' }, { name: '水果指数', value: '97.35', tude: 'bot' }, { name: '肉禽指数', value: '105.56', tude: 'top' }];
        $.ajax({
            url: 'json/left/productIndex.json',
            success: function (res) {
                var html = "";
                for (let i = 0; i < 4; i++) {
                    let str = arrName[i].tude == 'top' ? "rise-arrow" : "fall-arrow";
                    html += '<li><div><h4 class="number">' + arrName[i].value + '<span class="arrow ' + str + '"></span></h4><p class="name">' + arrName[i].name + '</p></div></li>'
                }
                $('#priceIndex').html(html);
            }
        });
        function zhidong(e) {
            if (e > 3) {
                e = 0;
            }
            chartObj1.option.series[0].data = chartObj1['index' + (e + 1)];
            let maxValue = Math.max.apply(Math, chartObj1['index' + (e + 1)]),
                minValue = Math.min.apply(Math, chartObj1['index' + (e + 1)]);
            let aplitNum = Number((maxValue - minValue).toString().substring(0, 3))
            chartObj1.option.yAxis.min = (maxValue + aplitNum).toString().substring(0, 5);
            chartObj1.option.yAxis.max = (minValue - aplitNum).toString().substring(0, 5);
            chartObj1.show();
            $($("#priceIndex li")[e]).addClass('active');
            setTimeout(function () {
                $($("#priceIndex li")[e]).removeClass('active');
                zhidong(++e);
            }, 15 * 1000);
        };
        var chartObj1 = new myEcharts('riseFallChart', {
            dataJsonUrl: "json/left/productIndex.json",
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: '10%',
                left: '4%',
                right: '4%',
                bottom: '30%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { color: "#609dbd", interval: 0, rotate: 40, },
                data: function () {
                    var list = [];
                    let month = new Date().getMonth() + 1
                    let date = new Date().getDate()
                    for (var i = 1; i <= 7; i++) {
                        list.push(month + '月' + ((date - i + 1) + '日'));
                    }
                    return list.reverse();
                }()
            },
            yAxis: {
                type: 'value',
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { color: "#609dbd" },
            },
            series: [
                {
                    name: '价格指数',
                    type: 'line',
                    showSymbol: false,
                    lineWidth: 1,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(226, 17, 102, 1)',
                            }, {
                                offset: 1,
                                color: 'rgba(6, 147, 255, 1)',
                            }], false)
                        },
                    },
                    markPoint: {
                        symbol: 'circle',
                        symbolSize: 8,
                        data: [
                            {
                                type: 'max', name: '最大值',
                                label: {
                                    offset: [0, -20],
                                    color: '#e21166'
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#e21166'
                                    }
                                },
                            },
                            {
                                type: 'min', name: '最小值',
                                label: {
                                    offset: [0, 20],
                                    color: '#0693ff',
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#0693ff'
                                    }
                                },
                            }
                        ]
                    }
                },
            ]
        }).setTable(function (res) {
            this.index1 = [], this.index2 = [], this.index3 = [], this.index4 = []
            for (let i = 0; i < res.length; i++) {
                this.index1.push(res[i].productIndex);
                this.index2.push(res[i].vegetables);
                this.index3.push(res[i].fruit);
                this.index4.push(res[i].meatAndPoultry);
            }
            this.show();
            zhidong(0);
        });

        var chartObj2 = new myEcharts('mapChart', {
            mapJsonUrl: "js/china.json",
            dataJsonUrl: "json/middle/map.json",
        });
        chartObj2.option = {
            tooltip: {
                trigger: 'item',
                formatter: function (data) {
                    if (!isNaN(data.value)) {
                        return data.name + "：" + data.value;
                    }
                }
            },
            visualMap: {
                min: 0,
                max: 10,
                itemWidth: 15,
                itemHeight: 80,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],
                textStyle: {
                    color: '#84adc2',
                    left: 20
                },
                calculable: true,
                textGap: 10,
                left: '15%',
                top: "80%",
                inRange: {
                    color: ['#0693ff', '#0aeef5', '#e21166',]
                },
            },
            series: [{
                name: '价格',
                type: 'map',
                mapType: 'china',
                zoom: 1.2,
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true,
                        color: '#9ecbe3'
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#103d7e',
                        borderColor: '#03204a',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 5,
                        shadowOffsetX: 1,
                        shadowOffsetY: 1
                    },
                    emphasis: {
                        areaColor: '#2B91B7',
                    }
                }
            }]
        };

        $.ajax({
            url: 'json/middle/map.json',
            success: function (res) {
                var html = "", num = ""
                for (let i = 0; i < res.length; i++) {
                    html += '<li><h4 class="name">' + res[i].type + '</h4></li>'
                }
                $('#mapIndex').html(html);
            }
        });
        function mapRoll(e) {
            if (e > 18) {
                e = 0;
            }
            let ul = $("#mapIndex li").width() * 19;
            let box = $(".mapIndexBox").width();
            if (e < 4) {
                $("#mapIndex").css('margin-left', '0px');
            } else if (e >= 4 && e <= 18) {
                $("#mapIndex").css('margin-left', -88 * (e - 2) + 'px');
            } else if (e > 18) {
                $("#mapIndex").css('margin-left', (ul - box) + 'px');
            }
            chartObj2.option.series[0].data = chartObj2['map' + (e)];
            chartObj2.show();
            chartObj3.option.series[0].data = chartObj3['line' + (e)];
            chartObj3.show();
            chartObj4.option.series[0].data = chartObj4['bar' + (e)];
            chartObj4.show();

            $($("#mapIndex li")[e]).addClass('active');
            setTimeout(function () {
                $($("#avgPrice li")).find('.nationalAvg').text(chartObj2['nvg' + (e + 1)]);
                $($("#avgPrice li")).find('.provinceAvg').text(chartObj2['pvg' + (e + 1)]);
                $($("#mapIndex li")[e]).removeClass('active');
                mapRoll(++e);
            }, 15 * 1000);
        }
        chartObj2.setMap().setMapData(function (res) {
            for (let i = 0; i < 19; i++) {
                this['map' + i] = [];
                this['nvg' + i] = [];
                this['pvg' + i] = [];
            }
            for (let j = 0; j < res.length; j++) {
                this['nvg' + j].push(res[j].nationalAvg)
                this['pvg' + j].push(res[j].provinceAvg)
                for (let i = 0; i < res[i].provinces.length; i++) {
                    this['map' + j][i] = {
                        name: res[j].provinces[i].name,
                        value: res[j].provinces[i].price
                    }
                }
            }
            this.option.series[0].data = this.map0
            $($("#avgPrice li")).find('.nationalAvg').text(chartObj2['nvg' + (0)]);
            $($("#avgPrice li")).find('.provinceAvg').text(chartObj2['pvg' + (0)]);
            this.show();
            mapRoll(0);
        });
        //中左下方表
        var chartObj3 = new myEcharts('priceLineChart', {
            dataJsonUrl: "json/middle/line.json",

            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                top: '15%',
                left: '6%',
                right: '2%',
                bottom: '6%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { color: "#609dbd", interval: 0, rotate: 40, },
                data: function () {
                    var list = [];
                    let month = new Date().getMonth() + 1
                    let date = new Date().getDate()
                    for (var i = 1; i <= 7; i++) {
                        list.push(month + '月' + ((date - i + 1) + '日'));
                    }
                    return list.reverse();
                }()
            },
            yAxis: {
                type: 'value',
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { color: "#609dbd" },
            },
            series: [
                {
                    name: '价格',
                    //data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    lineWidth: 1,
                    itemStyle: {
                        normal: {
                            color: 'rgba(226, 17, 102, 1)',
                            lineStyle: {
                                width: 1
                            }
                        },
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(226, 17, 102, 0.3)',
                            }, {
                                offset: 1,
                                color: 'rgba(226, 17, 102, 0)',
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                },
            ]
        }).setTable(function (res) {
            for (let i = 0; i < 19; i++) {
                this['line' + i] = [];
            }
            for (let i = 0; i < res.length; i++) {
                this['line' + i].push(res[i].monday, res[i].tuesday, res[i].wednesday, res[i].thursday, res[i].friday, res[i].saturday, res[i].sunday)
            }
            this.show();
            mapRoll(0);
        });
        //中右下方表
        var chartObj4 = new myEcharts('axisBarChart', {
            dataJsonUrl: "json/middle/bar.json",
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                },
                formatter: function (params) {
                    var res = '<div><p>' + params[0].name + '</p></div>'
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].data >= 0) {
                            res += '<p>涨价:' + params[i].data + '</p>'
                        } else {
                            res += '<p>跌价:' + params[i].data + '</p>'
                        }
                    }
                    return res;
                }
            },
            grid: {
                top: '15%',
                right: '6%',    //距离容器上边界40像素
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                splitLine: {
                    show: false,
                },
                axisLabel: { color: "#609dbd", interval: 0, rotate: 40, },
                data: function () {
                    var list = [];
                    let month = new Date().getMonth() + 1
                    let date = new Date().getDate()
                    for (var i = 1; i <= 7; i++) {
                        list.push(month + '月' + ((date - i + 1) + '日'));
                    }
                    return list.reverse();
                }()
            },
            yAxis: [{
                type: 'value',
                splitNumber: 3,
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                    color: "#609dbd",
                    formatter: '{value}%'
                }

            }],
            series: [{
                name: '涨价',
                type: 'bar',
                stack: '总量',
                barWidth: 7,
                itemStyle: {
                    normal: {
                        barBorderRadius: 50,
                        color: function (params) {
                            var colorList;
                            if (params.data >= 0) {
                                colorList = new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#e21166' },
                                        { offset: 0.6, color: '#700779' }
                                    ]
                                )
                            } else {
                                colorList = new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#0264af' },
                                        { offset: 1, color: '#0aeef5' }
                                    ]
                                )
                            }
                            return colorList;
                        },
                    }
                }
            }]
        }).setTable(function (res) {
            for (let i = 0; i < 19; i++) {
                this['bar' + i] = [];
                this['plus' + i] = [];
                this['minus' + i] = [];
            }
            for (let i = 0; i < res.length; i++) {
                this['bar' + i].push(res[i].monday, res[i].tuesday, res[i].wednesday, res[i].thursday, res[i].friday, res[i].saturday, res[i].sunday)
                // for (let j = 0; j < this['bar' + i].length; j++) {
                //     if (this['bar' + i][j] < 0) {
                //         this['minus' + i].push(Number(this['bar' + i][j]));
                //         this['plus' + i].push(0);
                //     } else{
                //         this['plus' + i].push(Number(this['bar' + i][j]));
                //         this['minus' + i].push(0);
                //     }
                // }
            }
            this.option.series[0].data = this.bar1;
            this.show();
            mapRoll(0);
        });

        //右上方表
        var chartObj5 = new myEcharts('poarChart', {
            dataJsonUrl: "json/right/poar.json",
            tooltip: {
                trigger: 'axis',
                transitionDuration: 1,
                axisPointer: {
                    type: 'line'
                }
            },
            xAxis: {
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false }
            },
            yAxis: [{
                type: 'value',
                splitLine: { show: false },
                axisTick: { show: false },
                axisLine: { show: false }
            }],
            angleAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                z: 10,
                axisLine: {
                    lineStyle: {
                        color: 'rgba(76,99,111,0.1)',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(76,99,111,0.3)',
                    }
                },
                axisLabel: { //刻度标签设置
                    textStyle: {
                        color: '#9ecbe3'
                    }
                }
            },
            radiusAxis: {
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(76,99,111,0.3)',
                    }
                },
                splitNumber: 4,    // 坐标轴的分割段数
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(76,99,111,0.1)'
                    }
                }
            },
            polar: {},
            series: [{
                type: 'bar',
                data: [1, 2, 3, 4, 3, 5, 1],
                coordinateSystem: 'polar',
                name: '来源量',
                stack: 'a',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            let colorList = [
                                new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0,
                                    [
                                        { offset: 0, color: '#e21166' },
                                        { offset: 0.6, color: '#700779' }
                                    ]
                                ),
                                new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#0264af' },
                                        { offset: 1, color: '#0aeef5' }
                                    ]
                                ),
                                new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0,
                                    [
                                        { offset: 0, color: '#e21166' },
                                        { offset: 0.6, color: '#700779' }
                                    ]
                                ),
                                new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0,
                                    [
                                        { offset: 0, color: '#0264af' },
                                        { offset: 1, color: '#0aeef5' }
                                    ]
                                ),
                                new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#e21166' },
                                        { offset: 0.6, color: '#700779' }
                                    ]
                                ),
                                new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#0264af' },
                                        { offset: 1, color: '#0aeef5' }
                                    ]
                                ),
                                new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#e21166' },
                                        { offset: 0.6, color: '#700779' }
                                    ]
                                )
                            ];
                            return colorList[params.dataIndex]
                        }
                    },
                },
            }]
        }).setTable(function (res) {
            let city = [], resData = []
            for (let i = 0; i < res.length; i++) {
                city.push(res[i].source)
                resData.push(res[i].number)
            }
            this.option.angleAxis.data = city;
            this.option.series[0].data = resData;
            this.show(this.option, true);
        });

        //右中滚动
        (function rightMiddleTable(e, type) {
            $.ajax({
                url: 'json/right/right-middle-table.json',
                success: function (res) {
                    let html = "";
                    for (var i in res) {
                        if (i == 0) {
                            html += '<li class="ui-flex table-row one"><span class="index"><b>' + res[i].rank + '</b></span><span>' + res[i].mark + '</span><span>' + res[i].region + '</span><span>' + res[i].number + '</span></li>'
                        } else if (i == 1) {
                            html += '<li class="ui-flex table-row two"><span class="index"><b>' + res[i].rank + '</b></span><span>' + res[i].mark + '</span><span>' + res[i].region + '</span><span>' + res[i].number + '</span></li>'
                        } else if (i == 2) {
                            html += '<li class="ui-flex table-row three"><span class="index"><b>' + res[i].rank + '</b></span><span>' + res[i].mark + '</span><span>' + res[i].region + '</span><span>' + res[i].number + '</span></li>'
                        } else {
                            html += '<li class="ui-flex table-row"><span class="index"><b>' + res[i].rank + '</b></span><span>' + res[i].mark + '</span><span>' + res[i].region + '</span><span>' + res[i].number + '</span></li>'
                        }
                    }
                    $('#right-middle-table').html(html);
                    if (type) {
                        //启用滚动
                        $('.right-middle-table').myScroll({
                            speed: 40, //数值越大，速度越慢
                            rowHeight: 40 //li的高度
                        });
                    }
                }
            });
        })(1, true);

        //右下角滚动
        (function rightBotTable(e, type) {
            $.ajax({
                url: 'json/right/right-bot-table.json',
                success: function (res) {
                    let html = "";
                    for (var i in res) {
                        if (i == 0) {
                            html += '<li class="ui-flex table-row one"><span class="index" style="flex: 0.8"><b>' + res[i].rank + '</b></span><span style="flex:3">' + res[i].productName + '</span></li>'
                        } else if (i == 1) {
                            html += '<li class="ui-flex table-row two"><span class="index" style="flex: 0.8"><b>' + res[i].rank + '</b></span><span style="flex:3">' + res[i].productName + '</span></li>'
                        } else if (i == 2) {
                            html += '<li class="ui-flex table-row three"><span class="index" style="flex: 0.8"><b>' + res[i].rank + '</b></span><span style="flex:3">' + res[i].productName + '</span></li>'
                        } else {
                            html += '<li class="ui-flex table-row"><span class="index" style="flex: 0.8"><b>' + res[i].rank + '</b></span><span style="flex:3">' + res[i].productName + '</span></li>'
                        }
                    }
                    $('#right-bot-table').html(html);
                    if (type) {
                        //启用滚动
                        $('.right-bot-table').myScroll({
                            speed: 40, //数值越大，速度越慢
                            rowHeight: 40 //li的高度
                        });
                    }
                }
            });
        })(1, true);

        //窗口变化，重绘图表
        win.addEventListener("resize", function () {
            chartObj1.resize();
            chartObj2.setMap().setMapData();
            chartObj3.resize();
            chartObj4.resize();
            chartObj5.resize();
        });

        //全屏
        document.getElementById("full-screen").addEventListener("click", function () {
            var btn = $('#full-screen');
            var frameId = window.frameElement && window.frameElement.id || '';
            var docElm = parent.window.document.documentElement;
            if (btn.attr('close') == 'buttonFull') {
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.msRequestFullscreen) {
                    docElm.msRequestFullscreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                }
                $(window.frameElement).css({
                    "position": "fixed",
                    "top": 0,
                    "bottom": 0,
                    "left": 0,
                    "right": 0,
                });
                btn.attr('close', 'closeFull');
                if(parent.window.document.getElementById('header')) {
                    parent.window.document.getElementById('header').hidden = true;
                    parent.window.document.getElementById('leftNav').hidden = true;
                }
                if(parent.document.getElementsByTagName("iframe")[0] && parent.document.getElementsByTagName("iframe")[0].getAttribute("id")=="allpages")
                    parent.document.getElementsByTagName("iframe")[0].style.top = "0";
            } else if (btn.attr('close') == 'closeFull') {
                $(window.frameElement).css({
                    "position": "relative"
                });
                btn.attr('close', 'buttonFull');
                if (parent.window.document.exitFullscreen) {
                    parent.window.document.exitFullscreen();
                } else if (parent.window.document.msExitFullscreen) {
                    parent.window.document.msExitFullscreen();
                } else if (parent.window.document.mozCancelFullScreen) {
                    parent.window.document.mozCancelFullScreen();
                } else if (parent.window.document.webkitCancelFullScreen) {
                    parent.window.document.webkitCancelFullScreen();
                }

                if(parent.window.document.getElementById('header')) {
                    parent.window.document.getElementById('header').hidden = false;
                    parent.window.document.getElementById('leftNav').hidden = false;
                }
                if(parent.document.getElementsByTagName("iframe")[0] && parent.document.getElementsByTagName("iframe")[0].getAttribute("id")=="allpages")
                    parent.document.getElementsByTagName("iframe")[0].style.top = "90px";
            }
        }, false);
    })(window);

