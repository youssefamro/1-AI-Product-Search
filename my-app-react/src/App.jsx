import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductOrder from "./Routes/ProductOrder.jsx"
import ResultsPage from "./Routes/ResultsPage.jsx"




function App(){

    return(



        <Router>
            <Routes>
            
                <Route path="/" element={<ProductOrder />} />
                <Route path="/Results/:searchTerm" element={<ResultsPage />} />
                
            </Routes>
        </Router>

     

    

    );
    

}
export default App;