import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className={styles.NavBar}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/cart">Cart</NavLink>
        </nav>
    );
};

export default NavBar;
