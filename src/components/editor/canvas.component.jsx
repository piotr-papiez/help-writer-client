"use client";

import { useMemo } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { insertContainerSlotId, insertContainerSlotElement } from "../../../utils/insert-container-slot.util.js";

import styles from "./canvas.module.css";

import Block from "./block.component.jsx";

export default function Canvas({ containers, containerSlot, onFlatInput, onAddPoint, onListInput, onFocus, onRemoveBlock, ref }) {
    const containersWithSlotElements = useMemo(
        () => insertContainerSlotElement(containers, containerSlot),
        [containers, containerSlot]
    );

    const containersWithSlotIds = useMemo(
        () => insertContainerSlotId(containers, containerSlot),
        [containers, containerSlot]
    );

    return (
        <div className={styles.canvas}>
            <SortableContext
                items={containersWithSlotIds}
                strategy={verticalListSortingStrategy}
            >
                {containersWithSlotElements?.map(container => (
                    <Block
                        key={container.id}
                        container={container}
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