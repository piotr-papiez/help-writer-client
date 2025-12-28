export default function ItemButton({ content, articleId, title, openDialog, className }) {
    return (
        <>
            {content === "edit" && (
                <a href={`/edit/${articleId}`} title={title}>
                    <span className="material-symbols-rounded">{content}</span>
                </a>
            )}

            {(content === "add" || content === "content_copy" || content === "delete") && (
                <button
                    title={title}
                    onClick={() => openDialog(articleId, content)}
                >
                    <span className="material-symbols-rounded">
                        {content}
                    </span>
                </button>
            )}

            {content === "arrow_back" && (
                <button
                    className={className}
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