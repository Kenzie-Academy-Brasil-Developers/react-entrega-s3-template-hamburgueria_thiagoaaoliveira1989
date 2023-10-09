import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { burguerApi } from "../../services/api";
import styles from "./style.module.scss";

// useEffect montagem - carrega os produtos da API e joga em productList - ok
// useEffect atualização - salva os produtos no localStorage (carregar no estado)
// adição, exclusão, e exclusão geral do carrinho
// renderizações condições e o estado para exibir ou não o carrinho
// filtro de busca
// estilizar tudo com sass de forma responsiva
export const HomePage = () => {
   const localCart = localStorage.getItem("@ITEMCART");
   const [productList, setProductList] = useState([]);
   const [cartList, setCartList] = useState(localCart ? JSON.parse(localCart) : []);
   const [statusModal, setStatusModal] = useState(null);


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

   const addProductCart = (productToAdd, quant) => {
      const hasProduct = cartList.some((product) => product.id === productToAdd.id);

      if (!hasProduct) {
         productToAdd.quant = quant;
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

   const updateProductQuantity = (productId, newQuantity) => {
      const updatedCartList = cartList.map((product) => {
         if (product.id === productId) {
            product.quant = newQuantity;
         }
         return product;
      });
      setCartList(updatedCartList);
   };

   const openModel = () => {
      setStatusModal(true);
   }

   const closeModel = () => {
      setStatusModal(false);
   }





   return (
      <>
         <Header openModel={openModel} />
         <main className={styles.main_cards}>
            <ProductList
               productList={productList}
               addProductCart={addProductCart}
            />
            {statusModal ? <CartModal
               cartList={cartList}
               removeProductCart={removeProductCart}
               removeAllProductCart={removeAllProductCart}
               closeModel={closeModel}
               updateProductQuantity={updateProductQuantity}
            /> : null}
         </main>
      </>
   );
};
