import TextareaAutosize from "react-textarea-autosize";

import handleKeyFormatting from "../../../../utils/handle-key-formatting.util.js";
import styles from "./textarea.module.css";

import Button from "./button.component.jsx";

export default function Textarea({ onInput, point, onAddIndent, onRemove, onFocus, ref }) {
    return (
        <div className={styles["list-wrapper"]}>
            <div className={styles["textarea-wrapper-first-level"]}>
                <span>●</span>
                <TextareaAutosize
                    data-textarea={point.id}
                    className={styles["textarea-first-level"]}
                    onChange={event => onInput(event.target.value, point.id)}
                    onKeyDown={handleKeyFormatting}
                    value={point.content}
                    onFocus={() => {onFocus(point.id)}}
                    ref={element => { ref.current[point.id] = element }}
                />

                {/* <div className={styles["buttons-wrapper"]}> */}
                    <Button
                        id={point.id}
                        className="textarea-button"
                        onClick={() => onAddIndent(point.id)}
                        content="subdirectory_arrow_right"
                    />
                    <Button
                        id={point.id}
                        className="textarea-button"
                        onClick={() => onRemove(point.id)}
                        content="close"
                    />
                {/* </div> */}
            </div>

            {point?.secondLevel?.map(second => (
                <div
                    key={`second-level-${second.id}`}
                    className={styles["textarea-wrapper-second-level"]}
                >
                    <span>○</span>
                    <TextareaAutosize
                        data-textarea={second.id}
                        className={styles["textarea-second-level"]}
                        onChange={event => onInput(event.target.value, second.id)}
                        onKeyDown={handleKeyFormatting}
                        value={second.content}
                        onFocus={() => {onFocus(second.id)}}
                        ref={element => { ref.current[second.id] = element }}
                    />

                    {/* <div className={styles["buttons-wrapper"]}> */}
                        <Button
                            id={second.id}
                            className="textarea-button"
                            onClick={() => onRemove(second.id)}
                            content="close"
                        />
                    {/* </div>                     */}
                </div>
            ))}
        </div>
    );
}