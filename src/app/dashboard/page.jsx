"use client";

import { useEffect, useRef, useState } from "react";

import Dashboard from "@/components/dashboard/dashboard.component.jsx";

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

export default function DashboardPage() {
    const [articlesList, setArticlesList] = useState([]);

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

    return (
        <Dashboard
            articlesList={articlesList}
        />
    );
}