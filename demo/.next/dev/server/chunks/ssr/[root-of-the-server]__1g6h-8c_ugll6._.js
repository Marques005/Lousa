module.exports = [
(()=>{"use strict";return[
"[project]/src/app/shell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageCard",
    ()=>PageCard,
    "ativo",
    ()=>ativo,
    "btn",
    ()=>btn,
    "card",
    ()=>card,
    "default",
    ()=>Shell,
    "inativo",
    ()=>inativo,
    "tint",
    ()=>tint,
    "useDisc",
    ()=>useDisc
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const paletas = [
    {
        id: '1A',
        nome: 'Café',
        vars: {
            '--bg': '#A47A5C',
            '--rail': '#43281C',
            '--dot': '#FBF2C0',
            '--logo-bg': '#FBF2C0',
            '--logo-fg': '#C06E52',
            '--accent': '#C06E52',
            '--accent-fg': '#FFFFFF',
            '--soft': '#FBF2C0',
            '--line': '#E9D9A6',
            '--ink': '#43281C'
        },
        disc: {
            Matemática: [
                '#C06E52',
                '#7A3E2A'
            ],
            Física: [
                '#8A6A4B',
                '#5C4430'
            ],
            Inglês: [
                '#C9A227',
                '#6B5410'
            ],
            Português: [
                '#43281C',
                '#43281C'
            ]
        }
    },
    {
        id: '1B',
        nome: 'Café escuro',
        vars: {
            '--bg': '#43281C',
            '--rail': '#5A4636',
            '--dot': '#FBF2C0',
            '--logo-bg': '#C06E52',
            '--logo-fg': '#FBF2C0',
            '--accent': '#C06E52',
            '--accent-fg': '#FFFFFF',
            '--soft': '#FBF2C0',
            '--line': '#E9D9A6',
            '--ink': '#43281C'
        },
        disc: {
            Matemática: [
                '#C06E52',
                '#7A3E2A'
            ],
            Física: [
                '#8A6A4B',
                '#5C4430'
            ],
            Inglês: [
                '#C9A227',
                '#6B5410'
            ],
            Português: [
                '#43281C',
                '#43281C'
            ]
        }
    },
    {
        id: '1C',
        nome: 'Canela',
        vars: {
            '--bg': '#C06E52',
            '--rail': '#43281C',
            '--dot': '#FBF2C0',
            '--logo-bg': '#FBF2C0',
            '--logo-fg': '#C06E52',
            '--accent': '#43281C',
            '--accent-fg': '#FBF2C0',
            '--soft': '#FDF7DD',
            '--line': '#EBD9B0',
            '--ink': '#43281C'
        },
        disc: {
            Matemática: [
                '#C06E52',
                '#7A3E2A'
            ],
            Física: [
                '#8A6A4B',
                '#5C4430'
            ],
            Inglês: [
                '#C9A227',
                '#6B5410'
            ],
            Português: [
                '#43281C',
                '#43281C'
            ]
        }
    },
    {
        id: '1D',
        nome: 'Creme',
        vars: {
            '--bg': '#FBF2C0',
            '--rail': '#48392A',
            '--dot': '#FBF2C0',
            '--logo-bg': '#C06E52',
            '--logo-fg': '#FFFFFF',
            '--accent': '#8A6A4B',
            '--accent-fg': '#FFFFFF',
            '--soft': '#FDF8E3',
            '--line': '#EDE2B8',
            '--ink': '#43281C'
        },
        disc: {
            Matemática: [
                '#C06E52',
                '#7A3E2A'
            ],
            Física: [
                '#8A6A4B',
                '#5C4430'
            ],
            Inglês: [
                '#C9A227',
                '#6B5410'
            ],
            Português: [
                '#43281C',
                '#43281C'
            ]
        }
    },
    {
        id: '3A',
        nome: 'Gelo',
        vars: {
            '--bg': '#3FA9C4',
            '--rail': '#0E4450',
            '--dot': '#34F6F2',
            '--logo-bg': '#34F6F2',
            '--logo-fg': '#0E4450',
            '--accent': '#0E4450',
            '--accent-fg': '#D1F5FF',
            '--soft': '#EEF8FF',
            '--line': '#C6EEFA',
            '--ink': '#0E4450'
        },
        disc: {
            Matemática: [
                '#22DCD8',
                '#0B5E5C'
            ],
            Física: [
                '#4FC8EE',
                '#0B4F63'
            ],
            Inglês: [
                '#1FB8D6',
                '#0B4A57'
            ],
            Português: [
                '#0B3B44',
                '#0B3B44'
            ]
        }
    },
    {
        id: '3B',
        nome: 'Oceano',
        vars: {
            '--bg': '#0E4450',
            '--rail': '#0A2F38',
            '--dot': '#34F6F2',
            '--logo-bg': '#34F6F2',
            '--logo-fg': '#0E4450',
            '--accent': '#1FB8D6',
            '--accent-fg': '#06262D',
            '--soft': '#EEF8FF',
            '--line': '#C6EEFA',
            '--ink': '#0E4450'
        },
        disc: {
            Matemática: [
                '#22DCD8',
                '#0B5E5C'
            ],
            Física: [
                '#4FC8EE',
                '#0B4F63'
            ],
            Inglês: [
                '#1FB8D6',
                '#0B4A57'
            ],
            Português: [
                '#0B3B44',
                '#0B3B44'
            ]
        }
    },
    {
        id: '3C',
        nome: 'Glaciar',
        vars: {
            '--bg': '#D1F5FF',
            '--rail': '#3FA9C4',
            '--dot': '#FFFFFF',
            '--logo-bg': '#FFFFFF',
            '--logo-fg': '#0E4450',
            '--accent': '#3FA9C4',
            '--accent-fg': '#FFFFFF',
            '--soft': '#EEF8FF',
            '--line': '#C6EEFA',
            '--ink': '#0E4450'
        },
        disc: {
            Matemática: [
                '#22DCD8',
                '#0B5E5C'
            ],
            Física: [
                '#4FC8EE',
                '#0B4F63'
            ],
            Inglês: [
                '#1FB8D6',
                '#0B4A57'
            ],
            Português: [
                '#0B3B44',
                '#0B3B44'
            ]
        }
    },
    {
        id: '3D',
        nome: 'Noite',
        vars: {
            '--bg': '#06262D',
            '--rail': '#34F6F2',
            '--dot': '#06262D',
            '--logo-bg': '#06262D',
            '--logo-fg': '#34F6F2',
            '--accent': '#34F6F2',
            '--accent-fg': '#06262D',
            '--soft': '#E6FDFD',
            '--line': '#BFF3F5',
            '--ink': '#06262D'
        },
        disc: {
            Matemática: [
                '#22DCD8',
                '#0B5E5C'
            ],
            Física: [
                '#4FC8EE',
                '#0B4F63'
            ],
            Inglês: [
                '#1FB8D6',
                '#0B4A57'
            ],
            Português: [
                '#0B3B44',
                '#0B3B44'
            ]
        }
    }
];
const DiscCtx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(paletas[0].disc);
const useDisc = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DiscCtx);
const btn = 'rounded-lg border px-4 py-1.5 text-sm font-medium transition';
const ativo = 'border-(--accent) bg-(--accent) text-(--accent-fg)';
const inativo = 'border-(--line) bg-white text-(--ink) hover:bg-(--soft)';
const card = 'bg-white border-r border-(--line) last:border-r-0';
const tint = (cor, pct = 16)=>`color-mix(in srgb, ${cor} ${pct}%, white)`;
const nav = [
    {
        nome: 'Horário',
        href: '/'
    },
    {
        nome: 'Alunos',
        href: '/alunos'
    },
    {
        nome: 'Pagamentos',
        href: '/pagamentos'
    },
    {
        nome: 'Mensagens',
        href: '/mensagens'
    }
];
function Shell({ children }) {
    const [p, setP] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [aberta, setAberta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const conteudo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fantasma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Tira uma "fotografia" da página atual e desvanece-a por cima da nova
    const crossfade = ()=>{
        const atual = conteudo.current;
        const alvo = fantasma.current;
        if (!atual || !alvo) return;
        const copia = atual.cloneNode(true);
        copia.removeAttribute('style');
        copia.style.cssText = 'position:absolute;inset:0;display:flex;background:white';
        alvo.replaceChildren(copia);
    };
    // Quando a nova página chega, a cópia da anterior desvanece enquanto a nova entra
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const copia = fantasma.current?.firstElementChild;
        if (!copia) return;
        copia.animate([
            {
                opacity: 1,
                filter: 'blur(0)',
                transform: 'scale(1)'
            },
            {
                opacity: 0,
                filter: 'blur(6px)',
                transform: 'scale(1.006)'
            }
        ], {
            duration: 380,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards'
        }).finished.then(()=>copia.remove());
    }, [
        path
    ]);
    const paleta = paletas[p];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DiscCtx.Provider, {
        value: paleta.disc,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: paleta.vars,
            className: "flex h-screen bg-white text-(--ink) transition-colors",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex shrink-0 flex-col gap-2 overflow-hidden bg-(--rail) px-3 py-4 transition-[width] duration-300 ease-in-out', aberta ? 'w-52' : 'w-16'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setAberta((a)=>!a),
                            title: aberta ? 'Recolher' : 'Expandir',
                            className: "mb-2 flex items-center gap-3 text-left",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-(--logo-bg) font-bold text-(--logo-fg)",
                                    children: "CE"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/shell.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('font-bold whitespace-nowrap text-(--dot) transition-opacity duration-200', aberta ? 'opacity-100 delay-150' : 'opacity-0'),
                                    children: "Centro de Estudo"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/shell.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/shell.tsx",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this),
                        nav.map((n)=>{
                            const atual = path === n.href;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: n.href,
                                title: n.nome,
                                onClick: (e)=>{
                                    if (atual) return e.preventDefault();
                                    e.preventDefault();
                                    crossfade();
                                    router.push(n.href);
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/10', atual && aberta && 'bg-white/15'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('size-6 shrink-0 rounded-full bg-(--dot) transition-opacity', !atual && 'opacity-50')
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/shell.tsx",
                                        lineNumber: 294,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm font-medium whitespace-nowrap text-(--dot) transition-all duration-200', aberta ? 'translate-x-0 opacity-100 delay-150' : '-translate-x-2 opacity-0'),
                                        children: n.nome
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/shell.tsx",
                                        lineNumber: 300,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, n.href, true, {
                                fileName: "[project]/src/app/shell.tsx",
                                lineNumber: 279,
                                columnNumber: 15
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('mt-auto flex gap-1 rounded-2xl bg-white p-1 shadow-md', aberta ? 'w-full flex-row flex-wrap' : 'w-10 flex-col'),
                            children: paletas.map((pl, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    title: `${pl.id} · ${pl.nome}`,
                                    onClick: ()=>setP(i),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('size-8 shrink-0 rounded-full text-[11px] font-bold transition', p === i ? 'bg-(--accent) text-(--accent-fg)' : 'hover:bg-(--soft)'),
                                    children: pl.id
                                }, pl.id, false, {
                                    fileName: "[project]/src/app/shell.tsx",
                                    lineNumber: 318,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/shell.tsx",
                            lineNumber: 311,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setAberta((a)=>!a),
                            title: aberta ? 'Recolher' : 'Expandir',
                            className: "flex size-10 items-center justify-center rounded-xl text-lg text-(--dot) transition-colors hover:bg-white/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('transition-transform duration-300', aberta && 'rotate-180'),
                                children: "»"
                            }, void 0, false, {
                                fileName: "[project]/src/app/shell.tsx",
                                lineNumber: 336,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/shell.tsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/shell.tsx",
                    lineNumber: 253,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: `
          @keyframes page-in {
            from { opacity: 0; filter: blur(4px); transform: scale(0.994); }
            to { opacity: 1; filter: blur(0); transform: none; }
          }
        `
                }, void 0, false, {
                    fileName: "[project]/src/app/shell.tsx",
                    lineNumber: 340,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex min-w-0 flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: conteudo,
                            className: "flex min-w-0 flex-1",
                            style: {
                                animation: 'page-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both'
                            },
                            children: children
                        }, path, false, {
                            fileName: "[project]/src/app/shell.tsx",
                            lineNumber: 347,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: fantasma,
                            className: "pointer-events-none absolute inset-0 z-10"
                        }, void 0, false, {
                            fileName: "[project]/src/app/shell.tsx",
                            lineNumber: 356,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/shell.tsx",
                    lineNumber: 346,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/shell.tsx",
            lineNumber: 249,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/shell.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, this);
}
function PageCard({ titulo, acoes, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(card, 'flex min-w-0 flex-1 flex-col overflow-hidden'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex items-center justify-between gap-3 px-6 pt-5 pb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-extrabold",
                        children: titulo
                    }, void 0, false, {
                        fileName: "[project]/src/app/shell.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    acoes
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/shell.tsx",
                lineNumber: 375,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/shell.tsx",
        lineNumber: 374,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatBytes",
    ()=>formatBytes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatBytes(bytes, opts = {}) {
    const { decimals = 0, sizeType = 'normal' } = opts;
    const sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB'
    ];
    const accurateSizes = [
        'Bytes',
        'KiB',
        'MiB',
        'GiB',
        'TiB'
    ];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'}`;
}
}),
"[project]/src/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = 'system' } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        style: {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)'
        },
        position: "top-center",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sonner.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
}),
]})(),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1g6h-8c_ugll6._.js.map