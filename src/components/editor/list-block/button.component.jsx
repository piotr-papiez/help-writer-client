export default function Button({ id, onClick, content }) {
    return (
        <button onClick={(event) => onClick(event, id)}>
            <span className="material-symbols-rounded">
                {content}
            </span>
        </button>
    );
}