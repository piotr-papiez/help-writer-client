"use client";

import handleButtonColoring from "../../../utils/handle-button-coloring.util.js";

import styles from "./color-toolbar-button.module.css";

export default function ColorToolbarButton({
    className, textareaOnFocusElement, tag, setReference, getReferenceProps, setActiveColorButton, setFontColorPaletteIsOpen
}) {
    const buttonId = `${tag.type}-${tag.content}`;
    return (
        <>
            <button
                type="button"
                ref={setReference}
                {...getReferenceProps({
                    onClick: () => {
                        setActiveColorButton(buttonId);
                        setFontColorPaletteIsOpen(true);
                    }
                })}
                title={tag.title}
                id={buttonId}
                className={styles[className]}
            >
                <span className="material-symbols-rounded">{tag.content}</span>
            </button>
        </>
    );
}