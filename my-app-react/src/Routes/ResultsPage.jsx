import React, { useState, useEffect } from "react";
import { useRedirectToSearch, decodeSearchTerm, searchApi } from "../utils";
import { useParams } from "react-router-dom";

function ResultsPage() {
    const { searchTerm } = useParams(); // Get the encoded search term from the URL
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");
    const redirectToSearch = useRedirectToSearch();
    const [decodedSearchTerm, setDecodedSearchTerm] = useState("");

    async function SearchProduct(searchTerm) {
        setProducts([]);
        setCategory([]);
        console.log("Search term:", searchTerm);
        
        redirectToSearch(searchTerm);
        console.log("Starting search...");

        try {
            const result = await searchApi(searchTerm);
            console.log("Search results:", result);

            if (Array.isArray(result) && result.length > 1) {
                setCategory(result[0] || []);  // Set the first array as category
                setProducts(result[1] || []);  // Set the second array as products
                console.log("category", category);
                console.log("products", products);
            } else {
                console.error("Unexpected result format from searchApi:", result);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
        }

        console.log("End of search results.");
    }

    useEffect(() => {
        // Decode the search term
        const originalTerm = decodeSearchTerm(searchTerm); 
        setDecodedSearchTerm(originalTerm); // Set the decoded term in state
        setSearch(originalTerm);
        
        if (originalTerm) {
            SearchProduct(originalTerm); // Trigger the search with the decoded term
        }
    }, [searchTerm]); // Only run when searchTerm changes

    document.title = "Result";

    function handleSearchChange(event) {
        setSearch(event.target.value);
    }

    return (
        <div>
            
            <h1>AI Product</h1>
            
            <div className="input-container">
                <input  
                    className="Search-input" 
                    type="text" 
                    placeholder="What are you looking for?"
                    value={search}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => e.key === "Enter" && SearchProduct(search)}
                />
                <button 
                    className="Search-button"
                    onClick={() => SearchProduct(search)}>
                    Search
                </button>
            </div>
            <h2>Results for {decodedSearchTerm}</h2>
            <h3 className="category-list">Looking for {category}</h3>
            <ul className="product-list">
                {products.map((item, index) => (
                    <a 
                        key={index} 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="product-item-link"
                    >
                        <li className="product-item">
                            <h3 className="product-title">{item.title}</h3>
                            <p className="product-price">Price: {item.price}</p>
                        </li>
                    </a>
                ))}
            </ul>
        </div>
    );
}

export default ResultsPage;
