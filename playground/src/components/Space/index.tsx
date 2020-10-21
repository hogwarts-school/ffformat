import React from 'react';

const Space: React.FC<{ size?: number }> = ({ children, size = 4 }) => {
  return (
    <>
      {React.Children.toArray(children).map((item, index) => {
        return (
          <span key={index} style={{ display: 'inline-block', padding: `0px ${size}px` }}>
            {item}
          </span>
        );
      })}
    </>
  );
};

export default Space;
