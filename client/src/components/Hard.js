
import React, { useState, useEffect } from 'react';
import Loading from './Loading';

export default function Hard({loading,showloading}){
    const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      showloading(true);
      setError('');
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&_limit=5`); // Replace with your API
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(prevData => [...prevData, ...result]);
      } catch (err) {
        setError(err.message);
      } finally {
        showloading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {error && <p>Error: {error}</p>}
      <div className="list-container">
        {data.map(item => (
          <div className="card" key={item.id}>
            <img src={item.url} alt="cat" />
          </div>
        ))}
      </div>
    </div>
  );
}