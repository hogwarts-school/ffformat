import Event from './../event';

export function typeOf(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

export function jsonSafeParse(value: any, defaultValue: any) {
  if (typeOf(value) === 'String') {
    try {
      const newValue = JSON.parse(value);

      if (typeOf(newValue) !== typeOf(defaultValue)) return defaultValue;

      return newValue;
    } catch {
      return defaultValue;
    }
  }
  return value ?? defaultValue;
}

const OnMessageKey = Symbol('OnMessageKey');

const CURRENT_ORIGIN_KEY = 'playground';

const locationOrigin = window.location.origin;

const CONTEXT_KEY = Symbol('context');

const getContext = (context?: Window): Window | null => {
  if (context) return context;
  return window.parent === window ? window.opener : window.parent;
};

export default class Message extends Event {
  [CONTEXT_KEY]: Window | null = null;
  [OnMessageKey](event: any) {
    if (event.origin !== locationOrigin) {
      return;
    }
    const { data, source } = jsonSafeParse(event.data, {});
    if (source === CURRENT_ORIGIN_KEY) {
      console.log(data, 'datadatadatadata');
      const { type, payload } = data;

      super.emit.call(this, type, payload);
    }
  }

  constructor(context?: any) {
    super();
    this[CONTEXT_KEY] = getContext(context);
    this[OnMessageKey] = this[OnMessageKey].bind(this);
    window.addEventListener('message', this[OnMessageKey]);
  }

  destroy() {
    super.destroy.call(this);
    window.removeEventListener('message', this[OnMessageKey]);
  }

  emit(eventType: string, params?: any) {
    const data = JSON.stringify({
      data: { type: eventType, payload: params },
      source: CURRENT_ORIGIN_KEY
    });
    console.log(data, 'datadatadata');

    this[CONTEXT_KEY]?.postMessage(data, window.location.origin);
  }
}
