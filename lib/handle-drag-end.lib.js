"use client";

export default function handleDragEnd(event, handleReorderContainers, handleCreateContainer) {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    if (active.data.current?.origin === "canvas") {
        handleReorderContainers(active.id, over.id);
    }

    if (active.data.current?.origin === "toolbar") {
        handleCreateContainer(active.data.current?.tag, active.data.current?.icon);
    }
}