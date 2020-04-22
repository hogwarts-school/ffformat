
![logo](./ffformat_logo.png)

## ffformat
- 数据格式化，数据源 + 类型 = 完全新的格式化后数据。
- 暂只支持 `string`、`number`、`boolean`、`object` 和 `array`。


### 为啥子要用
- 一般情况下用不到， 除非对后端有些怨言...

![description](./description.jpg)

### 安装
```
yarn add ffformat 
```

### 使用
``` typescript
import { typeCreator as T, format } from 'ffformat';
// =============== basic usage =============
format('croatia', T.string());
// 'croatia'

format(21, T.string());
// '21'

format(null, T.string());
// ''

format(null, T.string('croatia'));
// 'croatia'


// ============== mixed usage =============
format(
  { name: 'croatia', age: '21', skillId: ['1', '2', '3', '4'] },
  T.object({ name: T.string(), age: T.number(), skillId: T.array(T.number()) })
);
// {
//    name: 'croatia',
//    age: 21,
//    skillId: [1, 2, 3, 4]
//  }
);

```
更多示例， 看 [format/\_\_tests\_\_/format.test.ts](https://github.com/CroatiaParanoia/ffformat/blob/master/src/format/__tests__/format.test.ts)
