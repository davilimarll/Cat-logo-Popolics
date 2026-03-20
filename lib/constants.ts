export const CATEGORIES = ["dothraki", "dracarys", "iron-throne"] as const;

export const CATEGORY_META = {
  dothraki: {
    label: "Dothraki",
    description: "Rifa de energia tribal, tons terrosos e espírito guerreiro.",
    theme: "from-amber-950/70 to-stone-900/80"
  },
  dracarys: {
    label: "Dracarys",
    description: "Rifa intensa, fogo, brasas e coleção lendária.",
    theme: "from-red-950/80 to-black/80"
  },
  "iron-throne": {
    label: "Iron Throne",
    description: "Rifa com imponência de aço, poder e realeza sombria.",
    theme: "from-slate-900/80 to-zinc-950/80"
  }
} as const;

export const FUNKO_STATUSES = ["disponível", "reservado", "escolhido", "indisponível"] as const;

// Altere aqui o código de acesso para a escolha via WhatsApp.
export const ACCESS_CODE = "popolics";

// Altere aqui o número de WhatsApp com DDI + DDD + número.
export const WHATSAPP_NUMBER = "5533987530571";

// Altere aqui o nome da marca exibido no site.
export const BRAND_NAME = "Popolics Club";
