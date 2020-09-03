import React, { useEffect, useRef } from 'react';

const DivSize = ({ children, onSize }) => {
  const eRef = useRef(null);

  useEffect(() => {
    onSize(eRef.current.clientHeight);
  }, [onSize]);

  return (
    <div ref={eRef}>
      {children}
    </div>
  )
}

export default DivSize;