/**
 * resThreeBanner 1.0
 * Author: GavinLee 
 * Date: 2018-11-13
 * Description: 简单的3d图片轮播，可控制自动播放与否及时间，左右点击功能可控，小图控制功能可控，可实现多屏。
 * @param {jQ对象} 		 container 幻灯片容器对象
 * @param {配置项对象}   options   配置参数
 */
'use strict';
function threeBanner(container,options){
    if(!container || !container instanceof jQuery){
        console.error('3d轮播容器必须为一个jq对象');
        return;
    };
    this.container = container;
    this.options = $.extend({
        moveTime:300,
        viewItems:3,
        moveContainer:'.banners',
        moveItem:'.b-crops-item',
        midClass:'active',
        isClick:true,
        autoFill:false,
        positions:[
            { left: '12%', scale3d: 'scale3d(0.7, 0.7, 1)', zIndex: 2 },
            { left: '50%', scale3d: 'scale3d(1, 1, 1)', zIndex: 5},
            { left: '70%', scale3d: 'scale3d(0.7, 0.7, 1)', zIndex: 2 }
        ],
        positionTwo:[
            { left: '50%', scale3d: 'scale3d(1, 1, 1)', zIndex: 5 },
            { left: '55.5%', scale3d: 'scale3d(1.2, 0.9, 1)', zIndex: 2 }
        ]
    },options);
    this.init();
};
threeBanner.prototype.init = function(){
    this.initEl();
    var self = this;
    var $c = this.container;
    var opts = this.options;
    //自动填充
    if(opts.autoFill && !opts.controller)self.fill();

    self.items = $c.find(opts.moveItem);
    if(self.items.length == 2){
        opts.positions = opts.positionTwo;
        self.iCenter = 0;
    };
    var transitionTime = 'transform '+(self.options.moveTime/1000)+'s linear';
    for (var i = 0; i < self.items.length; i++){
        self.aSort[i] = self.items.eq(i).css('transition', transitionTime).attr('index',i);
    }
    self.change().bindEvents();
}
threeBanner.prototype.initEl = function(){
    var $c = this.container;
    var opts = this.options;
    var self = this;
    self.changeDom = $c.find(opts.moveContainer);
    self.aSort = [];
    self.animateEnd = true;
    self.timer = null;
    self.iCenter = opts.viewItems%2;//本来需要加1，但数组从零开始
    if(opts.controller){
        self.controller = typeof opts.controller == 'string'?$c.find(opts.controller):opts.controller;
        self.tabs = self.controller.find('li');
        opts.selClass = opts.selClass || 'active';
    };
    return this;
};


threeBanner.prototype.fill = function(){
    var self = this,$c = this.container,opts = this.options;
    // 如果个数不够，先复制填充，在没有原点控制器时方可使用
    var items = $c.find(opts.moveItem);
    var nl = items.length,nv = opts.viewItems;
    if(nl<nv){
        var fs = nl;
        while(nl<nv){
            for(var n = 0;n<fs;n++){
                nl++;
                self.changeDom.append(items.eq(n).clone());
            }
        }
    };
}

threeBanner.prototype.change = function(){
    var self = this,opts = this.options;
    var positions = opts.positions;
    for (var j = 0; j < self.aSort.length; j++) {
        var isMid = j==self.iCenter;
        var item = this.aSort[j].removeClass(opts.midClass).attr('is_Mid',isMid);
        var _pi = positions[j];
        if(j< opts.viewItems){
            item.css({
                display:"block",
                'z-index': _pi.zIndex,
                transform: _pi.scale3d + ' translateX(-50%)'
            });
            (function(item,j){//必须使用立即执行函数保证item对象不变
                item.animate({'left':positions[j].left}, opts.moveTime,function(){
                    self.animateEnd = 1;
                    if(item.attr('is_Mid') == 'true'){item.addClass(opts.midClass)};
                });
            })(item,j);
        }else{
            item.css({
                display: "none",
                left:'50%',
                'z-index':2,
                transform:'scale3d(0,0,0,)  translateX(-50%)'
            });
        }
    };
    if(self.controller){
        var index = self.aSort[self.iCenter].attr('index'),_ac = opts.selClass;
        self.tabs.removeClass(_ac).eq(index).addClass(_ac);
    }
    return this;
};
threeBanner.prototype.doPrev = function () {
    this.aSort.unshift(this.aSort.pop());
    this.change();
};
threeBanner.prototype.doNext = function () {
    this.aSort.push(this.aSort.shift());
    this.change();
};
threeBanner.prototype.correct = function (nowIndex,toIndex) {
    var self = this;
    if(toIndex>nowIndex){
        for(var i = 0;i<toIndex-nowIndex;i++){
            self.aSort.push(self.aSort.shift());
        };
        self.change();
    }
    if(toIndex<nowIndex){
        for(var i = 0;i<nowIndex-toIndex;i++){
            self.aSort.unshift(self.aSort.pop());
        };
        self.change();
    }
};
threeBanner.prototype.bindEvents = function(){
    var self = this;
    var $c = self.container,
        opts = self.options,
        _ac = self.options.selClass;
    if(opts.prevBtn){
        $c.find(opts.prevBtn).on('click',function () {
            self.doPrev();
        });
    };
    if(opts.nextBtn){
        $c.find(opts.nextBtn).on('click',function () {
            self.doNext();
        });
    };
    if(opts.isClick){
        $c.on('click',opts.moveItem,function(){
            var $t = $(this);
            if($t.attr('is_Mid') !== 'true'){
                var toIndex = $t.attr('index');
                var aIndex = self.controller.find('.'+_ac).index();
                self.correct(aIndex,toIndex);
            }
        });
    };
    if(self.controller){
        self.controller.on('click','li',function(){
            var $t = $(this);
            if(!$t.hasClass(_ac)){
                var toIndex = $t.index();
                var aIndex = self.controller.find('.'+_ac).index();
                self.correct(aIndex,toIndex);
            }
        });
    }
    return this;
}