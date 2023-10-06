import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { burguerApi } from "../../services/api";
import styles from "./style.module.scss";

export const HomePage = () => {
   const localCart = localStorage.getItem("@ITEMCART");
   const [productList, setProductList] = useState([]);
   const [cartList, setCartList] = useState(localCart ? JSON.parse(localCart) : []);

   // useEffect montagem - carrega os produtos da API e joga em productList - ok
   // useEffect atualização - salva os produtos no localStorage (carregar no estado)
   // adição, exclusão, e exclusão geral do carrinho
   // renderizações condições e o estado para exibir ou não o carrinho
   // filtro de busca
   // estilizar tudo com sass de forma responsiva

   useEffect(() => {
      const getBurguers = async () => {
         try {
            const { data } = await burguerApi.get("/products")
            setProductList(data);

         } catch (error) {

            console.log(error.message);
         }
      }
      getBurguers();
   }, [])


   useEffect(() => {
      localStorage.setItem("@ITEMCART", JSON.stringify(cartList));
   }, [cartList])

   const addProductCart = (productToAdd) => {

      const hasProduct = cartList.some((product) => product.id === productToAdd.id);

      if (!hasProduct) {
         setCartList([...cartList, productToAdd]);
         console.log(' adicionada aos favoritos!');

      } else {
         console.log('Essa foto já foi adicionada aos favoritos!');
      }


   }

   const removeProductCart = (productId) => {
      const newCartList = cartList.filter((product) => product.id !== productId);
      setCartList(newCartList);
   }

   const removeAllProductCart = () => {
      setCartList([]);
   }

   return (
      <>
         <Header />
         <main className={styles.main_cards}>
            <ProductList
               productList={productList}
               addProductCart={addProductCart}
            />
            <CartModal
               cartList={cartList}
               removeProductCart={removeProductCart}
               removeAllProductCart={removeAllProductCart}
            />
         </main>
      </>
   );
};
