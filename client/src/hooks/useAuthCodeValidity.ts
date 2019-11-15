import { useEffect, useState } from 'react';
import AuthCode from '../models/AuthCode';

const useAuthCodeValidity = (authCode: AuthCode, decreaseInterval: number = 1000): number => {
  const [currentValidity, setCurrentValidity] = useState(0);

  useEffect(() => {
    const timeDiff = Date.now() - authCode.generatedAt;
    const fixedValidity = authCode.validity - timeDiff;

    setCurrentValidity(fixedValidity);

    const reminder = fixedValidity % decreaseInterval;

    let handler = setTimeout(() => {
      setCurrentValidity(value => value - reminder);

      handler = setInterval(() => {
        setCurrentValidity(value => value - decreaseInterval);
      }, decreaseInterval);
    }, reminder);

    return () => clearInterval(handler);
  }, [authCode, decreaseInterval]);

  return currentValidity;
};

export default useAuthCodeValidity;
