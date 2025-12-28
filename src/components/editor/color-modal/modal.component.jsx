import { FONT_COLORS, HIGHLIGHT_COLORS, HTML_ELEMENTS } from "@/data/toolbar-format-colors.data.js";

import styles from "./modal.module.css";

import Button from "./button.component.jsx";

export default function Modal({
    setFloating, floatingStyles, textareaOnFocusElement, getFloatingProps, activeColorButton, setFontColorPaletteIsOpen, setContainers,
}) {
    let colors;
    let colorRole;
    if (activeColorButton === "color-format_color_text") {
        colors = FONT_COLORS;
        colorRole = "color";
    } else if (activeColorButton === "color-format_ink_highlighter") {
        colors = HIGHLIGHT_COLORS;
        colorRole = "background-color";
    } else {
        colors = null;
        colorRole = null;
    }

    return (
        <div
            ref={setFloating}
            style={{ ...floatingStyles, zIndex: 1000 }}
            {...getFloatingProps({ className: colors ? styles.modal : styles["copy-modal"] })}
        >
            {colors && (
                colors.map(color => (
                    <Button
                        key={`font-color-${color.hex}`}
                        hex={color.hex}
                        title={color.title}
                        colorRole={colorRole}
                        textareaOnFocusElement={textareaOnFocusElement}
                        setContainers={setContainers}
                        setFontColorPaletteIsOpen={setFontColorPaletteIsOpen}
                    />
                ))
            )}

            {!colors && (
                HTML_ELEMENTS.map(element => (
                    <Button
                        key={`html-element-${element.icon}`}
                        content={element.content}
                        tag={element.tag}
                        icon={element.icon}
                        textareaOnFocusElement={textareaOnFocusElement}
                        setContainers={setContainers}
                        setFontColorPaletteIsOpen={setFontColorPaletteIsOpen}
                    />
                ))
            )}
        </div>
    );
}