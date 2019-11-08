import { useEffect, useState } from 'react';

export default (generatedAt: number): number => {
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    setDifference(Date.now() - generatedAt);
  }, [generatedAt]);

  return difference;
};
