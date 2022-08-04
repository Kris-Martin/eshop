import styles from "./Product.module.scss";

const Product = () => {
    return (
        <div className={styles.Product}>
            <h1>Product Name</h1>
            <img src="" alt="" />
            <button>Favourite</button>
            <p>Price: </p>
            <p>Qty Available: </p>
            <p>Variants: </p>
        </div>
    );
};

export default Product;
