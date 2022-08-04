import styles from "./ProductGrid.module.scss";
import ProductCard from "../../components/ProductCard";

const ProductGrid = () => {
    return (
        <div className={styles.ProductGrid}>
            <h2>Product Grid</h2>
            <ProductCard />
        </div>
    );
};

export default ProductGrid;
