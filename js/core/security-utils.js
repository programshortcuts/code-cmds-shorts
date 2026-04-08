// security-utils.js

export function isSafePath(href) {
    return typeof href === "string" &&
        href.startsWith("topics/") &&
        !href.includes("..") &&
        !href.startsWith("javascript:");
}