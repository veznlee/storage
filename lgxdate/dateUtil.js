var dateUtil = {
    //是否闰年
    isleap:function(year){
        return (year%4 === 0 && year%100 !== 0) || year%400 === 0;
    },
    //多少周
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
    //第几周
    weekOrder:function(date){
        var d = date || new Date(),y = d.getFullYear();
        var yfd = new Date(y,0,1),yfw = yfd.getDay();
        //需要减掉多少天
        var reduceD = yfw == 0?0:(7-yfw),
            ms = d-yfd,
            days = Math.floor(ms/(1000*3600*24)),
            weeks =  Math.floor((days-reduceD)/7)+1;
        return weeks;
    },
    //某一周周一到周六的日期
    weekDays:function(year,week){
        var d = new Date(year, 0, 1);
        while (d.getDay() != 0) {
            d.setDate(d.getDate() + 1);
        };
        var startDate = d.setDate(d.getDate() + (week-1)*7);
        var endDate = d.setDate(d.getDate() + 6);
        return [new Date(startDate),new Date(endDate)];
    },
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
	}
};