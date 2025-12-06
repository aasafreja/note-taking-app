// import { useEffect, useState } from "react";
// import { getImageUrl } from "../../api/images";

// const imageCache = {}; // локальный кэш для фронтенда

// export default function MarkdownImage({ src, alt }) {
//     const [url, setUrl] = useState(imageCache[src] || null);

//     useEffect(() => {
//         async function load() {
//             if (imageCache[src]) {
//                 setUrl(imageCache[src]);
//                 return;
//             }

//             const signed = await getImageUrl(src);
//             imageCache[src] = signed;   // 🔥 кладём в кэш
//             setUrl(signed);
//         }
//         load();
//     }, [src]);

//     return (
//         <img
//             src={url}
//             alt={alt}
//             style={{
//                 maxWidth: "100%",
//                 maxHeight: "300px",
//                 objectFit: "contain",
//                 borderRadius: "8px",
//                 margin: "10px 0"
//             }}
//         />
//     );
// }


import { useEffect, useState } from "react";
import { getImageUrl } from "../../api/images";

export default function MarkdownImage({ src, alt }) {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        let mounted = true;

        async function load() {
            const signed = await getImageUrl(src);
            if (mounted) setUrl(signed);
        }

        load();

        return () => { mounted = false; };
    }, [src]);

    return (
        <img
            src={url}
            alt={alt}
            style={{
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: "8px",
                margin: "10px 0"
            }}
        />
    );
}
