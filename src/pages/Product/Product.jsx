import styles from "./Product.module.scss";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/server.js";
import { ProductContext } from "../../context/ProductContext.jsx";
import { updateCart, getCart, updateProduct } from "../../services/server.js";

const Product = () => {
    const { products, setProducts } = useContext(ProductContext);
    const { productId } = useParams();
    const [product, setProduct] = useState(products.filter(getProduct)[0]);
    const [colour, setColour] = useState("");
    const [quantity, setQuantity] = useState(1);

    function getProduct(product) {
        return product.id === productId;
    }

    const getData = async () => {
        if (products.length === 0) {
            console.log("run");
            const data = await getProducts();
            setProducts(data);
            setProduct(data.filter(getProduct)[0]);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleQuantityChange = (e) => {
        const n = e.target.value;
        setQuantity(n);
    };

    const handleColourChange = (e) => {
        const colourUpdate = e.target.value;
        console.log(colourUpdate);
        setColour(colourUpdate);
    };

    const handleAddToCart = async () => {
        if (quantity > product.stock)
            return alert(
                `Only ${product.stock} available, please reduce the size of your order.`,
            );
        if (quantity < 1)
            return alert("Quantity must be at least 1 to add to cart");
        const selectedColour = colour === "" ? product.colour[0] : colour;
        const cart = await getCart();
        const update = {
            productId: productId,
            name: product.name,
            colour: selectedColour,
            quantity: quantity,
            itemPrice: product.price,
        };
        cart.products =
            cart.products.length > 0 ? cart.products.concat(update) : [update];
        await updateCart(cart);

        const productUpdate = { ...product };
        productUpdate["stock"] = product.stock - quantity;
        setProduct(productUpdate);
        await updateProduct(productUpdate, productId);
    };

    const handleFavouriteClick = async (e) => {
        const productUpdate = { ...product };
        productUpdate["favourite"] = !product.favourite;
        setProduct(productUpdate);
        e.target.style.backgroundColor = productUpdate.favourite
            ? "red"
            : "white";
        e.target.style.color = productUpdate.favourite ? "white" : "black";
        await updateProduct(productUpdate, productId);
    };

    const images = require.context("../../assets/images", true);

    if (product) {
        const image = images(`.${product.images[0]}`);

        return (
            <div className={styles.Product}>
                <img src={image} alt="" />
                <h1>{product.name}</h1>
                <div className={styles.Product__CartButtons}>
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                    <button
                        className={styles.Product__Button}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    <button
                        id="favourite"
                        onClick={handleFavouriteClick}
                        className={styles.Product__Button}
                    >
                        Favourite
                    </button>
                </div>
                <h2>Brand: {product.brand}</h2>
                <h2>
                    Price:{" "}
                    {product.price.toLocaleString("en-AU", {
                        style: "currency",
                        currency: "AUD",
                        minimumFractionDigits: 2,
                    })}
                </h2>
                <h2>Qty Available: {product.stock}</h2>
                <div className={styles.Product__Colours}>
                    <label htmlFor="colours">Colours: </label>
                    <select
                        name="colours"
                        id="colours"
                        onChange={handleColourChange}
                    >
                        {product.colour.map((c, i) => {
                            return <option key={i}>{c}</option>;
                        })}
                    </select>
                </div>
                <h2>Details: </h2>
                <ul>
                    {product.details.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default Product;
