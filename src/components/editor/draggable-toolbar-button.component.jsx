"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import handleButtonFormatting from "../../../utils/handle-button-formatting.util.js";

import styles from "./draggable-toolbar-button.module.css";

export default function DraggableToolbarButton({ className, content, handleCreateContainer, tag }) {
    const { attributes, listeners, setNodeRef, transform, isDragging, over } = useDraggable({
        id: `dtb-${tag.content}`,
        data: { origin: "toolbar", tag: tag.tag, icon: tag.content, content: tag.content }
    });

    const style = {
        opacity: (isDragging && over) ? 0 : 1,
        transform: CSS.Transform.toString(transform)
    };

    return (
        <button
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            title={tag.title}
            id={`${tag.type}-${tag.content}`}
            className={styles[className]}
            onClick={() => handleCreateContainer(tag.tag, tag.content)}
        >
            <div className={styles["span-container"]}>
                <span className={"material-symbols-rounded"}>drag_indicator</span>
                <span className={`material-symbols-rounded ${styles["tag-icon"]}`}>{content}</span>
            </div>
        </button>
    );
}