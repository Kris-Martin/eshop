import styles from "./ProductCard.module.scss";

const ProductCard = () => {
    return (
        <div className={styles.ProductCard}>
            <h2>Product Name</h2>
            <img src="" alt="" />
            <p>Price: </p>
        </div>
    );
};

export default ProductCard;
