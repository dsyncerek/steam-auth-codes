import React, { useEffect } from 'react';

export const CODE_VALIDITY_TIME = 30 * 1000;
export const CODE_DECREASE_INTERVAL = 1000;
export const CODE_ENDING_TIME = 5 * 1000;

export default (validity, code) => {
  const [currentValidity, setValidity] = React.useState(0);

  useEffect(() => {
    setValidity(validity);

    const handler = setInterval(() => {
      setValidity(currentValidity => currentValidity - CODE_DECREASE_INTERVAL);
    }, CODE_DECREASE_INTERVAL);

    return () => clearInterval(handler);
  }, [code, validity]);

  return currentValidity;
}
