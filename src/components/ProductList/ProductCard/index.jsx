import { MdOutlineAddCircle, MdOutlineRemoveCircle } from "react-icons/md";
import styles from "./style.module.scss";
import { useState } from "react";

export const ProductCard = ({ product, addProductCart }) => {

    const [quantProduct, setQuantProduct] = useState(1);

    const addQuantity = () => {
        setQuantProduct(quantProduct + 1);
    }

    const removeQuantity = () => {
        if (quantProduct > 1) {
            setQuantProduct(quantProduct - 1);
        }
    }

    return (
        <li className={styles.cards}>
            <div className={styles.card_img}>
                <img src={product.img} alt={product.name} />
            </div>
            <div className={styles.infoBox}>

                <div className={styles.info_card}>
                    <h3 className="title Three">{product.name}</h3>
                    <span className="text caption">{product.category}</span>
                    <span className={styles.price}>{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
                    <button onClick={() => { addProductCart(product, quantProduct) }} className="btn_default">Adicionar</button>
                </div>
                <div className={styles.boxButton}>
                    <span>Quantidade: </span>
                    <div className={styles.boxQuant}>
                        <button onClick={() => { addQuantity() }} aria-label="delete" title="Adicionar quantidade" className="color-primary">
                            <MdOutlineAddCircle  size={21} />
                        </button>
                        <h3>{quantProduct}</h3>
                        <button onClick={() => { removeQuantity() }} aria-label="delete" title="Adicionar quantidade" className="color-secundary">
                            <MdOutlineRemoveCircle  size={21} />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}