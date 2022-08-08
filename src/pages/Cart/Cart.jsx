import styles from "./Cart.module.scss";
import { useEffect, useState, useContext } from "react";
import { getCart, getProducts } from "../../services/server.js";
import { ProductContext } from "../../context/ProductContext.jsx";
import CartItem from "../../components/CartItem/CartItem.jsx";

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

    if (cart) {
        return (
            <div className={styles.Cart}>
                <h1>Cart Summary</h1>
                {cart.map((p, i) => {
                    return (
                        <CartItem
                            cart={cart}
                            setCart={setCart}
                            products={products}
                            product={p}
                            key={i}
                            i={i}
                        />
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
