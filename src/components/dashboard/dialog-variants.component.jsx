import styles from "./dialog-variants.module.css";

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

export function SaveArticleDialog({ handleSave, handleCancel }) {
    return (
        <>
            <div className={styles["header-wrapper"]}>
                <h3>Opuść edycję</h3>
                <button className={styles["close-button"]} onClick={handleCancel}>
                    <span className="material-symbols-rounded">close</span>
                </button>
            </div>
            <p>Czy chcesz zapisać zmiany przed wyjściem?</p>
            <div>
                <button className={styles["choice-button"]} onClick={handleSave}>Zapisz</button>
                <a className={styles["choice-button"]} href="/dashboard">Odrzuć zmiany</a>
            </div>
        </>
    )
}