"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

export default function NewArticleDialog({ onCancel, ref }) {
    const [articleTitle, setArticleTitle] = useState("");

    const router = useRouter();

    function handleInput(event) {
        setArticleTitle(event.target.value);
    }

    async function createArticle() {
        if (!articleTitle) return alert("Wpisz tytuł artykułu");

        try {
            const response = await fetch(`${SERVER_URI}/api/articles`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: articleTitle })
            });

            if (response.status === 409) return alert("exists");
            // if (!response.ok) throw new Error("Nie udało się stworzyć artykułu");

            const { newArticleId } = await response.json();

            router.push(`/edit/${newArticleId}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <dialog ref={ref}>
            <h3>Stwórz artykuł</h3>
            <div>
                <input
                    type="text"
                    name="title"
                    value={articleTitle}
                    onChange={event => handleInput(event)}
                />
                <button onClick={createArticle}>Stwórz artykuł</button>
                <button onClick={onCancel}>Anuluj</button>
            </div>
        </dialog>
    );
}