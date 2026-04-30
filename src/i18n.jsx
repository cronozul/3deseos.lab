import React, { createContext, useState, useContext, useEffect } from 'react';

const translations = {
  es: {
    nav: {
      home: "Inicio",
      products: "Colecciones",
      about: "Filosofía",
      custom: "Pedidos",
      contact: "Contacto",
      cart: "Carrito"
    },
    footer: {
      location: "3deseos.lab • Bogotá, Colombia"
    },
    home: {
      heroSubtitle: "Diseño de Vanguardia",
      heroTitle: "Otorgando forma física",
      heroHighlight: "a deseos digitales.",
      heroDesc: "No somos una tienda, somos un laboratorio de diseño en Bogotá. Precisión en impresión 3D e hibridación digital en cada objeto.",
      explore: "Explorar Colecciones",
      customOrder: "Pedido Personalizado"
    },
    about: {
      title: "El Concepto del Deseo",
      desc1: "No somos una fábrica. No hacemos producción en masa.",
      desc2: "3deseos.lab nace de la idea filosófica de que un deseo es una entidad digital, abstracta, que vive en el pensamiento. Nuestro objetivo es ser el mecanismo que le otorga presencia física en este plano.",
      desc3: "Utilizamos luz, polímeros avanzados y precisión numérica para materializar ideas. Cada pieza que sale de nuestro laboratorio de impresión 3D es un artefacto, diseñado meticulosamente y construido capa por capa para integrarse en tu vida."
    },
    custom: {
      title: "Diseño Personalizado",
      subtitle: "Trae tu propio diseño 3D o cuéntanos tu idea. Nosotros lo hacemos físico con la más alta calidad en Bogotá.",
      step1Title: "La Idea",
      step1Desc: "Envíanos un boceto, una referencia o un archivo digital (Thingiverse, Printables).",
      step2Title: "Validación",
      step2Desc: "Evaluamos la viabilidad, elegimos el polímero ideal y estructuramos la geometría.",
      step3Title: "Producción",
      step3Desc: "El objeto cobra vida capa por capa mediante manufactura aditiva de precisión.",
      step4Title: "Entrega",
      step4Desc: "Recibes un artefacto único y personalizado, directo en tus manos.",
      ctaTitle: "¿Listo para materializar?",
      ctaButton: "Iniciar Conversación"
    },
    contact: {
      title: "Contacto",
      subtitle: "Inicia una transmisión. Cuéntanos qué deseas materializar.",
      whatsapp: "WhatsApp",
      instagram: "@3deseos.lab",
      location: "Bogotá, Colombia",
      formName: "Identidad (Nombre)",
      formEmail: "Canal (Email)",
      formMessage: "El Deseo (Mensaje)",
      formSubmit: "Transmitir Mensaje"
    },
    products: {
      title: "Colecciones",
      subtitle: "Explora nuestros archivos de impresión 3D. Cada colección es una exploración de materiales, formas y funcionalidad.",
      collections: {
        tornasol: {
          title: "Tornasol",
          desc: "Objetos con acabados iridiscentes que cambian con la luz. Arte decorativo en 3D.",
        },
        geek: {
          title: "Geek",
          desc: "Artefactos pintados a mano para coleccionistas y setups digitales.",
        },
        hogar: {
          title: "Hogar",
          desc: "Organizadores minimalistas y decoración funcional para espacios contemporáneos.",
        }
      },
      detail: {
        dimensions: "Dimensiones:",
        material: "Material:",
        finish: "Color / Acabado:",
        weight: "Peso:",
        qty: "Cantidad:",
        orderBtn: "Agregar al Carrito",
        addedBtn: "Agregado",
        shippingInfo: "Producido bajo demanda en Bogotá. Tiempo estimado: 3-5 días hábiles."
      },
      items: {
        't-carita': { name: "Matera Carita Feliz", price: 30000, priceStr: "$30.000 COP", desc: "Aporta energía y diseño a tus espacios con esta maceta minimalista impresa en 3D, ideal para suculentas y plantas pequeñas.", size: "85 mm", material: "Filamento PLA Biodegradable", color: "Tornasol (Iridiscente)", weight: "124 g", collection: "tornasol" },
        't-amigos': { name: "Matera Amigos", price: 27000, priceStr: "$27.000 COP", desc: "Un diseño doble perfectamente equilibrado, ideal para exhibir especies complementarias en tu escritorio o estudio.", size: "85 mm", material: "Filamento PLA Biodegradable", color: "Tornasol (Iridiscente)", weight: "76 g", collection: "tornasol" },
        't-ballenita': { name: "Matera Ballenita", price: 28000, priceStr: "$28.000 COP", desc: "Escultura decorativa funcional inspirada en la vida marina. Un toque estético único gracias a su acabado que refracta la luz.", size: "85 mm", material: "Filamento PLA Biodegradable", color: "Tornasol (Iridiscente)", weight: "116 g", collection: "tornasol" },
        't-florero': { name: "Florero Prisma", price: 36000, priceStr: "$36.000 COP", desc: "Elegancia paramétrica. Este florero impreso en 3D captura la luz y transforma el ambiente de cualquier habitación.", size: "120 mm", material: "Filamento PLA Biodegradable", color: "Tornasol (Iridiscente)", weight: "144 g", collection: "tornasol" },
        't-trex': { name: "Portalápices T-Rex", price: 27000, priceStr: "$27.000 COP", desc: "Organizador de escritorio disruptivo. Mantén tu espacio de trabajo ordenado con una estética low-poly fascinante.", size: "120 mm", material: "Filamento PLA Biodegradable", color: "Tornasol (Iridiscente)", weight: "76 g", collection: "tornasol" },
        't-sardinas': { name: "Joyero Sardinas", price: 21000, priceStr: "$21.000 COP", desc: "Cápsula organizadora irónica y sofisticada. Protege y exhibe tus joyas con un diseño inspirado en latas de conserva.", size: "26 mm", material: "Filamento PLA", color: "Tornasol y Blanco", weight: "27 g", collection: "tornasol" },
        'h-latas': { name: "Organizador Nevera", price: 47000, priceStr: "$47.000 COP", desc: "Optimización espacial. Dispensador de latas diseñado ergonómicamente para maximizar el almacenamiento de tu refrigerador.", size: "180 mm", material: "Filamento PLA Premium", color: "Blanco", weight: "260 g", collection: "hogar" },
        'h-waffle': { name: "Waffle Bowl", price: 21000, priceStr: "$21.000 COP", desc: "Centro de mesa minimalista. Su estructura de rejilla impresa en 3D aporta un alto contraste visual a cualquier superficie.", size: "10 mm", material: "Filamento PLA Premium", color: "Blanco", weight: "60 g", collection: "hogar" },
        'h-angel': { name: "Escultura Ángel", price: 16000, priceStr: "$16.000 COP", desc: "Figura artística pintada a mano. Un objeto decorativo sutil que proyecta calma y sofisticación espacial.", size: "85 mm", material: "Filamento PLA", color: "Blanco (Pintado a mano)", weight: "20 g", collection: "hogar" },
        'h-llaves': { name: "Colgador Minimal", price: 16000, priceStr: "$16.000 COP", desc: "Soporte arquitectónico para llaves. La fusión perfecta entre utilidad y diseño moderno de líneas limpias.", size: "7.5 mm", material: "Filamento PLA", color: "Negro Matte", weight: "34 g", collection: "hogar" },
        'h-ovejita': { name: "Soporte Ovejita", price: 11000, priceStr: "$11.000 COP", desc: "Un toque de ironía y orden para el baño. Soporte para papel higiénico que transforma lo cotidiano en algo memorable.", size: "19.1 mm", material: "Filamento PLA", color: "Negro Matte", weight: "11 g", collection: "hogar" },
        'g-spiderman': { name: "Llavero Arácnido", price: 22000, priceStr: "$22.000 COP", desc: "Artefacto coleccionable en miniatura. Un tributo pintado a mano a la cultura pop con acabados de alta durabilidad.", size: "4 mm", material: "Filamento PLA", color: "Blanco (Pintado a mano)", weight: "5 g", collection: "geek" },
        'g-gow': { name: "Llavero Espadas GOW", price: 38000, priceStr: "$38.000 COP", desc: "Réplicas milimétricas del mundo del gaming. Piezas de colección acabadas artesanalmente para fanáticos exigentes.", size: "2.6 mm", material: "Filamento PLA", color: "Blanco (Pintado a mano)", weight: "4 g", collection: "geek" },
        'g-jinx': { name: "Bomba Jinx", price: 55000, priceStr: "$55.000 COP", desc: "Caos en la palma de tu mano. Reproducción fiel y detallada pintada a mano para elevar tu setup o llaves.", size: "50 mm", material: "Filamento PLA", color: "Blanco (Pintado a mano)", weight: "7 g", collection: "geek" },
        'g-hollow': { name: "Llavero Caballero", price: 32000, priceStr: "$32.000 COP", desc: "El guardián de Hollownest materializado. Precisión y arte combinados en un accesorio exclusivo.", size: "49 mm", material: "Filamento PLA", color: "Blanco (Pintado a mano)", weight: "5 g", collection: "geek" },
        'g-dados': { name: "Castillo Torre de Dados", price: 24000, priceStr: "$24.000 COP", desc: "Estructura arquitectónica funcional para tabletop gaming. Cada lanzamiento de dados se convierte en una experiencia.", size: "178 mm", material: "Filamento PLA", color: "Azul Geométrico", weight: "116 g", collection: "geek" }
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
        subtitle: "Tu pedido ha sido materializado exitosamente.",
        desc: "Te contactaremos pronto para confirmar los detalles de entrega.",
        orderNumber: "Número de Pedido",
        backHome: "Volver al Inicio"
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      products: "Collections",
      about: "Philosophy",
      custom: "Custom",
      contact: "Contact",
      cart: "Cart"
    },
    footer: {
      location: "3deseos.lab • Bogotá, Colombia"
    },
    home: {
      heroSubtitle: "Vanguard Design",
      heroTitle: "Granting physical form",
      heroHighlight: "to digital desires.",
      heroDesc: "We are not a store; we are a design lab in Bogotá. Precision in 3D printing and digital hybridization in every object.",
      explore: "Explore Collections",
      customOrder: "Custom Order"
    },
    about: {
      title: "The Wish Concept",
      desc1: "We are not a factory. We don't do mass production.",
      desc2: "3deseos.lab was born from the philosophical idea that a wish is a digital, abstract entity living in thought. Our goal is to be the mechanism that grants it physical presence in this realm.",
      desc3: "We use light, advanced polymers, and numerical precision to materialize ideas. Every piece that leaves our 3D printing lab is an artifact, meticulously designed and built layer by layer to integrate into your life."
    },
    custom: {
      title: "Custom Design",
      subtitle: "Bring your own 3D design or tell us your idea. We make it physical with the highest quality in Bogotá.",
      step1Title: "The Idea",
      step1Desc: "Send us a sketch, a reference image, or a digital file (Thingiverse, Printables).",
      step2Title: "Validation",
      step2Desc: "We evaluate feasibility, choose the ideal polymer, and structure the geometry.",
      step3Title: "Production",
      step3Desc: "The object comes to life layer by layer through precision additive manufacturing.",
      step4Title: "Delivery",
      step4Desc: "You receive a unique and personalized artifact, delivered right to your hands.",
      ctaTitle: "Ready to materialize?",
      ctaButton: "Start Transmission"
    },
    contact: {
      title: "Contact",
      subtitle: "Initiate a transmission. Tell us what you want to materialize.",
      whatsapp: "WhatsApp",
      instagram: "@3deseos.lab",
      location: "Bogotá, Colombia",
      formName: "Identity (Name)",
      formEmail: "Channel (Email)",
      formMessage: "The Wish (Message)",
      formSubmit: "Transmit Message"
    },
    products: {
      title: "Collections",
      subtitle: "Explore our 3D printing archives. Each collection is an exploration of materials, shapes, and functionality.",
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
        finish: "Color / Finish:",
        weight: "Weight:",
        qty: "Quantity:",
        orderBtn: "Add to Cart",
        addedBtn: "Added",
        shippingInfo: "Produced on demand in Bogotá. Estimated time: 3-5 business days."
      },
      items: {
        't-carita': { name: "Happy Face Planter", price: 30000, priceStr: "$30,000 COP", desc: "Bring energy and design to your spaces with this minimalist 3D printed planter, ideal for succulents and small plants.", size: "85 mm", material: "Biodegradable PLA Filament", color: "Tornasol (Iridescent)", weight: "124 g", collection: "tornasol" },
        't-amigos': { name: "Friends Planter", price: 27000, priceStr: "$27,000 COP", desc: "A perfectly balanced dual design, ideal for displaying complementary species on your desk or studio.", size: "85 mm", material: "Biodegradable PLA Filament", color: "Tornasol (Iridescent)", weight: "76 g", collection: "tornasol" },
        't-ballenita': { name: "Whale Planter", price: 28000, priceStr: "$28,000 COP", desc: "Functional decorative sculpture inspired by marine life. A unique aesthetic touch thanks to its light-refracting finish.", size: "85 mm", material: "Biodegradable PLA Filament", color: "Tornasol (Iridescent)", weight: "116 g", collection: "tornasol" },
        't-florero': { name: "Prism Vase", price: 36000, priceStr: "$36,000 COP", desc: "Parametric elegance. This 3D printed vase captures light and transforms the ambiance of any room.", size: "120 mm", material: "Biodegradable PLA Filament", color: "Tornasol (Iridescent)", weight: "144 g", collection: "tornasol" },
        't-trex': { name: "T-Rex Pen Holder", price: 27000, priceStr: "$27,000 COP", desc: "Disruptive desk organizer. Keep your workspace tidy with a fascinating low-poly aesthetic.", size: "120 mm", material: "Biodegradable PLA Filament", color: "Tornasol (Iridescent)", weight: "76 g", collection: "tornasol" },
        't-sardinas': { name: "Sardine Jewelry Box", price: 21000, priceStr: "$21,000 COP", desc: "Ironic and sophisticated organizing capsule. Protect and display your jewelry with a design inspired by tin cans.", size: "26 mm", material: "PLA Filament", color: "Tornasol and White", weight: "27 g", collection: "tornasol" },
        'h-latas': { name: "Fridge Can Organizer", price: 47000, priceStr: "$47,000 COP", desc: "Spatial optimization. Ergonomically designed can dispenser to maximize your refrigerator storage.", size: "180 mm", material: "Premium PLA Filament", color: "White", weight: "260 g", collection: "hogar" },
        'h-waffle': { name: "Waffle Bowl", price: 21000, priceStr: "$21,000 COP", desc: "Minimalist centerpiece. Its 3D printed grid structure brings high visual contrast to any surface.", size: "10 mm", material: "Premium PLA Filament", color: "White", weight: "60 g", collection: "hogar" },
        'h-angel': { name: "Angel Sculpture", price: 16000, priceStr: "$16,000 COP", desc: "Hand-painted artistic figure. A subtle decorative object projecting spatial calm and sophistication.", size: "85 mm", material: "PLA Filament", color: "White (Hand-painted)", weight: "20 g", collection: "hogar" },
        'h-llaves': { name: "Minimal Key Hanger", price: 16000, priceStr: "$16,000 COP", desc: "Architectural key holder. The perfect fusion between utility and modern clean-lined design.", size: "7.5 mm", material: "PLA Filament", color: "Matte Black", weight: "34 g", collection: "hogar" },
        'h-ovejita': { name: "Sheep Holder", price: 11000, priceStr: "$11,000 COP", desc: "A touch of irony and order for the bathroom. A toilet paper holder that transforms the everyday into something memorable.", size: "19.1 mm", material: "PLA Filament", color: "Matte Black", weight: "11 g", collection: "hogar" },
        'g-spiderman': { name: "Arachnid Keychain", price: 22000, priceStr: "$22,000 COP", desc: "Miniature collectible artifact. A hand-painted tribute to pop culture with highly durable finishes.", size: "4 mm", material: "PLA Filament", color: "White (Hand-painted)", weight: "5 g", collection: "geek" },
        'g-gow': { name: "GOW Blades Keychain", price: 38000, priceStr: "$38,000 COP", desc: "Millimetric replicas from the gaming world. Artisan-finished collectibles for demanding fans.", size: "2.6 mm", material: "PLA Filament", color: "White (Hand-painted)", weight: "4 g", collection: "geek" },
        'g-jinx': { name: "Jinx Bomb", price: 55000, priceStr: "$55,000 COP", desc: "Chaos in the palm of your hand. Faithful and detailed hand-painted reproduction to elevate your setup or keys.", size: "50 mm", material: "PLA Filament", color: "White (Hand-painted)", weight: "7 g", collection: "geek" },
        'g-hollow': { name: "Knight Keychain", price: 32000, priceStr: "$32,000 COP", desc: "The guardian of Hollownest materialized. Precision and art combined in an exclusive accessory.", size: "49 mm", material: "PLA Filament", color: "White (Hand-painted)", weight: "5 g", collection: "geek" },
        'g-dados': { name: "Dice Tower Castle", price: 24000, priceStr: "$24,000 COP", desc: "Functional architectural structure for tabletop gaming. Every dice roll becomes an experience.", size: "178 mm", material: "PLA Filament", color: "Geometric Blue", weight: "116 g", collection: "geek" }
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
        subtitle: "Your order has been materialized successfully.",
        desc: "We will contact you soon to confirm delivery details.",
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
