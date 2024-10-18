import React, { useState } from 'react';
import "../App.css";
import Loading from "./Loading.js";

export default function Easy({ loading, showloading }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setError('');
    try {
      showloading(true);  // Set loading to true before starting fetch

      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);

    } catch (err) {
      setError(err.message);
    } finally {
      showloading(false);  // Set loading to false after the fetch is done
    }
  };

  return (
    <>
      <button onClick={fetchData}>Fetch Images</button>
     
      {loading && <Loading />} 
      {error && <p>Error: {error}</p>}
      {!loading && !error && data.length === 0 && <p>No data available</p>}
      
      <div className="grid-container">
            {data.map(item => (
              <div className="card" key={item.id}>
                <img src={item.url} alt="cat" />
              </div>
            ))}
          </div>
    </>
  );
}
