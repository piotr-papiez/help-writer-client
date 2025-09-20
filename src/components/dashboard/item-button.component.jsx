export default function ItemButton({ content, articleId, title, openDialog }) {
    return (
        <>
            {content === "edit" && (
                <a href={`edit/${articleId}`} title={title}>
                    <span className="material-symbols-rounded">edit</span>
                </a>
            )}

            {content !== "edit" && (
                <button
                    title={title}
                    onClick={() => openDialog(articleId, content)}
                >
                    <span className="material-symbols-rounded">
                        {content}
                    </span>
                </button>
            )}
        </>
    );
}