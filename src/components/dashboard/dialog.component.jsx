"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createArticle, copyArticle, deleteArticle } from "../../../utils/dashboard-fetching.util.js";
import styles from "./dialog.module.css";

import { AddArticleDialog, CopyArticleDialog, DeleteArticleDialog } from "./dialog-variants.component.jsx";

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

export default function Dialog({ onClose, dialogType, handleDeleteArticle, ref }) {
    const [articleTitle, setArticleTitle] = useState("");

    const router = useRouter();

    function handleInput(event) {
        setArticleTitle(event.target.value);
    }

    return (
        <dialog className={styles.dialog} ref={ref}>
            {dialogType?.content === "add" && (
                <AddArticleDialog
                    articleTitle={articleTitle}
                    handleInput={handleInput}
                    handleCreate={() => createArticle(articleTitle, SERVER_URI, router)}
                    handleCancel={onClose}
                />
            )}

            {dialogType?.content === "content_copy" && (
                <CopyArticleDialog
                    articleTitle={articleTitle}
                    handleInput={handleInput}
                    handleCopy={() => copyArticle(dialogType.articleId, articleTitle, SERVER_URI, router)}
                    handleCancel={onClose}
                />
            )}

            {dialogType?.content === "delete" && (
                <DeleteArticleDialog
                    handleInput={handleInput}
                    handleDelete={
                        () => {
                            deleteArticle(dialogType.articleId, SERVER_URI);
                            handleDeleteArticle(dialogType.articleId);
                            onClose();
                        }
                    }
                    handleCancel={onClose}
                />
            )}
        </dialog>
    );
}