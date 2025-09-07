"use client";

export default function getContainerIndex(containers, id) {
    const index = containers.findIndex(container => container.id === id);

    return index;
}