import styles from "./Home.module.scss";
import ProductGrid from "../../containers/ProductGrid";
import Carousel from "../../containers/Carousel/";

const Home = () => {
    return (
        <div className={styles.Home}>
            <h1>iShop</h1>
            <em>Get the latest and greatest...</em>
            <Carousel />
            <ProductGrid />
        </div>
    );
};

export default Home;
