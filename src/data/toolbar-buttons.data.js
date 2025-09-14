export const DRAGGABLE_ELEMENTS_BUTTONS = [
    { type: "draggable", tag: "h1", content: "format_h1", title: "Nagłówek 1" },
    { type: "draggable", tag: "h2", content: "format_h2", title: "Nagłówek 2" },
    { type: "draggable", tag: "h3", content: "format_h3", title: "Nagłówek 3" },
    { type: "draggable", tag: "p", content: "short_text", title: "Akapit" },
    { type: "draggable", tag: "div", content: "rectangle", title: "Kontener (niesemantyczny)" },
    { type: "draggable", tag: "ul", content: "format_list_bulleted", title: "Lista punktowana" },
    { type: "draggable", tag: "ol", content: "format_list_numbered", title: "Lista numerowana" },
    { type: "draggable", tag: "table", content: "table", title: "Tabela" },
    { type: "draggable", tag: "img", content: "image", title: "Obraz" },
    { type: "draggable", tag: "iframe", content: "live_tv", title: "Film" },
    { type: "draggable", tag: "div", content: "info", title: "Ramka informacyjna" },
    { type: "draggable", tag: "div", content: "warning", title: "Ramka ostrzegawcza" },
    { type: "draggable", tag: "div", content: "release_alert", title: "Ramka zakazu/błędu" },
];

export const STANDARD_FORMAT_BUTTONS = [
    { type: "standard", letter: "b", content: "format_bold", title: "Pogrubienie (Ctrl+B)" },
    { type: "standard", letter: "i", content: "format_italic", title: "Kursywa (Ctrl+I)" },
    { type: "standard", letter: "u", content: "format_underlined", title: "Podkreślenie (Ctrl+U)" },
];

export const COLOR_FORMAT_BUTTONS = [
    { type: "color", content: "format_color_text", title: "Kolor tekstu" },
    { type: "color", content: "format_ink_highlighter", title: "Kolor zaznaczenia" }
];

export const SPECIFIC_FORMAT_BUTTONS = [
    { type: "specific", letter: "a", content: "link", title: "Link (Shift+Alt+A)" },
    { type: "specific", letter: "b", content: "trackpad_input", title: "Przycisk (Shift+Alt+B)" },
    { type: "specific", letter: "c", content: "code", title: "Kod (Shift+Alt+C)" },
    { type: "specific", letter: "p", content: "steppers", title: "Ścieżka (Shift+Alt+P)" }
];