
import React,{useState,useEffect} from "react";
import { useRedirectToSearch } from "../utils";

function ProductOrder(){



  const [Search,setSearch] = useState("");
  const redirectToSearch = useRedirectToSearch();
  document.title = "Home"


  function handleSearchChange(event){
    setSearch(event.target.value)

  }

  function SearchProduct(){
    //console.log(Search)
    redirectToSearch(Search);
  }


  return(<div>
    
    
    <div>
            
        <img 
            src="/GitHub-Mark.png"   // Directly references the image in the public folder
            alt="GitHub Icon"
            className="top-right-icon"
        />
    
            <h1>AI Product</h1>
      </div>


    <div className="input-container">
      <input  className="Search-input" type= "text" 
      placeholder="What are you looking for?"
      onChange={handleSearchChange}
      onKeyDown={(e) => e.key === "Enter" && SearchProduct()}
      />
      <button 
      className="Search-button"
      onClick={SearchProduct}>
        Search
      </button>
    </div>
    <p className="paragraph">To help you find the product you're looking for,
                  please provide a detailed description? Include any specific features,
                  colors, sizes, or brands that you have in mind. If you have a particular use or purpose for the product,
                  sharing that information would also be helpful.</p>
    



  </div>)
}
export default ProductOrder