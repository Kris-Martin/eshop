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
        const path = "../../assets/images" + data.thumbnail;
        const image = images(`.${data.thumbnail}`).default;
        console.log(path);
        return (
            <div className={styles.ProductCard}>
                <h2>{data.name}</h2>
                <img
                    src={require("../../assets/images/iPhone_11/iPhone_11_thumbnail.jpeg")}
                    alt=""
                />
                <p>Price: {data.price}</p>
            </div>
        );
    }
};

export default ProductCard;
