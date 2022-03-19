/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (endpoint: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(endpoint);
      setData(response.data);
    };

    try {
      fetchdata();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return data;
};
