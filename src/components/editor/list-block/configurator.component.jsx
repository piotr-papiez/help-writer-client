"use client";

import { useEffect, useState } from "react";

import { listContentToHTML, ulHTMLToLIST } from "../../../../utils/objects-to-html.util.js";
import generateId from "../../../../utils/id-generator.util.js";
import textToSymbol from "../../../../utils/text-to-symbols.util.js";

import styles from "./configurator.module.css";

import Textarea from "./textarea.component.jsx";
import Button from "./button.component.jsx";

export default function Configurator({ container, onListInput, onFocus, ref }) {
    const [listContent, setListContent] = useState(ulHTMLToLIST(container.content));

    useEffect(() => {
        const listContentHTML = listContentToHTML(listContent);
        onListInput(container.id, listContentHTML);
    }, [listContent, container.id]);

    function addPoint() {
        setListContent(prevListContent => [
            ...prevListContent,
            { id: generateId(), content: "" }
        ]);
    }

    function handleInput(value, id) {
        const formattedValue = textToSymbol(value);
        const setInput = list =>
            list.map(item => {
                if (item.id === id) return { ...item, content: formattedValue };

                if (item.secondLevel) return { ...item, secondLevel: setInput(item.secondLevel) };

                return item;
            })

        setListContent(prev => setInput(prev));
    }

    function addIndentIntoPoint(pointId) {
        setListContent(prevListContent => {
            const newListContent = prevListContent.map(item => (
                item.id === pointId
                    ? {
                        ...item,
                        secondLevel: [
                            ...(item.secondLevel ?? []),
                            { id: generateId(), content: "" }
                        ]
                    }
                    : item
            ));

            return newListContent;
        });
    }

    function removePointById(idToRemove) {
        const findAndRemove = list => (
            list
                .filter(item => item.id !== idToRemove)
                .map(item => ({
                    ...item,
                    secondLevel: item.secondLevel
                        ? findAndRemove(item.secondLevel)
                        : undefined
                }))
        );

        setListContent(prev => findAndRemove(prev));
    }

    const listContentHTML = listContentToHTML(listContent);

    return (
        <div className={styles.configurator}>
            {listContent?.map(point => (
                <Textarea
                    key={`point-${point?.id}`}
                    point={point}
                    blockId={container.id}
                    onInput={handleInput}
                    onListInput={event => onListInput(event, listContentHTML)}
                    onAddIndent={addIndentIntoPoint}
                    onRemove={removePointById}
                    onFocus={onFocus}
                    ref={ref}
                />
            ))}

            <Button
                className="add-button"
                onClick={addPoint}
                content="add"
            />
        </div>
    );
}