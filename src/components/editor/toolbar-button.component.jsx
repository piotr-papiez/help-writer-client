"use client";

import handleButtonFormatting from "../../../utils/handle-button-formatting.util.js";

import styles from "./toolbar-button.module.css";

export default function ToolbarButton({ className, content, textareaOnFocusElement, tag }) {
    return (
        <button
            title={tag.title}
            id={`${tag.type}-${tag.letter}`}
            className={styles[className]}
            onClick={event => handleButtonFormatting(event, textareaOnFocusElement, tag)}
        >
            <span className="material-symbols-rounded">{content}</span>
        </button>
    );
}