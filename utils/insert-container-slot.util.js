"use client";

export function insertContainerSlotId(containers, slot) {
    if (!containers && !slot) return [];

    if (!containers && slot) return [slot.id];

    if (containers && !slot) return (containers ?? []).map(container => container.id);

    if (containers && slot) {
        const containersIds = containers.map(container => container.id);
        const allContainersIds = containersIds.splice(slot.index, 0, slot.id);

        console.log(slot);

        return allContainersIds;
    }
}

export function insertContainerSlotElement(containers, slot) {
    if (!containers && !slot) return [];

    if (!containers && slot) return [slot];

    if (containers && !slot) return containers;

    if (containers && slot) {

        const allContainersElements = [...containers];
        allContainersElements.splice(slot.index, 0, slot);
        
        return allContainersElements;
    }
}