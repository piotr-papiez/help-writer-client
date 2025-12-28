"use client";

import { useMemo, useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { insertContainerSlotId, insertContainerSlotElement } from "../../../utils/insert-container-slot.util.js";

import styles from "./canvas.module.css";

import Block from "./block.component.jsx";

export default function Canvas({ containers, setContainers, containerSlot, onFlatInput, onAddPoint, onListInput, onFocus, onRemoveBlock, ref }) {
    const [fullScreen, setFullScreen] = useState(undefined);

    const containersWithSlotElements = useMemo(
        () => insertContainerSlotElement(containers, containerSlot),
        [containers, containerSlot]
    );

    const containersWithSlotIds = useMemo(
        () => insertContainerSlotId(containers, containerSlot),
        [containers, containerSlot]
    );

    function handleFullScreen() {
        setFullScreen(prev => prev === undefined ? styles["canvas-full"] : undefined);
    }

    return (
        <div
            id="canvas"
            className={`${styles.canvas} ${fullScreen}`}
            onMouseDown={event => {
                if (event.ctrlKey && event.button === 0) {
                    event.preventDefault();
                    console.log("hdhdeh");
                    handleFullScreen();
                }
            }}
        >
            <SortableContext
                items={containersWithSlotIds}
                strategy={verticalListSortingStrategy}
            >
                {containersWithSlotElements?.map(container => (
                    <Block
                        key={container.id}
                        container={container}
                        setContainers={setContainers}
                        onFlatInput={onFlatInput}
                        onAddPoint={onAddPoint}
                        onListInput={onListInput}
                        onFocus={onFocus}
                        
                        onRemoveBlock={onRemoveBlock}
                        ref={ref}
                    />
                ))}
            </SortableContext>
        </div>
    );
}