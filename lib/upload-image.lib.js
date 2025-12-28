export default async function uploadImage({ blockId, file }) {
    const presign = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/files`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            blockId,
            fileName: file.name,
            contentType: file.type || "application/octet-stream"
        })
    });

    if (!presign.ok) return;
    const { uploadUrl, publicUrl } = await presign.json();

    const putFile = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/octet-stream"},
        body: file
    });

    if (!putFile.ok) return;

    return publicUrl;
}