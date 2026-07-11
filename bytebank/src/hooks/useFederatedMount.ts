"use client";

import { useEffect, useRef } from "react";

function loadScript(url: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) return resolve();
    const script = document.createElement("script");
    script.id = id;
    script.src = `${url}?t=${Date.now()}`;
    script.type = "text/javascript";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${url}`));
    document.head.appendChild(script);
  });
}

export function useFederatedMount<P extends object>(
  scope: string,
  module: string,
  url: string,
  props: P
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<{ update: (p: P) => void; unmount: () => void } | null>(null);
  const latestProps = useRef(props);
  latestProps.current = props;

  // Mount once
  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        await loadScript(url, `federation-${scope}`);
        const container = (window as any)[scope];
        await container.init({});
        const factory = await container.get(module);
        const mod = factory();
        if (!cancelled && containerRef.current) {
          const controller = mod.mount(containerRef.current, latestProps.current);
          controllerRef.current = controller;
          controller.update(latestProps.current);
        }
      } catch (err) {
        console.error(`[useFederatedMount] Failed to mount ${scope}/${module}:`, err);
      }
    }

    run();
    return () => {
      cancelled = true;
      controllerRef.current?.unmount();
      controllerRef.current = null;
    };
  }, [scope, module, url]);

  // Push prop updates to the already-mounted remote
  useEffect(() => {
    console.log(`[useFederatedMount] props updated, controller ready:`, !!controllerRef.current, props);
    controllerRef.current?.update(props);
  }, [props]);

  return containerRef;
}