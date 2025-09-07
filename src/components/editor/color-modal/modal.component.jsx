import { FONT_COLORS, HIGHLIGHT_COLORS } from "@/data/toolbar-format-colors.data.js";

import styles from "./modal.module.css";

import Button from "./button.component.jsx";

export default function Modal({ 
    setFloating, floatingStyles, textareaOnFocusElement, getFloatingProps, activeColorButton, setFontColorPaletteIsOpen
 }) {
    const colors = activeColorButton === "color-format_color_text" ? FONT_COLORS : HIGHLIGHT_COLORS;
    const colorRole = activeColorButton === "color-format_color_text" ? "font" : "highlight";

    return (
        <div
            ref={setFloating}
            style={{ ...floatingStyles, zIndex: 1000 }}
            {...getFloatingProps({ className: styles.modal })}
        >
            {colors.map(color => (
                <Button
                    key={`font-color-${color.hex}`}
                    hex={color.hex}
                    title={color.title}
                    colorRole={colorRole}
                    textareaOnFocusElement={textareaOnFocusElement}
                    setFontColorPaletteIsOpen={setFontColorPaletteIsOpen}
                />
            ))}
        </div>
    );
}