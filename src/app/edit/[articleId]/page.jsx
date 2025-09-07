"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Editor from "@/components/editor/editor.component.jsx";

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

export default function EditArticlePage() {
    const [article, setArticle] = useState([]);

    const { articleId } = useParams();

    useEffect(() => {
        async function fetchArticle() {
            try {
                const response = await fetch(`${SERVER_URI}/api/articles/${articleId}`, {
                    method: "GET",
                });

                if (!response.ok) throw new Error("Cannot load the article");

                const fetchedArticle = await response.json();

                setArticle(fetchedArticle);
            } catch (error) {
                console.error(error);
            }
        }

        fetchArticle();
    }, []);

    return (
        <Editor
            articleId={articleId}
            contentString={article.content}
        />
    );
}