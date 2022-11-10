import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.css";

export const Navbar: React.FC = () => {
  const [loginState, setLoginState] = useState(true);
  return (
    <div className={styles.Navbar}>
      <div className={styles.leftNavbar}>
        <Link href={"/"}>
        <img className={styles.logo} src="./logo.svg" /></Link>
      </div>
      <div className={styles.rightNavbar}>
        {" "}
        <h1>
          <Link href="/home"> Home </Link>{" "}
        </h1>
        <h1>
          {" "}
          <Link href="/explore"> Explore </Link>{" "}
        </h1>
        <h1>
          {" "}
          <Link href="/create"> Create </Link>
        </h1>
        <div
          className={styles.button}
          onClick={() => setLoginState(!loginState)}> 
         {loginState?"Logout":"SignUp/Login"}
        </div>
      </div>
    </div>
  );
};
