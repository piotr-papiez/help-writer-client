"use client";

import { useState, useRef } from "react";

import { formatDate } from "../../../utils/format-date.util.js";

import styles from "./dashboard.module.css";

import Dialog from "./dialog.component.jsx";
import ItemButton from "./item-button.component.jsx";

export default function Dashboard({ articlesList }) {
    const [openedDialog, setOpenedDialog] = useState(null);

    const dialogRef = useRef(null);

    function openDialog(articleId, content) {
        setOpenedDialog({ articleId, content });
        dialogRef.current.showModal();
    }

    function closeDialog() {
        dialogRef.current.close();
        setOpenedDialog(null);
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.toolbar}>
                <h2>Help Writer</h2>
                <ItemButton
                    content="add"
                    openDialog={openDialog}
                />
            </div>

            <div className={styles["articles-list"]}>
                {articlesList.length > 0 && articlesList.map(article => (
                    <div
                        key={article._id}
                        className={styles["article-item"]}
                    >
                        <div className={styles["article-info"]}>
                            <a href={`/edit/${article._id}`}><h3>{article.title}</h3></a>
                            <p>Utworzony: {formatDate(article.creationDate)}</p>
                            <p>Ostatnio edytowany: {formatDate(article.lastModificationDate)}</p>
                        </div>

                        <div className={styles["article-actions"]}>
                            <ItemButton
                                content="edit"
                                title="Edytuj"
                                articleId={article._id}
                            />
                            <ItemButton
                                content="content_copy"
                                title="Kopiuj"
                                openDialog={openDialog}
                                articleId={article._id}
                            />
                            <ItemButton
                                content="delete"
                                title="Usuń"
                                openDialog={openDialog}
                                articleId={article._id}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Dialog
                dialogType={openedDialog}
                onCancel={closeDialog}
                ref={dialogRef}
            />
        </div>
    );
}