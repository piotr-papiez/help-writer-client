// export function containersToHTML(containers) {
//     return (
//         containers
//             ?.map(item => {
//                 const classAttr = ["info", "warning", "release_alert"].includes(item.icon)
//                     ? ` class="${item.icon}"`
//                     : "";

//                 return `<${item.tag} id="${item.id}"${classAttr}>${item.content}</${item.tag}>`
//             })
//             .join("\n")
//     );
// }

export function containersToHTML(containers) {
  const listItemsDeepLinksRaw = containers?.map(item => {
    if (["h1", "h2", "h3"].includes(item.tag)) {
      return `<li><a href="#${item.id}">${item.content}</a></li>`;
    } else {
      return;
    }
  }) || [];

  const listItemsDeepLinks = listItemsDeepLinksRaw
    .filter(item => item !== undefined)
    .join("\n");

  const deepLinks = `<ul class="toc">${listItemsDeepLinks}</ul>`;

  const htmlContent = containers
    ?.map(item => {
      if (["info", "warning", "release_alert"].includes(item.icon)) {
        return `<${item.tag} id="${item.id}" class=${item.icon}>${item.content}</${item.tag}>`;
      }

      if (item.tag === "img") {
        return `<a class="image-link" href="${item.content}"><${item.tag} id="${item.id}" src="${item.content}" alt="Zrzut ekranu" /></a>`
      }

      if (item.tag === "iframe") {
        return `
        <${item.tag}
          id="${item.id}"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/${item.content}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen=""
        >
        </${item.tag}>
      `;
      }

      return `<${item.tag} id="${item.id}">${item.content}</${item.tag}>`
    })
    .join("\n")

  if (containers?.length > 0) {
    return `${deepLinks}\n${htmlContent}`;
  } else {
    return null;
  }
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
