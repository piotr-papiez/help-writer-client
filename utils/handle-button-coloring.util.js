export default function handleButtonColoring(event, textareaOnFocusElement, colorRole, hex, setContainers) {
    event.preventDefault();

    const textarea = textareaOnFocusElement;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = textarea.value.slice(0, start);
    const selected = textarea.value.slice(start, end);
    const after = textarea.value.slice(end);

    const role = colorRole === "color" ? "color" : "background-color";

    if (hex) {
        const formattedValue = `${before}<span style="${role}:${hex}">${selected}</span>${after}`;
        textarea.value = formattedValue;

        const cursorShift = role === "color" ? 35 : 46;
        const newPosition = start + selected.length + cursorShift;
        textarea.selectionStart = textarea.selectionEnd = newPosition;

        textarea.dispatchEvent(new Event("input", { bubbles: true }));
    } else {
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }


    setContainers(prev => (
        prev.map(item => (
            item.id === textarea.dataset.textarea
                ? { ...item, content: textarea.value }
                : item
        ))
    ));

    textarea.focus();
}