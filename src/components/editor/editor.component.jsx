"use client";

import { useEffect, useRef, useState } from "react";
import { DndContext, rectIntersection, useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import registerCustomElements from "../../../lib/custom-elements.lib.js";
import handleDragOver from "../../../lib/handle-drag-over.lib.js";
import handleDragEnd from "../../../lib/handle-drag-end.lib.js";
import getContainerIndex from "../../../utils/get-container-index.util.js";
import { containersToHTML } from "../../../utils/objects-to-html.util.js";
import generateId from "../../../utils/id-generator.util.js";
import textToSymbol from "../../../utils/text-to-symbols.util.js";
import styles from "./editor.module.css";

import ActionButton from "./action-button.component.jsx";
import Toolbar from "./toolbar.component.jsx";
import Preview from "./preview.component.jsx";
import Canvas from "./canvas.component.jsx";

export default function Editor({ articleId, articleTitle, contentString }) {
    const [containers, setContainers] = useState(null);
    const [containerSlot, setContainerSlot] = useState(null);
    const [textareaOnFocusId, setTextareaOnFocusId] = useState(null);
    const [textareaOnFocusElement, setTextareaOnFocusElement] = useState(null);

    const textareaRefs = useRef({});

    useEffect(() => {
        registerCustomElements();
    }, []);

    useEffect(() => {
        if (contentString) {
            setContainers(JSON.parse(contentString));
        }
    }, [contentString]);

    useEffect(() => {
        setTextareaOnFocusElement(textareaRefs.current[textareaOnFocusId]);
    }, [textareaOnFocusId]);

    function handleFlatInput(event) {
        const { dataset, value } = event.target;

        const formattedValue = textToSymbol(value);

        setContainers(prevContent => prevContent.map(
            item => item.id === dataset.textarea ? { ...item, content: formattedValue } : item
        ));
    }

    function addListPoint(event) {
        const block = event.target.closest("div[data-id]");

        setContainers(prev => (
            prev.map(item => (
                item.id === block.dataset.id
                    ? { ...item, content: "" }
                    : item
            ))
        ));
    }

    function handleListInput(eventId, listContentHTML) {
        setContainers(prev => (
            prev.map(item => (
                item.id === eventId
                    ? { ...item, content: listContentHTML }
                    : item
            ))
        ));
    }

    function handleRemoveBlock(blockId) {
        setContainers(prevContainers => {
            const blockToRemove = prevContainers.find(block => (
                block.id === blockId
            ));

            const newContent = prevContainers.filter(block => (
                block !== blockToRemove
            ));

            return newContent;
        });
    }

    function handleReorderContainers(activeId, overId) {
        setContainers(prevOrder => {
            const originPosition = getContainerIndex(containers, activeId);
            const newPosition = getContainerIndex(containers, overId);

            return arrayMove(prevOrder, originPosition, newPosition);
        });
    }

    function handleCreateContainerSlot(placeholderSlot) {
        setContainerSlot(placeholderSlot);
    }

    function handleCreateContainer(activeTag, activeIcon) {
        setContainers(prevContainers => {
            const createdContainer = {
                id: generateId(),
                tag: activeTag,
                icon: activeIcon,
                content: "",
            };

            const newContainers = [...prevContainers];

            if (containerSlot) {
                newContainers.splice(containerSlot.index, 0, createdContainer);
            } else {
                newContainers.push(createdContainer);
            }
            console.log(containers);
            return newContainers;
        });

        setContainerSlot(null);
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 12
            }
        })
    );

    const htmlContent = containersToHTML(containers);

    return (
        <>
            <DndContext
                collisionDetection={rectIntersection}
                onDragOver={event => handleDragOver(event, containers, handleCreateContainerSlot)}
                onDragEnd={event => handleDragEnd(event, handleReorderContainers, handleCreateContainer)}
                sensors={sensors}
            >
                <div className={styles.editor}>
                    <div className={styles.header}>
                        <h2>{articleTitle}</h2>

                        <div className={styles["header-buttons-wrapper"]}>
                            <ActionButton
                                content="Kopiuj HTML"
                                containers={containers}
                            />
                            <ActionButton
                                content="Zapisz"
                                articleId={articleId}
                                containers={containers}
                            />
                        </div>

                    </div>
                    <Toolbar
                        containers={containers}
                        textareaOnFocusElement={textareaOnFocusElement}
                        handleCreateContainer={handleCreateContainer}
                    />
                    <div className={styles["editor-contents"]}>
                        <Preview htmlContent={htmlContent} />
                        <Canvas
                            containers={containers}
                            containerSlot={containerSlot}
                            onFlatInput={handleFlatInput}
                            onAddPoint={addListPoint}
                            onListInput={handleListInput}
                            onFocus={setTextareaOnFocusId}
                            onRemoveBlock={handleRemoveBlock}
                            ref={textareaRefs}
                        />
                    </div>
                </div>
            </DndContext>
        </>
    );
}