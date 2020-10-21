import React, { useEffect, useMemo } from 'react';
import Message from '../../message';

const Actuator = () => {
  const message = useMemo(() => new Message(), []);

  useEffect(() => {
    const handleInputChange = (payload: any) => {
      console.log('actuator - inputChange', payload);
    };
    message.on('inputChange', handleInputChange);

    return () => {
      message.off('inputChange', handleInputChange);
    };
  }, [message]);

  return <div>123</div>;
};

export default Actuator;
