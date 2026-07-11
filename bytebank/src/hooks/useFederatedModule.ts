"use client";

import { useEffect, useState } from "react";

declare global {
    interface Window {
        [key: string]: any;
    }
}

function loadScript(url: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (document.getElementById(id)) return resolve();
        const script = document.createElement("script");
        script.id = id;
        script.src = url;
        script.type = "text/javascript";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${url}`));
        document.head.appendChild(script);
    });
}

export function useFederatedModule<T = any>(
    scope: string,
    module: string,
    url: string
) {
    const [Component, setComponent] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const bustedUrl = `${url}?t=${Date.now()}`;
                await loadScript(bustedUrl, `federation-${scope}`);
                const container = window[scope];
                await container.init({});
                const factory = await container.get(module);
                const mod = factory();
                if (!cancelled) setComponent(() => mod.default ?? mod);
            } catch (err) {
                console.error(`[useFederatedModule] Failed to load ${scope}/${module}:`, err);
                if (!cancelled) setError(err as Error);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [scope, module, url]);

    return { Component, error };
}