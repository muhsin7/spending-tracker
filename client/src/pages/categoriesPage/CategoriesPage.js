import CategoryCard from "./CategoryCard";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";
import { Link, Navigate, useNavigate } from "react-router-dom";

function CategoriesPage() {

    const [token, setToken] = useToken();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/category', {
          headers: {
            "Authorization": "Bearer " + token
          }
        }).then((res) => {
          console.log(res.data);
          setCategories(res.data);
        });
      }, []);

      const rows = [];
      categories.forEach(e => {
        rows.push(<CategoryCard category={e} />);
      });

      
      

    return (
        <div className = "categoryPage">
            <h1>Categories</h1>
            <Link to="/addCategory"><button className="smallButton addCategoryButton">Add a category</button></Link>
            
            <div className="categories-container">
                {rows}
            </div>
        </div>
    )
}

export default CategoriesPage;