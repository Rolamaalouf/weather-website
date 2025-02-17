import React, { useEffect, useState } from "react";
import "./Menu.css"; // Import the CSS file

const Menu = () => {
    const [menuData, setMenuData] = useState({
        bestSellers: [],
        menuCategories: [],
        heroSection: {}
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://elixir-repo-3.onrender.com/api/menu");
                if (!response.ok) throw new Error("Failed to fetch menu data");
                const data = await response.json();
                setMenuData(data[0]); // Assuming the first object contains the necessary data
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p className="loading">Loading menu...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className="menu-container">
            {/* Hero Section */}
            <section className="head">
                <div className="head-content">
                    <h1>Elixir Me-nu</h1>
                    <p>{menuData.heroSection?.paragraph}</p>
                </div>
                <img src={menuData.heroSection?.image} alt="Delicious food" className="head-image" />
            </section>

            {/* Best Sellers Section */}
            <section className="best-sellers">
                <h2>Best Sellers</h2>
                <div className="best-seller-list">
                    {Array.isArray(menuData.bestSellers) && menuData.bestSellers.length > 0 ? (
                        menuData.bestSellers.map((item, index) => (
                            <div key={item._id} className="best-seller-item">
                                <img 
                                    src={item.image} 
                                    alt={item.description} 
                                    className={index === 0 ? "image1" : "image2"} // Assign different classes based on index
                                />
                                <p>{item.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No best sellers available.</p>
                    )}
                </div>
            </section>

            {/* Menu Categories Section */}
            <section className="menu-categories">
                <h2>Our Menu</h2>

                {/* First Section: Coffee and Iced Latte */}
                <div className="menu-section first-section">
                    {/* Column 1: Coffee Categories */}
                    <div className="menu-column">
                        <h3>Coffee</h3>
                        <ul>
                            {Array.isArray(menuData.menuCategories) && menuData.menuCategories.find(category => category.categoryName === "Coffee")?.items.map((item) => (
                                <li key={item._id} className="menu-item">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-price">${item.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Images of Coffee and Iced Latte Categories */}
                    <div className="menu-column">
                        <h3>Coffee and more</h3>
                        {menuData.menuCategories.find(category => category.categoryName === "Coffee")?.image && (
                            <img src={menuData.menuCategories.find(category => category.categoryName === "Coffee")?.image} alt="Coffee" />
                        )}
                        {menuData.menuCategories.find(category => category.categoryName === "Iced Latte or Not")?.image && (
                            <img src={menuData.menuCategories.find(category => category.categoryName === "Iced Latte or Not")?.image} alt="Iced Latte" />
                        )}
                    </div>

                    {/* Column 3: Iced Latte or Not Categories */}
                    <div className="menu-column">
                        <h3>Iced Latte or Not</h3>
                        <ul>
                            {Array.isArray(menuData.menuCategories) && menuData.menuCategories.find(category => category.categoryName === "Iced Latte or Not")?.items.map((item) => (
                                <li key={item._id} className="menu-item">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-price">${item.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Second Section: Mocktails and Milkshakes */}
                <div className="menu-section second-section">
                    {/* Column 1: Mocktails Categories */}
                    <div className="menu-column">
                        <h3>Mocktails</h3>
                        <ul>
                            {Array.isArray(menuData.menuCategories) && menuData.menuCategories.find(category => category.categoryName === "Mocktails")?.items.map((item) => (
                                <li key={item._id} className="menu-item">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-price">${item.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Images of Mocktails and Milkshakes */}
                    <div className="menu-column">
                        <h3>Mocktails and more</h3>
                        {menuData.menuCategories.find(category => category.categoryName === "Mocktails")?.image && (
                            <img src={menuData.menuCategories.find(category => category.categoryName === "Mocktails")?.image} alt="Mocktails" />
                        )}
                        {menuData.menuCategories.find(category => category.categoryName === "Milkshakes")?.image && (
                            <img src={menuData.menuCategories.find(category => category.categoryName === "Milkshakes")?.image} alt="Milkshakes" />
                        )}
                    </div>

                    {/* Column 3: Milkshake Categories */}
                    <div className="menu-column">
                        <h3>Milkshakes</h3>
                        <ul>
                            {Array.isArray(menuData.menuCategories) && menuData.menuCategories.find(category => category.categoryName === "Milkshakes")?.items.map((item) => (
                                <li key={item._id} className="menu-item">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-price">${item.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <h3>Refreshments</h3>
                        <ul>
                            {Array.isArray(menuData.menuCategories) && menuData.menuCategories.find(category => category.categoryName === "Refreshments")?.items.map((item) => (
                                <li key={item._id} className="menu-item">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-price">${item.price.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Menu;