import React from "react";

function CategoryCard() {
    return (
        <div className="category-card">
            <div className="category-info">
                <div class="category-title">Food</div>
            </div>
            <div className="category-spending-limit">Spending Limit: $400</div>
            <button className="category-card-button"> Edit </button>
            <button className="category-card-button"> Delete </button>

        </div>
    );
  }

export default CategoryCard;