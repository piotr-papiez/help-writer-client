"use client";

import { useState } from "react";

import {
    FloatingPortal, useDismiss, useFloating, useInteractions, useRole,
    autoUpdate, flip, offset, shift
} from "@floating-ui/react";

import styles from "./toolbar.module.css"

import {
    DRAGGABLE_ELEMENTS_BUTTONS, STANDARD_FORMAT_BUTTONS,
    COLOR_FORMAT_BUTTONS, SPECIFIC_FORMAT_BUTTONS
} from "@/data/toolbar-buttons.data";

import DraggableToolbarButton from "./draggable-toolbar-button.component.jsx";
import ToolbarButton from "./toolbar-button.component.jsx";
import ColorToolbarButton from "./color-toolbar-button.component.jsx";
import Modal from "./color-modal/modal.component.jsx";

export default function Toolbar({ containers, textareaOnFocusElement, handleCreateContainer }) {
    const [activeColorButton, setActiveColorButton] = useState(null);
    const [fontColorPaletteIsOpen, setFontColorPaletteIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: fontColorPaletteIsOpen,
        onOpenChange: setFontColorPaletteIsOpen,
        placement: "bottom",
        middleware: [offset(8), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate
    });

    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "dialog" });
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role]);

    return (
        <div className={styles.toolbar}>
            <div className={styles["toolbar-buttons-wrapper"]}>
                {DRAGGABLE_ELEMENTS_BUTTONS.map(button => (
                    <DraggableToolbarButton
                        key={`${button.type}-${button.content}`}
                        className="button-draggable-element"
                        content={button.content}
                        tag={{
                            type: button.type,
                            tag: button.tag,
                            content: button.content,
                            title: button.title
                        }}
                        handleCreateContainer={handleCreateContainer}
                    />
                ))}

                <hr className={styles.hr} />

                {STANDARD_FORMAT_BUTTONS.map(button => (
                    <ToolbarButton
                        key={`${button.type}-${button.letter}`}
                        className="button-standard-format"
                        content={button.content}
                        tag={{
                            type: button.type,
                            letter: button.letter,
                            title: button.title
                        }}
                        textareaOnFocusElement={textareaOnFocusElement}
                    />
                ))}

                {/* <hr className={styles.hr} /> */}

                {COLOR_FORMAT_BUTTONS.map(button => (
                    <ColorToolbarButton
                        key={`${button.type}-${button.content}`}
                        className="button-color-format"
                        tag={{
                            type: button.type,
                            content: button.content,
                            title: button.title
                        }}
                        textareaOnFocusElement={textareaOnFocusElement}
                        setReference={refs.setReference}
                        getReferenceProps={getReferenceProps}
                        setActiveColorButton={setActiveColorButton}
                        setFontColorPaletteIsOpen={setFontColorPaletteIsOpen}
                    />
                ))}

                {fontColorPaletteIsOpen && (
                    <FloatingPortal>
                        <Modal
                            setFloating={refs.setFloating}
                            floatingStyles={floatingStyles}
                            textareaOnFocusElement={textareaOnFocusElement}
                            getFloatingProps={getFloatingProps}
                            activeColorButton={activeColorButton}
                            setFontColorPaletteIsOpen={setFontColorPaletteIsOpen}
                        />
                    </FloatingPortal>
                )}

                <hr className={styles.hr} />

                {SPECIFIC_FORMAT_BUTTONS.map(button => (
                    <ToolbarButton
                        key={`${button.type}-${button.letter}`}
                        className="button-specific-format"
                        content={button.content}
                        tag={{
                            type: button.type,
                            letter: button.letter,
                            title: button.title
                        }}
                        textareaOnFocusElement={textareaOnFocusElement}
                    />
                ))}
            </div>
        </div>
    );
}