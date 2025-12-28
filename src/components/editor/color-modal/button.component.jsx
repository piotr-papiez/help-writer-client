import handleButtonColoring from "../../../../utils/handle-button-coloring.util.js";

import styles from "./button.module.css";

export default function Button({ hex, title, content, colorRole, tag, icon, textareaOnFocusElement, setFontColorPaletteIsOpen, setContainers }) {
    const isColor = !!hex;

    if (isColor) {
        return (
            <button
                className={styles.button}
                style={{ backgroundColor: hex }}
                title={title}
                onClick={event => {
                    setFontColorPaletteIsOpen(false);
                    handleButtonColoring(event, textareaOnFocusElement, colorRole, hex, setContainers);
                }}
            >
            </button>
        );
    }

    return (
        <button
            className={styles["copy-button"]}
            title={`Kopiuj: ${content}`}
            onClick={event => {
                setFontColorPaletteIsOpen(false);
                handleButtonColoring(event, textareaOnFocusElement, colorRole, hex, setContainers);
                navigator.clipboard.writeText(tag);
            }}
        >
            <div className={styles["element-wrapper"]}>
                <span className={`material-symbols-rounded ${styles["tag-icon"]}`}>{icon}</span>
                {content}
            </div>
            <span className={`material-symbols-rounded ${styles["copy-icon"]}`}>content_copy</span>
        </button>
    )
}