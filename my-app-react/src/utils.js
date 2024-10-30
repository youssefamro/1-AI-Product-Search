// utils.js
import { useNavigate } from "react-router-dom";

export function useRedirectToSearch() {
  const navigate = useNavigate();

  // Define the function inside the hook and return it
  function redirectToSearch(searchTerm) {
    const trimmedSearch = searchTerm.trim();

    // Ensure the search term is not empty after trimming
    if (trimmedSearch.length > 0) {
      // Encode and format the search term for URL, replacing spaces with "+"
      const encodedSearch = encodeURIComponent(trimmedSearch).replace(/%20/g, "+");
      
      // Redirect to the results page with the encoded search term
      navigate(`/Results/${encodedSearch}`);
    } else {
      // Optionally handle invalid input case here or return null
      console.log("Invalid search term");
    }
  }

  return redirectToSearch;
}

export function decodeSearchTerm(encodedTerm) {
    // Replace "+" with "%20" to revert the space encoding
    const normalizedTerm = encodedTerm.replace(/\+/g, "%20");
    //console.log(decodeURIComponent(normalizedTerm))
    // Decode the URI component to get the original search term
    return decodeURIComponent(normalizedTerm);
  }

  
export async function searchApi(searchTerm) {
  const url = "http://localhost:3000/api/search";
  const body = {
      prompt: searchTerm
  };

  try {
      const response = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
      });

      if (response.ok) {
          const data = await response.json();
          console.log("Response:", data);
          return(data);
      } else {
          console.error("Failed to fetch data:", response.status, await response.text());
      }
  } catch (error) {
      console.error("Error:", error);
  }
}


