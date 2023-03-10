import CategoryCard from "./CategoryCard";
import React from "react";

function CategoriesPage() {

    return (
        <div className = "categoryPage">
            <h1>Categories</h1>
            <div className="categories-container">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
        </div>
    )
}

export default CategoriesPage;