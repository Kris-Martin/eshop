import styles from "./Product.module.scss";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext.jsx";

const Product = () => {
    const { products, setProducts } = useContext(ProductContext);
    const { productId } = useParams();
    const [product, setProduct] = useState("");

    const getProduct = () => {
        setProduct(products.filter((product) => product.id === productId)[0]);
    };

    useEffect(() => {
        getProduct();
    }, []);

    const images = require.context("../../assets/images", true);

    if (product) {
        const image = images(`.${product.images[0]}`);
        // console.log(product);
        return (
            <div className={styles.Product}>
                <button>Favourite</button>
                <img src={image} alt="" />
                <h1>{product.name}</h1>
                <h2>Brand: {product.brand}</h2>
                <h2>Price: {product.price}</h2>
                <h2>Qty Available: {product.stock}</h2>
                <h2>Colours: {product.colour.join(", ")}</h2>
                <h2>Details: </h2>
                <ul>
                    {product.details.map((item) => (
                        <li>{item}</li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default Product;
