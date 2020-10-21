import globalEventBus from './globalEventBus';

const log = window.console.log;

console.log = (...params: any[]) => {
  globalEventBus.emit('consoleLog', { params: params });
  log(...params);
};
