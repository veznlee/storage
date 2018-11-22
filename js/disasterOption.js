var dataMap = {};
function dataFormatter(obj) {
    var pList = ['北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆'];
    var temp;
    for (var year = 2002; year <= 2011; year++) {
        var max = 0;
        var sum = 0;
        temp = obj[year];
        obj[year] = obj[year].slice(0,10);
        //for (var i = 0, l = temp.length; i < l; i++) {
        for (var i = 0;i < 10; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
                name : pList[i],
                value : temp[i]
            }
        }

        obj[year + 'max'] = Math.floor(max / 100) * 100;
        obj[year + 'sum'] = sum;
    }
    return obj;
}

dataMap.dataGDP = dataFormatter({
    //max : 60000,
    2011:[16251.93,11307.28,24515.76,11237.55,14359.88,22226.7,10568.83,12582,19195.69,49110.27],
    2010:[14113.58,9224.46,20394.26,9200.86,11672,18457.27,8667.58,10368.6,17165.98,41425.48],
    2009:[12153.03,7521.85,17235.48,7358.31,9740.25,15212.49,7278.75,8587,15046.45,34457.3],
    2008:[11115,6719.01,16011.97,7315.4,8496.2,13668.58,6426.1,8314.37,14069.87,30981.98],
    2007:[9846.81,5252.76,13607.32,6024.45,6423.18,11164.3,5284.69,7104,12494.01,26018.48],
    2006:[8117.78,4462.74,11467.6,4878.61,4944.25,9304.52,4275.12,6211.8,10572.24,21742.05],
    2005:[6969.52,3905.64,10012.11,4230.53,3905.03,8047.26,3620.27,5513.7,9247.66,18598.69],
    2004:[6033.21,3110.97,8477.63,3571.37,3041.07,6672,3122.01,4750.6,8072.83,15003.6],
    2003:[5007.21,2578.03,6921.29,2855.23,2388.38,6002.54,2662.08,4057.4,6694.23,12442.87],
    2002:[4315,2150.76,6018.28,2324.8,1940.94,5458.22,2348.54,3637.2,5741.03,10606.85]
});

dataMap.dataPI = dataFormatter({
    //max : 4000,
    2011:[136.27,159.72,2905.73,641.42,1306.3,1915.57,1277.44,1701.5,124.94,3064.78],
    2010:[124.36,145.58,2562.81,554.48,1095.28,1631.08,1050.15,1302.9,114.15,2540.1],
    2009:[118.29,128.85,2207.34,477.59,929.6,1414.9,980.57,1154.33,113.82,2261.86],
    2008:[112.83,122.58,2034.59,313.58,907.95,1302.02,916.72,1088.94,111.8,2100.11],
    2007:[101.26,110.19,1804.72,311.97,762.1,1133.42,783.8,915.38,101.84,1816.31],
    2006:[88.8,103.35,1461.81,276.77,634.94,939.43,672.76,750.14,93.81,1545.05],
    2005:[88.68,112.38,1400,262.42,589.56,882.41,625.61,684.6,90.26,1461.51],
    2004:[87.36,105.28,1370.43,276.3,522.8,798.43,568.69,605.79,83.45,1367.58],
    2003:[84.11,89.91,1064.05,215.19,420.1,615.8,488.23,504.8,81.02,1162.45],
    2002:[82.44,84.21,956.84,197.8,374.69,590.2,446.17,474.2,79.68,1110.44]
});

dataMap.dataSI = dataFormatter({
    //max : 26600,
    2011:[3752.48,5928.32,13126.86,6635.26,8037.69,12152.15,5611.48,5962.41,7927.89,25203.28,16555.58,8309.38,9069.2,6390.55,24017.11,15427.08,9815.94,9361.99,26447.38,5675.32,714.5,5543.04,11029.13,2194.33,3780.32,208.79,6935.59,2377.83,975.18,1056.15,3225.9],
    2010:[3388.38,4840.23,10707.68,5234,6367.69,9976.82,4506.31,5025.15,7218.32,21753.93,14297.93,6436.62,7522.83,5122.88,21238.49,13226.38,7767.24,7343.19,23014.53,4511.68,571,4359.12,8672.18,1800.06,3223.49,163.92,5446.1,1984.97,744.63,827.91,2592.15],
    2009:[2855.55,3987.84,8959.83,3993.8,5114,7906.34,3541.92,4060.72,6001.78,18566.37,11908.49,4905.22,6005.3,3919.45,18901.83,11010.5,6038.08,5687.19,19419.7,3381.54,443.43,3448.77,6711.87,1476.62,2582.53,136.63,4236.42,1527.24,575.33,662.32,1929.59],
    2008:[2626.41,3709.78,8701.34,4242.36,4376.19,7158.84,3097.12,4319.75,6085.84,16993.34,11567.42,4198.93,5318.44,3554.81,17571.98,10259.99,5082.07,5028.93,18502.2,3037.74,423.55,3057.78,5823.39,1370.03,2452.75,115.56,3861.12,1470.34,557.12,609.98,2070.76],
    2007:[2509.4,2892.53,7201.88,3454.49,3193.67,5544.14,2475.45,3695.58,5571.06,14471.26,10154.25,3370.96,4476.42,2975.53,14647.53,8282.83,4143.06,3977.72,16004.61,2425.29,364.26,2368.53,4648.79,1124.79,2038.39,98.48,2986.46,1279.32,419.03,455.04,1647.55],
    2006:[2191.43,2457.08,6110.43,2755.66,2374.96,4566.83,1915.29,3365.31,4969.95,12282.89,8511.51,2711.18,3695.04,2419.74,12574.03,6724.61,3365.08,3187.05,13469.77,1878.56,308.62,1871.65,3775.14,967.54,1705.83,80.1,2452.44,1043.19,331.91,351.58,1459.3],
    2005:[2026.51,2135.07,5271.57,2357.04,1773.21,3869.4,1580.83,2971.68,4381.2,10524.96,7164.75,2245.9,3175.92,1917.47,10478.62,5514.14,2852.12,2612.57,11356.6,1510.68,240.83,1564,3067.23,821.16,1426.42,63.52,1951.36,838.56,264.61,281.05,1164.79],
    2004:[1853.58,1685.93,4301.73,1919.4,1248.27,3061.62,1329.68,2487.04,3892.12,8437.99,6250.38,1844.9,2770.49,1566.4,8478.69,4182.1,2320.6,2190.54,9280.73,1253.7,205.6,1376.91,2489.4,681.5,1281.63,52.74,1553.1,713.3,211.7,244.05,914.47],
    2003:[1487.15,1337.31,3417.56,1463.38,967.49,2898.89,1098.37,2084.7,3209.02,6787.11,5096.38,1535.29,2340.82,1204.33,6485.05,3310.14,1956.02,1777.74,7592.78,984.08,175.82,1135.31,2014.8,569.37,1047.66,47.64,1221.17,572.02,171.92,194.27,719.54],
    2002:[1249.99,1069.08,2911.69,1134.31,754.78,2609.85,943.49,1843.6,2622.45,5604.49,4090.48,1337.04,2036.97,941.77,5184.98,2768.75,1709.89,1523.5,6143.4,846.89,148.88,958.87,1733.38,481.96,934.88,32.72,1007.56,501.69,144.51,153.06,603.15]
});

dataMap.dataTI = dataFormatter({
    //max : 25000,
    2011:[12363.18,5219.24,8483.17,3960.87,5015.89,8158.98,3679.91,4918.09,11142.86,20842.21,14180.23,4975.96,6878.74,3921.2,17370.89,7991.72,7247.02,7539.54,24097.7,3998.33,1148.93,3623.81,7014.04,2781.29,3701.79,322.57,4355.81,1963.79,540.18,861.92,2245.12],
    2010:[10600.84,4238.65,7123.77,3412.38,4209.03,6849.37,3111.12,4040.55,9833.51,17131.45,12063.82,4193.69,5850.62,3121.4,14343.14,6607.89,6053.37,6369.27,20711.55,3383.11,953.67,2881.08,6030.41,2177.07,2892.31,274.82,3688.93,1536.5,470.88,702.45,1766.69],
    2009:[9179.19,3405.16,6068.31,2886.92,3696.65,5891.25,2756.26,3371.95,8930.85,13629.07,9918.78,3662.15,5048.49,2637.07,11768.18,5700.91,5127.12,5402.81,18052.59,2919.13,748.59,2474.44,5198.8,1885.79,2519.62,240.85,3143.74,1363.27,398.54,563.74,1587.72],
    2008:[8375.76,2886.65,5276.04,2759.46,3212.06,5207.72,2412.26,2905.68,7872.23,11888.53,8799.31,3234.64,4346.4,2355.86,10358.64,5099.76,4466.85,4633.67,16321.46,2529.51,643.47,2160.48,4561.69,1652.34,2218.81,218.67,2699.74,1234.21,355.93,475,1421.38],
    2007:[7236.15,2250.04,4600.72,2257.99,2467.41,4486.74,2025.44,2493.04,6821.11,9730.91,7613.46,2789.78,3770,1918.95,8620.24,4511.97,3812.34,3835.4,14076.83,2156.76,528.84,1825.21,3881.6,1312.94,1896.78,188.06,2178.2,1037.11,294.91,366.18,1246.89],
    2006:[5837.55,1902.31,3895.36,1846.18,1934.35,3798.26,1687.07,2096.35,5508.48,7914.11,6281.86,2390.29,3022.83,1614.65,7187.26,3721.44,3111.98,3229.42,11585.82,1835.12,433.57,1649.2,3319.62,989.38,1557.91,159.76,1806.36,900.16,249.04,294.78,1058.16],
    2005:[4854.33,1658.19,3340.54,1611.07,1542.26,3295.45,1413.83,1857.42,4776.2,6612.22,5360.1,2137.77,2551.41,1411.92,5924.74,3181.27,2655.94,2882.88,9772.5,1560.92,377.17,1440.32,2836.73,815.32,1374.62,137.24,1546.59,787.36,213.37,259.49,929.41],
    2004:[4092.27,1319.76,2805.47,1375.67,1270,2811.95,1223.64,1657.77,4097.26,5198.03,4584.22,1963.9,2206.02,1225.8,4764.7,2722.4,2292.55,2428.95,8335.3,1361.92,335.3,1229.62,2510.3,661.8,1192.53,123.3,1234.6,688.41,193.7,227.73,833.36],
    2003:[3435.95,1150.81,2439.68,1176.65,1000.79,2487.85,1075.48,1467.9,3404.19,4493.31,3890.79,1638.42,1949.91,1043.08,4112.43,2358.86,2003.08,1995.78,7178.94,1178.25,293.85,1081.35,2189.68,558.28,1013.76,96.76,1063.89,589.91,169.81,195.46,753.91],
    2002:[2982.57,997.47,2149.75,992.69,811.47,2258.17,958.88,1319.4,3038.9,3891.92,3227.99,1399.02,1765.8,972.73,3700.52,1978.37,1795.93,1780.79,6343.94,1074.85,270.96,956.12,1943.68,480.37,914.5,89.56,963.62,514.83,148.83,171.14,704.5]
});

dataMap.dataEstate = dataFormatter({
    //max : 3600,
    2011:[1074.93,411.46,918.02,224.91,384.76,876.12,238.61,492.1,1019.68,2747.89,1677.13,634.92,911.16,402.51,1838.14,987,634.67,518.04,3321.31,465.68,208.71,396.28,620.62,160.3,222.31,17.44,398.03,134.25,29.05,79.01,176.22],
    2010:[1006.52,377.59,697.79,192,309.25,733.37,212.32,391.89,1002.5,2600.95,1618.17,532.17,679.03,340.56,1622.15,773.23,564.41,464.21,2813.95,405.79,188.33,266.38,558.56,139.64,223.45,14.54,315.95,110.02,25.41,60.53,143.44],
    2009:[1062.47,308.73,612.4,173.31,286.65,605.27,200.14,301.18,1237.56,2025.39,1316.84,497.94,656.61,305.9,1329.59,622.98,546.11,400.11,2470.63,348.98,121.76,229.09,548.14,136.15,205.14,13.28,239.92,101.37,23.05,47.56,115.23],
    2008:[844.59,227.88,513.81,166.04,273.3,500.81,182.7,244.47,939.34,1626.13,1052.03,431.27,506.98,281.96,1104.95,512.42,526.88,340.07,2057.45,282.96,95.6,191.21,453.63,104.81,195.48,15.08,193.27,93.8,19.96,38.85,89.79],
    2007:[821.5,183.44,467.97,134.12,191.01,410.43,153.03,225.81,958.06,1365.71,981.42,366.57,511.5,225.96,953.69,447.44,409.65,301.8,2029.77,239.45,67.19,196.06,376.84,93.19,193.59,13.24,153.98,83.52,16.98,29.49,91.28],
    2006:[658.3,156.64,397.14,117.01,136.5,318.54,131.01,194.7,773.61,1017.91,794.41,281.98,435.22,184.67,786.51,348.7,294.73,254.81,1722.07,192.2,44.45,158.2,336.2,80.24,165.92,11.92,125.2,73.21,15.17,25.53,68.9],
    2005:[493.73,122.67,330.87,106,98.75,256.77,112.29,163.34,715.97,799.73,688.86,231.66,331.8,171.88,664.9,298.19,217.17,215.63,1430.37,165.05,38.2,143.88,286.23,76.38,148.69,10.02,108.62,63.78,14.1,22.97,55.79],
    2004:[436.11,106.14,231.08,95.1,73.81,203.1,97.93,137.74,666.3,534.17,587.83,188.28,248.44,167.2,473.27,236.44,204.8,191.5,1103.75,122.52,30.64,129.12,264.3,68.3,116.54,5.8,95.9,56.84,13,20.78,53.55],
    2003:[341.88,92.31,185.19,78.73,61.05,188.49,91.99,127.2,487.82,447.47,473.16,162.63,215.84,138.02,418.21,217.58,176.8,186.49,955.66,100.93,25.14,113.69,231.72,59.86,103.79,4.35,83.9,48.09,11.41,16.85,47.84],
    2002:[298.02,73.04,140.89,65.83,51.48,130.94,76.11,118.7,384.86,371.09,360.63,139.18,188.09,125.27,371.13,199.31,145.17,165.29,808.16,82.83,21.45,90.48,210.82,53.49,95.68,3.42,77.68,41.52,9.74,13.46,43.04]
});

dataMap.dataFinancial = dataFormatter({
    //max : 3200,
    2011:[2215.41,756.5,746.01,519.32,447.46,755.57,207.65,370.78,2277.4,2600.11,2730.29,503.85,862.41,357.44,1640.41,868.2,674.57,501.09,2916.13,445.37,105.24,704.66,868.15,297.27,456.23,31.7,432.11,145.05,62.56,134.18,288.77],
    2010:[1863.61,572.99,615.42,448.3,346.44,639.27,190.12,304.59,1950.96,2105.92,2326.58,396.17,767.58,241.49,1361.45,697.68,561.27,463.16,2658.76,384.53,78.12,496.56,654.7,231.51,375.08,27.08,384.75,100.54,54.53,97.87,225.2],
    2009:[1603.63,461.2,525.67,361.64,291.1,560.2,180.83,227.54,1804.28,1596.98,1899.33,359.6,612.2,165.1,1044.9,499.92,479.11,402.57,2283.29,336.82,65.73,389.97,524.63,194.44,351.74,23.17,336.21,88.27,45.63,75.54,198.87],
    2008:[1519.19,368.1,420.74,290.91,219.09,455.07,147.24,177.43,1414.21,1298.48,1653.45,313.81,497.65,130.57,880.28,413.83,393.05,334.32,1972.4,249.01,47.33,303.01,411.14,151.55,277.66,22.42,287.16,72.49,36.54,64.8,171.97],
    2007:[1302.77,288.17,347.65,218.73,148.3,386.34,126.03,155.48,1209.08,1054.25,1251.43,223.85,385.84,101.34,734.9,302.31,337.27,260.14,1705.08,190.73,34.43,247.46,359.11,122.25,168.55,11.51,231.03,61.6,27.67,51.05,149.22],
    2006:[982.37,186.87,284.04,169.63,108.21,303.41,100.75,74.17,825.2,653.25,906.37,166.01,243.9,79.75,524.94,219.72,174.99,204.72,899.91,129.14,16.37,213.7,299.5,89.43,143.62,6.44,152.25,50.51,23.69,36.99,99.25],
    2005:[840.2,147.4,213.47,135.07,72.52,232.85,83.63,35.03,675.12,492.4,686.32,127.05,186.12,69.55,448.36,181.74,127.32,162.37,661.81,91.93,13.16,185.18,262.26,73.67,130.5,7.57,127.58,44.73,20.36,32.25,80.34],
    2004:[713.79,136.97,209.1,110.29,55.89,188.04,77.17,32.2,612.45,440.5,523.49,94.1,171,65.1,343.37,170.82,118.85,118.64,602.68,74,11.56,162.38,236.5,60.3,118.4,5.4,90.1,42.99,19,27.92,70.3],
    2003:[635.56,112.79,199.87,118.48,55.89,145.38,73.15,32.2,517.97,392.11,451.54,87.45,150.09,64.31,329.71,165.11,107.31,99.35,534.28,61.59,10.68,147.04,206.24,48.01,105.48,4.74,77.87,42.31,17.98,24.8,64.92],
    2002:[561.91,76.86,179.6,124.1,48.39,137.18,75.45,31.6,485.25,368.86,347.53,81.85,138.28,76.51,310.07,158.77,96.95,92.43,454.65,35.86,10.08,134.52,183.13,41.45,102.39,2.81,67.3,42.08,16.75,21.45,52.18]
});
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
    iconLeftGray:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgEAYAAAAj6qa3AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAABcNJREFUaN7tWWtMk2cUPqelTqQdMicioEicCKWiFGSAAq0zZFOJWqAMgxqcy5aY4W03J14KLMZkusVd/LGZGS4GoSCKl+kcpWVkqFgRC5QIAhPvgSqUi1x69kO+bqEhFfgKZvr8fL/3O+c8z/f2fc/7FOAVXm4g2wGJiIgQVSq9vrNTLOaE0VUKWbkSeaCl4rAw8KO/MWj6dKjHQljl7m5+Tw/LIf32bZwBs0h//z7thkb01mg4k/Ec5p48Gb7Np8shQqt94QRgCGt21UR3TIuNJS0FgntqKnwOK0nt5cVaoUmwB/1ra03XASgnOVkCwly+f14eIiIi0ZgLUOSrc3+ybvZszhy8yRUeOwZb4BZtCgpii7BVBMFZ/LKsDJ/a5fRNXrMmwmnulclfNzTYXAAVVcW0ixcvxkh8COfy8mAnHYZJzs5jRnwwgRiowxktLXATMmCFXB7h5KvkZxYVsS5Aca9OafSTSmEfJ472nT8P4VQJ4TzeeBG3gAK4cKanx3SBkwZekZFLeD6ZArFaPWoB1IbahY93enrSL30e3J2XLsFCUED/1KnjzXdIQgMrwvQIMvrPBgdL0VfpGFpXN9R8zlAPmM2NEvs0doLs7BeduLluJbxFt6dMwSwA7k/p6QyPYQtQsrBG2xEql4/55sYW3EFBh0NCikOrrhuPy2TPLQCjmMmZzsPTlJQxK5iL8aDt60MNVEH73r1wANOgvLJytGExh5OCSWlpzy0A08CwfY4PWeAH0AQ7mppMXqZPKEQiidjtKxe4KhT4GvWCxGAYdYJ6SqV6b291VHVAxzf+/lYFYDo3WxOHo1AMLTk5prqe9/q+X7BgyTTRh69PKC39o7X6dNdFDw8ohrXoJBKxlc50ispN2y15WQhgbllZBi5HMSo6OnA+XoaZGzdKjvpuEsyKi5OiPzrh48fqg7pl7SkyGVdOwv5ErZbZzFjLL0cOXLPkZTd4gH6kSJS5uQEAUCELmb2hEB7qdCYjhsH9+Hgp+iQKDDqdihqIaOJE3Np51Ji5fz+JIQhWJSWBGLpoK9vyA2AtRaPczQ0AlP8dtzwFnkAnuLu4jDpjAVyGgkOHOtsmNPM9AwOl6HORn6nTaf66scNY7+eHUZ0GY+/Vq7BqgLiNQe/DGgh2dR08zhlJsP8TLAX4E/RQfe/eqCMPfNlJr/e4GxvKy1VUs9SYIBKFh8zbx59dWUmFk5z4vIAAZqXYnOlazIQLd+5YFyART5PScuKIoYcocBaJOHwqAZeyMnVUdUCbYcMGKXoiYne35DvfRMHazZtRS5/Bt9HRkAb2KGxtZV2AbXCCfrt717oAN8AFg0tK2M5PZ0hLexwcaDulo92RIyqqimnXZmf/fqG+rrXF0TFim+isYHd+fn8OVnN/FYvNtzyWgPPoOLhoNFYFYBwYtgWwKEgNCpgTF8fz7D4+4XBFhSbwxs02dWjoO28IV9gvbWoCCWSQQadjK59pF+Rwkix5WVwSzA7P/OrYjjk1NXQIFHRt7lxbC2JuhSXkBYLUVFqGPHgSHQ3bKRkC/fxGHFePy3FqTY3kY2Ejv1sotCoAg2dLNCbm2ZfKzbW5ALaCPb4JH8lkkreF0wTHTpwY/HjIY5Dx3Bjrabx5DBd4ANfhstLSiCAfZ35WQcFQ84YUgDEbyZ7zae8P8fFwBfYA99Gj8SZmlfjA5tl/y/Sg33P9emumqdVGSIo+6ISNjaYtnImgj41lrKfxJmoBpq4ulFPc6tVLqkTNjun19VYFG26eoge6n9t6Fi3iJHAy0JCf/6KYonSPemFmbKyEJ4rhV6pUz/3+SBObvcIzfR52TVlZjAMzZsQHfuOmU1jeq0lIYFbqsOOMthDm2GSsJ7MDM2BEsMZ44DjDTpOQvkpOZhqnUQvJWoGDwDgwjBFhvo8fhNX4rqsr3KX9IPv3rzFwxS8gv7mZaVmZzo1pYKToq3RQVlTYqt5XeFnxD+ECqgAsx9XVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTExLTA3VDEzOjU0OjI5KzA4OjAwxjbRZQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMS0wN1QxMzo1NDoyOSswODowMLdradkAAABTdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX2YwdWV1anVzb3FhL2xlZnQtY2lyY2xlLWZpbGwuc3Znk38XgwAAAABJRU5ErkJggg==',
    iconRightGray:'image://data:image/png;base64,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',
    iconLeftBlue:'image://data:image/png;base64,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',
    iconRightBlue:'image://data:image/png;base64,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',
};


var disasterOption = {
    baseOption: {
        color: ['#4c84ff', '#ff86ad', '#815eff', '#fb8332', '#36ac91','#da18b8'],
        timeline: {
            left:'10%',
            right:'30%',
            axisType: 'category',
            //autoPlay: true,
            // realtime: false,
            // loop: false,
            //playInterval: 2000,
            symbol:'circle',
            lineStyle:{
                width:20,
                color:'rgba(0,0,0,0.05)'
            },
            itemStyle:{
                color:'#919cb6',
            },
            checkpointStyle:{
                symbolSize: 10,
                color:'#4c84ff',
                borderWidth:0,
            },
            label: {
                height:20,
                lineHeight:20,
                color:'#919cb6',
                position:12,
                formatter : function(s) {
                    return (new Date(s)).getFullYear();
                }
            },
            controlStyle:{
                showPlayBtn:false,
                color:'#919cb6',
                borderColor:'#919cb6',
                borderWidth:5,
                itemSize:14,
                itemGap:20
            },
            emphasis:{
                label: {
                    color:'#4c84ff'
                },
                itemStyle:{
                    color:'#4c84ff',
                },
                controlStyle:{
                    showPlayBtn:false,
                    color:'#4c84ff',
                    borderColor:'#4c84ff',
                    borderWidth:5,
                    itemSize:14,
                    itemGap:20
                }
            },
            //data: ['2002','2003','2004','2005','2006', '2007','2008','2009','2010','2011']
            data:[{
                value: '2002',tooltip: {show:false},
            },{
                value: '2003',tooltip: {show:false},
            },{
                value: '2004',tooltip: {show:false},
            },{
                value: '2005',tooltip: {show:false},
            },{
                value: '2006',tooltip: {show:false},
            },{
                value: '2007',tooltip: {show:false},
            },{
                value: '2008',tooltip: {show:false},
            },{
                value: '2009',tooltip: {show:false},
            },{
                value: '2010',tooltip: {show:false},
            },{
                value: '2011',tooltip: {show:false},
            }]
        },
        tooltip: {
        },
        legend: {
            icon: 'rect',
            itemWidth: 20,
            itemHeight: 5,
            itemGap: 20,
            textStyle: {
                color: '#919cb6'
            },
            x: 'right',
            data: ['第一产业', '第二产业', '第三产业', 'GDP', '金融', '房地产'],
            selected: {
                'GDP': false, '金融': false, '房地产': false
            }
        },
        calculable : true,
        grid: {
            left: '10px',
            //right: '10px',
            width:'80%',
            bottom: '50px',
            top: '60px',
            containLabel: true,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true,
                        formatter: function (params) {
                            return params.value.replace('\n', '');
                        }
                    }
                }
            }
        },
        xAxis: [
            {
                type:'category',
                axisLabel:{'interval':0},
                data:[
                    '北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏'
                ],
                splitLine: {show: false},
                axisLine: gChartOption.axisLine,
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'GDP（亿元）',
                axisLine: gChartOption.axisLine,
            }
        ],
        series: [
            {name: 'GDP', type: 'bar',barWidth:'8px'},
            {name: '金融', type: 'bar',barWidth:'8px'},
            {name: '房地产', type: 'bar',barWidth:'8px'},
            {name: '第一产业', type: 'bar',barWidth:'8px'},
            {name: '第二产业', type: 'bar',barWidth:'8px'},
            {name: '第三产业', type: 'bar',barWidth:'8px'},
            {
                name: 'GDP占比',
                type: 'pie',
                label: {
                    normal: {
                        position: 'inside'
                    }
                },
                center: ['90%', '50%'],
                radius: '45%',
                z: 100
            }
        ]
    },
    options: [
        {
            title: {text: '2002年灾害预警统计'},
            series: [
                {data: dataMap.dataGDP['2002']},
                {data: dataMap.dataFinancial['2002']},
                {data: dataMap.dataEstate['2002']},
                {data: dataMap.dataPI['2002']},
                {data: dataMap.dataSI['2002']},
                {data: dataMap.dataTI['2002']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2002sum']},
                    {name: '第二产业', value: dataMap.dataSI['2002sum']},
                    {name: '第三产业', value: dataMap.dataTI['2002sum']}
                ]}
            ]
        },
        {
            title : {text: '2003年灾害预警统计'},
            series : [
                {data: dataMap.dataGDP['2003']},
                {data: dataMap.dataFinancial['2003']},
                {data: dataMap.dataEstate['2003']},
                {data: dataMap.dataPI['2003']},
                {data: dataMap.dataSI['2003']},
                {data: dataMap.dataTI['2003']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2003sum']},
                    {name: '第二产业', value: dataMap.dataSI['2003sum']},
                    {name: '第三产业', value: dataMap.dataTI['2003sum']}
                ]}
            ]
        },
        {
            title : {text: '2004年灾害预警统计'},
            series : [
                {data: dataMap.dataGDP['2004']},
                {data: dataMap.dataFinancial['2004']},
                {data: dataMap.dataEstate['2004']},
                {data: dataMap.dataPI['2004']},
                {data: dataMap.dataSI['2004']},
                {data: dataMap.dataTI['2004']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2004sum']},
                    {name: '第二产业', value: dataMap.dataSI['2004sum']},
                    {name: '第三产业', value: dataMap.dataTI['2004sum']}
                ]}
            ]
        },
        {
            title : {text: '2005年灾害预警统计'},
            series : [
                {data: dataMap.dataGDP['2005']},
                {data: dataMap.dataFinancial['2005']},
                {data: dataMap.dataEstate['2005']},
                {data: dataMap.dataPI['2005']},
                {data: dataMap.dataSI['2005']},
                {data: dataMap.dataTI['2005']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2005sum']},
                    {name: '第二产业', value: dataMap.dataSI['2005sum']},
                    {name: '第三产业', value: dataMap.dataTI['2005sum']}
                ]}
            ]
        },
        {
            title : {text: '2006年灾害预警统计'},
            series : [
                {data: dataMap.dataGDP['2006']},
                {data: dataMap.dataFinancial['2006']},
                {data: dataMap.dataEstate['2006']},
                {data: dataMap.dataPI['2006']},
                {data: dataMap.dataSI['2006']},
                {data: dataMap.dataTI['2006']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2006sum']},
                    {name: '第二产业', value: dataMap.dataSI['2006sum']},
                    {name: '第三产业', value: dataMap.dataTI['2006sum']}
                ]}
            ]
        },
        {
            title : {text: '2007年灾害预警统计'},
            series : [
                {data: dataMap.dataGDP['2007']},
                {data: dataMap.dataFinancial['2007']},
                {data: dataMap.dataEstate['2007']},
                {data: dataMap.dataPI['2007']},
                {data: dataMap.dataSI['2007']},
                {data: dataMap.dataTI['2007']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2007sum']},
                    {name: '第二产业', value: dataMap.dataSI['2007sum']},
                    {name: '第三产业', value: dataMap.dataTI['2007sum']}
                ]}
            ]
        },
        {
            title : {text: '2008年灾害预警统计'},
            series : [
                {data: dataMap.dataGDP['2008']},
                {data: dataMap.dataFinancial['2008']},
                {data: dataMap.dataEstate['2008']},
                {data: dataMap.dataPI['2008']},
                {data: dataMap.dataSI['2008']},
                {data: dataMap.dataTI['2008']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2008sum']},
                    {name: '第二产业', value: dataMap.dataSI['2008sum']},
                    {name: '第三产业', value: dataMap.dataTI['2008sum']}
                ]}
            ]
        },
        {
            title : {text: '2009年灾害预警统计'},
            series : [
                {data: dataMap.dataGDP['2009']},
                {data: dataMap.dataFinancial['2009']},
                {data: dataMap.dataEstate['2009']},
                {data: dataMap.dataPI['2009']},
                {data: dataMap.dataSI['2009']},
                {data: dataMap.dataTI['2009']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2009sum']},
                    {name: '第二产业', value: dataMap.dataSI['2009sum']},
                    {name: '第三产业', value: dataMap.dataTI['2009sum']}
                ]}
            ]
        },
        {
            title : {text: '2010年灾害预警统计'},
            series : [
                {data: dataMap.dataGDP['2010']},
                {data: dataMap.dataFinancial['2010']},
                {data: dataMap.dataEstate['2010']},
                {data: dataMap.dataPI['2010']},
                {data: dataMap.dataSI['2010']},
                {data: dataMap.dataTI['2010']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2010sum']},
                    {name: '第二产业', value: dataMap.dataSI['2010sum']},
                    {name: '第三产业', value: dataMap.dataTI['2010sum']}
                ]}
            ]
        },
        {
            title : {text: '2011年灾害预警统计'},
            series : [
                {data: dataMap.dataGDP['2011']},
                {data: dataMap.dataFinancial['2011']},
                {data: dataMap.dataEstate['2011']},
                {data: dataMap.dataPI['2011']},
                {data: dataMap.dataSI['2011']},
                {data: dataMap.dataTI['2011']},
                {data: [
                    {name: '第一产业', value: dataMap.dataPI['2011sum']},
                    {name: '第二产业', value: dataMap.dataSI['2011sum']},
                    {name: '第三产业', value: dataMap.dataTI['2011sum']}
                ]}
            ]
        }
    ]
};