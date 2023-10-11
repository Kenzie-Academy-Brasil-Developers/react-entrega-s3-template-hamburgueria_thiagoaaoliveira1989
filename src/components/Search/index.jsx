import { MdSearch } from "react-icons/md";
import styles from "./style.module.scss";

export const Search = ({ search, setSearch }) => {
    return (
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
        </div>
    )
}