import styles from "./preview.module.css";

export default function Preview({ htmlContent }) {
    

    function textareaFocusFromPreview(event) {
        const element = event.target.tagName === "li" ? event.target.id : event.target.closest("[id]") || undefined;
        const elementId = element?.id || undefined;
        const textareaToFocus = elementId ? document.querySelector(`[data-textarea="${elementId}"]`) : undefined;
        textareaToFocus?.focus();
    }

    return (
        <div
            className={styles.preview}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            onClick={event => textareaFocusFromPreview(event)}
        />
    );
}