//面板选择
function DialogPanelSel(option){
    if(!option.openBtn || !option.openBtn instanceof jQuery){
        console.error('开关按钮必须为一个jq对象');
        return;
    }
    if(!option.container || !option.container instanceof jQuery){
        console.error('选择容器必须为一个jq对象');
        return;
    }
    this.option = $.extend({
        maxSel:5,//最大选择数量
        allowEmpty:true,//是否空选择
        selCropsCounter:0,//记录已选择数量
        openBtn:'',//打开按钮，jq对象
        container:'',//容器，jq对象
        hasSelObj:{},//已选择的关键key
        getValueMethod:'attr',//获取Key值的方法，attr或data
        cacheKey:'id'//关键key字段名
    },option);
    this.sureFn = option.sureFn || function(){};
    this.init();
}
//对象初始化
DialogPanelSel.prototype.init = function () {
    var method = this.option.getValueMethod;
    if(method == 'attr'){
        this.getElValue = function(el,key){
            return el.attr(key);
        }
    }else{
        this.getElValue = function(el,key){
            return el.data(key);
        }
    }
    this.initEvent();
    return this;
}
//初始事件
DialogPanelSel.prototype.initEvent = function(){
    var $lc = this.option.container;
    var self = this;
    //打开
    self.option.openBtn.click(function(){
        $lc.fadeIn();
    });
    //选择
    $lc.on('click','.cm-crops-list span',function(){
        var option = self.option,cacheKey = option.cacheKey;
        var $t = $(this);
        if($t.hasClass('active')){
            $t.removeClass('active');
            self.option.selCropsCounter -= 1;
            var value = self.getElValue($t,cacheKey);
            if(value){
                delete option.hasSelObj['KEY'+value];
            };
        }else{
            if (self.option.selCropsCounter >= self.option.maxSel) return;
            $t.addClass('active');
            self.option.selCropsCounter += 1;
            var value = self.getElValue($t,cacheKey);
            if(value){
                option.hasSelObj['KEY'+value] = true;
            };
        };
    });
    //取消
    $lc.on('click', '.btn-cancel', function () {
        $lc.fadeOut();
    });
    //确定
    $lc.on('click', '.btn-sure', function () {
        $lc.fadeOut();
        var arr = self.getSelValues();
        self.sureFn(arr);
    });
    return this;
}

//获取容器
DialogPanelSel.prototype.getContainer = function(){
    return this.option.container;
}
//获取选择value
DialogPanelSel.prototype.getSelValues = function(){
    var obj = this.option.hasSelObj;
    var arr = [];
    for(var key in obj){
        //截掉前缀KEY返回
        arr.push(key.slice(3));
    }
    return arr;
}
//获取选择元素
DialogPanelSel.prototype.getSelDoms = function(){
    var els = this.option.container.find('.cm-crops-list').find('span.active');
    return els;
}


//tab切换
function CmTabPanel(option){
    if(!option.container || !option.container instanceof jQuery){
        console.error('选择容器必须为一个jq对象');
        return;
    }
    this.container = option.container;
    this.activeIndex = 0;
    this.afterChange = option.afterChange || function(){};
    this.option = $.extend({
        activeClass:'active',
        changeMethod:'display'
    },option);
    this.init();
}

CmTabPanel.prototype.init = function(){
    this.initEvent();
    return this;
}
CmTabPanel.prototype.initEvent = function(){
    var self = this;
    var $c = this.container,
        $nav = $c.find('.tab-nav-list'),
        $switch = $c.find('.cm-tab-switch');
    var _ac = this.option.activeClass;
    $nav.on('click','li',function(){
        var $t = $(this);
        if($t.hasClass(_ac))return;
        var index = this.activeIndex = $t.index();
        var $indexEl = $switch.children().eq(index);
        $t.addClass(_ac).siblings().removeClass(_ac);
        $indexEl.addClass(_ac).siblings().removeClass(_ac);
        if(typeof self.afterChange == 'function')self.afterChange($t,index);
    });
}


//下拉选择
function CmDownSel(option){
    if(!option.container || !option.container instanceof jQuery){
        console.error('选择容器必须为一个jq对象');
        return;
    };
    this.container = option.container;
    this.activeIndex = 0;
    this.change = option.change || function(){};
    this.option = $.extend({
        activeClass:'active'
    },option);
    this.init();
}

CmDownSel.prototype.init = function(){
    this.initEvent();
    return this;
}
CmDownSel.prototype.initEvent = function(){
    var self = this;
    var $c = this.container,
        $list = $c.find('.down-sel-list'),
        $showBlock = $c.find('.show-block');
    var _ac = this.option.activeClass;

    $showBlock.click(function(){
        var $t = $(this);
        if($t.hasClass(_ac)){
            $t.removeClass(_ac);
            $list.fadeOut();
        }else{
            $t.addClass(_ac);
            $list.fadeIn();
        };
    });

    $list.on('click','li',function(){
        var $vel = $c.find('.value-sel');
        var $t = $(this);
        $list.fadeOut();
        $showBlock.removeClass('active');
        //如果没有选择且未禁用
        if(!$t.hasClass(_ac) && !$t.hasClass('disabled')){
            $t.addClass(_ac).siblings().removeClass(_ac);
            var value = $t.data('value'),text = $t.text();
            $vel.attr('value',value).html(text);
            if(typeof self.change == 'function')self.change(value,text);
        }
    });

    document.addEventListener('click',function(e){
        if($c.contains(e.target)){
            return false;
        }else{
           $list.fadeOut();
            $showBlock.removeClass('active');
        }
    });
}


//功能切换选择器
function CmSelector(option){
    if(!option.container || !option.container instanceof jQuery){
        console.error('选择容器必须为一个jq对象');
        return;
    };
    this.container = option.container;
    this.activeIndex = 0;
    this.change = option.change || function(){};
    this.option = $.extend({
        activeClass:'active',
        changeClass:'.sel-btn'
    },option);
    this.init();
}
CmSelector.prototype.init = function(){
    this.initEvent();
    return this;
}
CmSelector.prototype.initEvent = function(){
    var self = this;
    var $c = this.container,
        _ac = this.option.activeClass;

    $c.on('click', this.option.changeClass, function () {
        var $t = $(this);
        if ($t.hasClass('active')) return;
        var index = self.activeIndex = $t.index();
        $t.addClass(_ac).siblings().removeClass(_ac);
        if(typeof self.change == 'function')self.change(index,$t);
    });
    return this;
}
CmSelector.prototype.getIndex = function(){
    return this.activeIndex;
}


//日期函数
/* var yugi = function(year) {
    var d = new Date(year, 0, 1);
    while (d.getDay() != 1) {
        d.setDate(d.getDate() + 1);
    }
    var to = new Date(year + 1, 0, 1);
    var i = 1;
    for (var from = d; from < to;) {
        document.write(year + "年第" + i + "周 " + (from.getMonth() + 1) + "月" + from.getDate() + "日 - ");
        from.setDate(from.getDate() + 6);
        if (from < to) {
            document.write((from.getMonth() + 1) + "月" + from.getDate() + "日<br / >");
            from.setDate(from.getDate() + 1);
        } else {
            to.setDate(to.getDate() - 1);
            document.write((to.getMonth() + 1) + "月" + to.getDate() + "日<br / >");
        }
        i++;
    }
}
yugi(2015);

var dateUtil = {
    isleap:function(year){
        return (year%4 === 0 && year%100 !== 0) || year%400 === 0;
    },
    weekNum:function(year){
        var d = new Date(year, 0, 1);
        var pre = 0;
        while (d.getDay() != 0) {
            d.setDate(d.getDate() + 1);
            pre += 1;
        };
        var yearDays = ((year%4 === 0 && year%100 !== 0) || year%400 === 0)?366:365;
        var lastDays = yearDays - pre;
        var weekNum = lastDays%7 == 0?lastDays/7:Math.floor(lastDays/7)+1;
        return weekNum;
    },
    weekDays:function(year,week){
        var d = new Date(year, 0, 1);
        while (d.getDay() != 0) {
            d.setDate(d.getDate() + 1);
        };
        var startDate = d.setDate(d.getDate() + (week-1)*7);
        var endDate = d.setDate(d.getDate() + 6);
        return [new Date(startDate),new Date(endDate)];
    }
}; */