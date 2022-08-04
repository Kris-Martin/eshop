import styles from "./App.module.scss";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div className={styles.App}>
            <NavBar />
            <h1>eShop</h1>
        </div>
    );
}

export default App;
