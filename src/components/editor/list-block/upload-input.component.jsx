import uploadImage from "../../../../lib/upload-image.lib";

import styles from "./button.module.css";

export default function UploadInput({ blockId, setContainers }) {
    return (
        <input
            type="file"
            accept="image/*"
            className={styles["upload-input"]}
            onChange={async event => {
                const file = event.target.files?.[0];
                if (!file) return;

                const url = await uploadImage({ blockId, file });

                setContainers(prev => (
                    prev.map(x => x.id === blockId ? { ...x, content: url } : x)
                ));
            }}
        />
    )
}