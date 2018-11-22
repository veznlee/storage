/**
 * create by liguixing at 2017-8-10 17:24:39
 * 简单的日期插件
 */
function DatePlugin(options){
 	this.options = $.extend({},{
 		WEEKS:["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
 		MONTHS:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
 		cutStyle:'-',
 		dateStyle:'yyyy-mm-dd'
 	},options);
}
DatePlugin.prototype = {
	consturctor:DatePlugin,
	isDate:function(str){
		var dateTest;
		if (this.options.cutStyle == '-'){
			dateTest = new RegExp(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/);
			//dateTest = new RegExp(/^(?:(?!0000)[0-9]{4}-(?:(?:0?[1-9]|1[0-2])-(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])-(?:29|30)|(?:0?[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-0?2-29)$/);
		}
		if (this.options.cutStyle == '/'){
			dateTest = new RegExp("^(?:(?!0000)[0-9]{4}/(?:(?:0[1-9]|1[0-2])/(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])/(?:29|30)|(?:0[13578]|1[02])/31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)/02/29)$");
			//dateTest = new RegExp("^(?:(?!0000)[0-9]{4}/(?:(?:0?[1-9]|1[0-2])/(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])/(?:29|30)|(?:0?[13578]|1[02])/31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)/0?2/29)$");
		}
		return dateTest.test(str);
	},
	format:function (date,format) {
		var d = new Date(date);
		/* 函数：填充0字符,参数：value-需要填充的字符串,length-总长度,返回：填充后的字符串 */
		var zeroize = function (num) {
			return (num*1 < 10 ? '0'+ num*1 : num).toString();
		};  
		var formatStr = format || 'yyyy-MM-dd';
		return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
			switch ($0) {
				case 'd': return d.getDate();
				case 'dd': return zeroize(d.getDate());
				case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
				case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
				case 'M': return d.getMonth() + 1;
				case 'MM': return zeroize(d.getMonth() + 1);
				case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
				case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
				case 'yy': return new String(d.getFullYear()).substr(2);
				case 'yyyy': return d.getFullYear();
				case 'h': return d.getHours() % 12 || 12;
				case 'hh': return zeroize(d.getHours() % 12 || 12);
				case 'H': return d.getHours();
				case 'HH': return zeroize(d.getHours());
				case 'm': return d.getMinutes();
				case 'mm': return zeroize(d.getMinutes());
				case 's': return d.getSeconds();
				case 'ss': return zeroize(d.getSeconds());
				case 'l': return d.getMilliseconds();
				case 'll': return zeroize(d.getMilliseconds());
				case 'tt': return d.getHours() < 12 ? 'am' : 'pm';
				case 'TT': return d.getHours() < 12 ? 'AM' : 'PM';
			}
		});
	},
	_fillZero:function(num){
		return (num*1 < 10 ? '0'+ num*1 : num).toString();
	},
	_getDateStrByDate:function(cyear,cmonth,cdate){
		var $this = this,
			T = this.options.cutStyle,
			F = this._fillZero,
			//获取当月的天数
        	days = $this.getMonthDay(cyear, cmonth),
            //拿到上一个月的总天数，补齐前面的空格
			pdays = $this.getMonthDay(cyear,cmonth-1),
			// 拿到当天号数
            cdate = cdate,
			//创建每个月的第一天的日期对象
            date = new Date(cyear,cmonth - 1,1),
            //获取每个月的第一天是周几
            week = date.getDay(),
            //获取上一个月的补齐从那天开始
            pwdays = pdays - week +1,
			//下一个月的填充
			nindex = 1,
            //记录天数
            j = 0,
            dateHtml = "",
            // 标志是否要填充前面
            cmark = false;
        while (true) {
            dateHtml += "<div class='flex-item'>";
            // 每次循环创建一行
            for (var i = 0; i < 7; i++) {
                var mark = "item-auto date-item is-c";
                //如果1号是星期一
                if (j == 0 && i == week) {
                    j++;
                    if (j == cdate) mark = "item-auto date-item is-c active";
                    dateHtml += "<div data-ymd='"+cyear+T+F(cmonth)+T+F(j)+"' class='" + mark + "'>1</div>";
                    cmark = true;
                // 号数在本月的
                } else if (j > 0 && j < days) {
                    j++;
                    if (j == cdate) mark = "item-auto date-item is-c active";
                    dateHtml += "<div data-ymd='"+cyear+T+F(cmonth)+T+F(j)+"' class='" + mark + "'>" + j + "</div>";
                } else {
                	if(!cmark){
						var oy = cyear;
						if(cmonth==1){
							oy = cyear-1;
						}
						dateHtml +="<div data-ymd='"+oy+T+F((cmonth-1==0?12:cmonth-1))+T+pwdays+"' class='item-auto date-item not-c'>"+pwdays+"</div>";
						pwdays++;
					}else{
						var oy = cyear;
						if(cmonth==12)oy = cyear+1;
						dateHtml +="<div data-ymd='"+oy+T+F(cmonth+1)+T+F(nindex)+"' class='item-auto date-item not-c'>"+nindex+"</div>";
						nindex++;
					}
                }
            }
            dateHtml += "</div>";
            if (j >= days) break;
        };
        return dateHtml;
	},
	_getWeekStr:function(){
		var WEEKS = this.options.WEEKS,WEEKstr = '';
		for (var i = 0, len = WEEKS.length; i < len; i++) {
			WEEKstr += '<div class="item-auto date-item">'+WEEKS[i]+'</div>';
        };
        this.WEEKstr = WEEKstr;
        return WEEKstr;
	},
	_createViewByDate:function(year,month,date){
		var $this = this,
			year = year || this.cyear,
			month = month || this.cmonth,
			date = date || this.today,
			YMstr = year+"年"+month+"月",
			WEEKstr = '',
			DATEstr = '';
        WEEKstr = $this._getWeekStr();
		DATEstr = $this._getDateStrByDate(year,month,date);

		this.$view = $('<div class="date-page date-container">\
			<div class="row-wrap">\
				<div class="col-60">\
					<div class="month-controller">\
						<span class="month-controller-btn reduce m-reduce"><i class="icon iconfont icon-xiangzuo1"></i></span>\
						<div class="month-show">'+YMstr+'</div>\
						<span class="month-controller-btn add m-add"><i class="icon iconfont icon-xiangyou1"></i></span>\
					</div>\
				</div>\
				<div class="col-40 ta-right">\
					<span class="btn current-month m-current">返回本月</span>\
				</div>\
			</div>\
			<div class="date-wrap">\
				<div class="date-week flex-item">'+WEEKstr+'</div>\
				<div class="date-day">'+DATEstr+'</div>\
			</div>\
		</div>').appendTo(this.$container.empty());
		this._initEvenets();
		return this;
	},
	init:function(){
		var options = this.options,T = options.cutStyle,$this = this;
		if(!options.date){
			var date = new Date();
			this.cyear = this.showYear = date.getFullYear();
            this.cmonth = this.showMonth = date.getMonth() + 1;
            this.today = this.showDay = date.getDate();
            this.cweek = this.showWeek = date.getDay();
		}else{
			var date = options.date;
			if(typeof date != 'string' || !this.isDate(date)){
				throw "传入的日期格式不正确或范围不合法！正确格式为:"+options.dateStyle;
			} else {
				var dateArr = date.split(options.cutStyle);
				this.cyear = this.showYear = dateArr[0]*1;
	            this.cmonth = this.showMonth = dateArr[1]*1;
	            this.today = this.showDay = dateArr[2]*1;
	            this.cweek = this.showWeek = new Date(this.cyear,this.cmonth-1,this.today).getDay();
	        }
		}
		this.options.dateStyle = 'yyyy'+T+'mm'+T+'dd';
		this.$container = $("#"+options.id);
		this._createViewByDate(this.cyear,this.cmonth,this.today);
		if(options.plans){
			var i = 0, p = options.plans, pl = p.length;
			for(;i<pl;i++){$this.addPlan(p[i]);}
		}
		//this.popup = new OperatePopup();
		return this;
	},
	getToday: function(){
		return this.today;
	},
	getCurrentMonth: function(){
		return this.cmonth;
	},
	getCurrentYear: function(){
		return this.cyear;
	},
	getCurrentWeek: function(){
		return this.cweek;
	},
	getLastMonth: function(){
		var month = this.cmonth,T = this.options.cutStyle;
		return month*1 == 1 ? (this.cyear-1)+T+12 : this.cyear+T+ this._fillZero(month-1);
	},
	getLastYear: function(){
		return this.cyear - 1;
	},
	getNextMonth: function(){
		var month = this.cmonth,T = this.options.cutStyle;
		return month == 12 ? (this.cyear+1)+T+'01' : this.cyear+T+ this._fillZero(month+1);
	},
	getNextYear: function(){
		return this.cyear + 1;
	},
	getMonthDay: function(year,month) { 
		//拿到一个月有多少天，getDate()拿到今天是几号
        return new Date(year, month, 0).getDate();
    },
    getCurrentMonthDays: function(){
    	return new Date(this.cyear, this.cmonth, 0).getDate();
    },
    changeShowMonth:function(number){
    	var _this = this;
    	if(number === 1){
    		var month = _this.showMonth;
    		_this.showYear  = month === 12 ? _this.showYear+1 :  _this.showYear;
    		_this.showMonth = month === 12 ? 1 : month+1;
    		_this._createViewByDate(_this.showYear,_this.showMonth,1);
    	}
    	if(number === -1){
    		var month = _this.showMonth;
    		_this.showYear  = month === 1 ? _this.showYear-1 :  _this.showYear;
    		_this.showMonth = month === 1 ? 12 : month - 1;
    		_this._createViewByDate(_this.showYear,_this.showMonth,1);
    	}
    },
    backCurrentMonth:function(){
    	this._createViewByDate(this.cyear,this.cmonth,this.today);
    	this.showYear = this.cyear;
    	this.showMonth = this.cmonth;
    	this.showDay = this.today;
    },
    addPlan:function(opt){
    	var $this = this,
    		date = opt.date;
    	if(!this.isDate(date)){
    		throw "传入的日期格式不正确或范围不合法！正确格式为:"+this.options.dateStyle;
    	}
    	var	$date = $this.$view.find('.date-item[data-ymd="'+opt.date+'"]');
    	$date.attr('data-plan',opt.plan).addClass('has-plan');
    },
    removePlan:function(date){
    	if(!this.isDate(date)){
    		throw "传入的日期格式不正确或范围不合法！正确格式为:"+this.options.dateStyle;
    	}
    	var $date = this.$view.find('.date-item[data-ymd="'+date+'"]');
    	$date.removeAttr('data-plan').removeClass('has-plan');
    },
    showPlan:function(date){
    	if(!this.isDate(date)){
    		throw "传入的日期格式不正确或范围不合法！正确格式为:"+this.options.dateStyle;
    	}
    	var $this = this,
    		plan = $this.$view.find('.date-item[data-ymd="'+date+'"]').attr('data-plan');
    	if(plan && plan != ''){
			/*$this.popup.alert({
    			title:"行程安排",
    			text:'行程：'+plan
    		});*/
    		alert(plan);
    	}else{
    		$this.popup.tip('今日无行程！');
    		alert('今日无行程！');
    	}
    },
    _initEvenets:function(){
    	var $this = this,$view = this.$view;
    	$view.on('click','.m-add',function(){
    		$this.changeShowMonth.call($this,1);
    	});
    	$view.on('click','.m-reduce',function(){
    		$this.changeShowMonth.call($this,-1);
    	});
    	$view.on('click','.m-current',function(){
    		$this.backCurrentMonth.call($this);
    	});
    	$view.on('click','.has-plan',function(){
    		var _this = $(this),plan = _this.attr('data-plan'),date = _this.attr('data-ymd');
    		if(plan && plan != ''){
				/*$this.popup.alert({
	    			title:"行程安排",
	    			text:'行程：'+plan
	    		});*/
	    		alert(plan);
	    	}else{
	    		//$this.popup.tip('今日无行程！');
	    		alert('今日无行程！');
	    	}
    	});
    }
}