import { ProductCard } from "./ProductCard";
import styles from "./style.module.scss";

export const ProductList = ({ productList, addProductCart }) => {
   return (
      <div className="container">
         <ul className={styles.list_cards}>
            {productList.map((product) => (
               <ProductCard
                  key={product.id}
                  product={product}
                  addProductCart={addProductCart}
               />
            ))}
         </ul>
      </div>
   );
};
