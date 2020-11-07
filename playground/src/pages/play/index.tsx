import React, { useState, useEffect, useCallback } from 'react';
import { typeCreator as T, format } from 'ffformat';

import Editor from './../../components/Editor';
import Button from './../../components/Button';
import Space from './../../components/Space';
import infect from './../../infect';

import './style.css';
import { EditorDidMount } from 'react-monaco-editor';

const defaultTemplate = `const originData = { 
  name: 'croatia', 
  age: '21', 
  skillId: ['1', '2', '3', '4']
 };

const type = T.object({ 
  name: T.string(), 
  age: T.number(), 
  skillId: T.array(T.number()) 
});

format(
  originData,
  type
);
`;

function Play() {
  const [input, setInput] = useState(defaultTemplate);
  const [output, setOutput] = useState('');

  useEffect(() => {
    // @ts-ignore
    window.T = T;
    // @ts-ignore
    window.format = format;

    // infect(window, 'format', (value: any) => {
    //   setOutput((pre) => pre + JSON.stringify(value, null, 2) + '\n');
    // });

    const v = format(
      {
        goodsName: 'IphoneSE',
        price: '3299.99',
        goodsAttr: [{ attrName: null, attrValues: ['红色', '黑色', '白色'] }],
        shopInfo: {
          shopName: '111'
        }
      },
      T.object({
        goodsName: T.string(),
        price: T.number(),
        // goodsAttr: T.array({
        //   attrName: T.string('默认属性名'),
        //   attrValues: T.array({
        //     attr: T.string('默认属性值o'),
        //     attrId: T.number(666)
        //   }).default(['默认属性值'])
        // }),
        shopInfo: T.object({
          shopName: T.string(),
          shopId: T.number(),
          shopLevel: T.number(),
          shopTags: T.array(T.string())
        }).default({ shopName: '暂无该店铺', shopId: 0, shopLevel: -1, shopTags: [] })
      })
    );
    console.log(v, 'vvvv');

    // const handleConsoleLog = ({ params }: any) => {
    //   setOutput(
    //     (pre) => pre + params.map((v: any) => JSON.stringify(v, null, 2)).join('\n') + '\n'
    //   );
    // };
    // globalEventBus.on('consoleLog', handleConsoleLog);
    // return () => {
    //   globalEventBus.off('consoleLog', handleConsoleLog);
    // };
  }, []);

  const run = useCallback(() => {
    try {
      setOutput('');
      // eslint-disable-next-line
      eval(input);
    } catch (err) {
      setOutput(err);
    }
  }, [input]);

  const editorBoxDidMount: EditorDidMount = useCallback((e) => {}, []);

  const viewBoxDidMount = useCallback((e: any) => {
    e.updateOptions({ readOnly: true });
  }, []);

  return (
    <div className="container df fdc">
      <header style={{ backgroundColor: 'yellow', padding: 4 }}>
        <img
          width="120"
          src="https://raw.githubusercontent.com/CroatiaParanoia/ffformat/master/ffformat_logo.png"
          alt=""
        />
      </header>
      <div className="header df">
        <div className="f1 df">
          <span className="title">Input</span>
          <Space>
            <Button onClick={() => setInput('')}>clear</Button>
            <Button onClick={() => run()}>run</Button>
          </Space>
        </div>
        <div className="f1 df" style={{ marginLeft: 8 }}>
          <span className="title">Output</span>
          <Space>
            <Button onClick={() => setOutput('')}>clear</Button>
          </Space>
        </div>
      </div>
      <div className="f1 df">
        <div className="f1" style={{ marginRight: 2 }}>
          <Editor
            options={{ formatOnPaste: true }}
            editorDidMount={editorBoxDidMount}
            value={input}
            language="javascript"
            onChange={(v) => setInput(v)}
          />
        </div>
        <div className="f1">
          <Editor
            value={output}
            editorDidMount={viewBoxDidMount}
            language="json"
            onChange={() => setOutput(input)}
          />
        </div>
      </div>
    </div>
  );
}

export default Play;
