export function containersToHTML(containers) {
    return (
        containers
            ?.map(item => {
                const classAttr = ["info", "warning", "release_alert"].includes(item.icon)
                    ? ` class="${item.icon}"`
                    : "";
                
                return `<${item.tag} id="${item.id}"${classAttr}>${item.content}</${item.tag}>`
            })
            .join("\n")
    );
}

export function listContentToHTML(list) {
    const htmlContent = list.map(point => {
        const pointHTML = `${point.content}`;

        let secondLevelHTML = point.secondLevel?.map(secondLevel => (
            `<li id="${secondLevel.id}">${secondLevel.content}</li>`
        ));

        secondLevelHTML = secondLevelHTML ? `<ul>${secondLevelHTML.join("")}</ul>` : "";

        return `<li id="${point.id}">${pointHTML}${secondLevelHTML}</li>`;
    });

    return htmlContent.join("");
}