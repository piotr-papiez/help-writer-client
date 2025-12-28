"use client";

import { useDndContext } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TextareaAutosize from "react-textarea-autosize";

import handleKeyFormatting from "../../../utils/handle-key-formatting.util.js";
import { scrollToCenter } from "../../../utils/scroll-item-to.util.js";

import styles from "./block.module.css";

import Configurator from "./list-block/configurator.component.jsx";
import ImageBlock from "./list-block/image-block.component.jsx";

export default function Block({ container, setContainers, onFlatInput, onAddPoint, onListInput, onFocus, onRemoveBlock, ref }) {
    const { active } = useDndContext();
    const isAnyBlockDragging = !!active;

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: container.id,
        data: { origin: "canvas" }
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    const isSlot = container.id === "containerSlot" ? true : false;

    return (
        <div
            className={`${isSlot ? styles.slot : styles.block} ${isAnyBlockDragging ? styles.lowered : ""}`}
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <div
                className={styles.h1}
                data-id={`${container.id}`}
            >
                <div className={styles.heading}>
                    <div className={styles["heading-title"]}>
                        <span
                            className={`${styles["drag-indicator"]} material-symbols-rounded`}
                            {...listeners}
                        >
                            drag_indicator</span>
                        <span className={`material-symbols-rounded ${styles["tag-icon"]}`}>{container.icon}</span>
                    </div>
                    {isSlot ? null : (
                        <button
                            type="button"
                            className={styles["remove-block-button"]}
                            onClick={() => onRemoveBlock(container.id)}
                        >
                            <span className="material-symbols-rounded">close</span>
                        </button>
                    )}
                </div>

                {(container.tag !== "ul" && container.tag !== "img") && (
                    <TextareaAutosize
                        data-textarea={container.id}
                        minRows={1}
                        onChange={onFlatInput}
                        onFocus={() => {
                            onFocus(prev => prev = container.id);
                            scrollToCenter(container.id);
                        }}
                        onKeyDown={event => handleKeyFormatting(event, setContainers)}
                        ref={element => { ref.current[container.id] = element }}
                        value={container.content}
                    />
                )}

                {container.tag === "ul" && (
                    <Configurator
                        container={container}
                        onAddPoint={onAddPoint}
                        onListInput={onListInput}
                        onFocus={onFocus}
                        setContainers={setContainers}
                        ref={ref}
                    />
                )}

                {container.tag === "img" && (
                    <ImageBlock
                        container={container}
                        
                        
                        
                        setContainers={setContainers}
                        

                        data-textarea={container.id}
                        
                        onFlatInput={onFlatInput}
                        onFocus={() => onFocus(container.id)}
                        onKeyDown={event => handleKeyFormatting(event, setContainers)}
                        ref={element => { ref.current[container.id] = element }}
                        value={container.content}
                    />
                )}
            </div>
        </div>
    );
}