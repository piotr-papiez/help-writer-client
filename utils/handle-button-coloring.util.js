export default function handleButtonColoring(event, textareaOnFocusElement, colorRole, hex) {
    event.preventDefault();

    const textarea = textareaOnFocusElement;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = textarea.value.slice(0, start);
    const selected = textarea.value.slice(start, end);
    const after = textarea.value.slice(end);

    const role = colorRole === "font" ? "color" : "background-color";

    const formattedValue = `${before}<span style="${role}:${hex}">${selected}</span>${after}`;
    textarea.value = formattedValue;
    
    const cursorShift = role === "font" ? 33 : 46;
    const newPosition = start + selected.length + cursorShift;
    textarea.selectionStart = textarea.selectionEnd = newPosition;

    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.focus();

    console.log("huujah");
}