export function AddArticleDialog({ articleTitle, handleInput, handleCreate, handleCancel }) {
    return (
        <>
            <h3>Stwórz artykuł</h3>
            <div>
                <input
                    type="text"
                    name="title"
                    value={articleTitle}
                    onChange={event => handleInput(event)}
                />
                <button onClick={handleCreate}>Stwórz artykuł</button>
                <button onClick={handleCancel}>Anuluj</button>
            </div>
        </>
    );
}

export function CopyArticleDialog({ articleTitle, handleInput, handleCreate, handleCancel }) {
    return (
        <>
            <h3>Kopiuj artykuł</h3>
            <div>
                <input
                    type="text"
                    name="title"
                    value={articleTitle}
                    onChange={event => handleInput(event)}
                />
                <button onClick={handleCreate}>Kopiuj artykuł</button>
                <button onClick={handleCancel}>Anuluj</button>
            </div>
        </>
    );
}

export function DeleteArticleDialog({ articleTitle, handleInput, handleCreate, handleCancel }) {
    return (
        <>
            <h3>Usuń artykuł</h3>
            <p>Czy na pewno chcesz usunąć ten artykuł?</p>
            <div>
                
                <button onClick={handleCreate}>Usuń artykuł</button>
                <button onClick={handleCancel}>Anuluj</button>
            </div>
        </>
    );
}