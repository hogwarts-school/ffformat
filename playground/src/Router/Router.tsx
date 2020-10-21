import React, { useEffect, useState } from 'react';
import historyContext from './historyContext';

const Router: React.FC = ({ children }) => {
  const [, forceUpdate] = useState(0);
  const urlPath = new URL(window.location.href).hash.replace('#', '');

  useEffect(() => {
    const handleHashChange = () => {
      forceUpdate((v) => v + 1);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return <historyContext.Provider value={{ urlPath }}>{children}</historyContext.Provider>;
};

export default Router;
