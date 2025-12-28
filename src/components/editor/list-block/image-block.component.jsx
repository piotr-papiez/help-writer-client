"use client";

import UploadInput from "./upload-input.component";

import styles from "./configurator.module.css";

import TextareaAutosize from "react-textarea-autosize";

export default function ImageBlock({ container, setContainers, onFlatInput, onFocus, ref }) {

    return (
        <>
            <div className={styles.configurator}>
                <TextareaAutosize
                    container={container}
                    // setContainers={setContainers}
                    data-textarea={container.id}
                    minRows={1}
                    onFocus={onFocus}
                    onChange={onFlatInput}
                    value={container.content}
                    // blockId={container.id}
                    ref={ref}
                />
                <UploadInput
                    blockId={container.id}
                    setContainers={setContainers}
                />
            </div>
        </>
    );
}