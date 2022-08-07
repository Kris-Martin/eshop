import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
                <NavLink to={"/product/" + product.id.toString()}>
                    <img
                        className={styles.ProductCard__Thumbnail}
                        src={image}
                        alt=""
                    />
                </NavLink>
                <p>
                    Price:{" "}
                    {data.price.toLocaleString("en-AU", {
                        style: "currency",
                        currency: "AUD",
                        minimumFractionDigits: 2,
                    })}
                </p>
            </div>
        );
    }
};

export default ProductCard;
