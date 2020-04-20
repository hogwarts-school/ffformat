/* eslint-disable */

var CroFormat = (function () {
  var ClassArr = [Number, String, Boolean, Array, Object];

  function getDataType(data) {
    var dataTypeMap = {
      Number: Number,
      String: String,
      Boolean: Boolean,
      Function: Function,
      Array: Array,
      Object: Object
    };
    return dataTypeMap[{}.toString.call(data).slice(8, -1)];
  }

  function transformData(value, dataType, normalValue) {
    switch (dataType) {
      case Number:
        {
          var tempRes = Number(value === null ? undefined : value);
          return isNaN(tempRes) ? normalValue || 0 : tempRes;
        }
        break;
      case String:
        {
          return String(value || normalValue || '');
        }
        break;
      case Boolean:
        {
          return Boolean(value);
        }
        break;
      case Array:
        {
          return getDataType(value) === Array ? value : normalValue || [];
        }
        break;
      case Object:
        {
          return getDataType(value) === Object ? value : normalValue || {};
        }
        break;
      default:
    }
  }

  function formatItem(value, formatConf) {
    var DT_value = getDataType(value);
    var DT_formatConf = getDataType(formatConf);

    // 如果是基本数据类型判断

    // formatItem('123', [Number, 0]);
    if (DT_formatConf === Array) {
      // 此方式校验数据， 数组中第一个参数为 数据类型， 第二个参数为默认值;

      if (formatConf.length && ClassArr.includes(formatConf[0])) {
        return transformData(value, formatConf[0], formatConf[1]);
      }

      throw new Error('请添加要校验的数据类型');
    }

    // formatItem('123', Number);
    if (ClassArr.includes(formatConf)) {
      return transformData(value, formatConf);
    }
  }

  function format(dataSource, formatConf) {
    var DT_dataSource = getDataType(dataSource);
    var DT_formatConf = getDataType(formatConf);

    if (DT_formatConf === Object) {
      var tempObj = {};
      for (var key in formatConf) {
        var tempItem = (dataSource || {})[key];
        var tempFormatConf = formatConf[key];

        var DT_tempItem = getDataType(tempItem);
        var DT_tempFormatConf = getDataType(tempFormatConf);

        if (DT_tempFormatConf === Object) {
          tempObj[key] = format(tempItem, tempFormatConf);
        } else {
          tempObj[key] = formatItem(tempItem, tempFormatConf);
        }
      }

      return tempObj;
    } else {
      return formatItem(dataSource, formatConf);
    }
  }

  format.getDataType = getDataType;
  return format;
})();

