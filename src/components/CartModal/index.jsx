import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";

export const CartModal = ({ cartList, removeProductCart, removeAllProductCart, closeModel, updateProductQuantity }) => {
   const [valuetotal, setValueTotal] = useState(0);
   const [quantTotal, setQuantTotal] = useState(0);

   const total = cartList.reduce((prevValue, product) => {
      return (prevValue + product.price) * product.quant;
   }, 0);


   useEffect(() => {
      setValueTotal(total);
   }, [total])



   return (
      <div role="dialog" className={styles.overlayBox}>
         <div className={styles.modalbox}>

            <div className={styles.menuBox}>
               <h3 className="title Three White">Carrinho de compras</h3>
               <button aria-label="close" title="Fechar" className="title White50">
                  <MdClose  size={21} onClick={() => { closeModel() }} />
               </button>
            </div>
            <ul className={styles.productList}>
               {cartList.map((product) => (
                  <CartItemCard
                     key={product.id}
                     setQuantTotal={setQuantTotal}
                     quantTotal={quantTotal}
                     product={product}
                     removeProductCart={removeProductCart}
                     updateProductQuantity={updateProductQuantity}
                  />
               ))}
            </ul>
            <div className={styles.boxTotal}>
               <div className={styles.boxTotalInfo}>
                  <span className="title Four">Total</span>
                  <span className="title Four color-grey-300">{valuetotal.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
               </div>
               <button className="btn title Five" onClick={() => { removeAllProductCart() }}>Remover todos</button>
            </div>
         </div>
      </div>
   );
};
