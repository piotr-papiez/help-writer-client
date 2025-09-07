export default function handleKeyFormatting(event) {
    const standardKeys = ["b", "i", "u"];
    const specificKeys = ["a", "b", "c", "p"];

    function standardFormatting(acceptableKeys) {
        if (!acceptableKeys.includes(event.key.toLowerCase())) return;

        if (event.ctrlKey && event.key.toLowerCase()) {
            event.preventDefault();

            const tag = event.key.toLowerCase();
            const textarea = event.currentTarget;

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
        }

    }

    function specificFormatting(acceptableKeys) {
        if (!acceptableKeys.includes(event.key.toLowerCase())) return;

        if (event.altKey && event.shiftKey && event.key.toLowerCase()) {
            event.preventDefault();

            const letter = event.key.toLowerCase();
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

            const textarea = event.currentTarget;

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
        }
    }

    standardFormatting(standardKeys);
    specificFormatting(specificKeys);
}