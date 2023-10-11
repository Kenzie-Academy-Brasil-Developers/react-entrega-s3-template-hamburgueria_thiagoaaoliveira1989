import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { burguerApi } from "../../services/api";
import styles from "./style.module.scss";
import { toast } from "react-toastify";
import { Search } from "../../components/Search";

export const HomePage = () => {
   const localCart = localStorage.getItem("@ITEMCART");
   const [productList, setProductList] = useState([]);
   const [search, setSearch] = useState("");
   const [cartList, setCartList] = useState(localCart ? JSON.parse(localCart) : []);
   const [statusModal, setStatusModal] = useState(null);


   useEffect(() => {
      const getBurguers = async () => {
         try {
            const response = await burguerApi.get("/products");
            const searchData = response.data.filter(product => {
               return product.name.toLowerCase().includes(search.toLowerCase());
            });
            setProductList(searchData);
         } catch (error) {
            toast.error(error.message);
         }
      };

      getBurguers();

   }, [search])


   useEffect(() => {
      localStorage.setItem("@ITEMCART", JSON.stringify(cartList));

   }, [cartList])

   const addProductCart = (productToAdd, quant) => {
      const hasProduct = cartList.some((product) => product.id === productToAdd.id);

      if (!hasProduct) {
         productToAdd.quant = quant;
         setCartList([...cartList, productToAdd]);
         toast.success('produto adicionado ao carrinho!');

      } else {
         toast.error('Essa produto já foi adicionado, abra o carrinho para alteralo!');
      }


   }

   const removeProductCart = (productId) => {
      const newCartList = cartList.filter((product) => product.id !== productId);
      if (newCartList) {
         setCartList(newCartList);
         toast.success("Produto deletado com sucesso");
      } else {
         toast.error("Error ao deletar Produto");
      }
   }

   const removeAllProductCart = () => {
      setCartList([]);
      toast.success("Todos os produtos deletados do carrinho!");
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
         <Header
            openModel={openModel}
            cartList={cartList}
         />
         <Search
            search={search}
            setSearch={setSearch}

         />
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
