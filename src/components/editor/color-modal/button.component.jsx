import handleButtonColoring from "../../../../utils/handle-button-coloring.util.js";

import styles from "./button.module.css";

export default function Button({ hex, title, colorRole, textareaOnFocusElement, setFontColorPaletteIsOpen }) {
    return (
        <button
            className={styles.button}
            style={{ backgroundColor: hex }}
            title={title}
            onClick={event => {
                setFontColorPaletteIsOpen(false);
                handleButtonColoring(event, textareaOnFocusElement, colorRole, hex);
            }}
        >
        </button>
    );
}