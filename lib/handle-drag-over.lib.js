"use client";

export default function handleDragOver(event, containers, handleCreateContainerSlot) {
    const { active, over } = event;

    if (!over) handleCreateContainerSlot(null);

    if (active.data.current?.origin !== "toolbar" || !over) return;

    const containersIds = containers.map(container => container.id);
    const slotIndex = containersIds.indexOf(over.id);

    if (slotIndex < 0) return;

    const activeElement = active.rect.current?.translated;
    const overElement = over.rect;
    const activeTop = activeElement ? activeElement.top + activeElement.height / 2 : 0;
    const overTop = overElement.top + overElement.height / 2;
    const activeGoesDown = activeTop < overTop;
    const projectedIndex = slotIndex + (activeGoesDown ? 1 : 0);

    handleCreateContainerSlot({
        id: "containerSlot",
        tag: active.data.current?.tag,
        icon: active.data.current?.content,
        content: "",
        index: projectedIndex,
    });
}