import { useState } from "react";
import styles from "./CartItem.module.scss";
import { getCart, updateCart, updateProduct } from "../../services/server.js";

const CartItem = ({ cart, setCart, products, product, i }) => {
    const [quantity, setQuantity] = useState(product.quantity);

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
        setQuantity(currentQuantity);
        setCart(updatedCart.products);
        await updateCart(updatedCart);
    };

    const decreaseItemCount = async (e) => {
        const updatedCart = await getCart();
        const toChange = Number(e.target.parentElement.id);
        const productId = cart[toChange].productId;
        const currentQuantity = Number(cart[toChange].quantity) - 1;
        if (currentQuantity === 0) deleteItem(e);

        const product = getProduct(productId);
        product.stock += 1;
        await updateProduct(product, productId);

        updatedCart.products[toChange].quantity = currentQuantity;
        setQuantity(currentQuantity);
        setCart(updatedCart.products);
        await updateCart(updatedCart);
    };

    return (
        <div key={i} className={styles.CartItem} id={i}>
            <h2>{product.name}</h2>
            <p>{product.colour}</p>
            <button
                className={styles.CartItem__Button}
                onClick={decreaseItemCount}
            >
                -
            </button>
            <p>{quantity}</p>
            <button
                className={styles.CartItem__Button}
                onClick={increaseItemCount}
            >
                +
            </button>
            <p>
                item:{" "}
                {product.itemPrice.toLocaleString("en-AU", {
                    style: "currency",
                    currency: "AUD",
                    minimumFractionDigits: 2,
                })}
            </p>
            <p>
                total:{" "}
                {(product.itemPrice * product.quantity).toLocaleString(
                    "en-AU",
                    {
                        style: "currency",
                        currency: "AUD",
                        minimumFractionDigits: 2,
                    },
                )}
            </p>
            <button className={styles.CartItem__Button} onClick={deleteItem}>
                x
            </button>
        </div>
    );
};

export default CartItem;
