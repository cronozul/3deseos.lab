/* ═══════════════════════════════════════════════════════════════════
   3deseos.lab · Página de enlaces — el motor.
   No hace falta tocar este archivo: todo se cambia en config.js.
   Íconos: Lucide (ISC) y Simple Icons (CC0).
   ═══════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  /* ── Íconos ──────────────────────────────────────────────────────── */
  const BASE_ICONOS = {"arrow-up-right":["s","<path d=\"M7 7h10v10\"/><path d=\"M7 17 17 7\"/>"],"box":["s","<path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z\"/><path d=\"m3.3 7 8.7 5 8.7-5\"/><path d=\"M12 22V12\"/>"],"calendar":["s","<path d=\"M8 2v4\"/><path d=\"M16 2v4\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M3 10h18\"/>"],"check":["s","<path d=\"M20 6 9 17l-5-5\"/>"],"chevron-down":["s","<path d=\"m6 9 6 6 6-6\"/>"],"copy":["s","<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\"/><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"/>"],"gamepad-2":["s","<line x1=\"6\" x2=\"10\" y1=\"11\" y2=\"11\"/><line x1=\"8\" x2=\"8\" y1=\"9\" y2=\"13\"/><line x1=\"15\" x2=\"15.01\" y1=\"12\" y2=\"12\"/><line x1=\"18\" x2=\"18.01\" y1=\"10\" y2=\"10\"/><path d=\"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z\"/>"],"gift":["s","<rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"/><path d=\"M12 8v13\"/><path d=\"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7\"/><path d=\"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5\"/>"],"globe":["s","<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"/><path d=\"M2 12h20\"/>"],"heart":["s","<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/>"],"link":["s","<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/>"],"mail":["s","<rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\"/><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\"/>"],"map-pin":["s","<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>"],"message-circle":["s","<path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\"/>"],"palette":["s","<circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\"/><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z\"/>"],"printer":["s","<path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"/><path d=\"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6\"/><rect x=\"6\" y=\"14\" width=\"12\" height=\"8\" rx=\"1\"/>"],"qr-code":["s","<rect width=\"5\" height=\"5\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"5\" height=\"5\" x=\"16\" y=\"3\" rx=\"1\"/><rect width=\"5\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/><path d=\"M21 16h-3a2 2 0 0 0-2 2v3\"/><path d=\"M21 21v.01\"/><path d=\"M12 7v3a2 2 0 0 1-2 2H7\"/><path d=\"M3 12h.01\"/><path d=\"M12 3h.01\"/><path d=\"M12 16v.01\"/><path d=\"M16 12h1\"/><path d=\"M21 12v.01\"/><path d=\"M12 21v-1\"/>"],"share-2":["s","<circle cx=\"18\" cy=\"5\" r=\"3\"/><circle cx=\"6\" cy=\"12\" r=\"3\"/><circle cx=\"18\" cy=\"19\" r=\"3\"/><line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\"/><line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\"/>"],"shopping-bag":["s","<path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\"/><path d=\"M3 6h18\"/><path d=\"M16 10a4 4 0 0 1-8 0\"/>"],"si:behance":["f","M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"],"si:discord":["f","M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"],"si:facebook":["f","M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"],"si:instagram":["f","M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"],"si:itchdotio":["f","M3.13 1.338C2.08 1.96.02 4.328 0 4.95v1.03c0 1.303 1.22 2.45 2.325 2.45 1.33 0 2.436-1.102 2.436-2.41 0 1.308 1.07 2.41 2.4 2.41 1.328 0 2.362-1.102 2.362-2.41 0 1.308 1.137 2.41 2.466 2.41h.024c1.33 0 2.466-1.102 2.466-2.41 0 1.308 1.034 2.41 2.363 2.41 1.33 0 2.4-1.102 2.4-2.41 0 1.308 1.106 2.41 2.435 2.41C22.78 8.43 24 7.282 24 5.98V4.95c-.02-.62-2.082-2.99-3.13-3.612-3.253-.114-5.508-.134-8.87-.133-3.362 0-7.945.053-8.87.133zm6.376 6.477a2.74 2.74 0 0 1-.468.602c-.5.49-1.19.795-1.947.795a2.786 2.786 0 0 1-1.95-.795c-.182-.178-.32-.37-.446-.59-.127.222-.303.412-.486.59a2.788 2.788 0 0 1-1.95.795c-.092 0-.187-.025-.264-.052-.107 1.113-.152 2.176-.168 2.95v.005l-.006 1.167c.02 2.334-.23 7.564 1.03 8.85 1.952.454 5.545.662 9.15.663 3.605 0 7.198-.21 9.15-.664 1.26-1.284 1.01-6.514 1.03-8.848l-.006-1.167v-.004c-.016-.775-.06-1.838-.168-2.95-.077.026-.172.052-.263.052a2.788 2.788 0 0 1-1.95-.795c-.184-.178-.36-.368-.486-.59-.127.22-.265.412-.447.59a2.786 2.786 0 0 1-1.95.794c-.76 0-1.446-.303-1.948-.793a2.74 2.74 0 0 1-.468-.602 2.738 2.738 0 0 1-.463.602 2.787 2.787 0 0 1-1.95.794h-.16a2.787 2.787 0 0 1-1.95-.793 2.738 2.738 0 0 1-.464-.602zm-2.004 2.59v.002c.795.002 1.5 0 2.373.953.687-.072 1.406-.108 2.125-.107.72 0 1.438.035 2.125.107.873-.953 1.578-.95 2.372-.953.376 0 1.876 0 2.92 2.934l1.123 4.028c.832 2.995-.266 3.068-1.636 3.07-2.03-.075-3.156-1.55-3.156-3.025-1.124.184-2.436.276-3.748.277-1.312 0-2.624-.093-3.748-.277 0 1.475-1.125 2.95-3.156 3.026-1.37-.004-2.468-.077-1.636-3.072l1.122-4.027c1.045-2.934 2.545-2.934 2.92-2.934zM12 12.714c-.002.002-2.14 1.964-2.523 2.662l1.4-.056v1.22c0 .056.56.033 1.123.007.562.026 1.124.05 1.124-.008v-1.22l1.4.055C14.138 14.677 12 12.713 12 12.713z"],"si:pinterest":["f","M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"],"si:spotify":["f","M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"],"si:steam":["f","M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"],"si:threads":["f","M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"],"si:tiktok":["f","M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"],"si:whatsapp":["f","M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"],"si:x":["f","M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"],"si:youtube":["f","M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"],"sparkles":["s","<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/><path d=\"M20 3v4\"/><path d=\"M22 5h-4\"/><path d=\"M4 17v2\"/><path d=\"M5 18H3\"/>"],"star":["s","<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\"/>"],"store":["s","<path d=\"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7\"/><path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\"/><path d=\"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4\"/><path d=\"M2 7h20\"/><path d=\"M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7\"/>"],"truck":["s","<path d=\"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2\"/><path d=\"M15 18H9\"/><path d=\"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14\"/><circle cx=\"17\" cy=\"18\" r=\"2\"/><circle cx=\"7\" cy=\"18\" r=\"2\"/>"],"wand-sparkles":["s","<path d=\"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72\"/><path d=\"m14 7 3 3\"/><path d=\"M5 6v4\"/><path d=\"M19 14v4\"/><path d=\"M10 2v2\"/><path d=\"M7 8H3\"/><path d=\"M21 16h-4\"/><path d=\"M11 3H9\"/>"],"x":["s","<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>"]};
  const ALIAS_ICONOS = {"deseo":"sparkles","magia":"wand-sparkles","cubo":"box","3d":"box","juego":"gamepad-2","control":"gamepad-2","web":"globe","sitio":"globe","pagina":"globe","correo":"mail","email":"mail","mail":"mail","ubicacion":"map-pin","mapa":"map-pin","envio":"truck","envios":"truck","compartir":"share-2","copiar":"copy","listo":"check","cerrar":"x","flecha":"arrow-up-right","abajo":"chevron-down","qr":"qr-code","tienda":"shopping-bag","bolsa":"shopping-bag","local":"store","corazon":"heart","estrella":"star","enlace":"link","link":"link","regalo":"gift","calendario":"calendar","evento":"calendar","paleta":"palette","impresora":"printer","mensaje":"message-circle","chat":"message-circle","instagram":"si:instagram","whatsapp":"si:whatsapp","tiktok":"si:tiktok","youtube":"si:youtube","facebook":"si:facebook","x":"si:x","twitter":"si:x","threads":"si:threads","discord":"si:discord","steam":"si:steam","itch":"si:itchdotio","itchio":"si:itchdotio","spotify":"si:spotify","behance":"si:behance","pinterest":"si:pinterest"};

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const BASE = new URL('.', (document.currentScript && document.currentScript.src) || location.href);
  const raiz = document.documentElement;
  const $ = (sel, el = document) => el.querySelector(sel);
  const C = window.LINKS;

  const enPruebas = /localhost|127\.0\.0\.1|deploy-preview|--/.test(location.hostname) ||
    new URLSearchParams(location.search).has('editar');

  const normalizar = (s) => String(s || '').trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const esEmoji = (s) => /\p{Extended_Pictographic}/u.test(String(s || ''));

  function crear(tag, clase, texto) {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto != null) el.textContent = texto;
    return el;
  }

  function icono(nombre, clase = '') {
    const n = normalizar(nombre);
    if (n === 'lampara') {
      const lampara = $('.avatar .lampara');
      if (lampara) {
        const copia = lampara.cloneNode(true);
        copia.setAttribute('class', `icono icono--lampara ${clase}`);
        return copia;
      }
    }
    const clave = ALIAS_ICONOS[n] || (BASE_ICONOS[n] ? n : null);
    if (!clave) {
      if (esEmoji(nombre)) {
        const span = crear('span', `icono icono--emoji ${clase}`, nombre);
        span.setAttribute('aria-hidden', 'true');
        return span;
      }
      if (nombre) console.warn(`[links] No conozco el ícono "${nombre}". Uso el de enlace.`);
      return icono('enlace', clase);
    }
    const [tipo, datos] = BASE_ICONOS[clave];
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', `icono ${clase}`);
    if (tipo === 's') {
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      svg.innerHTML = datos;
    } else {
      svg.setAttribute('fill', 'currentColor');
      svg.innerHTML = `<path d="${datos}"/>`;
    }
    return svg;
  }

  /* ── Enlaces seguros ─────────────────────────────────────────────── */
  function enlace(valor) {
    const s = String(valor || '').trim();
    if (!s) return null;
    if (/^(https?:|mailto:|tel:)/i.test(s)) return s;
    if (/^[a-z][a-z0-9+.-]*:/i.test(s)) {           // javascript:, data:, etc.
      console.warn(`[links] Ignoro el enlace "${s}".`);
      return null;
    }
    if (/^[\w-]+(\.[\w-]+)+(\/|\?|#|$)/.test(s)) return `https://${s}`;  // dominio sin https://
    return new URL(s, s.startsWith('/') ? location.origin : BASE).href;
  }

  const recurso = (ruta) => new URL(String(ruta).trim(), BASE).href;
  const soloDigitos = (n) => String(n || '').replace(/\D/g, '');
  const sinArroba = (u) => String(u || '').trim().replace(/^@/, '');

  function linkWhatsApp(numero, mensaje) {
    const n = soloDigitos(numero);
    if (!n) return null;
    return `https://wa.me/${n}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''}`;
  }

  function linkCorreo(correo, asunto) {
    const c = String(correo || '').trim();
    if (!c) return null;
    return `mailto:${c}${asunto ? `?subject=${encodeURIComponent(asunto)}` : ''}`;
  }

  const REDES = {
    instagram: { nombre: 'Instagram', url: (u) => `https://www.instagram.com/${sinArroba(u)}` },
    whatsapp:  { nombre: 'WhatsApp',  url: (n) => linkWhatsApp(n) },
    correo:    { nombre: 'Correo',    url: (c) => linkCorreo(c) },
    tiktok:    { nombre: 'TikTok',    url: (u) => `https://www.tiktok.com/@${sinArroba(u)}` },
    youtube:   { nombre: 'YouTube',   url: (u) => `https://www.youtube.com/@${sinArroba(u)}` },
    facebook:  { nombre: 'Facebook',  url: (u) => `https://www.facebook.com/${sinArroba(u)}` },
    x:         { nombre: 'X',         url: (u) => `https://x.com/${sinArroba(u)}` },
    threads:   { nombre: 'Threads',   url: (u) => `https://www.threads.net/@${sinArroba(u)}` },
    itch:      { nombre: 'itch.io',   url: (u) => `https://${sinArroba(u)}.itch.io` },
    pinterest: { nombre: 'Pinterest', url: (u) => `https://www.pinterest.com/${sinArroba(u)}` },
    behance:   { nombre: 'Behance',   url: (u) => `https://www.behance.net/${sinArroba(u)}` },
    discord:   { nombre: 'Discord',   url: (u) => enlace(u) },
    steam:     { nombre: 'Steam',     url: (u) => enlace(u) },
    spotify:   { nombre: 'Spotify',   url: (u) => enlace(u) },
    web:       { nombre: 'Sitio web', url: (u) => enlace(u) },
  };

  /* ── Tema ────────────────────────────────────────────────────────── */
  function aplicarTema(t = {}) {
    const elegir = (valor, opciones, porDefecto) =>
      opciones.includes(normalizar(valor)) ? normalizar(valor) : porDefecto;
    raiz.dataset.fondo = elegir(t.fondo, ['aurora', 'noche'], 'aurora');
    raiz.dataset.botones = elegir(t.botones, ['vidrio', 'solido', 'borde'], 'vidrio');
    raiz.dataset.forma = elegir(t.forma, ['redonda', 'pildora', 'recta'], 'redonda');
    raiz.classList.toggle('quieto', t.animaciones === false);

    const hex = String(t.acento || '').trim();
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
      const h = hex.length === 4 ? hex.slice(1).split('').map((c) => c + c).join('') : hex.slice(1);
      const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
      const luz = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      raiz.style.setProperty('--acento', hex);
      raiz.style.setProperty('--acento-rgb', `${r}, ${g}, ${b}`);
      raiz.style.setProperty('--sobre-acento', luz > 0.55 ? '#161106' : '#ffffff');
    } else if (t.acento) {
      console.warn(`[links] El acento "${t.acento}" no es un color tipo "#F5C00C". Uso el amarillo de marca.`);
    }
  }

  /* ── Perfil ──────────────────────────────────────────────────────── */
  function pintarPerfil(p = {}) {
    if (p.nombre) document.title = `${p.nombre} · Enlaces`;
    const eslogan = $('.eslogan');
    const bio = $('.bio');
    if (typeof p.eslogan === 'string') { eslogan.textContent = p.eslogan; eslogan.hidden = !p.eslogan; }
    if (typeof p.bio === 'string') { bio.textContent = p.bio; bio.hidden = !p.bio; }

    if (p.foto) {
      const avatar = $('.avatar');
      const img = crear('img', 'foto');
      img.src = recurso(p.foto);
      img.alt = p.nombre || '';
      img.width = 120; img.height = 120;
      avatar.classList.add('avatar--foto');
      avatar.prepend(img);
    }

    const lista = $('.datos');
    lista.replaceChildren();
    (Array.isArray(p.datos) ? p.datos : []).forEach((d, i) => {
      if (!d || d.oculto || !d.texto) return;
      const li = crear('li', 'dato aparece');
      li.style.setProperty('--i', 4 + i);
      if (d.icono) li.append(icono(d.icono));
      li.append(crear('span', '', d.texto));
      lista.append(li);
    });
    lista.hidden = !lista.children.length;
  }

  function pintarRedes(redes = {}) {
    const nav = $('.redes');
    nav.replaceChildren();
    Object.entries(redes).forEach(([clave, valor], i) => {
      const red = REDES[normalizar(clave)];
      if (!valor) return;
      if (!red) { console.warn(`[links] No conozco la red "${clave}".`); return; }
      const href = red.url(valor);
      if (!href) return;
      const a = crear('a', 'red aparece');
      a.href = href;
      a.style.setProperty('--i', 6 + i);
      a.setAttribute('aria-label', `${red.nombre} de 3deseos.lab`);
      a.title = red.nombre;
      a.append(icono(normalizar(clave) === 'web' ? 'web' : clave));
      nav.append(a);
    });
    nav.hidden = !nav.children.length;
  }

  /* ── Botones ─────────────────────────────────────────────────────── */
  function iconoPorDefecto(item, href) {
    if (item.whatsapp != null) return 'whatsapp';
    if (item.correo != null) return 'correo';
    if (item.texto) return 'deseo';
    const h = href || '';
    if (/instagram\.com/.test(h)) return 'instagram';
    if (/tiktok\.com/.test(h)) return 'tiktok';
    if (/youtube\.com|youtu\.be/.test(h)) return 'youtube';
    if (/steampowered\.com/.test(h)) return 'steam';
    if (/itch\.io/.test(h)) return 'itch';
    return 'enlace';
  }

  function contenidoFila(item, href, flecha) {
    const fila = document.createDocumentFragment();
    const caja = crear('span', 'boton__icono');
    if (item.imagen) {
      const img = crear('img');
      img.src = recurso(item.imagen);
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = () => img.replaceWith(icono(item.icono || iconoPorDefecto(item, href)));
      caja.append(img);
      caja.classList.add('boton__icono--imagen');
    } else {
      caja.append(icono(item.icono || iconoPorDefecto(item, href)));
    }
    const textos = crear('span', 'boton__texto');
    textos.append(crear('span', 'boton__titulo', item.titulo));
    if (item.detalle) textos.append(crear('span', 'boton__detalle', item.detalle));
    fila.append(caja, textos, icono(flecha, 'boton__flecha'));
    return fila;
  }

  function crearBoton(item, i) {
    if (!item.titulo) { console.warn('[links] Un botón no tiene «titulo» y no lo muestro:', item); return null; }

    if (item.texto) {
      const det = crear('details', 'boton boton--acordeon aparece');
      det.style.setProperty('--i', i);
      const sum = crear('summary', 'boton__fila');
      sum.append(contenidoFila(item, null, 'abajo'));
      const cuerpo = crear('div', 'acordeon');
      (Array.isArray(item.texto) ? item.texto : [item.texto])
        .filter(Boolean).forEach((p) => cuerpo.append(crear('p', '', p)));
      det.append(sum, cuerpo);
      if (item.destacado) det.classList.add('boton--destacado');
      return det;
    }

    let href = null;
    if (item.whatsapp != null) {
      const mensaje = item.whatsapp === true ? '' : item.whatsapp;
      href = linkWhatsApp(item.numero || (C.redes && C.redes.whatsapp), mensaje);
    } else if (item.correo != null) {
      const asunto = item.correo === true ? '' : item.correo;
      href = linkCorreo(item.direccion || (C.redes && C.redes.correo), asunto);
    } else {
      href = enlace(item.url);
    }
    if (!href) { console.warn(`[links] El botón "${item.titulo}" no tiene enlace (url, whatsapp o correo).`); return null; }

    const a = crear('a', 'boton aparece');
    a.href = href;
    a.style.setProperty('--i', i);
    if (item.destacado) a.classList.add('boton--destacado');
    const fila = crear('span', 'boton__fila');
    fila.append(contenidoFila(item, href, 'flecha'));
    a.append(fila);
    return a;
  }

  function pintarEnlaces(enlaces = []) {
    const cont = $('.enlaces');
    cont.replaceChildren();
    // Agrupa por secciones para no mostrar títulos vacíos
    const grupos = [{ titulo: null, items: [] }];
    enlaces.forEach((item) => {
      if (!item || item.oculto) return;
      if (item.seccion) grupos.push({ titulo: item.seccion, items: [] });
      else grupos[grupos.length - 1].items.push(item);
    });
    let i = 8;
    grupos.forEach((g) => {
      const botones = g.items.map((item) => crearBoton(item, i++)).filter(Boolean);
      if (!botones.length) return;
      if (g.titulo) {
        const h = crear('h2', 'seccion aparece', g.titulo);
        h.style.setProperty('--i', i++);
        cont.append(h);
      }
      cont.append(...botones);
    });
  }

  function pintarPie(texto) {
    const pie = $('.pie');
    if (typeof texto !== 'string') return;
    pie.textContent = texto.replace(/\{a[ñn]o\}/gi, String(new Date().getFullYear()));
    pie.hidden = !texto;
  }

  /* ── Compartir: QR + copiar ──────────────────────────────────────── */
  function urlPagina() {
    const u = C && C.url ? enlace(C.url) : null;
    return u || location.href.split('#')[0];
  }

  let promesaQR = null;
  function cargarQR() {
    if (window.qrcode) return Promise.resolve();
    if (!promesaQR) {
      promesaQR = new Promise((ok, falla) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
        s.async = true;
        s.onload = ok;
        s.onerror = falla;
        document.head.append(s);
      });
    }
    return promesaQR;
  }

  function dibujarQR(destino, url) {
    const qr = window.qrcode(0, 'H');
    qr.addData(url);
    qr.make();
    const n = qr.getModuleCount();
    const m = 3;                              // margen blanco en módulos
    let d = '';
    for (let f = 0; f < n; f++) {
      for (let c = 0; c < n; c++) if (qr.isDark(f, c)) d += `M${c + m} ${f + m}h1v1h-1z`;
    }
    const total = n + m * 2;
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${total} ${total}`);
    svg.setAttribute('shape-rendering', 'crispEdges');
    svg.innerHTML = `<rect width="${total}" height="${total}" rx="2" fill="#fff"/><path fill="#050505" d="${d}"/>` +
      `<circle cx="${total / 2}" cy="${total / 2}" r="${n * 0.15}" fill="#fff"/>`;
    const lampara = $('.avatar .lampara');
    if (lampara) {
      const mini = lampara.cloneNode(true);
      const ancho = n * 0.24;
      const alto = ancho * 0.74;
      mini.removeAttribute('class');
      mini.setAttribute('x', String(total / 2 - ancho / 2));
      mini.setAttribute('y', String(total / 2 - alto / 2));
      mini.setAttribute('width', String(ancho));
      mini.setAttribute('height', String(alto));
      mini.setAttribute('shape-rendering', 'geometricPrecision');
      svg.append(mini);
    }
    destino.replaceChildren(svg);
  }

  async function copiar(url, boton) {
    let hecho = false;
    try {
      await navigator.clipboard.writeText(url);
      hecho = true;
    } catch (_) {
      const ta = crear('textarea');
      ta.value = url;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      document.body.append(ta);
      ta.select();
      try { hecho = document.execCommand('copy'); } catch (_) { hecho = false; }
      ta.remove();
    }
    if (!hecho) { window.prompt('Copia este enlace:', url); return; }
    if (boton) {
      const etiqueta = boton.querySelector('span');
      const antes = etiqueta.textContent;
      etiqueta.textContent = '¡Enlace copiado!';
      boton.classList.add('accion--hecho');
      setTimeout(() => { etiqueta.textContent = antes; boton.classList.remove('accion--hecho'); }, 2200);
    }
  }

  function prepararCompartir() {
    const boton = $('.compartir');
    const hoja = $('#hoja');
    if (!boton || !hoja) return;
    boton.replaceChildren(icono('compartir'));
    $('[data-cerrar]', hoja).replaceChildren(icono('cerrar'));
    const bCopiar = $('#copiar', hoja);
    const bNativo = $('#compartir-nativo', hoja);
    bCopiar.prepend(icono('copiar'));
    bNativo.prepend(icono('compartir'));
    const url = urlPagina();
    $('#hoja-url', hoja).textContent = url.replace(/^https?:\/\//, '');

    if (navigator.share) {
      bNativo.hidden = false;
      bNativo.addEventListener('click', () => {
        const titulo = (C.perfil && C.perfil.nombre) || '3deseos.lab';
        const texto = (C.perfil && (C.perfil.eslogan || C.perfil.bio)) || '';
        navigator.share({ title: titulo, text: texto, url }).catch(() => {});
      });
    }
    bCopiar.addEventListener('click', () => copiar(url, bCopiar));

    boton.addEventListener('click', () => {
      if (typeof hoja.showModal !== 'function') { copiar(url); return; }
      hoja.showModal();
      const caja = $('#qr', hoja);
      if (!caja.firstChild) {
        caja.classList.add('hoja__qr--cargando');
        cargarQR()
          .then(() => dibujarQR(caja, url))
          .catch(() => { caja.hidden = true; })
          .finally(() => caja.classList.remove('hoja__qr--cargando'));
      }
    });
    $('[data-cerrar]', hoja).addEventListener('click', () => hoja.close());
    hoja.addEventListener('click', (e) => { if (e.target === hoja) hoja.close(); });
  }

  /* ── Grano fino del fondo (evita franjas en el degradado) ────────────── */
  function granoFino() {
    try {
      const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 3);
      const lado = 192;                         // en píxeles reales de la pantalla
      const lienzo = document.createElement('canvas');
      lienzo.width = lienzo.height = lado;
      const ctx = lienzo.getContext('2d');
      const img = ctx.createImageData(lado, lado);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        // Puntos oscuros o claros casi invisibles (±1 o 2 tonos sobre fondo oscuro)
        const r = Math.random();
        if (r < 0.5) { d[i] = d[i + 1] = d[i + 2] = 0; d[i + 3] = Math.round((0.5 - r) * 2 * 22); }
        else { d[i] = d[i + 1] = d[i + 2] = 255; d[i + 3] = Math.round((r - 0.5) * 2 * 3); }
      }
      ctx.putImageData(img, 0, 0);
      const aplicar = (url) => {
        raiz.style.setProperty('--grano', `url("${url}")`);
        raiz.style.setProperty('--grano-tam', `${lado / dpr}px`);
      };
      if (lienzo.toBlob) lienzo.toBlob((b) => { if (b) aplicar(URL.createObjectURL(b)); }, 'image/png');
      else aplicar(lienzo.toDataURL('image/png'));
    } catch (_) { /* sin grano: el fondo se ve igual */ }
  }

  /* ── Si config.js tiene un error ─────────────────────────────────── */
  function avisarError(detalle) {
    raiz.classList.add('js-error');
    console.error(`[links] No pude leer config.js. ${detalle}\n` +
      'Suele ser una coma o unas comillas que faltan. La página muestra los enlaces de respaldo.');
    if (!enPruebas) return;
    const aviso = crear('div', 'aviso');
    aviso.append(crear('strong', '', 'config.js tiene un error'), crear('span', '', detalle));
    document.body.prepend(aviso);
  }

  /* ── Arranque ────────────────────────────────────────────────────── */
  granoFino();

  if (!C || typeof C !== 'object') {
    const e = window.__errorConfig;
    avisarError(e ? `${e.mensaje} (revisa la línea ${e.linea} o la de arriba).` : 'El archivo no cargó.');
    return;
  }

  try {
    aplicarTema(C.tema);
    pintarPerfil(C.perfil);
    pintarRedes(C.redes);
    pintarEnlaces(C.enlaces);
    pintarPie(C.pie);
    prepararCompartir();
    raiz.classList.add('js-listo');
  } catch (err) {
    avisarError(err && err.message ? err.message : String(err));
  }
})();
