function updateItem(textarea, setContainers) {
    setContainers(prev => (
        prev.map(item => {
            let updatedItem = item;

            if (item.id === textarea.dataset.textarea) {
                updatedItem = {
                    ...updatedItem,
                    content: textarea.value
                };
            }

            if (item.secondLevel) {
                updatedItem = {
                    ...updatedItem,
                    secondLevel: item.secondLevel.map(subItem => (
                        subItem.id === textarea.dataset.textarea
                            ? { ...subItem, content: textarea.value }
                            : subItem
                    ))
                };
            }

            return updatedItem;
        })
    ));
}

export default function handleButtonFormatting(event, textareaOnFocusElement, { type, letter }, setContainers) {
    if (type === "standard") {
        event.preventDefault();

        const tag = letter;
        const textarea = textareaOnFocusElement;
        console.log(textarea);

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

        updateItem(textarea, setContainers);

        textarea.focus();
    }

    if (type === "specific") {
        event.preventDefault();

        let tag;
        let tagsLength;

        switch (letter) {
            case "a":
                tag = "a";
                tagsLength = 7;
                break;
            case "b":
                tag = "v-btn";
                tagsLength = 15;
                break;
            case "c":
                tag = "v-code";
                tagsLength = 17;
                break;
            case "p":
                tag = "v-path";
                tagsLength = 17;
                break;
        }

        const textarea = textareaOnFocusElement;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const before = textarea.value.slice(0, start);
        const selected = textarea.value.slice(start, end);
        const after = textarea.value.slice(end);

        const openTag = tag === "a" ? "a href='_' target='_blank'" : tag;
        const formattedValue = `${before}<${openTag}>${selected}</${tag}>${after}`;
        textarea.value = formattedValue;

        const newPosition = start + selected.length + tagsLength;
        textarea.selectionStart = textarea.selectionEnd = newPosition;

        textarea.dispatchEvent(new Event("input", { bubbles: true }));

        updateItem(textarea, setContainers)

        textarea.focus();
    }
}