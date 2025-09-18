"use client";

import { useEffect, useRef, useState } from "react";

import NewArticleDialog from "@/components/dashboard/new-article-dialog.component.jsx";

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

export default function DashboardPage() {
    const [articlesList, setArticlesList] = useState([]);

    const dialogRef = useRef(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch(`${SERVER_URI}/api/articles`, {
                    method: "GET"
                });

                if (!response.ok) throw new Error("Nie można wczytać artykułów");

                const articles = await response.json();

                console.log(response);
                setArticlesList(articles);
            } catch (error) {
                console.error(error);
            }
        }

        fetchArticles();
    }, []);

    function openDialog() {
        dialogRef.current.showModal();
    }

    function closeDialog() {
        dialogRef.current.close();
    }

    return (
        <>
            <button
                onClick={openDialog}
            >
                Stwórz artykuł
            </button>

            {articlesList.length > 0 && articlesList.map(article => (
                <div key={article._id}>
                    <a href={`/edit/${article._id}`}><h3>{article.title}</h3></a>
                    <p>{article.creationDate}</p>
                    <p>{article.lastModificationDate}</p>
                </div>
            ))}

            <NewArticleDialog
                ref={dialogRef}
                onCancel={closeDialog}
            />
        </>
    );
}