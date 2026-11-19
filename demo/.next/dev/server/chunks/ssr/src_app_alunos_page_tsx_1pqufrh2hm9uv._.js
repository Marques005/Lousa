module.exports = [
"[project]/src/app/alunos/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AlunosPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/shell.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const alunos = [
    {
        nome: 'Ana Silva',
        ano: '9.º',
        disc: 'Matemática',
        enc: 'Paula Silva',
        assid: 98
    },
    {
        nome: 'João Costa',
        ano: '12.º',
        disc: 'Física',
        enc: 'Carlos Costa',
        assid: 81
    },
    {
        nome: 'Marta Lopes',
        ano: '7.º',
        disc: 'Inglês',
        enc: 'Sofia Lopes',
        assid: 95
    },
    {
        nome: 'Rui Pereira',
        ano: '11.º',
        disc: 'Matemática',
        enc: 'Luís Pereira',
        assid: 88
    },
    {
        nome: 'Inês Martins',
        ano: '10.º',
        disc: 'Português',
        enc: 'Teresa Martins',
        assid: 100
    },
    {
        nome: 'Tiago Rocha',
        ano: '8.º',
        disc: 'Inglês',
        enc: 'Miguel Rocha',
        assid: 76
    },
    {
        nome: 'Beatriz Sousa',
        ano: '12.º',
        disc: 'Física',
        enc: 'Helena Sousa',
        assid: 92
    },
    {
        nome: 'Diogo Nunes',
        ano: '9.º',
        disc: 'Português',
        enc: 'Rita Nunes',
        assid: 85
    }
];
function AlunosPage() {
    const disc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDisc"])();
    const escuro = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEscuro"])();
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [filtro, setFiltro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const lista = alunos.filter((a)=>a.nome.toLowerCase().includes(q.toLowerCase()) && (!filtro || a.disc === filtro));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageCard"], {
        titulo: "Alunos",
        acoes: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["btn"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ativo"]),
            onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Aluno criado (mock)'),
            children: "+ Novo aluno"
        }, void 0, false, {
            fileName: "[project]/src/app/alunos/page.tsx",
            lineNumber: 32,
            columnNumber: 9
        }, this),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3 border-y border-(--line) bg-(--soft)/50 px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        placeholder: "Pesquisar aluno…",
                        value: q,
                        onChange: (e)=>setQ(e.target.value),
                        className: "w-64 rounded-lg border border-(--line) bg-white px-3 py-1.5 text-sm outline-none focus:border-(--accent)"
                    }, void 0, false, {
                        fileName: "[project]/src/app/alunos/page.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: Object.keys(disc).map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["btn"], filtro === d ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ativo"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inativo"]),
                                onClick: ()=>setFiltro(filtro === d ? null : d),
                                children: d
                            }, d, false, {
                                fileName: "[project]/src/app/alunos/page.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/alunos/page.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/alunos/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 overflow-auto p-4 sm:grid-cols-2 xl:grid-cols-3",
                children: [
                    lista.map((a)=>{
                        const [cor, texto] = disc[a.disc];
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 rounded-xl border border-(--line) p-3 transition hover:shadow-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tint"])(cor, 30),
                                        color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["txt"])(texto, cor, escuro)
                                    },
                                    className: "flex size-11 shrink-0 items-center justify-center rounded-full font-bold",
                                    children: a.nome.split(' ').map((n)=>n[0]).join('')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/alunos/page.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold",
                                            children: a.nome
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/alunos/page.tsx",
                                            lineNumber: 72,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "truncate text-xs opacity-70",
                                            children: [
                                                a.ano,
                                                " ano · Enc.: ",
                                                a.enc
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/alunos/page.tsx",
                                            lineNumber: 73,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-1.5 h-1.5 rounded-full bg-(--soft)",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full rounded-full transition-all",
                                                style: {
                                                    width: `${a.assid}%`,
                                                    background: cor
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/alunos/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/alunos/page.tsx",
                                            lineNumber: 76,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/alunos/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tint"])(cor),
                                        color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["txt"])(texto, cor, escuro),
                                        borderColor: cor
                                    },
                                    className: "rounded-md border-l-4 px-2 py-0.5 text-xs font-medium",
                                    children: a.disc
                                }, void 0, false, {
                                    fileName: "[project]/src/app/alunos/page.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, a.nome, true, {
                            fileName: "[project]/src/app/alunos/page.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this);
                    }),
                    lista.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "p-6 text-sm opacity-60",
                        children: "Sem resultados."
                    }, void 0, false, {
                        fileName: "[project]/src/app/alunos/page.tsx",
                        lineNumber: 92,
                        columnNumber: 32
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/alunos/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/alunos/page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_app_alunos_page_tsx_1pqufrh2hm9uv._.js.map