$.fn.simulateTouchScroll = function(){
    //如果选择器指定的元素不存在，则直接return
    if(this.length == 0)return;

    var $scroller = this,//外成设置了overflow：hidden的div
        $innerScroll = this.children(),//可滚动的ul元素
        downX = 0,//按下时的鼠标位置
        downLeft = 0,//按下时的导航left位置
        prevX = 0,//用于记录上一次的鼠标位置
        moveX = 0,//鼠标左右移动距离
        iSpeedX = 0,//拖动速度
        ow = $scroller.offset().width,//导航盒子宽度，即可见宽度
        iw = $innerScroll.offset().width,//导航总宽度
        maxLeft = iw - ow,//导航允许的最大left值
        timer = null;//定时器

    var bBtn = false;//当两端拖动到边缘后的控制开关

    //手指按下时执行函数
    $innerScroll.on("touchstart", function (ev) {
        //手指按下后清除之前的滑动
    	if(timer)clearInterval(timer);
        //如果你想在拖动的时候，如果之前的缓冲还没完成，
        //就什么也不做，你可以改成下面这样，但一定记得在touchmove里也要加上
        //if(timer)return;

        ev.stopPropagation();
        //如果你的内部需要滚动的元素的宽度是会改变的，
        //下面两行代码一定要加上，作用是在每次拖动前重新计算最大拖动值
        // iw = $innerScroll.offset().width;
        // maxLeft = iw - ow;

        var touchs = ev.changedTouches[0];
        downX = touchs.pageX;
        downLeft = $(this).position().left;
        prevX = touchs.pageX;
    });

    //手指滑动时执行函数
    $innerScroll.on("touchmove",function (ev) {
        ev.stopPropagation();
        var touchs = ev.changedTouches[0];
        iSpeedX = touchs.pageX - prevX;
        prevX = touchs.pageX;
        moveX = touchs.pageX - downX;
        if (Math.abs(moveX) < 10) return;
        var newLeft = downLeft + moveX;

        //当滑动元素的左边距离父元素的左边距离大于0时，让滑动的距离变为手指拖动距离的1/3
        if ($(this).position().left >= 0) {
            if(bBtn){
				bBtn = false;
				downX = touchs.pageX;
			}
			//$(this).css("left",(touchs.pageX - downX)/3 + 'px');
			$(this).css("left",downLeft + moveX/3 + 'px');
        }

        //当滑动元素的右边距离父元素的右边距离大于0时，同上
        else if ($(this).position().left <= -maxLeft) {
            if(bBtn){
				bBtn = false;
				downX = touchs.pageX;
			}
			//$(this).css("left",(touchs.pageX - downX)/3 - maxLeft + 'px');
			$(this).css("left", moveX/3 - maxLeft + 'px');
        }
        $(this).css("left", newLeft + 'px');
    });

    //手指离开时执行函数
    $innerScroll.on("touchend",function () {
        var _this = $(this);
        if (Math.abs(moveX) < 10) return;
        timer = setInterval(function () {
            if (Math.abs(iSpeedX) <= 1 || _this.position().left >= 50 || _this.position().left <= -maxLeft - 50) {
                if (timer)clearInterval(timer);
                iSpeedX = 0;
                if (_this.position().left > 0) {
                    _this.animate({left: 0}, 400, 'ease-out');
                } else if (_this.position().left < -maxLeft) {
                    _this.animate({left: -maxLeft + "px"}, 400, 'ease-out');
                }
            }
            else {
                iSpeedX = iSpeedX * 0.95;
                _this.css("left", _this.position().left + iSpeedX + 'px');
            }
        }, 13);
    });
};