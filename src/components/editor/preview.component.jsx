import styles from "./preview.module.css";

export default function Preview({ htmlContent }) {
    

    function textareaFocusFromPreview(event) {
        const element = event.target.tagName === "li" ? event.target.id : event.target.closest("[id]");
        const elementId = element.id;
        const textareaToFocus = document.querySelector(`[data-textarea="${elementId}"]`);
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