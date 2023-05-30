export async function defineLocale(lang) {
    if (lang === "en") {
        const locale = await import("../../locale/english");
        return locale.default;
    } else if (lang === "ru") {
        const locale = await import("../../locale/russian");
        return locale.default;
    } else if (lang === "uk") {
        const locale = await import("../../locale/ukrainian");
        return locale.default;
    } else {
        const locale = await import("../../locale/english");
        return locale.default;
    }
}
