import TextareaAutosize from "react-textarea-autosize";

import styles from "./textarea.module.css";

import Button from "./button.component.jsx";

export default function Textarea({ onInput, point, onAddIndent, onRemove }) {
    return (
        <div className={styles["list-wrapper"]}>
            <div className={styles["textarea-wrapper-first-level"]}>
                <span className="material-symbols-rounded">radio_button_checked</span>
                <TextareaAutosize
                    data-textarea={point.id}
                    className={styles["textarea-first-level"]}
                    onChange={event => onInput(event.target.value, point.id)}
                    value={point.content}
                />

                <div className={styles["buttons-wrapper"]}>
                    <Button
                        id={point.id}
                        onClick={() => onAddIndent(point.id)}
                        content="subdirectory_arrow_right"
                    />
                    <Button
                        id={point.id}
                        onClick={() => onRemove(point.id)}
                        content="close"
                    />
                </div>
            </div>


            {point?.secondLevel?.map(second => (
                <div
                    key={`second-level-${second.id}`}
                    className={styles["textarea-wrapper-second-level"]}
                >
                    <span className="material-symbols-rounded">radio_button_unchecked</span>
                    <TextareaAutosize
                        data-textarea={second.id}
                        className={styles["textarea-second-level"]}
                        onChange={event => onInput(event.target.value, second.id)}
                        value={second.content}
                    />

                    <div className={styles["buttons-wrapper"]}>
                        <Button
                            id={second.id}
                            onClick={() => onRemove(second.id)}
                            content="close"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}