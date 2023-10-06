import styles from "./style.module.scss";

export const ProductCard = ({ product, addProductCart }) => {
    return (
        <li className={styles.cards}>
            <div className={styles.card_img}>
                <img src={product.img} alt={product.name} />
            </div>
            <div className={styles.info_card}>
                <h3>{product.name}</h3>
                <span className={styles.span1}>{product.category}</span>
                <span className={styles.price}>{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
                <button onClick={() => { addProductCart(product) }} className="btn_default">Adicionar</button>
            </div>
        </li>
    )
}