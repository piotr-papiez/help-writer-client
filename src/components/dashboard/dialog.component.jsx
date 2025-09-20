"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { AddArticleDialog, CopyArticleDialog, DeleteArticleDialog } from "./dialog-variants.component.jsx";

import { createArticle, copyArticle } from "../../../utils/dashboard-fetching.util.js";

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

export default function Dialog({ articleId, onCancel, dialogType, ref }) {
    const [articleTitle, setArticleTitle] = useState("");

    const router = useRouter();

    function handleInput(event) {
        setArticleTitle(event.target.value);
    }

    return (
        <dialog ref={ref}>
            {dialogType?.content === "add" && (
                <AddArticleDialog
                    articleTitle={articleTitle}
                    handleInput={handleInput}
                    handleCreate={() => createArticle(articleTitle, SERVER_URI, router)}
                    handleCancel={onCancel}
                />
            )}

            {dialogType?.content === "content_copy" && (
                <CopyArticleDialog
                    articleTitle={articleTitle}
                    handleInput={handleInput}
                    handleCreate={() => copyArticle(dialogType.articleId, articleTitle, SERVER_URI, router)}
                    handleCancel={onCancel}
                />
            )}

            {dialogType?.content === "delete" && (
                <DeleteArticleDialog
                    articleTitle={articleTitle}
                    handleInput={handleInput}
                    handleCreate={() => createArticle(articleTitle, SERVER_URI, router)}
                    handleCancel={onCancel}
                />
            )}

            {/* <h3>Stwórz artykuł</h3>
            <div>
                <input
                    type="text"
                    name="title"
                    value={articleTitle}
                    onChange={event => handleInput(event)}
                />
                <button onClick={createArticle}>Stwórz artykuł</button>
                <button onClick={onCancel}>Anuluj</button>
            </div> */}
        </dialog>
    );
}