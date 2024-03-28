import { useState } from "react";
import Header from "../components/Header";


interface Toilet {
  name: string;
  street: string;
  city: string;
  state: string;
  ada: boolean;
  unisex: boolean;
}

const Toilets = () => {
  const [data, setData] = useState<Toilet[]>([]);
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false);

  const searchToilets = async () => {
    setLoading(true)
    const response = await fetch(
      `https://www.refugerestrooms.org/api/v1/restrooms/search?page=1&per_page=10&unisex=true&query=${query}`
    );
    const result = await response.json();
    setData(result);
    setLoading(false)
  };

  return (
    <>
    <Header />
    <div className="p-5">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Gender Neutral Toilets</h1>
        <div className="flex flex-col space-y-4 mb-5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find Gender Neutral Toilets"
            aria-label="Search query"
            className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={searchToilets}
            aria-label="Search toilets"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
        {loading ? (
          <div>Loading...</div> // Simple Loading Text, can be replaced with a spinner or animation
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Results</h2>
            {data.length > 0 ? (
              data.map((toilet, index) => (
                <div key={index} className="mb-4 p-4 shadow rounded bg-gray-50">
                  <h3 className="text-lg font-bold">{toilet.name}</h3>
                  <p>{toilet.street}</p>
                  <p>
                    {toilet.city}, {toilet.state}
                  </p>
                  <p>ADA Accessible: <span className={toilet.ada ? 'text-green-500' : 'text-red-500'}>{toilet.ada ? "Yes" : "No"}</span></p>
                  <p>Unisex: <span className={toilet.unisex ? 'text-green-500' : 'text-red-500'}>{toilet.unisex ? "Yes" : "No"}</span></p>
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  </>
  );
};

export default Toilets;