import { NavLink } from "react-router-dom";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
    const images = require.context("../../assets/images", true);

    if (product) {
        const image = images(`.${product.images[0]}`);
        return (
            <div className={styles.ProductCard}>
                <h2>{product.name}</h2>
                <NavLink to={"/product/" + product.id.toString()}>
                    <img
                        className={styles.ProductCard__Thumbnail}
                        src={image}
                        alt=""
                    />
                </NavLink>
                <h2>
                    Price:{" "}
                    {product.price.toLocaleString("en-AU", {
                        style: "currency",
                        currency: "AUD",
                        minimumFractionDigits: 2,
                    })}
                </h2>
            </div>
        );
    }
};

export default ProductCard;
