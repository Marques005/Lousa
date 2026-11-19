(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/mensagens/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MensagensPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/shell.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// Conversa que responde sozinha (teste)
const AUTO = 'Luís Pereira';
const RESPOSTA_AUTO = 'Obrigado pela mensagem! 👍 (resposta automática de teste)';
const agora = ()=>new Date().toLocaleTimeString('pt-PT', {
        hour: '2-digit',
        minute: '2-digit'
    });
const conversas = [
    {
        nome: 'Paula Silva',
        aluno: 'Ana Silva',
        msgs: [
            {
                de: 'eles',
                texto: 'Boa tarde! A Ana pode sair 15 min mais cedo na quinta?',
                hora: '14:02'
            },
            {
                de: 'eu',
                texto: 'Boa tarde, Paula. Sim, sem problema, avisamos a professora Rita.',
                hora: '14:10'
            },
            {
                de: 'eles',
                texto: 'Obrigada 🙏',
                hora: '14:11'
            }
        ]
    },
    {
        nome: 'Carlos Costa',
        aluno: 'João Costa',
        msgs: [
            {
                de: 'eu',
                texto: 'Olá Carlos, a mensalidade de novembro do João está em atraso.',
                hora: 'Ontem'
            },
            {
                de: 'eles',
                texto: 'Peço desculpa, transfiro hoje ainda.',
                hora: 'Ontem'
            }
        ]
    },
    {
        nome: 'Sofia Lopes',
        aluno: 'Marta Lopes',
        msgs: [
            {
                de: 'eles',
                texto: 'Quando é o próximo teste de Inglês?',
                hora: 'Seg'
            }
        ]
    },
    {
        nome: 'Luís Pereira',
        aluno: 'Rui Pereira',
        msgs: [
            {
                de: 'eu',
                texto: 'O Rui teve 18 no teste de Matemática! 🎉',
                hora: 'Sex'
            }
        ]
    }
];
function MensagensPage() {
    _s();
    const [dados, setDados] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(conversas);
    const [sel, setSel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [texto, setTexto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [aEscrever, setAEscrever] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const atual = dados[sel];
    const juntar = (idx, m)=>setDados((d)=>d.map((c, i)=>i === idx ? {
                    ...c,
                    msgs: [
                        ...c.msgs,
                        m
                    ]
                } : c));
    const enviar = ()=>{
        if (!texto.trim()) return;
        const idx = sel;
        juntar(idx, {
            de: 'eu',
            texto,
            hora: agora(),
            nova: true
        });
        setTexto('');
        if (dados[idx].nome === AUTO) {
            setTimeout(()=>setAEscrever(idx), 600);
            setTimeout(()=>{
                setAEscrever(null);
                juntar(idx, {
                    de: 'eles',
                    texto: RESPOSTA_AUTO,
                    hora: agora(),
                    nova: true
                });
            }, 2200);
        }
    };
    // desce até à última mensagem
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MensagensPage.useEffect": ()=>{
            fim.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        }
    }["MensagensPage.useEffect"], [
        atual.msgs.length,
        aEscrever,
        sel
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["card"], 'flex w-72 shrink-0 flex-col overflow-hidden'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[color-mix(in_srgb,var(--rail)_86%,var(--dot))] px-4 py-3 font-semibold text-(--dot)",
                        children: "Encarregados"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mensagens/page.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "flex-1 overflow-auto p-2",
                        children: dados.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSel(i),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full rounded-xl px-3 py-2.5 text-left transition-colors', sel === i ? 'bg-(--soft)' : 'hover:bg-(--soft)/60'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between text-sm font-semibold",
                                            children: [
                                                c.nome,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-normal opacity-50",
                                                    children: c.msgs.at(-1)?.hora
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/mensagens/page.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/mensagens/page.tsx",
                                            lineNumber: 89,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "truncate text-xs opacity-60",
                                            children: c.msgs.at(-1)?.texto
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mensagens/page.tsx",
                                            lineNumber: 93,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/mensagens/page.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this)
                            }, c.nome, false, {
                                fileName: "[project]/src/app/mensagens/page.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/mensagens/page.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mensagens/page.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["card"], 'flex min-w-0 flex-1 flex-col overflow-hidden'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "border-b border-(--line) px-6 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xl font-extrabold",
                                children: atual.nome
                            }, void 0, false, {
                                fileName: "[project]/src/app/mensagens/page.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs opacity-60",
                                children: [
                                    "Encarregado de ",
                                    atual.aluno
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/mensagens/page.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mensagens/page.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col gap-2 overflow-auto bg-(--soft)/40 p-6",
                        children: [
                            atual.msgs.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm', m.de === 'eu' ? 'self-end rounded-br-sm bg-(--accent) text-(--accent-fg)' : 'self-start rounded-bl-sm bg-white'),
                                    style: m.nova ? {
                                        animation: `${m.de === 'eu' ? 'msg-enviar' : 'msg-receber'} ${m.de === 'eu' ? 520 : 420}ms cubic-bezier(0.32, 0.72, 0, 1) both`,
                                        transformOrigin: m.de === 'eu' ? 'bottom right' : 'bottom left'
                                    } : undefined,
                                    children: [
                                        m.texto,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-0.5 text-right text-[10px] opacity-60",
                                            children: m.hora
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/mensagens/page.tsx",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, `${sel}-${i}`, true, {
                                    fileName: "[project]/src/app/mensagens/page.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)),
                            aEscrever === sel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1 self-start rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm",
                                style: {
                                    animation: 'msg-receber 300ms cubic-bezier(0.32, 0.72, 0, 1) both',
                                    transformOrigin: 'bottom left'
                                },
                                children: [
                                    0,
                                    1,
                                    2
                                ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "size-1.5 rounded-full bg-(--ink)/50",
                                        style: {
                                            animation: `msg-ponto 1s ${d * 150}ms ease-in-out infinite`
                                        }
                                    }, d, false, {
                                        fileName: "[project]/src/app/mensagens/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/mensagens/page.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: fim
                            }, void 0, false, {
                                fileName: "[project]/src/app/mensagens/page.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
            @keyframes msg-enviar {
              0% { opacity: 0; transform: translateY(72px) scale(0.85); }
              40% { opacity: 1; }
              100% { opacity: 1; transform: none; }
            }
            @keyframes msg-receber {
              from { opacity: 0; transform: translate(-16px, 10px) scale(0.9); }
              to { opacity: 1; transform: none; }
            }
            @keyframes msg-ponto {
              0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
              30% { transform: translateY(-4px); opacity: 1; }
            }
          `
                            }, void 0, false, {
                                fileName: "[project]/src/app/mensagens/page.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mensagens/page.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: (e)=>{
                            e.preventDefault();
                            enviar();
                        },
                        className: "flex gap-2 border-t border-(--line) p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: texto,
                                onChange: (e)=>setTexto(e.target.value),
                                placeholder: "Escrever mensagem…",
                                className: "flex-1 rounded-lg border border-(--line) px-3 py-2 text-sm outline-none focus:border-(--accent)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mensagens/page.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["btn"], __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ativo"], 'active:scale-95'),
                                children: "Enviar"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mensagens/page.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mensagens/page.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mensagens/page.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mensagens/page.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(MensagensPage, "8mhLmUhc6ZpHBJmew8qMLPEUQL4=");
_c = MensagensPage;
var _c;
__turbopack_context__.k.register(_c, "MensagensPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_mensagens_page_tsx_1lv45b8_wl5ag._.js.map