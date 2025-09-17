export default function textToSymbol(value) {
    const formattedValue = value
        .replace(/<--/g, "←")
        .replace(/-->/g, "→")
        .replace(/<->/g, "↔")
        .replace(/<==/g, "⇐")
        .replace(/==>/g, "⇒")
        .replace(/<=>/g, "⇔")
        .replace(/<\.\./g, "⇠")
        .replace(/\.\.>/g, "⇢")
        .replace(/{pencil}/g, "✎")
        .replace(/{settings}/g, "<span class='material-symbols-rounded'>build</span>")
        .replace(/{add}/g, "＋")
    
    return formattedValue;
}