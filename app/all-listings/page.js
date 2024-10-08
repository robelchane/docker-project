"use client"; // To use hooks in a Next.js page
import { useState, useEffect } from "react";

export default function AllListings() {
  const [properties, setProperties] = useState([]); // State to hold the fetched property listings
  const [loading, setLoading] = useState(false); // State to handle the loading state

  // Fetch properties when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/properties"); // Call the backend API route
        const data = await response.json(); // Parse the response as JSON
        setProperties(data.properties); // Update the properties state with the fetched data
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchProperties(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="py-8 px-4">
      {/* Loading spinner */}
      {loading && <p>Loading properties...</p>}

      {/* Listings display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="p-4 border rounded shadow-md">
              <img
                src={`/images/${property.image}`} // Adjust this path as needed
                alt={property.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{property.name}</h2>
              <p className="text-lg text-gray-700"><span style={{ color: '#001f3f' }}>$</span>{property.price}</p>
              <p className="text-gray-600">{property.summary}</p>
              <p className="text-sm text-gray-500">{property.address}</p>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
}
