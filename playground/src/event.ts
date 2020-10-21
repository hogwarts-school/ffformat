interface EventItem {
  eventType: string;
  callbackFn: Function;
  once: boolean;
  done: boolean;
}

export default class Message {
  private events: Record<string, any[]> = {};

  private bind(eventType: string, eventItem: EventItem) {
    if (this.events[eventType]) {
      this.events[eventType].push(eventItem);
    } else {
      this.events[eventType] = [eventItem];
    }
  }

  public on(eventType: string, callbackFn: Function) {
    this.bind(eventType, {
      eventType,
      callbackFn,
      once: false,
      done: false
    });
  }

  // once() 方法，用于绑定只能触发一次的自定义事件
  public once(eventType: string, callbackFn: Function) {
    this.bind(eventType, {
      eventType,
      callbackFn,
      once: true,
      done: false
    });
  }
  // off() 方法，用于解绑自定义事件

  public off(eventType: string, callbackFn: Function) {
    const eventArr = this.events[eventType] || [];

    eventArr.forEach((ele, idx) => {
      if (ele.callbackFn === callbackFn) {
        eventArr.splice(idx, 1);
      }
    });
  }

  public clear(eventType: string) {
    this.events[eventType] = [];
  }

  // emit() 方法，用于触发事件模型中指定类型的自定义事件
  public emit(eventType: string, params?: any) {
    const eventArr = this.events[eventType] || [];
    eventArr.forEach((ele, idx) => {
      if (!ele.done) {
        ele.callbackFn(params);
        if (ele.once) {
          eventArr[idx].done = true; // 把once注册的事件，标记为“done”
        }
      }
    });
  }

  public destroy() {
    this.events = {};
  }
}
