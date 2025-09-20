"use client";

import { containersToHTML } from "../../../utils/objects-to-html.util";

import styles from "./action-button.module.css";

export default function ActionButton({ content, articleId, containers }) {
    async function copyHTML() {
        try {
            const htmlContent = containersToHTML(containers);
            await navigator.clipboard.writeText(htmlContent);
        } catch (error) {
            console.log("Nie skopiowano");
        }
    }

    async function saveArticle() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/articles/${articleId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: JSON.stringify(containers)
                })
            });

            const isCreated = await response.json();

            alert({isCreated});
        } catch (error) {
            alert(error);
        }
    }

    return (
        <button
            className={styles.button}
            onClick={content === "Kopiuj HTML" ? copyHTML : saveArticle}
        >
            {content}
        </button>
    );
}