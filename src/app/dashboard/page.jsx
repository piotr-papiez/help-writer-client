"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

export default function DashboardPage() {
    const router = useRouter();

    async function createArticle() {
        try {
            const response = await fetch(`${SERVER_URI}/api/articles`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "asd",
                    creationDate: new Date(),
                    lastModificationDate: new Date(),
                    content: "[]"
                })
            });

            if (!response.ok) throw new Error("Nie udało się stworzyć artykułu");
            
            const { newArticleId } = await response.json();

            router.push(`/edit/${newArticleId}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button onClick={createArticle}>Stwórz artykuł</button>
    );
}