import styles from "./ProductGrid.module.scss";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../services/server.js";
import { useEffect, useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";

const ProductGrid = () => {
    const { products, setProducts } = useContext(ProductContext);

    const getData = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={styles.ProductGrid}>
            {products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
            })}
            <ProductCard />
        </div>
    );
};

export default ProductGrid;
