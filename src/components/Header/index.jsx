import { useEffect, useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./style.module.scss";

export const Header = ({ openModel, cartList}) => {

   return (
      <header className={styles.header_menu}>
         <div className={styles.container}>
            <div className={styles.container_menu}>
               <img src={Logo} alt="Logo Kenzie Burguer" />
               <button className="color-grey-400" onClick={() => openModel()}>
                  <MdShoppingCart size={36} />
                  <span className={styles.spanCart}>{cartList.length}</span>
               </button>
            </div>
          
         </div>
      </header>
   );
};
