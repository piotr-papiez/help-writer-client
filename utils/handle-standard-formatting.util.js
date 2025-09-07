export default function handleStandardFormatting(event, textareaOnFocusElement, { type, letter }) {
    event.preventDefault();

    const tag = letter;
    const textarea = textareaOnFocusElement;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = textarea.value.slice(0, start);
    const selected = textarea.value.slice(start, end);
    const after = textarea.value.slice(end);

    const formattedValue = `${before}<${tag}>${selected}</${tag}>${after}`;
    textarea.value = formattedValue;

    const newPosition = start + selected.length + 7;
    textarea.selectionStart = textarea.selectionEnd = newPosition;

    textarea.dispatchEvent(new Event("input", { bubbles: true }));

    console.log("huuh");
}