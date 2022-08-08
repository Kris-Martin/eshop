import styles from "./ProductGrid.module.scss";
import ProductCard from "../../components/ProductCard";
import { seedProducts, getProducts } from "../../services/server.js";
import { useEffect, useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";

const ProductGrid = () => {
    const { products, setProducts } = useContext(ProductContext);

    const getData = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const sortData = (arr) => {
        const sorted = arr.sort((a, b) => a.price - b.price);
        return sorted;
    };

    useEffect(() => {
        seedProducts();
        getData();
    }, []);

    return (
        <div className={styles.ProductGrid}>
            {sortData(products).map((product) => {
                return <ProductCard key={product.id} product={product} />;
            })}
        </div>
    );
};

export default ProductGrid;
