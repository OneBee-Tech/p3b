"use client";

import { useEffect, useState } from "react";

// Concurrency limiter to prevent hammering the internal translation proxy
const limitConcurrency = (limit: number) => {
    let active = 0;
    const queue: (() => void)[] = [];
    const next = () => {
        active--;
        if (queue.length > 0) {
            const resolve = queue.shift()!;
            active++;
            resolve();
        }
    };
    return async () => {
        if (active >= limit) {
            await new Promise<void>(resolve => queue.push(resolve));
        } else {
            active++;
        }
        return next;
    };
};

const getTicket = limitConcurrency(4); // Keep to 4 concurrent translations to avoid HTTP drops

export function AutoTranslator({ targetLang }: { targetLang: string }) {
    useEffect(() => {
        if (!targetLang || targetLang === "en") return;

        const translateNode = async (node: Text) => {
            const originalText = node.nodeValue?.trim();

            // Skip empty/short nodes, or pure numbers/symbols
            if (!originalText || originalText.length < 2) return;
            if (/^[\d\s\W]+$/.test(originalText)) return;

            // Prevent duplicate translations
            if ((node as any)._translatedTo === targetLang) return;
            (node as any)._translatedTo = targetLang;

            const release = await getTicket();
            try {
                const res = await fetch("/api/translate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: originalText, to: targetLang }),
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.translated && data.translated !== "") {
                        node.nodeValue = node.nodeValue!.replace(originalText, data.translated);
                    }
                }
            } catch (e) {
                console.error("Translation failed for text chunk.");
            } finally {
                release();
            }
        };

        const walkDOM = (node: Node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                translateNode(node as Text);
            } else {
                // Do not translate code logic, scripts, styles, etc.
                if (["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "CODE", "TEXTAREA"].includes(node.nodeName)) return;

                // Allow traversal downwards
                Array.from(node.childNodes).forEach(walkDOM);
            }
        };

        // Small delay to ensure React hydration has settled
        setTimeout(() => walkDOM(document.body), 300);

        // Attach a MutationObserver to catch dynamically added nodes (like modals or data-fetches)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        translateNode(node as Text);
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        walkDOM(node);
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [targetLang]);

    return null;
}

export function ClientAutoTranslator() {
    const [lang, setLang] = useState("en");

    useEffect(() => {
        const savedLang = localStorage.getItem("ODOC_LANG");
        if (savedLang && savedLang !== "en") {
            setLang(savedLang);
            // Optionally add an HTML lang attribute for screen readers
            document.documentElement.lang = savedLang;
        }
    }, []);

    return <AutoTranslator targetLang={lang} />;
}
