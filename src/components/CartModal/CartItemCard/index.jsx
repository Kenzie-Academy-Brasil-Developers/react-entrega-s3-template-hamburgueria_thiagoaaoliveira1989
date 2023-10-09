import { MdDelete } from "react-icons/md";
import { MdOutlineAddCircle } from "react-icons/md";
import { MdOutlineRemoveCircle } from "react-icons/md";
import styles from "./style.module.scss";
import { useState } from "react";


export const CartItemCard = ({ product, removeProductCart, updateProductQuantity }) => {

   const [quantProduct, setQuantProduct] = useState(1);

   const addQuantity = () => {
      setQuantProduct(quantProduct + 1);
      updateProductQuantity(product.id, quantProduct + 1);
   };

   const removeQuantity = () => {
      if (quantProduct > 1) {
         setQuantProduct(quantProduct - 1);
         updateProductQuantity(product.id, quantProduct - 1);
      }
   };

   useState(() => {
      setQuantProduct(product.quant);
   })

   return (
      <li className={styles.productCard}>
         <div className={styles.boxImage}>
            <img src={product.img} alt={product.name} />
         </div>
         <div className={styles.boxInfo}>

            <div className={styles.boxInfo_product}>
               <h3 className="title Three">{product.name}</h3>
               <span className="tite Four color-primary">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
            </div>
            <div className={styles.boxInfo_btns}>
               <button className="color-primary" onClick={() => { addQuantity() }} aria-label="delete" title="Adicionar quantidade ">
                  <MdOutlineAddCircle size={21} />
               </button>
               <h3>{quantProduct}</h3>
               <button className="color-secundary" onClick={() => { removeQuantity() }} aria-label="delete" title="Adicionar quantidade ">
                  <MdOutlineRemoveCircle size={21} />
               </button>
            </div>
            <button className="color-grey-400" onClick={() => { removeProductCart(product.id) }} aria-label="delete" title="Remover item">
               <MdDelete size={21} />
            </button>
         </div>
      </li>
   );
};
