export function AddArticleDialog({ articleTitle, handleInput, handleCreate, handleCancel }) {
    return (
        <>
            <h3>Nowy artykuł</h3>
            <input
                type="text"
                name="title"
                placeholder="Wpisz tytuł…"
                value={articleTitle}
                onChange={event => handleInput(event)}
            />
            <div>
                <button onClick={handleCreate}>Stwórz artykuł</button>
                <button onClick={handleCancel}>Anuluj</button>
            </div>
        </>
    );
}

export function CopyArticleDialog({ articleTitle, handleInput, handleCopy, handleCancel }) {
    return (
        <>
            <h3>Kopiuj artykuł</h3>
            <input
                type="text"
                name="title"
                placeholder="Wpisz tytuł nowego artykułu…"
                value={articleTitle}
                onChange={event => handleInput(event)}
            />
            <div>
                <button onClick={handleCopy}>Kopiuj artykuł</button>
                <button onClick={handleCancel}>Anuluj</button>
            </div>
        </>
    );
}

export function DeleteArticleDialog({ handleDelete, handleCancel }) {
    return (
        <>
            <h3>Usuń artykuł</h3>
            <p>Czy na pewno chcesz usunąć ten artykuł?</p>
            <div>

                <button onClick={handleDelete}>Usuń bezpowrotnie</button>
                <button onClick={handleCancel}>Anuluj</button>
            </div>
        </>
    );
}