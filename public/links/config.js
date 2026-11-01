/* ═══════════════════════════════════════════════════════════════════
   3deseos.lab · Página de enlaces (tipo Linktree)
   ───────────────────────────────────────────────────────────────────
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS TOCAR.
   Desde aquí cambias textos, botones, redes, colores y estilo.

   Cómo editarlo desde GitHub (sirve también en el celular):
     1. Abre este archivo en github.com y toca el lápiz ✏️ («Edit»).
     2. Cambia lo que quieras. Abajo tienes ejemplos de cada cosa.
     3. Toca «Commit changes». Netlify lo publica solo en 1 o 2 minutos.
   O pídeselo a tu agente de desarrollo y él te pasa una vista previa.

   Reglas para no romper nada:
     • Los textos van entre comillas: "así".
     • Separa cada dato con una coma. Una coma de más no rompe nada;
       una que falte, sí (si eso pasa, la página muestra un aviso).
     • Para ESCONDER un botón sin borrarlo, agrégale:  oculto: true
     • Para cambiar el orden, mueve el bloque { … } completo.
     • Las líneas que empiezan con // son notas: la página las ignora.
   ═══════════════════════════════════════════════════════════════════ */

window.LINKS = {

  /* ─── Perfil: lo primero que se ve ─────────────────────────────── */
  perfil: {
    nombre: "3deseos.lab",                 // título de la pestaña del navegador
    eslogan: "",                           // lema bajo el logo, en MAYÚSCULAS. Vacío = no se muestra
    bio: "Videojuegos e impresiones 3D hechos a cuatro manos.",

    // Etiquetas pequeñas debajo de la bio
    datos: [
      { icono: "ubicacion", texto: "Bogotá, Colombia" },
      { icono: "envio", texto: "Envíos a todo el país" },
    ],

    // Vacío = la lámpara animada del logo.
    // Para usar una foto, súbela a public/links/img/ y escribe su ruta: "img/foto.jpg"
    foto: "",
  },


  /* ─── Redes: la fila de íconos redondos ────────────────────────── */
  // El orden de aquí es el orden en pantalla. Deja "" para ocultar una red.
  // Disponibles: instagram, whatsapp, correo, tiktok, youtube, facebook,
  // x, threads, discord, steam, itch, spotify, behance, pinterest, web
  redes: {
    instagram: "3deseos.lab",
    whatsapp: "573172575398",              // con el 57 adelante, sin + ni espacios
    correo: "3deseos.lab@gmail.com",
    web: "https://3deseoslab.netlify.app/",   // el globo: lleva a la página principal
    tiktok: "",
    youtube: "",
  },


  /* ─── Botones ──────────────────────────────────────────────────── */
  // Cada bloque { … } es una cosa en la página, de arriba hacia abajo:
  //
  //   { seccion: "Título" }                             → título pequeño
  //   { titulo: "…", detalle: "…", url: "https://…" }   → botón con enlace
  //   { titulo: "…", whatsapp: "Mensaje inicial" }      → abre WhatsApp con ese mensaje
  //   { titulo: "…", correo: "Asunto del correo" }      → abre el correo con ese asunto
  //   { titulo: "…", texto: "Párrafo" }                 → botón que se despliega con texto
  //
  // Opcionales en cualquier botón:
  //   detalle: "línea pequeña debajo del título"
  //   icono: "deseo"   → deseo, cubo, juego, web, correo, whatsapp, instagram,
  //                      tienda, regalo, corazon, estrella, calendario, enlace,
  //                      paleta, impresora, mensaje, magia, lampara, steam, itch,
  //                      tiktok, youtube, discord, spotify … o un emoji: "🎮"
  //   imagen: "img/archivo.svg"   → miniatura en vez de ícono
  //   destacado: true             → botón de color, para lo más importante
  //   oculto: true                → no se muestra (pero no se borra)
  enlaces: [

    { seccion: "Impresión 3D" },
    {
      titulo: "Pide tu deseo",
      detalle: "Cotiza tu pieza 3D por WhatsApp",
      whatsapp: "¡Hola, 3deseos.lab! ✨ Quiero cotizar una pieza 3D.",
      icono: "deseo",
      destacado: true,
    },
    {
      titulo: "Colecciones 3D",
      detalle: "Tornasol, Geek, Hogar y Bisutería",
      url: "https://3deseoslab.netlify.app/products",
      icono: "cubo",
    },

    { seccion: "Videojuegos" },
    {
      titulo: "Juega P-Hacker",
      detalle: "Nuestro juego de cartas sobre la crisis de replicación",
      url: "https://p-hacker-game.netlify.app/",
      imagen: "img/p-hacker.svg",
    },
    {
      // Cuando la página de Steam esté publicada: pega el enlace y borra «oculto».
      titulo: "P-Hacker en Steam",
      detalle: "Agrégalo a tu lista de deseos",
      url: "https://store.steampowered.com/",
      icono: "steam",
      oculto: true,
    },

    { seccion: "Conócenos" },
    {
      titulo: "Sobre nosotros",
      detalle: "¿Quién vive dentro de la lámpara?",
      icono: "lampara",
      texto: [
        "Dentro de nuestra lámpara no hay un genio: hay dos personas, una impresora 3D y mucho código.",
        "En 3deseos.lab convertimos sueños en videojuegos que nunca imaginaste jugar y en piezas 3D que siempre quisiste tener. Todo empieza como experimento y lo pulimos hasta el último píxel y la última capa.",
      ],
    },
    {
      // Escondido: el globo de las redes ya lleva a la página principal.
      titulo: "Nuestra web",
      detalle: "Colecciones, pedidos y juegos",
      url: "https://3deseoslab.netlify.app/",
      icono: "web",
      oculto: true,
    },
    {
      titulo: "Escríbenos",
      detalle: "3deseos.lab@gmail.com",
      correo: "Hola desde la página de enlaces",
      icono: "correo",
    },

  ],


  /* ─── Estilo ───────────────────────────────────────────────────── */
  tema: {
    acento: "#F5C00C",     // color del botón destacado y de los detalles
    fondo: "aurora",       // "aurora" (brillos morado, azul y verde) · "noche" (negro liso)
    botones: "vidrio",     // "vidrio" · "solido" · "borde"
    forma: "redonda",      // "redonda" · "pildora" · "recta"
    animaciones: true,     // false = todo quieto
  },


  /* ─── Compartir y pie de página ────────────────────────────────── */
  url: "https://3deseoslab.netlify.app/links",   // el enlace que se copia y va en el código QR
  pie: "© {año} 3deseos.lab · Creamos lo que sueñas",  // {año} se cambia solo por el año actual

};
