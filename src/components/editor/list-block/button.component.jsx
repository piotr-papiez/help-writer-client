import styles from "./button.module.css";

export default function Button({ id, className, onClick, content }) {
    return (
        <button
            className={styles[className]}
            onClick={(event) => onClick(event, id)}
        >
            <span className="material-symbols-rounded">
                {content}
            </span>
        </button>
    );
}