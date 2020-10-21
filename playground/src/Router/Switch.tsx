import React from 'react';

import historyContext from './historyContext';

const Switch: React.FC = ({ children }) => {
  const { urlPath } = React.useContext(historyContext);

  return <>{React.Children.toArray(children).find((v: any) => v.props.path === urlPath) || null}</>;
};

export default Switch;
