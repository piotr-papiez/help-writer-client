"use client";

import styles from "./block-slot.module.css";

export default function BlockSlot({ containerSlot, className }) {
    return (
        <div
            className={styles.block}
        >
            <div
                className={styles.slot}
                id={"block-slot"}
            >
                <div className={styles.heading}>
                    <div className={styles["heading-title"]}>
                        {/* <span>{"</>"}</span> */}
                    </div>
                </div>
            </div>
        </div>
    );
}