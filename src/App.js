import styles from "./App.module.scss";
import ProductProvider from "./context/ProductContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

function App() {
    return (
        <ProductProvider>
            <BrowserRouter>
                <div className={styles.App}>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/product/:productId"
                            element={<Product />}
                        />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </ProductProvider>
    );
}

export default App;
