import React, { useState, useEffect } from "react";
import Loading from "./Loading";

export default function Medium({ loading, showloading }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (pageNumber) => {
    showloading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNumber}&order=Desc`
      ); //  URL with page number and order
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      showloading(false);
    }
  };

  const handleNext = () => setPage((prevPage) => prevPage + 1);
  const handlePrevious = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div>
      {loading && <Loading />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && data.length === 0 && <p>No data available</p>}

      <div className="grid-container">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.url} alt="cat" />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
