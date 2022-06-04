export const loadScript = (attributes: any) => {
    const script = document.createElement("script");
    for (const [key, value] of Object.entries(attributes)) {
        (script as any)[key] = value;
    }
    document.body.appendChild(script);
};
