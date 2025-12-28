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
import ItemButton from "../dashboard/item-button.component.jsx";
import Toolbar from "./toolbar.component.jsx";
import Preview from "./preview.component.jsx";
import Canvas from "./canvas.component.jsx";
import Dialog from "../dashboard/dialog.component.jsx";

export default function Editor({ articleId, articleTitle, contentString }) {
    const [containers, setContainers] = useState(null);
    const [containerSlot, setContainerSlot] = useState(null);
    const [textareaOnFocusId, setTextareaOnFocusId] = useState(null);
    const [textareaOnFocusElement, setTextareaOnFocusElement] = useState(null);
    const [openedDialog, setOpenedDialog] = useState(null);

    const textareaRefs = useRef({});

    const dialogRef = useRef(null);

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
            console.log(containers);

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

    function openDialog(articleId, content) {
        setOpenedDialog({ articleId, content });
        dialogRef.current.showModal();
    }

    function closeDialog() {
        dialogRef.current.close();
        setOpenedDialog(null);
    }

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
                        <div className={styles["back-and-title-wrapper"]}>
                            <ItemButton
                                className={styles["back-button"]}
                                content="arrow_back"
                                title="Wstecz"
                                openDialog={() => openDialog(articleId, "save")}
                                articleId={articleId}
                            />
                            <h2>{articleTitle}</h2>
                        </div>
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
                        setContainers={setContainers}
                        textareaOnFocusElement={textareaOnFocusElement}
                        handleCreateContainer={handleCreateContainer}
                    />
                    <div className={styles["editor-contents"]}>
                        {htmlContent ? (
                            <>
                            <Preview htmlContent={htmlContent} />
                            <Canvas
                                containers={containers}
                                setContainers={setContainers}
                                containerSlot={containerSlot}
                                onFlatInput={handleFlatInput}
                                onAddPoint={addListPoint}
                                onListInput={handleListInput}
                                onFocus={setTextareaOnFocusId}
                                onRemoveBlock={handleRemoveBlock}
                                ref={textareaRefs}
                            />
                            </>
                        ) : (
                            <p className={styles["hint-for-empty"]}>Dodaj pierwszy blok</p>
                        )}
                    </div>
                </div>
            </DndContext>

            <Dialog
                dialogType={openedDialog}
                containers={containers}
                onClose={closeDialog}
                ref={dialogRef}
            />
        </>
    );
}