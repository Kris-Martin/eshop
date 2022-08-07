import styles from "./Cart.module.scss";
import { useEffect, useState } from "react";
import { getCart, updateCart } from "../../services/server.js";

const Cart = () => {
    const [cart, setCart] = useState("");

    const getData = async () => {
        const data = await getCart();
        setCart(data.products);
    };

    useEffect(() => {
        getData();
    }, []);

    // console.log(cart);

    if (cart) {
        return (
            <div className={styles.Cart}>
                <h1>Cart</h1>
                {cart.map((p, i) => {
                    return (
                        <div key={i} className={styles.Cart__Item}>
                            <h2>{p.name}</h2>
                            <p>{p.colour}</p>
                            <button className={styles.Cart__Button}>-</button>
                            <p>{p.quantity}</p>
                            <button className={styles.Cart__Button}>+</button>
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
                            <button className={styles.Cart__Button}>x</button>
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
