/**
 * sliderBanner 3.0
 * Author: GavinLee 
 * Date: 2018-11-13
 * Description: 简单的图片轮播，可控制自动播放与否及时间，左右点击功能可控，小图控制功能可控，可实现多屏，可设置监听页面响应。
 * @param {jQ对象} 		 container 幻灯片容器对象
 * @param {配置项对象}   options   配置参数
 */
if (!Object.assign) {
	Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function(target) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert first argument to object');
			}
			var to = Object(target);
			for (var i = 1; i < arguments.length; i++) {
				var nextSource = arguments[i];
				if (nextSource === undefined || nextSource === null) {
					continue;
				}
				nextSource = Object(nextSource);
				var keysArray = Object.keys(nextSource);
				for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
					var nextKey = keysArray[nextIndex];
					var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== undefined && desc.enumerable) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
			return to;
		}
	});
};
function ResSlideBanner(container,options){
	if(!container || !container instanceof jQuery){
        console.error('图片轮播容器必须为一个jq对象');
        return;
    };
	this.container = container;
	this.options = $.extend({
		initItemWidth:false,//默认不需要初始化宽度
		response:false,      //默认窗口不需要响应
		autoPlay:true,		//默认自动播放
		autoTime:3000,		//间隔时间3000
		moveTime:600,		//播放时间600
		scrollBox:'.banner-scroll',
		moveItem:'li',
	},options);
	this.init();
};
Object.assign(ResSlideBanner.prototype,{
	initEl:function(){
		var opts = this.options,self = this, $c = this.container;
		this.gNext = $c.find(opts.next);
		this.gPrev = $c.find(opts.prev);
		this.gShowBox = $c.find(opts.scrollBox);
		this.gControl = $c.find(opts.control);
		this.gConliClass = opts.conliClass;
		this.animateEnd = 1;
		this.timer = null;
	},
	nextScroll:function(){
		var self = this,opts = this.options,_mi = opts.moveItem;
		var gShowBox = self.gShowBox;
		var offset = (gShowBox.find(_mi).outerWidth(true)) * -1;
		gShowBox.stop(true,true).animate({
			left: offset
		}, opts.moveTime, function() {
			var firstItem = gShowBox.find(_mi).first();
			gShowBox.append(firstItem);
			$(this).css("left", "0px");
			if (self.gControl){
				self.circle();
			};
		});
	},
	circle:function(){
		var _ac = this.options.conliClass,_mi = this.options.moveItem;
		var currentIndex = this.gShowBox.find(_mi).first().attr("index");
		this.gControl.find(_mi).removeClass(_ac).eq(currentIndex).addClass(_ac);
	},
	addIndex:function(){
		var showli = this.gShowBox.find(this.options.moveItem);
		for (var i=0; i<showli.length; i+=1){
			showli.eq(i).attr("index",i);
		};
	},
	bindEvents:function(){
		var self = this,
			opts = this.options,
			$this = this.container,
			gNext = this.gNext,
			gPrev = this.gPrev,
			gShowBox = this.gShowBox,
			gControl = this.gControl;
		var gConliClass = opts.conliClass,
			_mi = opts.moveItem;

		if(gShowBox.find(_mi).length <2) return;
		if(gPrev && gPrev.length>0){
			gPrev.click(function() {
				if (self.timer){
					clearInterval(self.timer);
				};
				gShowBox.stop(true,true);
				var offset = (gShowBox.find(_mi).outerWidth(true) * -1);
				var lastItem = gShowBox.find(_mi).last();
				gShowBox.prepend(lastItem);
				gShowBox.css("left", offset);
				gShowBox.animate({
					left: "0px"
				}, opts.moveTime, function() {
					if (gControl){
						self.circle();
					};
				});
			}).mouseout(function(){
				if (opts.autoPlay){
					self.auto();
				};
			});
		};

		if(gNext && gNext.length>0){
			gNext.click(function() {
				if (self.timer){
					clearInterval(self.timer);
				};
				gShowBox.stop(true,true);
				self.nextscroll();
			}).mouseover(function(){
				if (self.timer){
					clearInterval(self.timer);
				};
			}).mouseout(function(){
				if (opts.autoPlay){
					self.auto();
				};
			});
		};

		if(gControl  && gControl.length>0){
			gControl.find(_mi).mouseover(function() {
				clearInterval(self.timer);
				gShowBox.stop(true,true);
				if (self.animateEnd == 0) {
					return;
				}
				$(this).addClass(gConliClass).siblings().removeClass(gConliClass);
				var nextindex = $(this).index();
				var currentindex = gShowBox.find(_mi).first().attr("index");
				var curr = gShowBox.find(_mi).first().clone();
				if(nextindex > currentindex){
					for (var i = 0; i < nextindex - currentindex; i++) {
						var firstItem = gShowBox.find(_mi).first();
						gShowBox.append(firstItem);
					}
					gShowBox.prepend(curr);
					var offset = (gShowBox.find(_mi).outerWidth(true)) * -1;
					if (self.animateEnd == 1) {
						self.animateEnd = 0;
						gShowBox.stop().animate({
							left: offset
						}, opts.moveTime, function() {
							gShowBox.find(_mi).first().remove();
							gShowBox.css("left", "0px");
							self.animateEnd = 1;
						})
					}
				}else if(nextindex < currentindex){
					var curt = gShowBox.find(_mi).last().clone();
					for (var i = 0; i < currentindex - nextindex; i++) {
						var lastItem = gShowBox.find(_mi).last();
						gShowBox.prepend(lastItem)
					}
					gShowBox.append(curt);
					var offset = (gShowBox.find(_mi).outerWidth(true)) * -1;
					gShowBox.css("left", offset);
					if (self.animateEnd == 1) {
						self.animateEnd = 0;
						gShowBox.stop().animate({
							left: "0px"
						}, opts.moveTime, function() {
							gShowBox.find(_mi).last().remove();
							self.animateEnd = 1
						})
					}
				}
			}).mouseout(function(){
				if (opts.autoPlay){
					self.auto();
				};
			});
		};

		gShowBox.mouseover(function(){
			if (self.timer){
				clearInterval(self.timer);
			};
		}).mouseout(function(){
			if (opts.autoPlay){
				self.auto();
			};
		});
	},
	auto:function(){
		var self = this;
		self.timer = setInterval(function(){
			self.nextScroll();
		},self.options.autoTime);
	},
	response:function(){
		var self = this;
		$(window).on('resize',function(){
			var w = self.container.width();
			self.container.find(self.options.moveItem).css('width',w+'px');
		});
	},
	init:function(){
		var opts = this.options;
		this.initEl();
		if(opts.initItemWidth){
			this.container.find(this.options.moveItem).css('width',this.container.width()+'px');
		};
		this.bindEvents();
		if(opts.autoPlay && this.gShowBox.find(this.options.moveItem).length >= 2)this.auto();
		if(opts.response)this.response();
	}
});