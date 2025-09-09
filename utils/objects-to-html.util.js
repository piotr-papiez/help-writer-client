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

// Function below to be optimised, verified, and renamed.

export function ulHTMLToLIST(ulHtml) {
    const wrapped = /^\s*<ul[\s>]/i.test(ulHtml) ? ulHtml : `<ul>${ulHtml}</ul>`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(wrapped, "text/html");
    const rootUl = doc.querySelector("ul");
    if (!rootUl) return [];
  
    const parseLevel = (ulEl, depth = 1) => {
      return Array.from(ulEl.querySelectorAll(":scope > li")).map(li => {
        const childUl = li.querySelector(":scope > ul");
  
        let content = li.innerHTML;
        if (childUl) content = content.replace(childUl.outerHTML, "").trim();
  
        const node = {
          id: li.id || undefined,
          content: content.trim()
        };
  
        if (childUl && depth === 1) {
          node.secondLevel = Array.from(childUl.querySelectorAll(":scope > li")).map(childLi => ({
            id: childLi.id || undefined,
            content: childLi.innerHTML.trim()
          }));
        }
  
        return node;
      });
    };
  
    return parseLevel(rootUl, 1);
  }
  