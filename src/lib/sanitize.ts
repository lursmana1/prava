// import DOMPurify from "isomorphic-dompurify";

// // What Tiptap Color/FontSize actually output - nothing else
// const ALLOWED_CSS = ["color", "font-size"] as const;

// // Safe URL schemes only (no javascript:, data:, etc.)
// const SAFE_URI = /^(https?:|mailto:|tel:|#)/i;

// let init = false;

// function setupHooks() {
//   if (init) return;
//   init = true;

//   // target="_blank" without rel = tabnabbing
//   DOMPurify.addHook("afterSanitizeAttributes", (node) => {
//     if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
//       const rel = (node.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
//       node.setAttribute("rel", [...new Set([...rel, "noopener", "noreferrer"])].join(" "));
//     }
//   });

//   // Only allow CSS props Tiptap uses - blocks url(), expression(), etc.
//   DOMPurify.addHook("afterSanitizeAttributes", (node) => {
//     if (!node.hasAttribute("style")) return;
//     const style = (node as HTMLElement).style;
//     const out: string[] = [];
//     for (let i = 0; i < style.length; i++) {
//       const prop = style[i];
//       const norm = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
//       if ((ALLOWED_CSS as readonly string[]).includes(norm)) {
//         out.push(`${norm}:${style.getPropertyValue(prop)};`);
//       }
//     }
//     out.length ? node.setAttribute("style", out.join("")) : node.removeAttribute("style");
//   });
// }

// /**
//  * Sanitizes Tiptap HTML for dangerouslySetInnerHTML.
//  * - Tag/attr whitelist
//  * - Style limited to color, font-size
//  * - URLs: https, mailto, tel, # only
//  * - rel="noopener noreferrer" on _blank links
//  */
// export function sanitizeHtml(html: string): string {
//   if (!html || typeof html !== "string") return "";
//   setupHooks();

//   return DOMPurify.sanitize(html, {
//     ALLOWED_TAGS: ["p", "br", "span", "h1", "h2", "h3", "h4", "h5", "ul", "ol", "li", "blockquote", "pre", "hr", "strong", "em", "u", "s", "code", "a", "img"],
//     ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "style"],
//     ALLOWED_URI_REGEXP: SAFE_URI,
//   });
// }
