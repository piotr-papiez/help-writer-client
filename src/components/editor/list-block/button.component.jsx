import styles from "./button.module.css";

export default function Button({ id, onClick, content }) {
    return (
        <button
            className={styles.button}
            onClick={(event) => onClick(event, id)}
        >
            <span className="material-symbols-rounded">
                {content}
            </span>
        </button>
    );
}