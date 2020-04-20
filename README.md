
![logo](./ffformat_logo.png)

## ffformat
- 数据格式化，数据源 + 类型 = 崭新的格式化后数据源。

### 为啥子要用
- 一般情况下用不到， 除非对后端有些怨言...

#### 使用
``` typescript
// =============== basic usage =============
format('croatia', F.string());
// 'croatia'

format(21, F.string());
// '21'

format(null, F.string());
// ''

format(null, F.string('croatia'));
// 'croatia'


// ============== mixed usage =============
format(
  { name: 'croatia', age: '21', skillId: ['1', '2', '3', '4'] },
  F.object({ name: F.string(), age: F.number(), skillId: F.array(F.number()) })
);
// {
//    name: 'croatia',
//    age: 21,
//    skillId: [1, 2, 3, 4]
//  }
);

```
更多示例， 看 `dataFormat/__tests__/format.test.ts`
