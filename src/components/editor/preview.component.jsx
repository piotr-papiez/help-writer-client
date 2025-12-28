"use client";

import { useState } from "react";

import styles from "./preview.module.css";

export default function Preview({ htmlContent }) {
    const [fullScreen, setFullScreen] = useState(undefined);

    function textareaFocusFromPreview(event) {
        const element = event.target.tagName === "li" ? event.target.id : event.target.closest("[id]") || undefined;
        const elementId = element?.id || undefined;
        const textareaToFocus = elementId ? document.querySelector(`[data-textarea="${elementId}"]`) : undefined;
        textareaToFocus?.focus();
    }

    function handleFullScreen() {
        setFullScreen(prev => prev === undefined ? styles["preview-full"] : undefined);
    }

    return (
        <div
            id="preview"
            className={`${styles.preview} ${fullScreen}`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            onClick={event => {
                textareaFocusFromPreview(event);
                if (event.target.closest("a") && event.button === 0) {
                    event.preventDefault();
                }
            }}
            onMouseDown={event => {
                if (event.ctrlKey && event.button === 0) {
                    event.preventDefault();
                    console.log("hdhdeh");
                    handleFullScreen();
                }
            }}
        />
    );
}