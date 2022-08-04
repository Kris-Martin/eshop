import styles from "./ProductGrid.module.scss";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../services/server.js";
import { useState, useEffect } from "react";

const ProductGrid = () => {
    const [products, setProducts] = useState([]);

    const getData = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={styles.ProductGrid}>
            {products.map((product, i) => {
                return <ProductCard key={i} product={product} />;
            })}
            <ProductCard />
        </div>
    );
};

export default ProductGrid;
