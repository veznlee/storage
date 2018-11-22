function isWindow(obj) {return obj && obj.window === obj;}
function isScope(obj) {return obj && obj.$evalAsync && obj.$watch;}

function isPromiseLike(obj) {return obj && isFunction(obj.then);}

function isUndefined(value) {return typeof value === 'undefined';}
function isDefined(value) {return typeof value !== 'undefined';}
function isObject(value) {return value !== null && typeof value === 'object';}
function isBoolean(value) {return typeof value === 'boolean';}
function isFunction(value) {return typeof value === 'function';}
function isString(value) {return typeof value === 'string';}
function isNumber(value) {return typeof value === 'number';}
function isArray(value) {return Object.prototype.toString.call(value) === '[object Array]';}

function isRegExp(value) {return Object.prototype.toString.call(value) === '[object RegExp]';}

function isFile(obj) {return Object.prototype.toString.call(obj) === '[object File]';}
function isFormData(obj) {return Object.prototype.toString.call(obj) === '[object FormData]';}
function isBlob(obj) {return Object.prototype.toString.call(obj) === '[object Blob]';}


function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {

  if (!(isString(number) || isNumber(number)) || isNaN(number)) return '';

  var isInfinity = !isFinite(number);
  var isZero = false;
  var numStr = Math.abs(number) + '',
      formattedText = '',
      parsedNumber;

  if (isInfinity) {
    formattedText = '\u221e';
  } else {
    parsedNumber = parse(numStr);

    roundNumber(parsedNumber, fractionSize, pattern.minFrac, pattern.maxFrac);

    var digits = parsedNumber.d;
    var integerLen = parsedNumber.i;
    var exponent = parsedNumber.e;
    var decimals = [];
    isZero = digits.reduce(function(isZero, d) { return isZero && !d; }, true);

    // pad zeros for small numbers
    while (integerLen < 0) {
      digits.unshift(0);
      integerLen++;
    }

    // extract decimals digits
    if (integerLen > 0) {
      decimals = digits.splice(integerLen, digits.length);
    } else {
      decimals = digits;
      digits = [0];
    }

    // format the integer digits with grouping separators
    var groups = [];
    if (digits.length >= pattern.lgSize) {
      groups.unshift(digits.splice(-pattern.lgSize, digits.length).join(''));
    }
    while (digits.length > pattern.gSize) {
      groups.unshift(digits.splice(-pattern.gSize, digits.length).join(''));
    }
    if (digits.length) {
      groups.unshift(digits.join(''));
    }
    formattedText = groups.join(groupSep);

    // append the decimal digits
    if (decimals.length) {
      formattedText += decimalSep + decimals.join('');
    }

    if (exponent) {
      formattedText += 'e+' + exponent;
    }
  }
  if (number < 0 && !isZero) {
    return pattern.negPre + formattedText + pattern.negSuf;
  } else {
    return pattern.posPre + formattedText + pattern.posSuf;
  }
}

function padNumber(num, digits, trim, negWrap) {
  var neg = '';
  if (num < 0 || (negWrap && num <= 0)) {
    if (negWrap) {
      num = -num + 1;
    } else {
      num = -num;
      neg = '-';
    }
  }
  num = '' + num;
  while (num.length < digits) num = ZERO_CHAR + num;
  if (trim) {
    num = num.substr(num.length - digits);
  }
  return neg + num;
}


function dateGetter(name, size, offset, trim, negWrap) {
  offset = offset || 0;
  return function(date) {
    var value = date['get' + name]();
    if (offset > 0 || value > -offset) {
      value += offset;
    }
    if (value === 0 && offset === -12) value = 12;
    return padNumber(value, size, trim, negWrap);
  };
}

function dateStrGetter(name, shortForm, standAlone) {
  return function(date, formats) {
    var value = date['get' + name]();
    var propPrefix = (standAlone ? 'STANDALONE' : '') + (shortForm ? 'SHORT' : '');
    var get = uppercase(propPrefix + name);

    return formats[get][value];
  };
}

function timeZoneGetter(date, formats, offset) {
  var zone = -1 * offset;
  var paddedZone = (zone >= 0) ? '+' : '';

  paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) +
                padNumber(Math.abs(zone % 60), 2);

  return paddedZone;
}

function getFirstThursdayOfYear(year) {
    // 0 = index of January
    var dayOfWeekOnFirst = (new Date(year, 0, 1)).getDay();
    // 4 = index of Thursday (+1 to account for 1st = 5)
    // 11 = index of *next* Thursday (+1 account for 1st = 12)
    return new Date(year, 0, ((dayOfWeekOnFirst <= 4) ? 5 : 12) - dayOfWeekOnFirst);
}

function getThursdayThisWeek(datetime) {
    return new Date(datetime.getFullYear(), datetime.getMonth(),
      // 4 = index of Thursday
      datetime.getDate() + (4 - datetime.getDay()));
}

function weekGetter(size) {
   return function(date) {
      var firstThurs = getFirstThursdayOfYear(date.getFullYear()),
         thisThurs = getThursdayThisWeek(date);

      var diff = +thisThurs - +firstThurs,
         result = 1 + Math.round(diff / 6.048e8); // 6.048e8 ms per week

      return padNumber(result, size);
   };
}

function ampmGetter(date, formats) {
  return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
}

function eraGetter(date, formats) {
  return date.getFullYear() <= 0 ? formats.ERAS[0] : formats.ERAS[1];
}

function longEraGetter(date, formats) {
  return date.getFullYear() <= 0 ? formats.ERANAMES[0] : formats.ERANAMES[1];
}

var DATE_FORMATS = {
  yyyy: dateGetter('FullYear', 4, 0, false, true),
    yy: dateGetter('FullYear', 2, 0, true, true),
     y: dateGetter('FullYear', 1, 0, false, true),
  MMMM: dateStrGetter('Month'),
   MMM: dateStrGetter('Month', true),
    MM: dateGetter('Month', 2, 1),
     M: dateGetter('Month', 1, 1),
  LLLL: dateStrGetter('Month', false, true),
    dd: dateGetter('Date', 2),
     d: dateGetter('Date', 1),
    HH: dateGetter('Hours', 2),
     H: dateGetter('Hours', 1),
    hh: dateGetter('Hours', 2, -12),
     h: dateGetter('Hours', 1, -12),
    mm: dateGetter('Minutes', 2),
     m: dateGetter('Minutes', 1),
    ss: dateGetter('Seconds', 2),
     s: dateGetter('Seconds', 1),
     // while ISO 8601 requires fractions to be prefixed with `.` or `,`
     // we can be just safely rely on using `sss` since we currently don't support single or two digit fractions
   sss: dateGetter('Milliseconds', 3),
  EEEE: dateStrGetter('Day'),
   EEE: dateStrGetter('Day', true),
     a: ampmGetter,
     Z: timeZoneGetter,
    ww: weekGetter(2),
     w: weekGetter(1),
     G: eraGetter,
     GG: eraGetter,
     GGG: eraGetter,
     GGGG: longEraGetter
};

var DATE_FORMATS_SPLIT = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))([\s\S]*)/,
    NUMBER_STRING = /^-?\d+$/;


function dateFilter($locale) {
  var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
                     // 1        2       3         4          5          6          7          8  9     10      11
  function jsonStringToDate(string) {
    var match;
    if ((match = string.match(R_ISO8601_STR))) {
      var date = new Date(0),
          tzHour = 0,
          tzMin  = 0,
          dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
          timeSetter = match[8] ? date.setUTCHours : date.setHours;

      if (match[9]) {
        tzHour = toInt(match[9] + match[10]);
        tzMin = toInt(match[9] + match[11]);
      }
      dateSetter.call(date, toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
      var h = toInt(match[4] || 0) - tzHour;
      var m = toInt(match[5] || 0) - tzMin;
      var s = toInt(match[6] || 0);
      var ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
      timeSetter.call(date, h, m, s, ms);
      return date;
    }
    return string;
  }


  return function(date, format, timezone) {
    var text = '',
        parts = [],
        fn, match;

    format = format || 'mediumDate';
    format = $locale.DATETIME_FORMATS[format] || format;
    if (isString(date)) {
      date = NUMBER_STRING.test(date) ? toInt(date) : jsonStringToDate(date);
    }

    if (isNumber(date)) {
      date = new Date(date);
    }

    if (!isDate(date) || !isFinite(date.getTime())) {
      return date;
    }

    while (format) {
      match = DATE_FORMATS_SPLIT.exec(format);
      if (match) {
        parts = concat(parts, match, 1);
        format = parts.pop();
      } else {
        parts.push(format);
        format = null;
      }
    }

    var dateTimezoneOffset = date.getTimezoneOffset();
    if (timezone) {
      dateTimezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
      date = convertTimezoneToLocal(date, timezone, true);
    }
    forEach(parts, function(value) {
      fn = DATE_FORMATS[value];
      text += fn ? fn(date, $locale.DATETIME_FORMATS, dateTimezoneOffset)
                 : value === '\'\'' ? '\'' : value.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
    });

    return text;
  };
}