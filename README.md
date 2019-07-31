# cro-format
一个致力于解决后端返回的数据类型与我们所期待的数据类型不统一（或部分丢失）问题的js函数

## 使用方式

``` javascript
// 基础使用
CroFormat("croatia", String); // 'croatia';
CroFormat("croatia", [String, "cro"]); // 'croatia';
CroFormat(18, String); // '18';
CroFormat(18, [String, 18]); // '18';
CroFormat(null, String); // '';
CroFormat(null, [String, "normal"]); // 'normal';

CroFormat(18, Number); // 18
CroFormat(18, [Number, 19]); // 18
CroFormat("croatia", Number); // 0;
CroFormat("croatia", [Number, 18]); // 18;

CroFormat(true, Boolean); // true
CroFormat(1, Boolean); // true
CroFormat(null, Boolean); // false

CroFormat(["croatia"], Array); // ['croatia']
CroFormat("croatia", Array); // [];
CroFormat("croatia", [Array, ["croatia"]]); // ['croatia']

CroFormat(null, { age: Number, name: String });
// { age: 0, name: '' }
CroFormat(null, { age: [Number, 18], name: [String, "croatia"] });
// { age: 18, name: 'croatia' }

CroFormat(
  { age: undefined, name: null },
  { age: [Number, 18], name: [String, "croatia"] }
);
// { age: 18, name: 'croatia' }
CroFormat(
  { age: 16, name: null },
  { age: [Number, 18], name: [String, "croatia"] }
);
// { age: 16, name: 'croatia' }


// 复杂使用
const responseData = {
  name: "zhangsan",
  age: 66,
  tel: null,
  shopInfo: null,
  companyInfo: {
    companyName: "XXX有限公司",
    companyid: 2
  }
};

const formatConf = {
  name: [String, "默认名字"],
  age: [Number, 18],
  tel: String,
  shopInfo: {
    shopName: [String, "默认的店铺名"],
    shopId: Number
  },
  companyInfo: {
    companyName: String,
    companyid: Number
  }
};

CroFormat(responseData, formatConf);
/*
{
  name: "zhangsan",
  age: 66,
  tel: "",
  shopInfo: { shopName: "默认的店铺名", shopId: 0 },
  companyInfo: { companyName: "XXX有限公司", companyid: 2 }
}
*/


```

## 未完成事项
- 数组对象的校验书写方式及其格式化方式

