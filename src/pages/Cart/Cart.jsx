import styles from "./Cart.module.scss";
import { useEffect, useState, useContext } from "react";
import {
    getCart,
    getProducts,
    updateCart,
    updateProduct,
} from "../../services/server.js";
import { ProductContext } from "../../context/ProductContext.jsx";

const Cart = () => {
    const { products, setProducts } = useContext(ProductContext);
    const [cart, setCart] = useState("");

    const getData = async () => {
        const productData = await getProducts();
        setProducts(productData);
        const cartData = await getCart();
        setCart(cartData.products);
    };

    useEffect(() => {
        getData();
    }, []);

    const getProduct = (id) => {
        const product = products.filter((product) => product.id === id)[0];
        return product;
    };

    const deleteItem = async (e) => {
        const updatedCart = await getCart();
        const toDelete = Number(e.target.parentElement.id);
        console.log(toDelete);

        const productId = cart[toDelete].productId;
        const product = getProduct(productId);
        product.stock += Number(cart[toDelete].quantity);
        await updateProduct(product, productId);

        const updated = cart.filter((p, i) => i !== toDelete);
        updatedCart.products = updated;
        setCart(updated);
        await updateCart(updatedCart);
    };

    const increaseItemCount = async (e) => {
        const updatedCart = await getCart();
        const toChange = Number(e.target.parentElement.id);
        const productId = cart[toChange].productId;
        const product = getProduct(productId);
        const currentQuantity = Number(cart[toChange].quantity) + 1;

        if (currentQuantity > product.stock)
            return alert(
                `Only ${product.stock} available, please reduce the size of your order.`,
            );

        product.stock -= 1;
        await updateProduct(product, productId);

        updatedCart.products[toChange].quantity = currentQuantity;
        setCart(updateCart.products);
        await updateCart(updatedCart);
    };

    const decreaseItemCount = async (e) => {
        const updatedCart = await getCart();
        const toChange = Number(e.target.parentElement.id);
        const productId = cart[toChange].productId;
        const currentQuantity = Number(cart[toChange].quantity) - 1;
        if (currentQuantity === 1) return e.target.disabled;

        const product = getProduct(productId);
        product.stock += 1;
        await updateProduct(product, productId);

        updatedCart.products[toChange].quantity = currentQuantity;
        setCart(updateCart.products);
        await updateCart(updatedCart);
    };

    if (cart) {
        return (
            <div className={styles.Cart}>
                <h1>Cart</h1>
                {cart.map((p, i) => {
                    return (
                        <div key={i} className={styles.Cart__Item} id={i}>
                            <h2>{p.name}</h2>
                            <p>{p.colour}</p>
                            <button
                                className={styles.Cart__Button}
                                onClick={decreaseItemCount}
                            >
                                -
                            </button>
                            <p>{p.quantity}</p>
                            <button
                                className={styles.Cart__Button}
                                onClick={increaseItemCount}
                            >
                                +
                            </button>
                            <p>
                                item:{" "}
                                {p.itemPrice.toLocaleString("en-AU", {
                                    style: "currency",
                                    currency: "AUD",
                                    minimumFractionDigits: 2,
                                })}
                            </p>
                            <p>
                                total:{" "}
                                {(p.itemPrice * p.quantity).toLocaleString(
                                    "en-AU",
                                    {
                                        style: "currency",
                                        currency: "AUD",
                                        minimumFractionDigits: 2,
                                    },
                                )}
                            </p>
                            <button
                                className={styles.Cart__Button}
                                onClick={deleteItem}
                            >
                                x
                            </button>
                        </div>
                    );
                })}
                <div className={styles.Cart__Total}>
                    <h2>
                        Total:{" "}
                        {cart
                            .reduce((acc, p) => {
                                return (acc += p.itemPrice * p.quantity);
                            }, 0)
                            .toLocaleString("en-AU", {
                                style: "currency",
                                currency: "AUD",
                                minimumFractionDigits: 2,
                            })}
                    </h2>
                </div>
            </div>
        );
    }
};

export default Cart;
