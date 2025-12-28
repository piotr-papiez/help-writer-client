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
                // ref={setReference}
                {...getReferenceProps({
                    onClick: (e) => {
                        setReference(e.currentTarget);
                        setActiveColorButton(buttonId);
                        setFontColorPaletteIsOpen(true);
                    }
                })}
                title={tag.title}
                id={buttonId}
                className={`${styles[className]} ${tag.content === "html" && styles["dropdown-icon"]}`}
            >
                {tag.content === "html" && <span className="material-symbols-rounded">arrow_drop_down</span>}
                <span className="material-symbols-rounded">{tag.content}</span>
            </button>
        </>
    );
}