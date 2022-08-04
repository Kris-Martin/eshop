import { useEffect } from "react";
import { useState } from "react";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(product);
    }, []);

    const images = require.context("../../assets/images", true);

    if (data) {
        const image = images(`.${data.images[0]}`);
        return (
            <div className={styles.ProductCard}>
                <h2>{data.name}</h2>
                <img src={image} alt="" />
                <p>Price: {data.price}</p>
            </div>
        );
    }
};

export default ProductCard;
