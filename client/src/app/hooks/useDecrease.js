import React, { useEffect } from 'react';

export default (initialValue, decreaseInterval) => {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setValue(initialValue);

    const handler = setInterval(() => {
      setValue(currentValue => currentValue - decreaseInterval);
    }, decreaseInterval);

    return () => clearInterval(handler);
  }, [initialValue, decreaseInterval]);

  return value;
}
