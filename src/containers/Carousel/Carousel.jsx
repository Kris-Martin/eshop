import styles from "./Carousel.module.scss";
import { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext.jsx";
import { getProducts } from "../../services/server.js";

const Carousel = () => {
    const { products, setProducts } = useContext(ProductContext);

    const getData = async () => {
        const productData = await getProducts();
        setProducts(productData);
    };

    useEffect(() => {
        getData();
    }, []);

    const images = require.context("../../assets/images", true);

    if (products) {
        return (
            <div className={styles.Carousel}>
                {products
                    .filter((p) => p.featured)
                    .map((p, i) => {
                        const image = images(`.${p.images[0]}`);
                        if (image) {
                            return (
                                <div className={styles.Carousel__Card} key={i}>
                                    <NavLink to={"/product/" + p.id.toString()}>
                                        <img src={image} alt="" />
                                    </NavLink>
                                    <div
                                        className={styles.Carousel__Card__Text}
                                    >
                                        <p
                                            className={
                                                styles.Carousel__Card__Text__Price
                                            }
                                        >
                                            {p.price.toLocaleString("en-AU", {
                                                style: "currency",
                                                currency: "AUD",
                                                minimumFractionDigits: 2,
                                            })}
                                        </p>
                                        <h3>{p.name}</h3>
                                        <h4>Details: </h4>
                                        <ul>
                                            {p.details.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                        <NavLink
                                            to={"/product/" + p.id.toString()}
                                            className={
                                                styles.Carousel__Card__Link
                                            }
                                        >
                                            <button
                                                className={
                                                    styles.Carousel__Card__Button
                                                }
                                            >
                                                Buy
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            );
                        }
                    })}
            </div>
        );
    }
};

export default Carousel;
