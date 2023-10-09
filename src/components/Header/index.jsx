import { useEffect, useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./style.module.scss";

export const Header = ({ openModel, productList, setProductList, cartList }) => {
   const [copyProductList, setCopyProductList] = useState([]);
   const [value, setValue] = useState("");
   const [filterProductList, setFilterProductList] = useState([]);


   useEffect(() => {
      setCopyProductList(productList);
    }, [productList]);

   const filtered = () => {
      if (value !== "") {
         return copyProductList.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
         );
      } else {
         return [];
      }
   }

   useEffect(() => {
      // Atualize filterProductList quando o valor mudar
      setFilterProductList(filtered());
      console.log(value);
      console.log(filterProductList);
      
      if (value !== "" && filterProductList.length > 0) {
         console.log(filterProductList);
         return setProductList(filterProductList);
      }
      
      console.log(copyProductList);
      setProductList(copyProductList)



   }, [value, productList.name, filterProductList.name]);

   return (
      <header className={styles.header_menu}>
         <div className="container">
            <div className={styles.container_menu}>
               <img src={Logo} alt="Logo Kenzie Burguer" />
               <div className={styles.boxFinder}>
                  <form>
                     <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
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
