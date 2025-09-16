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
        .replace(/{pencil}/g, "✎");
    
    return formattedValue;
}