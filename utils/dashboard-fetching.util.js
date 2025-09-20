export async function createArticle(articleTitle, SERVER_URI, router) {
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

        return router.push(`/edit/${newArticleId}`);
    } catch (error) {
        console.error(error);
    }
}

export async function copyArticle(articleId, articleTitle, SERVER_URI, router) {
    if (!articleTitle) return alert("Wpisz tytuł artykułu");
    console.log(articleId);

    try {
        const response = await fetch(`${SERVER_URI}/api/copy-article/${articleId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: articleTitle })
        });

        if (response.status === 404) return alert("no article");
        if (response.status === 409) return alert("exists");

        const { newArticleId } = await response.json();

        return router.push(`edit/${newArticleId}`);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteArticle(articleId, SERVER_URI) {
    try {
        const response = await fetch(`${SERVER_URI}/api/articles/${articleId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (response.status === 404) return alert("no article");
        
        return;
    } catch (error) {
        console.log(error);
    }
}