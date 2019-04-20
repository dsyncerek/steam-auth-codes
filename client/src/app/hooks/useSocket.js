import React, { useEffect } from 'react';
import api from '../api/socket';

export default (event) => {
  const [data, setData] = React.useState({});

  useEffect(() => {
    const subscription = api.addListener(event, (newData) => {
      setData(newData);
    });

    return () => subscription.remove();
  }, [event]);

  return data;
}
