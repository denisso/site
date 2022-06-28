/**
 * 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

export const loadScript = (attributes: any) => {
    const script = document.createElement("script");
    for (const [key, value] of Object.entries(attributes)) {
        (script as any)[key] = value;
    }
    document.body.appendChild(script);
};
