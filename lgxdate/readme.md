# 一个简单的日期插件

## 使用方法

### 1、引入相应的js和css文件,其中popup.js可单独使用，功能跟mui的popup差不多，其样式就来自mui
```html
<link rel="stylesheet" href="./global.css"/>
<link rel="stylesheet" type="text/css" href="./font/iconfont.css">
<script type="text/javascript" src="./jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="./popup.js"></script>
<script type="text/javascript" src="./date-plugin.js"></script>
```

### 2、创建一个div，并设置id
```html
<div id="planDate"></div>
```

### 3、编写javascript代码
```js
var date = new DatePlugin({
  id:"testDate"//默认的日期是当前日期
}).init();
```

### 4、当然，你也可以传入自己的初始化日期
```js
var date = new DatePlugin({
  id:"testDate",
  date:'2017-08-09'
}).init();
```

### 5、还可以指定你本月的计划哦，like this
```js
var date2 = new DatePlugin({
  id:"calender",
  cutStyle:'/',//指定日期的分割方式，默认是‘-’，分割方式一旦指定，后面所有的操作获取的格式都如此
  date:"2015/01/01",//这里传入的日期的格式必须保证和指定的分割方式一致，不然创建不成功
  plans:[{
    date:'2015/01/16',
    plan:'测试2015/01/06'
  },{
    date:'2015/01/20',
    plan:'测试2015/08/20'
  }]
}).init();
```

### 6、其他功能
```js
var date2 = new DatePlugin({
  id:"calender"
}).init();

date2.addPlan({//增加计划
  date:'',
  plan:''
});
date2.removePlan(date);//删除计划
date2.showPlan(date);//显示计划
date2.getToday();//获取今天的日期，指的是你创建时的‘今天’
date2.getCurrentMonth();//当前月
date2.getCurrentYear();//当前年
date2.getCurrentWeek();//当前为周几
date2.getLastMonth();//上一月
date2.getLastYear();//上一年
date2.getNextMonth();//下一月
date2.getNextYear();//下一年
date2.getMonthDay(year,month);//获取某年某月有多少天
date2.getCurrentMonthDays();//获取当前月有多少天
```

