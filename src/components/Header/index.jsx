import { useEffect, useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./style.module.scss";

export const Header = ({ openModel, cartList, search, setSearch }) => {

   return (
      <header className={styles.header_menu}>
         <div className="container">
            <div className={styles.container_menu}>
               <img src={Logo} alt="Logo Kenzie Burguer" />
               <div className={styles.boxFinder}>
                  <form>
                     <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Digite o produto"
                     />
                     <button type="submit" onClick={(e) => { e.preventDefault() }}>
                        <MdSearch size={21} />
                     </button>
                  </form>
                  <button className="color-grey-400" onClick={() => openModel()}>
                     <MdShoppingCart size={36} />
                     <span className={styles.spanCart}>{cartList.length}</span>
                  </button>
               </div>
            </div>
         </div>
      </header>
   );
};
