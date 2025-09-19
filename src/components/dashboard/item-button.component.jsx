export default function ItemButton({ content, articleId, title, openDialog }) {
    return (
        <>
            {articleId && (
                <a href={articleId} title={title}>
                    <span className="material-symbols-rounded">edit</span>
                </a>
            )}

            {!articleId && (
                <button
                    title={title}
                    onClick={() => openDialog(content)}
                >
                    <span className="material-symbols-rounded">
                        {content}
                    </span>
                </button>
            )}
        </>
    );
}