import React from 'react';

const defaultHistory = {
  urlPath: ''
};

export type CustomHistory = typeof defaultHistory;

export default React.createContext(defaultHistory);
