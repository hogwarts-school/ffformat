import { useMemo } from 'react';

const useLocation = () => {
  const urlPath = useMemo(() => {
    const { hash } = new URL(window.location.href);
    return hash.replace('#', '');
  }, []);

  return {
    urlPath
  };
};

export default useLocation;
