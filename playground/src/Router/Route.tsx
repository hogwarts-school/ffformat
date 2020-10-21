import React from 'react';

import historyContext from './historyContext';

interface RouteProps {
  component: React.FC;
  path: string;
}

const Route: React.FC<RouteProps> = ({ path, component }) => {
  const { urlPath } = React.useContext(historyContext);
  return urlPath === path ? React.createElement(component) : null;
};

export default Route;
