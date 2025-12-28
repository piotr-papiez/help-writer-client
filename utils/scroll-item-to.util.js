export function scrollToCenter(eventId) {
    if (!eventId) return;

    const previewContainer = document.getElementById("preview");
    const previewElement = document.getElementById(eventId);

    if (!previewContainer || !previewElement) return;
    
    const previewContainerRect = previewContainer.getBoundingClientRect();
    const previewElementRect = previewElement.getBoundingClientRect();
    
    const previewElementTopInside = (previewElementRect.top - previewContainerRect.top) + previewContainer.scrollTop;

    const previewTargetPosition = previewElementTopInside - 16;

    previewContainer.scrollTo({ top: previewTargetPosition, behavior: "smooth" });


    const canvasContainer = document.getElementById("canvas");
    const canvasElement = document.querySelector(`[data-id="${eventId}"]`);

    if (!canvasContainer || !canvasElement) return;
    
    const canvasContainerRect = canvasContainer.getBoundingClientRect();
    const canvasElementRect = canvasElement.getBoundingClientRect();
    
    const canvasElementTopInside = (canvasElementRect.top - canvasContainerRect.top) + canvasContainer.scrollTop;

    const canvasTargetPosition = canvasElementTopInside - 16;

    canvasContainer.scrollTo({ top: canvasTargetPosition, behavior: "smooth" });
}

export function scrollToBottom(id) {
    setTimeout(() => {
        if (!id) return;

    const container = document.getElementById(id);
    if (!container) return;

    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }, 200)
}