import React, { useEffect } from 'react';

export default (initialValue, decreaseInterval = 1000) => {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setValue(initialValue);

    const reminder = initialValue % decreaseInterval;

    let handler = setTimeout(() => {
      setValue(currentValue => currentValue - reminder);

      handler = setInterval(() => {
        setValue(currentValue => currentValue - decreaseInterval);
      }, decreaseInterval);
    }, reminder);

    return () => clearInterval(handler);
  }, [initialValue, decreaseInterval]);

  return value;
};
