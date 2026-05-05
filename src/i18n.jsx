import React, { createContext, useState, useContext, useEffect } from 'react';

const translations = {
  es: {
    nav: {
      home: "Inicio",
      products: "Colecciones",
      about: "Sobre nosotros",
      custom: "Pedidos",
      community: "Comunidad",
      contact: "Contacto",
      cart: "Carrito"
    },
    footer: {
      location: "3deseos.lab • Bogotá, Colombia",
      explore: "Explorar",
      social: "Redes Sociales",
      tagline: "El laboratorio donde creamos lo que sueñas."
    },
    home: {
      heroSubtitle: "Hecho para ti",
      heroTitle: "Creamos",
      heroHighlight: "lo que sueñas.",
      heroDesc: "Somos un pequeño laboratorio de personas curiosas y apasionadas por la impresión 3D. Transformamos archivos digitales en objetos reales mediante cuidado técnico, precisión en cada capa y acabados únicos.",
      explore: "Explorar Colecciones",
      customOrder: "Pedido Personalizado"
    },
    about: {
      badge: "Nuestro ADN",
      title: "Jessica & Gabriel",
      subtitle: "¿Quiénes hacemos 3deseos.lab?",
      desc1: "Somos una pareja joven, unidos por la curiosidad técnica y la fijación por lo estético. 3deseos.lab es el punto de encuentro entre nuestros conocimientos y nuestra pasión compartida por la creación de objetos únicos y funcionales.",
      desc2: "Gabriel es el encargado de la precisión técnica, la optimización de cada capa y la calidad de cada impresión. Jessica es quien maneja la contabilidad, marketing y comunicación con ustedes.",
      desc3: "Amamos la música, la creatividad disruptiva y la búsqueda constante de objetos que nadie más tiene. No somos genéricos, creamos piezas que proyectan personalidad y propósito.",
      location: "BOGOTÁ, COLOMBIA",
      features: [
        { icon: 'Code', label: 'Ciencias de la Computación' },
        { icon: 'PenTool', label: 'Diseño y Escritura' },
        { icon: 'Music', label: 'Amantes de la música' },
        { icon: 'Heart', label: 'Pareja Creativa' }
      ]
    },
    custom: {
      badge: "Proceso Creativo",
      title: "Diseño Personalizado",
      subtitle: "Trae tu propio diseño 3D o cuéntanos tu idea. Nosotros lo hacemos realidad.",
      step1Title: "La Idea",
      step1Desc: "Envíanos un boceto, imagen o referencia de lo que quieres crear. También puedes compartirnos un archivo 3D (MakerWorld, Cults3D, Thingiverse, Printables, etc).",
      step2Title: "Validación",
      step2Desc: "Analizamos tu solicitud, de ser necesario creamos un prototipo y pruebas de impresión. Te orientamos con el material, acabado y dimensionamos tu pieza con precisión.",
      step3Title: "Producción",
      step3Desc: "El objeto cobra vida capa por capa en nuestra impresora 3D de alta precisión.",
      step4Title: "Entrega",
      step4Desc: "Hacemos envíos por medio de Uber en Bogotá, y a nivel nacional mediante transportadora. Recibes tu pedido directo en tus manos.",
      ctaTitle: "¿Listo para ver tu deseo materializado?",
      ctaButton: "Iniciar Conversación"
    },
    contact: {
      badge: "Contacto Directo",
      title: "Contacto",
      subtitle: "Inicia una conversación. Cuéntanos qué sueño quieres materializar.",
      whatsapp: "WhatsApp",
      instagram: "@3deseos.lab",
      location: "Bogotá, Colombia",
      formName: "Nombre",
      formEmail: "Correo",
      formMessage: "Tu idea o diseño",
      formSubmit: "Enviar Mensaje",
      formSuccess: "Mensaje recibido exitosamente. Te contactaremos pronto.",
      formError: "Error al enviar el mensaje. Inténtalo de nuevo.",
    },
    community: {
      badge: "Comunidad Global",
      title: "Nuestra Comunidad",
      subtitle: "Historias materializadas por y para nuestros clientes. Cada pieza cuenta un deseo cumplido.",
      testimonials: [
        { author: "Andrés F.", handle: "@andresf_3d", text: "La calidad del acabado es increíble. No parece una impresión 3D convencional, es una pieza de arte." },
        { author: "Mariana L.", handle: "@marianalópez", text: "Pedí un regalo personalizado y superó mis expectativas. La atención al detalle es única." },
        { author: "Carlos P.", handle: "@carlosp_art", text: "El efecto tornasol es mágico. Dependiendo de la luz, la pieza cambia de personalidad." }
      ]
    },
    instagram: {
      handle: "@3deseos.lab",
      cards: [
        { label: "Tornasol Vibes" },
        { label: "Desk Setup" },
        { label: "Garden Gift" }
      ]
    },
    products: {
      badge: "Artesanía Digital",
      title: "Colecciones",
      subtitle: "Explora nuestros archivos de impresión 3D. Cada colección es una exploración de materiales, formas y funcionalidad.",
      all: "Todos",
      exploreMore: "Explorar más",
      showless: "Ver menos",
      collectionLabel: "Colección",
      customCTA: {
        title: "¿Tienes un diseño en mente?",
        desc: "Realizamos impresiones personalizadas con la misma calidad y acabado de nuestras colecciones exclusivas.",
        button: "Pedido Personalizado"
      },
      collections: {
        tornasol: {
          title: "Tornasol",
          desc: "Objetos con acabados iridiscentes que cambian con la luz. Arte decorativo que puedes tener en cualquier modelo impreso en 3D.",
        },
        geek: {
          title: "Geek",
          desc: "Figuras personalizadas inspiradas en tus personajes favoritos.",
        },
        hogar: {
          title: "Hogar",
          desc: "Organizadores minimalistas y decoración funcional para espacios contemporáneos.",
        }
      },
      detail: {
        dimensions: "Dimensiones:",
        material: "Material:",
        finish: "Color",
        weight: "Peso:",
        qty: "Cantidad:",
        orderBtn: "Agregar",
        addedBtn: "Agregado",
        shippingInfo: "Tiempo estimado: 5-7 días hábiles. Puede extenderse según referencias o complejidad del modelo.",
        options: {
          color: "Selecciona un color:",
          paint: "¿Te gustaría que pintemos tu pieza?",
          yes: "Sí, por favor",
          no: "No, gracias",
          colors: {
            white: "Blanco",
            black: "Negro",
            red: "Rojo",
            blue: "Azul",
            gold: "Dorado",
            gray: "Gris Metálico",
            tornasol: "Tornasol"
          }
        }
      },
      items: {
        't-carita': { name: "Matera Carita Feliz", image: "happy pot.png", price: 30000, priceStr: "$30.000 COP", desc: "Aporta energía y diseño a tus espacios con esta maceta, ideal para suculentas y plantas pequeñas.", size: "85 mm", material: "Filamento PLA Biodegradable", color: "Tornasol (Iridiscente)", weight: "124 g", collection: "tornasol" },
        't-amigos': { name: "Matera Amigos", image: "buddies.png", price: 27000, priceStr: "$27.000 COP", desc: "Un diseño doble y equilibrado, ideal para exhibir plantas complementarias en tu escritorio o estudio.", size: "85 mm", material: "Filamento PLA Biodegradable", color: "Tornasol (Iridiscente)", weight: "76 g", collection: "tornasol" },
        't-ballenita': { name: "Matera Ballenita", image: "little whale.png", price: 28000, priceStr: "$28.000 COP", desc: "Maceta inspirada en la vida marina. Un toque estético único.", size: "85 mm", material: "Filamento PLA Biodegradable", color: "Tornasol (Iridiscente)", weight: "116 g", collection: "tornasol" },
        't-florero': { name: "Florero Prisma", image: "vase.png", price: 36000, priceStr: "$36.000 COP", desc: "Elegancia paramétrica. Este florero transforma el ambiente de cualquier habitación.", size: "120 mm", material: "Filamento PLA Biodegradable", color: "Tornasol (Iridiscente)", weight: "144 g", collection: "tornasol" },
        't-trex': { name: "Portalápices T-Rex", image: "dinosaur.png", price: 27000, priceStr: "$27.000 COP", desc: "Portalápices para tus esenciales. Mantén tu espacio de trabajo ordenado con una estética tierna.", size: "120 mm", material: "Filamento PLA Biodegradable", color: "Tornasol (Iridiscente)", weight: "76 g", collection: "tornasol" },
        't-sardinas': { name: "Joyero Sardinas", image: "sardines.png", price: 21000, priceStr: "$21.000 COP", desc: "Protege y exhibe tus joyas con un diseño inspirado en latas de conserva.", size: "26 mm", material: "Filamento PLA", color: "Tornasol y Blanco", weight: "27 g", collection: "tornasol" },
        'h-latas': { name: "Organizador de latas", price: 47000, priceStr: "$47.000 COP", desc: "Dispensador de latas diseñado para maximizar el almacenamiento de tu refrigerador.", size: "180 mm", material: "Filamento PLA Premium", color: "Blanco", weight: "260 g", collection: "hogar" },
        'h-waffle': { name: "Waffle Bowl", price: 21000, priceStr: "$21.000 COP", desc: "Centro de mesa o frutero minimalista. Su estructura de rejilla aporta un alto contraste visual a cualquier superficie.", size: "10 mm", material: "Filamento PLA Premium", color: "Blanco", weight: "60 g", collection: "hogar" },
        'h-angel': { name: "Escultura Ángel", price: 16000, priceStr: "$16.000 COP", desc: "Figura decorativa que aporta protección y calma. Perfecta para cualquier rincón de tu hogar.", size: "85 mm", material: "Filamento PLA", color: "Blanco (Pintado a mano)", weight: "20 g", collection: "hogar" },
        'h-llaves': { name: "Colgador de llaves", price: 16000, priceStr: "$16.000 COP", desc: "Soporte resistente para llaves. La fusión perfecta entre utilidad y diseño moderno.", size: "7.5 mm", material: "Filamento PLA", color: "Negro Matte", weight: "34 g", collection: "hogar" },
        'h-ovejita': { name: "Soporte Ovejita Shaun", price: 11000, priceStr: "$11.000 COP", desc: "Un toque de humor y orden para el baño. Soporte para papel higiénico que transforma lo cotidiano en algo memorable.", size: "19.1 mm", material: "Filamento PLA", color: "Negro Matte", weight: "11 g", collection: "hogar" },
        'g-spiderman': { name: "Llavero Spiderman", price: 22000, priceStr: "$22.000 COP", desc: "Llavero inspirado en Spiderman. Un tributo pintado a mano.", size: "4 mm", material: "Filamento PLA", color: "Blanco (Pintado a mano)", weight: "5 g", collection: "geek" },
        'g-gow': { name: "Llavero Espadas GOW", price: 38000, priceStr: "$38.000 COP", desc: "Réplicas milimétricas del mundo de Kratos.", size: "2.6 mm", material: "Filamento PLA", color: "Blanco (Pintado a mano)", weight: "4 g", collection: "geek" },
        'g-jinx': { name: "Bomba Jinx", price: 55000, priceStr: "$55.000 COP", desc: "Caos en la palma de tu mano. Reproducción fiel y detallada pintada a mano para elevar tu setup o llaves.", size: "50 mm", material: "Filamento PLA", color: "Blanco (Pintado a mano)", weight: "7 g", collection: "geek" },
        'g-hollow': { name: "Llavero Hollow Knight", price: 32000, priceStr: "$32.000 COP", desc: "El guardián de Hollownest materializado.", size: "49 mm", material: "Filamento PLA", color: "Blanco (Pintado a mano)", weight: "5 g", collection: "geek" },
        'g-dados': { name: "Castillo Torre de Dados", price: 24000, priceStr: "$24.000 COP", desc: "Estructura funcional para tabletop gaming. Cada lanzamiento de dados se convierte en una experiencia.", size: "178 mm", material: "Filamento PLA", color: "Azul Geométrico", weight: "116 g", collection: "geek" }
      }
    },
    cart: {
      title: "Tu Carrito",
      empty: "Tu carrito está vacío",
      total: "Total",
      checkout: "Proceder al Pago",
      summary: "Resumen de Pedido",
      subtotal: "Subtotal",
      remove: "Eliminar",
      keepShopping: "Seguir Comprando"
    },
    checkout: {
      title: "Checkout",
      step1: "Información",
      step2: "Resumen",
      step3: "Pago",
      form: {
        name: "Nombre Completo",
        email: "Correo Electrónico",
        phone: "Teléfono",
        city: "Ciudad",
        address: "Dirección",
        notes: "Notas adicionales (opcional)",
        next: "Siguiente Paso",
        back: "Regresar"
      },
      payment: {
        title: "Método de Pago",
        pse: "PSE (Débito)",
        pseDesc: "Paga desde tu cuenta bancaria colombiana.",
        wompi: "Wompi",
        wompiDesc: "Pasarela de pagos segura.",
        mp: "Mercado Pago",
        mpDesc: "Usa tu cuenta o tarjetas locales.",
        card: "Tarjeta de Crédito/Débito",
        cardPlaceholder: "Número de tarjeta",
        pay: "Pagar"
      },
      confirmation: {
        title: "¡Deseo Recibido!",
        subtitle: "Tu pedido ha sido confirmado exitosamente.",
        desc: "Te contactaremos pronto para confirmar cualquier detalle.",
        orderNumber: "Número de Pedido",
        backHome: "Volver al Inicio"
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      products: "Collections",
      about: "About us",
      custom: "Custom",
      community: "Community",
      contact: "Contact",
      cart: "Cart"
    },
    footer: {
      location: "3deseos.lab • Bogotá, Colombia",
      explore: "Explore",
      social: "Social",
      tagline: "The lab where we bring your dreams to life."
    },
    home: {
      heroSubtitle: "Made for you",
      heroTitle: "We create",
      heroHighlight: "what you dream of.",
      heroDesc: "We are a small studio made up of curious people who are passionate about 3D printing. We transform digital files into real objects through technical expertise, precision in every layer, and unique finishes.",
      explore: "Explore Collections",
      customOrder: "Custom Order"
    },
    about: {
      badge: "Our DNA",
      title: "Jessica & Gabriel",
      subtitle: "Who are the people behind 3deseos.lab?",
      desc1: "We are a young couple, united by a shared interest in technology and a passion for aesthetics. 3deseos.lab is where our expertise and our shared passion for creating unique and functional objects come together.",
      desc2: "Gabriel is responsible for technical precision, optimizing each layer, and ensuring the quality of every print. Jessica handles accounting, marketing, and communication with you.",
      desc3: "We love music, disruptive creativity, and the constant search for unique items. We don't do run-of-the-mill; we create pieces that exude personality and purpose.",
      location: "BOGOTÁ, COLOMBIA",
      features: [
        { icon: 'Code', label: 'Computer Science' },
        { icon: 'PenTool', label: 'Design & Writing' },
        { icon: 'Music', label: 'Music Lovers' },
        { icon: 'Heart', label: 'Creative Couple' }
      ]
    },
    custom: {
      badge: "Creative Process",
      title: "Custom Design",
      subtitle: "Bring your own 3D design or tell us your idea. We make it physical with the highest quality in Bogotá.",
      step1Title: "The Idea",
      step1Desc: "Send us a sketch, a reference image, or a digital file (Thingiverse, Printables).",
      step2Title: "Validation",
      step2Desc: "We analyze your request, create a prototype and test prints if necessary. We advise you on the material and finish, and precisely dimension your part.",
      step3Title: "Production",
      step3Desc: "The object comes to life layer by layer in our high-precision 3D printer.",
      step4Title: "Delivery",
      step4Desc: "We ship via Uber in Bogotá and through a shipping carrier nationwide. Your order will be delivered directly to you.",
      ctaTitle: "Ready to make it real?",
      ctaButton: "Send Request"
    },
    contact: {
      badge: "Direct Contact",
      title: "Contact",
      subtitle: "Start a conversation. Tell us what dream you want to make come true.",
      whatsapp: "WhatsApp",
      instagram: "@3deseos.lab",
      location: "Bogotá, Colombia",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSubmit: "Send Message",
      formSuccess: "Message sent successfully. We will contact you soon.",
      formError: "Error sending message. Please try again.",
    },
    community: {
      badge: "Global Community",
      title: "Our Community",
      subtitle: "Stories brought to life by and for our customers. Each piece represents a wish come true.",
      testimonials: [
        { author: "Andres F.", handle: "@andresf_3d", text: "The finish quality is incredible. It doesn't look like conventional 3D printing; it's a piece of art." },
        { author: "Mariana L.", handle: "@marianalópez", text: "I ordered a personalized gift and it exceeded my expectations. The attention to detail is unique." },
        { author: "Carlos P.", handle: "@carlosp_art", text: "The tornasol effect is magical. Depending on the light, the piece changes its personality." }
      ]
    },
    instagram: {
      handle: "@3deseos.lab",
      cards: [
        { label: "Tornasol Vibes" },
        { label: "Desk Setup" },
        { label: "Garden Gift" }
      ]
    },
    products: {
      badge: "Digital Craftsmanship",
      title: "Collections",
      subtitle: "Explore our 3D printed collections. Each collection is an exploration of materials, shapes, and functionality.",
      all: "All",
      exploreMore: "Explore more",
      showless: "Show less",
      collectionLabel: "Collection",
      customCTA: {
        title: "Have a design in mind?",
        desc: "We make custom prints with the same quality and finish as our exclusive collections.",
        button: "Custom Order"
      },
      collections: {
        tornasol: {
          title: "Tornasol",
          desc: "Objects with iridescent finishes that change with the light. 3D decorative art.",
        },
        geek: {
          title: "Geek",
          desc: "Hand-painted artifacts for collectors and digital setups.",
        },
        hogar: {
          title: "Home",
          desc: "Minimalist organizers and functional decor for contemporary spaces.",
        }
      },
      detail: {
        dimensions: "Dimensions:",
        material: "Material:",
        finish: "Color",
        weight: "Weight:",
        qty: "Quantity:",
        orderBtn: "Add",
        addedBtn: "Added",
        shippingInfo: "Estimated time: 5-7 business days. May vary based on references or model complexity.",
        options: {
          color: "Select a color:",
          paint: "Would you like us to paint your piece?",
          yes: "Yes, please",
          no: "No, thanks",
          colors: {
            white: "White",
            black: "Black",
            red: "Red",
            blue: "Blue",
            gold: "Gold",
            gray: "Metallic Gray",
            tornasol: "Tornasol"
          }
        }
      },
      items: {
        't-carita': { name: "Happy Face Planter", image: "happy pot.png", price: 30000, priceStr: "$30,000 COP", desc: "Bring energy and style to your spaces with this planter, perfect for succulents and small plants.", size: "85 mm", material: "Biodegradable PLA Filament", color: "Tornasol (Iridescent)", weight: "124 g", collection: "tornasol" },
        't-amigos': { name: "Friends Planter", image: "buddies.png", price: 27000, priceStr: "$27,000 COP", desc: "A balanced, two-tiered design, perfect for displaying complementary plants on your desk or in your study.", size: "85 mm", material: "Biodegradable PLA Filament", color: "Tornasol (Iridescent)", weight: "76 g", collection: "tornasol" },
        't-ballenita': { name: "Whale Planter", image: "little whale.png", price: 28000, priceStr: "$28,000 COP", desc: "A plant pot inspired by marine life. A unique aesthetic touch.", size: "85 mm", material: "Biodegradable PLA Filament", color: "Tornasol (Iridescent)", weight: "116 g", collection: "tornasol" },
        't-florero': { name: "Prism Vase", image: "vase.png", price: 36000, priceStr: "$36,000 COP", desc: "Parametric elegance. This vase transforms the atmosphere of any room.", size: "120 mm", material: "Biodegradable PLA Filament", color: "Tornasol (Iridescent)", weight: "144 g", collection: "tornasol" },
        't-trex': { name: "T-Rex Pen Holder", image: "dinosaur.png", price: 27000, priceStr: "$27,000 COP", desc: "A pencil holder for your essentials. Keep your workspace tidy with a cute design.", size: "120 mm", material: "Biodegradable PLA Filament", color: "Tornasol (Iridescent)", weight: "76 g", collection: "tornasol" },
        't-sardinas': { name: "Sardine Jewelry Box", image: "sardines.png", price: 21000, priceStr: "$21,000 COP", desc: "Protect and display your jewelry with a design inspired by tin cans.", size: "26 mm", material: "PLA Filament", color: "Tornasol and White", weight: "27 g", collection: "tornasol" },
        'h-latas': { name: "Fridge Can Organizer", price: 47000, priceStr: "$47,000 COP", desc: "Can dispenser designed to maximize storage space in your refrigerator.", size: "180 mm", material: "Premium PLA Filament", color: "White", weight: "260 g", collection: "hogar" },
        'h-waffle': { name: "Waffle Bowl", price: 21000, priceStr: "$21,000 COP", desc: "A minimalist centerpiece or fruit bowl. Its lattice design adds striking visual contrast to any surface.", size: "10 mm", material: "Premium PLA Filament", color: "White", weight: "60 g", collection: "hogar" },
        'h-angel': { name: "Angel Sculpture", price: 16000, priceStr: "$16,000 COP", desc: "A decorative figurine that brings protection and calm. Perfect for any corner of your home.", size: "85 mm", material: "PLA Filament", color: "White (Hand-painted)", weight: "20 g", collection: "hogar" },
        'h-llaves': { name: "Minimal Key Holder", price: 16000, priceStr: "$16,000 COP", desc: "Sturdy key holder. The perfect blend of functionality and modern design.", size: "7.5 mm", material: "PLA Filament", color: "Matte Black", weight: "34 g", collection: "hogar" },
        'h-ovejita': { name: "Shaun the Sheep Holder", price: 11000, priceStr: "$11,000 COP", desc: "A touch of humor and organization for the bathroom. A toilet paper holder that turns the everyday into something memorable.", size: "19.1 mm", material: "PLA Filament", color: "Matte Black", weight: "11 g", collection: "hogar" },
        'g-spiderman': { name: "Spiderman Keychain", price: 22000, priceStr: "$22,000 COP", desc: "Spider-Man-inspired keychain. A hand-painted tribute.", size: "4 mm", material: "PLA Filament", color: "White (Hand-painted)", weight: "5 g", collection: "geek" },
        'g-gow': { name: "GOW Blades Keychain", price: 38000, priceStr: "$38,000 COP", desc: "Life-size replicas of Kratos' world.", size: "2.6 mm", material: "PLA Filament", color: "White (Hand-painted)", weight: "4 g", collection: "geek" },
        'g-jinx': { name: "Jinx Bomb Keychain", price: 55000, priceStr: "$55,000 COP", desc: "Chaos in the palm of your hand. A faithful, detailed hand-painted reproduction to elevate your setup or keys.", size: "50 mm", material: "PLA Filament", color: "White (Hand-painted)", weight: "7 g", collection: "geek" },
        'g-hollow': { name: "Hollow Knight Keychain", price: 32000, priceStr: "$32,000 COP", desc: "The guardian of Hollownest materialized.", size: "49 mm", material: "PLA Filament", color: "White (Hand-painted)", weight: "5 g", collection: "geek" },
        'g-dados': { name: "Dice Tower Castle", price: 24000, priceStr: "$24,000 COP", desc: "A functional framework for tabletop gaming. Every roll of the dice becomes an experience.", size: "178 mm", material: "PLA Filament", color: "Geometric Blue", weight: "116 g", collection: "geek" }
      }
    },
    cart: {
      title: "Your Cart",
      empty: "Your cart is empty",
      total: "Total",
      checkout: "Checkout",
      summary: "Order Summary",
      subtotal: "Subtotal",
      remove: "Remove",
      keepShopping: "Keep Shopping"
    },
    checkout: {
      title: "Checkout",
      step1: "Information",
      step2: "Summary",
      step3: "Payment",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        city: "City",
        address: "Address",
        notes: "Additional notes (optional)",
        next: "Next Step",
        back: "Go Back"
      },
      payment: {
        title: "Payment Method",
        pse: "PSE (Debit)",
        pseDesc: "Pay from your Colombian bank account.",
        wompi: "Wompi",
        wompiDesc: "Secure payment gateway.",
        mp: "Mercado Pago",
        mpDesc: "Use your account or local cards.",
        card: "Credit/Debit Card",
        cardPlaceholder: "Card number",
        pay: "Pay Now"
      },
      confirmation: {
        title: "Wish Received!",
        subtitle: "Your order has been confirmed successfully.",
        desc: "We'll contact you shortly to confirm the details.",
        orderNumber: "Order Number",
        backHome: "Back to Home"
      }
    }
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('3deseos_lang') || 'es';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('3deseos_lang', newLang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (let k of keys) {
      if (value === undefined || value[k] === undefined) return key;
      value = value[k];
    }
    return value;
  };

  const getRaw = (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (let k of keys) {
      if (value === undefined || value[k] === undefined) return null;
      value = value[k];
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, getRaw }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
