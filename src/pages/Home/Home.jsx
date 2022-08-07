import styles from "./Home.module.scss";
import ProductGrid from "../../containers/ProductGrid";

const Home = ({ products }) => {
    return (
        <div className={styles.Home}>
            <h1>iShop</h1>
            <ProductGrid />
        </div>
    );
};

export default Home;
