export type ServiceCategoryType =
  | "Segurança Eletrônica"
  | "Instalações Elétricas"
  | "Manutenção Elétrica"
  | "Informática e Computadores";

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategoryType;
  shortDescription: string;
  detailedDescription: string;
  benefits: string[];
  audiences: string[];
  image: string;
  iconName: string;
  highlightBadge?: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: ServiceCategoryType;
  environment: string;
  description: string;
  image: string;
  specs: string[];
  isIllustrativeExample: boolean;
}

/**
 * CONFIGURAÇÃO CENTRALIZADA DA EMPRESA E DO WHATSAPP
 * Altere o número de WhatsApp ou dados de contato em um único local abaixo.
 */
export const SITE_CONFIG = {
  name: "Alltech Soluções",
  legalName:
    "Alltech Soluções em Segurança Eletrônica, Elétrica e Informática",
  slogan: "Sua segurança e tranquilidade em boas mãos",
  description:
    "Empresa especializada em segurança eletrônica, instalação de câmeras de segurança (CFTV), fechaduras eletrônicas, instalações e manutenção elétrica, além de montagem, formatação e manutenção de computadores e notebooks.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://alltechsolucoes.com.br"),
  // Número extraído diretamente da referência visual da Alltech Soluções: (21) 99822-1178
  whatsapp: {
    number: "5521998221178",
    display: "(21) 99822-1178",
    defaultMessage:
      "Olá! Conheci sua empresa pelo site e gostaria de solicitar um orçamento para um serviço.",
  },
  contact: {
    phoneDisplay: "(21) 99822-1178",
    phoneHref: "tel:+5521998221178",
    email: "contato@alltechsolucoes.com.br",
    region: "Rio de Janeiro e Região Metropolitana (DDD 21)",
    hours: "Segunda a Sábado — Atendimento agendado e suporte técnico",
  },
  seoKeywords: [
    "Instalação de câmeras de segurança",
    "Instalação de CFTV",
    "Segurança eletrônica",
    "Fechadura eletrônica",
    "Instalação elétrica",
    "Manutenção elétrica",
    "Montagem e manutenção de computador e notebook",
    "Formatação de computador e notebook",
    "Upgrade de SSD e memória RAM",
    "Câmeras para condomínios",
    "Câmeras para empresas e residências",
    "Alltech Soluções",
  ],
};

/**
 * Gera o link oficial do WhatsApp com a mensagem padrão exigida ou mensagem personalizada.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const text = customMessage || SITE_CONFIG.whatsapp.defaultMessage;
  return `https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

/**
 * PÚBLICOS ATENDIDOS PELA ALLTECH SOLUÇÕES
 */
export const TARGET_AUDIENCES = [
  {
    id: "residencias",
    title: "Residências e Home Office",
    description:
      "Proteção perimetral com câmeras CFTV, fechaduras eletrônicas, instalações elétricas seguras e manutenção/formatação de computadores e notebooks.",
    icon: "Home",
  },
  {
    id: "empresas",
    title: "Empresas e Comércios",
    description:
      "Sistemas de CFTV estratégicos, infraestrutura elétrica dimensionada e suporte em computadores e notebooks para manter sua empresa operando sem paradas.",
    icon: "Building2",
  },
  {
    id: "estoques",
    title: "Estoques e Galpões Empresariais",
    description:
      "Controle visual rigoroso de mercadorias, docas de carga/descarga e circulação interna para prevenção de perdas e auditoria operacional.",
    icon: "Warehouse",
  },
  {
    id: "condominios",
    title: "Condomínios Residenciais e Comerciais",
    description:
      "Monitoramento de portarias, garagens, halls e áreas comuns com gravação contínua e manutenção elétrica preventiva das áreas coletivas.",
    icon: "Building",
  },
  {
    id: "idosos",
    title: "Acompanhamento e Proteção de Idosos",
    description:
      "Soluções humanizadas de câmeras internas e externas com visualização imediata no smartphone para que familiares acompanhem o bem-estar de idosos com tranquilidade.",
    icon: "HeartHandshake",
  },
  {
    id: "informatica-eletrica",
    title: "Usuários de PCs, Notebooks e Projetos Elétricos",
    description:
      "Clientes que precisam de montagem de computadores, formatação rápida, upgrade de SSD/RAM, organização de quadros elétricos e coleta de descarte eletrônico.",
    icon: "Laptop",
  },
];

/**
 * OFERTAS EM DESTAQUE INSPIRADAS NAS 4 REFERÊNCIAS VISUAIS DA ALLTECH SOLUÇÕES
 */
export const FEATURED_PACKAGES = [
  {
    id: "aluguel-cameras",
    badge: "Destaque Alltech",
    title: "Aluguel de Câmeras de Segurança",
    pricePrefix: "A partir de",
    price: "R$ 199,99",
    priceSuffix: "/mês",
    subtitle: "Pacotes personalizados para residências, comércios e condomínios",
    features: [
      "Equipamentos modernos em comodato/locação",
      "Configuração completa de acesso remoto pelo celular",
      "Manutenção e suporte técnico inclusos no pacote",
      "Dimensionamento sob medida para seu espaço",
    ],
    referenceImage: "/images/referencias/aluguel-cameras.jpeg",
    whatsappText:
      "Olá! Conheci sua empresa pelo site e gostaria de solicitar um orçamento para um serviço. Tenho interesse no Aluguel de Câmeras de Segurança (a partir de R$ 199,99).",
  },
  {
    id: "kit-4-cameras",
    badge: "Solução Completa",
    title: "Kit com 4 Câmeras & Fechadura Digital",
    pricePrefix: "Projeto sob medida",
    price: "Kit 4 Câmeras",
    priceSuffix: "Full HD / IP",
    subtitle: "Sua segurança em boas mãos para proteger o que realmente importa",
    features: [
      "4 câmeras de alta definição com visão noturna infravermelho",
      "Gravação contínua com acesso em tempo real no smartphone",
      "Opção de integração com Fechadura Eletrônica Digital",
      "Ideal para residências, lojas, estoques e cuidado de idosos",
    ],
    referenceImage: "/images/referencias/kit-4-cameras.jpeg",
    whatsappText:
      "Olá! Conheci sua empresa pelo site e gostaria de solicitar um orçamento para um serviço. Gostaria de saber mais sobre o Kit com 4 Câmeras de Segurança.",
  },
  {
    id: "eletrica-segura",
    badge: "Engenharia & Precisão",
    title: "Revisão e Instalações Elétricas",
    pricePrefix: "Atendimento Técnico",
    price: "Elétrica Segura",
    priceSuffix: "Residencial & Comercial",
    subtitle: "Instalações, manutenção e soluções elétricas com segurança e qualidade",
    features: [
      "Montagem e organização técnica de quadros elétricos",
      "Diagnóstico preciso de fugas de corrente e sobrecargas",
      "Instalação de tomadas, disjuntores e iluminação",
      "Manutenção preventiva e corretiva com instrumentos de precisão",
    ],
    referenceImage: "/images/referencias/eletrica-qualidade.jpeg",
    whatsappText:
      "Olá! Conheci sua empresa pelo site e gostaria de solicitar um orçamento para um serviço de Instalação ou Manutenção Elétrica.",
  },
  {
    id: "informatica-pc-notebook",
    badge: "Performance & TI",
    title: "Montagem, Formatação e Manutenção de PC e Notebook",
    pricePrefix: "Assistência Especializada",
    price: "PC & Notebook",
    priceSuffix: "Rápido e Confiável",
    subtitle: "Deixe seu computador ou notebook rápido, limpo e pronto para o trabalho",
    features: [
      "Formatação completa com backup seguro dos seus arquivos",
      "Montagem de computadores sob medida (Casa, Escritório ou Gamer)",
      "Upgrade de SSD NVMe e memória RAM para máxima velocidade",
      "Limpeza interna, troca de pasta térmica e coleta de descarte eletrônico",
    ],
    referenceImage: "/images/referencias/flyer-completo-alltech.jpeg",
    whatsappText:
      "Olá! Conheci sua empresa pelo site e gostaria de solicitar um orçamento para manutenção, formatação ou montagem de computador/notebook.",
  },
];

/**
 * CATÁLOGO COMPLETO DOS SERVIÇOS NAS 4 CATEGORIAS DA ALLTECH SOLUÇÕES
 */
export const ALL_SERVICES: ServiceItem[] = [
  // ==========================================================================
  // CATEGORIA 1: SEGURANÇA ELETRÔNICA (9 serviços)
  // ==========================================================================
  {
    id: "seg-1",
    slug: "instalacao-de-cameras-de-seguranca",
    title: "Instalação de Câmeras de Segurança",
    category: "Segurança Eletrônica",
    shortDescription:
      "Posicionamento estratégico e instalação técnica de câmeras Bullet, Dome e IP de alta definição com visão noturna.",
    detailedDescription:
      "Realizamos o estudo completo dos pontos vulneráveis do imóvel para instalar câmeras de segurança com ângulos otimizados, sem pontos cegos e com infraestrutura protegida contra intempéries e vandalismo.",
    benefits: [
      "Imagens nítidas dia e noite com infravermelho inteligente",
      "Acabamento limpo com eletrodutos e caixas de passagem vedadas",
      "Inibição imediata de invasões e furtos no perímetro",
      "Opções de compra ou aluguel de câmeras em pacotes personalizados",
    ],
    audiences: ["Residências", "Comércios", "Condomínios", "Empresas"],
    image: "/images/hero-cameras.jpg",
    iconName: "Camera",
    highlightBadge: "Mais Procurado",
  },
  {
    id: "seg-2",
    slug: "instalacao-de-sistemas-de-cftv",
    title: "Instalação de Sistemas de CFTV",
    category: "Segurança Eletrônica",
    shortDescription:
      "Projetos completos de Circuito Fechado de TV com gravadores digitais (DVR/NVR), armazenamento seguro e monitoramento centralizado.",
    detailedDescription:
      "Implementamos sistemas completos de CFTV analógico HD e IP digital, incluindo configuração de gravadores DVR/NVR, discos rígidos próprios para vigilância contínua 24/7, fontes estabilizadas e nobreaks dedicados.",
    benefits: [
      "Gravação contínua ou por detecção inteligente de movimento",
      "Histórico seguro de imagens para consultas e ocorrências",
      "Infraestrutura escalável para expansão futura de câmeras",
      "Disponível também na modalidade Kit com 4 Câmeras",
    ],
    audiences: ["Empresas", "Condomínios", "Residências", "Galpões"],
    image: "/images/service-cftv.jpg",
    iconName: "MonitorPlay",
  },
  {
    id: "seg-9",
    slug: "instalacao-de-fechadura-eletronica",
    title: "Instalação de Fechadura Eletrônica Digital",
    category: "Segurança Eletrônica",
    shortDescription:
      "Instalação e configuração de fechaduras eletrônicas com abertura por biometria, senha, tag de proximidade ou aplicativo.",
    detailedDescription:
      "Modernize o controle de acesso da sua residência, escritório ou consultório com fechaduras eletrônicas digitais. Realizamos a furação técnica precisa na porta, alinhamento do batente e configuração de senhas e digitais.",
    benefits: [
      "Fim das preocupações com perda ou cópia de chaves",
      "Travamento automático ao fechar a porta para máxima segurança",
      "Cadastro rápido de digitais e senhas para familiares ou equipe",
      "Acabamento estético sofisticado em portas de madeira ou vidro",
    ],
    audiences: ["Residências", "Apartamentos", "Escritórios", "Clínicas"],
    image: "/images/hero-cameras.jpg",
    iconName: "Lock",
    highlightBadge: "Controle de Acesso",
  },
  {
    id: "seg-3",
    slug: "monitoramento-de-estoques-e-ambientes-empresariais",
    title: "Monitoramento de Estoques e Ambientes Empresariais",
    category: "Segurança Eletrônica",
    shortDescription:
      "Controle visual de almoxarifados, galpões logísticos, linhas de expedição, caixas e áreas restritas de empresas.",
    detailedDescription:
      "Desenvolvemos soluções de vigilância voltadas à proteção patrimonial e controle operacional de estoques, depósitos e áreas corporativas. Permite acompanhar entrada e saída de mercadorias, conferência de cargas e segurança dos colaboradores.",
    benefits: [
      "Redução drástica de perdas, extravios e avarias no estoque",
      "Câmeras de longo alcance para galpões de pé-direito elevado",
      "Registro visual de carga, descarga e movimentação de insumos",
      "Visualização simultânea de múltiplas filiais ou setores",
    ],
    audiences: ["Estoques", "Galpões", "Lojas", "Centros de Distribuição"],
    image: "/images/hero-cameras.jpg",
    iconName: "Warehouse",
  },
  {
    id: "seg-4",
    slug: "cameras-para-residencias",
    title: "Câmeras para Residências",
    category: "Segurança Eletrônica",
    shortDescription:
      "Proteção residencial completa para portões, garagens, quintais e acessos, trazendo paz de espírito para sua família.",
    detailedDescription:
      "Projetamos sistemas discretos e eficientes para casas e apartamentos. Você verifica quem está no portão, acompanha a chegada dos filhos ou entregas e monitora toda a área externa diretamente da palma da mão.",
    benefits: [
      "Verificação segura do portão e calçada antes de entrar ou sair",
      "Câmeras discretas que preservam a estética da residência",
      "Alertas de movimentação em horários programados",
      "Acesso compartilhado entre os moradores da casa",
    ],
    audiences: ["Casas", "Apartamentos", "Vilas Residenciais"],
    image: "/images/service-cftv.jpg",
    iconName: "Home",
  },
  {
    id: "seg-5",
    slug: "sistemas-de-seguranca-para-acompanhamento-de-idosos",
    title: "Sistemas de Segurança para Acompanhamento de Idosos",
    category: "Segurança Eletrônica",
    shortDescription:
      "Monitoramento preventivo e acolhedor para famílias que desejam acompanhar e proteger idosos em casa à distância.",
    detailedDescription:
      "Instalamos câmeras internas posicionadas em áreas de convivência e circulação para que familiares possam verificar em tempo real o bem-estar de pais e avós, acompanhar a rotina de cuidadores e agir rapidamente em caso de quedas ou emergências.",
    benefits: [
      "Tranquilidade para familiares que trabalham fora ou moram longe",
      "Visualização ao vivo pelo celular a qualquer hora do dia ou da noite",
      "Visão noturna suave para acompanhamento durante o sono",
      "Interface simples e fácil de usar no smartphone de toda a família",
    ],
    audiences: ["Famílias", "Residências com Idosos", "Cuidadores"],
    image: "/images/service-cftv.jpg",
    iconName: "HeartHandshake",
    highlightBadge: "Cuidado Familiar",
  },
  {
    id: "seg-6",
    slug: "instalacao-de-cameras-em-condominios",
    title: "Instalação de Câmeras em Condomínios",
    category: "Segurança Eletrônica",
    shortDescription:
      "CFTV robusto para portarias, eclusas, garagens, elevadores, playgrounds e muros perimetrais de condomínios.",
    detailedDescription:
      "Atendemos síndicos e administradoras com projetos de segurança eletrônica para condomínios residenciais e comerciais. Organizamos o cabeamento estruturado, centralizamos os monitores na portaria e garantimos alta durabilidade dos equipamentos.",
    benefits: [
      "Controle rigoroso de acesso de pedestres, veículos e prestadores",
      "Monitoramento dedicado na portaria e acesso para o síndico",
      "Identificação clara de incidentes em garagens e áreas comuns",
      "Valorização patrimonial das unidades do condomínio",
    ],
    audiences: ["Condomínios Residenciais", "Condomínios Comerciais", "Síndicos"],
    image: "/images/hero-cameras.jpg",
    iconName: "Building",
  },
  {
    id: "seg-7",
    slug: "configuracao-de-acesso-remoto-pelo-celular",
    title: "Configuração de Acesso Remoto às Câmeras pelo Celular",
    category: "Segurança Eletrônica",
    shortDescription:
      "Integração e ajuste técnico para visualizar suas câmeras ao vivo e consultar gravações de qualquer lugar pelo Android ou iPhone.",
    detailedDescription:
      "Seu sistema de câmeras parou de conectar no celular ou você trocou de internet/aparelho? Realizamos toda a configuração de rede segura, nuvem P2P, aplicativos oficiais e permissões de usuários para acesso rápido e criptografado.",
    benefits: [
      "Compatível com smartphones Android, iPhones, tablets e computadores",
      "Conexão criptografada com senha individual por usuário",
      "Visualização ao vivo e reprodução de gravações anteriores pelo app",
      "Treinamento prático para você dominar todas as funções do aplicativo",
    ],
    audiences: ["Residências", "Empresas", "Famílias", "Comércios"],
    image: "/images/service-cftv.jpg",
    iconName: "Smartphone",
  },
  {
    id: "seg-8",
    slug: "manutencao-de-sistemas-de-cameras",
    title: "Manutenção de Sistemas de Câmeras",
    category: "Segurança Eletrônica",
    shortDescription:
      "Revisão técnica, reparo de câmeras sem sinal ou com chiado, troca de conectores BNC/RJ45, fontes e ajustes de foco.",
    detailedDescription:
      "Recuperamos sistemas de CFTV que apresentam falhas de imagem, perda de gravação, câmeras apagadas à noite ou cabos rompidos. Fazemos testes completos de alimentação, sinal de vídeo e saúde do armazenamento do DVR/NVR.",
    benefits: [
      "Restabelecimento rápido de câmeras inoperantes ou com interferência",
      "Substituição de conectores oxidados e fontes sobrecarregadas",
      "Limpeza de lentes, ajuste de posicionamento e verificação de HD",
      "Economia ao recuperar e modernizar sua estrutura existente",
    ],
    audiences: ["Todos os portes de clientes com CFTV instalado"],
    image: "/images/hero-cameras.jpg",
    iconName: "Wrench",
  },

  // ==========================================================================
  // CATEGORIA 2: INSTALAÇÕES ELÉTRICAS (7 serviços)
  // ==========================================================================
  {
    id: "ele-1",
    slug: "instalacoes-eletricas-residenciais",
    title: "Instalações Elétricas Residenciais",
    category: "Instalações Elétricas",
    shortDescription:
      "Execução completa de pontos de energia, iluminação, circuitos para chuveiros, ar-condicionado e eletrodomésticos em residências.",
    detailedDescription:
      "Realizamos instalações elétricas residenciais em obras novas ou reformas com dimensionamento correto de condutores e disjuntores. Garantimos segurança contra sobrecargas, economia de energia e funcionamento perfeito de todos os equipamentos da casa.",
    benefits: [
      "Circuitos independentes para equipamentos de maior potência",
      "Proteção eficiente com disjuntores termomagnéticos, DR e DPS",
      "Instalação limpa, segura e alinhada às normas técnicas vigentes",
      "Prevenção contra aquecimento de fios e quedas de disjuntores",
    ],
    audiences: ["Casas", "Apartamentos", "Reformas Residenciais"],
    image: "/images/service-eletrica.jpg",
    iconName: "Home",
    highlightBadge: "Alta Segurança",
  },
  {
    id: "ele-2",
    slug: "instalacoes-eletricas-comerciais",
    title: "Instalações Elétricas Comerciais",
    category: "Instalações Elétricas",
    shortDescription:
      "Infraestrutura elétrica para lojas, restaurantes, clínicas, salões e comércios que exigem iluminação de destaque e operação contínua.",
    detailedDescription:
      "Projetamos e executamos a parte elétrica de estabelecimentos comerciais, contemplando iluminação de vitrines e salão, pontos de força para balcões refrigerados, climatização e equipamentos de atendimento sem risco de interrupções.",
    benefits: [
      "Dimensionamento preparado para uso intenso durante o expediente",
      "Iluminação comercial bem distribuída que valoriza seus produtos",
      "Balanceamento de fases para evitar sobrecargas na rede da loja",
      "Agilidade na execução para cumprir o cronograma do seu negócio",
    ],
    audiences: ["Lojas", "Clínicas", "Restaurantes", "Salas Comerciais"],
    image: "/images/service-eletrica.jpg",
    iconName: "Store",
  },
  {
    id: "ele-3",
    slug: "instalacoes-eletricas-em-empresas",
    title: "Instalações Elétricas em Empresas",
    category: "Instalações Elétricas",
    shortDescription:
      "Soluções elétricas corporativas e em galpões empresariais com distribuição organizada de circuitos de força e iluminação.",
    detailedDescription:
      "Atendemos escritórios, depósitos e ambientes empresariais na montagem de infraestrutura elétrica em eletrocalhas, perfilados, eletrodutos aparentes ou embutidos, garantindo alimentação estável para estações de trabalho e maquinário leve.",
    benefits: [
      "Infraestrutura robusta e identificada para fácil manutenção futura",
      "Separação técnica entre circuitos de iluminação e tomadas de uso específico",
      "Continuidade operacional para evitar paradas na rotina da empresa",
      "Atendimento profissional com foco em segurança do trabalho",
    ],
    audiences: ["Escritórios", "Galpões", "Empresas", "Condomínios"],
    image: "/images/service-eletrica.jpg",
    iconName: "Building2",
  },
  {
    id: "ele-4",
    slug: "montagem-e-organizacao-de-quadros-eletricos",
    title: "Montagem e Organização de Quadros Elétricos",
    category: "Instalações Elétricas",
    shortDescription:
      "Montagem técnica, saneamento de fios embolados, instalação de barramentos, disjuntores DIN, DR, DPS e identificação de circuitos.",
    detailedDescription:
      "O quadro de distribuição é o coração da segurança elétrica do imóvel. Transformamos quadros antigos, confusos ou perigosos em painéis organizados, com terminais prensados, barramentos isolados e identificação clara de cada disjuntor.",
    benefits: [
      "Eliminação de emendas frouxas e pontos quentes dentro do quadro",
      "Proteção contra choques elétricos (DR) e surtos de tensão/raios (DPS)",
      "Todos os circuitos identificados com etiquetas claras no painel",
      "Facilidade e segurança no desligamento seletivo para manutenções",
    ],
    audiences: ["Residências", "Empresas", "Comércios", "Condomínios"],
    image: "/images/service-eletrica.jpg",
    iconName: "Cpu",
    highlightBadge: "Especialidade Alltech",
  },
  {
    id: "ele-5",
    slug: "instalacao-de-tomadas-e-interruptores",
    title: "Instalação de Tomadas e Interruptores",
    category: "Instalações Elétricas",
    shortDescription:
      "Ampliação de novos pontos de tomada (10A e 20A), interruptores simples, paralelos (three-way), sensores de presença e luminárias.",
    detailedDescription:
      "Instalamos e substituímos tomadas padrão 10A e 20A, interruptores simples, paralelos e intermediários, além de sensores de presença para economia de energia em corredores, garagens e escadas.",
    benefits: [
      "Conexões firmes que evitam derretimento de plugues e tomadas",
      "Fim do uso perigoso de benjamins (T) e extensões sobrecarregadas",
      "Nivelamento e acabamento estético impecável nos espelhos",
      "Respeito à polaridade correta (Fase, Neutro e Terra)",
    ],
    audiences: ["Residências", "Escritórios", "Lojas", "Condomínios"],
    image: "/images/service-eletrica.jpg",
    iconName: "PlugZap",
  },
  {
    id: "ele-6",
    slug: "passagem-e-organizacao-de-cabeamento",
    title: "Passagem e Organização de Cabeamento",
    category: "Instalações Elétricas",
    shortDescription:
      "Lançamento estruturado de cabos elétricos e de segurança, desobstrução de conduítes e organização em canaletas ou eletrodutos.",
    detailedDescription:
      "Executamos a passagem técnica de novos circuitos elétricos e cabeamento de CFTV com guia profissional, respeitando a taxa de ocupação dos eletrodutos e organizando fiações aparentes em eletrodutos ou canaletas de alto padrão.",
    benefits: [
      "Fiação protegida contra umidade, atrito e roedores",
      "Organização visual exemplar em áreas internas e externas",
      "Uso de cabos normatizados e dimensionados para a carga real",
      "Identificação das pontas para futuras expansões sem dor de cabeça",
    ],
    audiences: ["Residências", "Empresas", "Condomínios", "Galpões"],
    image: "/images/service-eletrica.jpg",
    iconName: "Cable",
  },
  {
    id: "ele-7",
    slug: "adequacoes-e-melhorias-nas-instalacoes-eletricas",
    title: "Adequações e Melhorias nas Instalações Elétricas",
    category: "Instalações Elétricas",
    shortDescription:
      "Modernização de redes elétricas antigas, substituição de fiação ressecada, criação de aterramento e aumento de capacidade.",
    detailedDescription:
      "Imóveis construídos há mais tempo muitas vezes não suportam a demanda atual de ar-condicionado, fornos elétricos e equipamentos modernos. Atualizamos a instalação elétrica para devolver segurança e eficiência energética ao imóvel.",
    benefits: [
      "Substituição de fios rígidos antigos ou com capa ressecada",
      "Redução de desperdício de energia por fuga de corrente",
      "Preparação segura para novos aparelhos de ar-condicionado e cozinha",
      "Valorização e segurança real para o patrimônio",
    ],
    audiences: ["Imóveis Antigos", "Reformas", "Comércios", "Residências"],
    image: "/images/service-eletrica.jpg",
    iconName: "Sparkles",
  },

  // ==========================================================================
  // CATEGORIA 3: MANUTENÇÃO ELÉTRICA (6 serviços)
  // ==========================================================================
  {
    id: "man-1",
    slug: "manutencao-preventiva",
    title: "Manutenção Elétrica Preventiva",
    category: "Manutenção Elétrica",
    shortDescription:
      "Inspeção periódica programada com reaperto de conexões, medição de carga e verificação térmica para evitar panes inesperadas.",
    detailedDescription:
      "A manutenção preventiva identifica sinais de desgaste, oxidação e sobrecarga antes que causem apagões, queima de equipamentos ou princípios de incêndio. Essencial para empresas, comércios, condomínios e residências.",
    benefits: [
      "Prevenção de paradas súbitas no comércio ou empresa",
      "Reaperto técnico de bornes de disjuntores e barramentos",
      "Aumento da vida útil de motores, iluminação e eletrodomésticos",
      "Relatório claro das condições encontradas na instalação",
    ],
    audiences: ["Empresas", "Condomínios", "Comércios", "Residências"],
    image: "/images/service-manutencao.jpg",
    iconName: "ShieldCheck",
    highlightBadge: "Prevenção de Riscos",
  },
  {
    id: "man-2",
    slug: "manutencao-corretiva",
    title: "Manutenção Elétrica Corretiva",
    category: "Manutenção Elétrica",
    shortDescription:
      "Atendimento ágil para restabelecer circuitos inoperantes, disjuntores desarmando, curtos-circuitos e quedas parciais de energia.",
    detailedDescription:
      "Quando ocorre uma pane elétrica, realizamos o atendimento técnico focado em isolar a falha, corrigir a causa raiz com materiais adequados e restabelecer o fornecimento de energia com total segurança.",
    benefits: [
      "Solução definitiva do problema, sem improvisos ou 'gambiarras'",
      "Restabelecimento seguro de fases, tomadas e iluminação",
      "Atendimento com ferramental e instrumentos de medição precisos",
      "Garantia técnica sobre o serviço executado",
    ],
    audiences: ["Residências", "Lojas", "Empresas", "Condomínios"],
    image: "/images/service-manutencao.jpg",
    iconName: "Wrench",
  },
  {
    id: "man-3",
    slug: "identificacao-de-falhas-eletricas",
    title: "Identificação de Falhas Elétricas",
    category: "Manutenção Elétrica",
    shortDescription:
      "Rastreamento técnico de curtos-circuitos, fugas de corrente, oscilação de tensão (luzes piscando) e aquecimento em cabos.",
    detailedDescription:
      "Utilizamos multímetro digital, alicate amperímetro e técnicas de rastreamento circuito a circuito para descobrir exatamente onde está ocorrendo fuga de energia, fechamento de curto ou perda de neutro/fase.",
    benefits: [
      "Localização exata do ponto de falha sem quebrar paredes desnecessariamente",
      "Correção de oscilações que queimam lâmpadas e aparelhos",
      "Identificação de fugas de energia que encarecem a conta de luz",
      "Diagnóstico transparente explicado ao cliente",
    ],
    audiences: ["Residências", "Empresas", "Condomínios"],
    image: "/images/service-manutencao.jpg",
    iconName: "SearchCheck",
  },
  {
    id: "man-4",
    slug: "diagnostico-de-problemas-eletricos",
    title: "Diagnóstico de Problemas Elétricos",
    category: "Manutenção Elétrica",
    shortDescription:
      "Análise instrumental de tensão, corrente, balanceamento de fases e consumo excessivo para solucionar anomalias na rede interna.",
    detailedDescription:
      "Seu disjuntor desarma quando liga o chuveiro ou o ar-condicionado? A conta de energia subiu sem motivo aparente? Realizamos medições técnicas para diagnosticar sobrecargas, subdimensionamento de cabos ou defeitos em componentes.",
    benefits: [
      "Medição real com instrumentos calibrados de precisão",
      "Análise de capacidade dos circuitos existentes x equipamentos instalados",
      "Plano de ação objetivo para resolver o problema com melhor custo-benefício",
      "Mais tranquilidade para ligar seus equipamentos no dia a dia",
    ],
    audiences: ["Residências", "Comércios", "Empresas"],
    image: "/images/service-manutencao.jpg",
    iconName: "Activity",
  },
  {
    id: "man-5",
    slug: "reparos-e-substituicao-de-componentes",
    title: "Reparos e Substituição de Componentes",
    category: "Manutenção Elétrica",
    shortDescription:
      "Troca segura de disjuntores cansados, dispositivos DR/DPS, tomadas derretidas, reatores, sensores, chaves bóia e conectores.",
    detailedDescription:
      "Componentes elétricos sofrem desgaste mecânico e térmico ao longo do tempo. Substituímos disjuntores que perderam a curva de atuação, tomadas carbonizadas, interruptores com mau contato e sensores defeituosos.",
    benefits: [
      "Renovação imediata da segurança nos pontos críticos de conexão",
      "Descarte de componentes carbonizados que oferecem risco de incêndio",
      "Aplicação de terminais tubulares e conectores de torção/mola adequados",
      "Teste funcional completo após cada substituição",
    ],
    audiences: ["Residências", "Condomínios", "Comércios", "Empresas"],
    image: "/images/service-manutencao.jpg",
    iconName: "RefreshCw",
  },
  {
    id: "man-6",
    slug: "revisao-de-instalacoes-eletricas",
    title: "Revisão de Instalações Elétricas",
    category: "Manutenção Elétrica",
    shortDescription:
      "Check-up elétrico completo do imóvel antes de mudanças, abertura de ponto comercial ou após reformas.",
    detailedDescription:
      "Vai entrar em um imóvel novo/alugado ou abrir um comércio? Fazemos a revisão geral de todas as tomadas, pontos de iluminação, tensão de cada tomada (127V/220V) e condições do quadro elétrico para você conectar seus equipamentos sem surpresas.",
    benefits: [
      "Mapeamento de tomadas 127V e 220V para evitar queima de aparelhos na mudança",
      "Verificação de todas as caixas de passagem e quadro principal",
      "Correção imediata de emendas expostas ou mal isoladas",
      "Check-up completo para segurança da sua família ou equipe",
    ],
    audiences: ["Novos Moradores", "Lojistas", "Empresas", "Famílias"],
    image: "/images/service-manutencao.jpg",
    iconName: "ClipboardCheck",
  },

  // ==========================================================================
  // CATEGORIA 4: INFORMÁTICA E COMPUTADORES (6 serviços — Conforme Referência)
  // ==========================================================================
  {
    id: "inf-1",
    slug: "montagem-de-computadores-e-pc",
    title: "Montagem de Computadores Sob Medida",
    category: "Informática e Computadores",
    shortDescription:
      "Montagem profissional de computadores para home office, empresas, estudos e alto desempenho com cable management impecável.",
    detailedDescription:
      "Auxiliamos desde a escolha das peças compatíveis até a montagem técnica completa do seu computador desktop. Realizamos organização interna dos cabos (cable management) para fluxo de ar ideal, atualização de BIOS e testes de estabilidade.",
    benefits: [
      "Montagem limpa e organizada com excelente refrigeração interna",
      "Orientação na escolha de peças com melhor custo-benefício",
      "Configuração completa de BIOS, drivers e sistema operacional",
      "Testes rigorosos de temperatura e desempenho antes da entrega",
    ],
    audiences: ["Home Office", "Empresas", "Estudantes", "Gamers"],
    image: "/images/service-informatica.jpg",
    iconName: "Cpu",
    highlightBadge: "Montagem Profissional",
  },
  {
    id: "inf-2",
    slug: "manutencao-de-computadores-e-notebooks",
    title: "Manutenção de Computadores e Notebooks",
    category: "Informática e Computadores",
    shortDescription:
      "Diagnóstico e reparo de computadores e notebooks que não ligam, desligam sozinhos, apresentam tela azul ou lentidão extrema.",
    detailedDescription:
      "Realizamos manutenção preventiva e corretiva em desktops e notebooks de todas as marcas. Identificamos falhas em fontes, memórias, armazenamento, conectores, dobradiças, teclados e telas com diagnóstico rápido e transparente.",
    benefits: [
      "Correção de travamentos, desligamentos súbitos e erros de inicialização",
      "Substituição segura de peças defeituosas (fontes, coolers, telas, teclados)",
      "Recuperação da estabilidade para uso no trabalho ou nos estudos",
      "Orçamento claro e detalhado antes de qualquer intervenção",
    ],
    audiences: ["Residências", "Empresas", "Comércios", "Profissionais"],
    image: "/images/service-informatica.jpg",
    iconName: "Laptop",
    highlightBadge: "Referência Alltech",
  },
  {
    id: "inf-3",
    slug: "formatacao-e-instalacao-de-sistema",
    title: "Formatação, Backup e Otimização de Sistema",
    category: "Informática e Computadores",
    shortDescription:
      "Formatação completa de PCs e notebooks com backup seguro de arquivos, instalação do Windows, drivers oficiais e programas essenciais.",
    detailedDescription:
      "Devolva a velocidade de fábrica ao seu computador ou notebook. Fazemos o backup dos seus documentos, fotos e planilhas, instalamos o sistema operacional atualizado, todos os drivers originais, pacote de escritório e proteção antivírus.",
    benefits: [
      "Preservação segura dos seus arquivos importantes (fotos, documentos, dados)",
      "Remoção completa de vírus, malwares e programas indesejados",
      "Sistema otimizado para iniciar e abrir programas com máxima rapidez",
      "Configuração pronta para uso imediato em casa ou na empresa",
    ],
    audiences: ["Usuários Domésticos", "Escritórios", "Estudantes", "Comércios"],
    image: "/images/service-informatica.jpg",
    iconName: "HardDrive",
  },
  {
    id: "inf-4",
    slug: "upgrade-de-ssd-e-memoria-ram",
    title: "Upgrade de SSD NVMe e Memória RAM",
    category: "Informática e Computadores",
    shortDescription:
      "Acelere seu notebook ou computador antigo em até 10x substituindo o HD lento por SSD de alta velocidade e ampliando a memória RAM.",
    detailedDescription:
      "Não precisa trocar de computador para ter velocidade! Instalamos unidades SSD SATA ou NVMe M.2 ultrarrápidas e módulos de memória RAM compatíveis, clonando ou reinstalando o sistema para que seu equipamento ligue em poucos segundos.",
    benefits: [
      "Inicialização do sistema em poucos segundos e abertura instantânea de apps",
      "Mais fluidez para abrir várias abas do navegador e planilhas simultaneamente",
      "Excelente economia em comparação à compra de um equipamento novo",
      "Verificação exata de compatibilidade de barramento e frequência",
    ],
    audiences: ["Notebooks Lentos", "PCs de Escritório", "Home Office"],
    image: "/images/service-informatica.jpg",
    iconName: "Zap",
  },
  {
    id: "inf-5",
    slug: "limpeza-interna-e-troca-de-pasta-termica",
    title: "Higienização Interna e Troca de Pasta Térmica",
    category: "Informática e Computadores",
    shortDescription:
      "Limpeza técnica de coolers, dissipadores e placa-mãe com aplicação de pasta térmica de alta condutividade para evitar superaquecimento.",
    detailedDescription:
      "O acúmulo de poeira e o ressecamento da pasta térmica fazem o notebook ou PC esquentar, fazer barulho alto na ventoinha e perder desempenho. Realizamos a desmontagem cuidadosa, limpeza química/antiestática e renovação térmica.",
    benefits: [
      "Redução imediata da temperatura do processador e placa de vídeo",
      "Eliminação de ruídos excessivos do cooler e desligamentos por calor",
      "Aumento significativo da vida útil dos componentes eletrônicos",
      "Prevenção de oxidação em placas e conectores",
    ],
    audiences: ["Notebooks", "PCs Corporativos", "PCs Gamers"],
    image: "/images/service-informatica.jpg",
    iconName: "Sparkles",
  },
  {
    id: "inf-6",
    slug: "coleta-de-descarte-eletronico",
    title: "Coleta de Descarte de Equipamentos Eletrônicos",
    category: "Informática e Computadores",
    shortDescription:
      "Recolhimento e destinação ambientalmente responsável de computadores, notebooks, celulares, cabos e eletrônicos em desuso.",
    detailedDescription:
      "Sabe aqueles equipamentos antigos, celulares quebrados, peças de computador e cabos parados ocupando espaço? Conforme nossa atuação de Coleta de Descarte, recebemos e destinamos corretamente resíduos eletrônicos para reciclagem tecnológica.",
    benefits: [
      "Descarte ecológico que evita contaminação do meio ambiente",
      "Liberação de espaço em residências, escritórios e depósitos",
      "Inutilização segura de mídias antigas antes do descarte",
      "Compromisso socioambiental da Alltech Soluções",
    ],
    audiences: ["Residências", "Empresas", "Condomínios", "Comércios"],
    image: "/images/referencias/flyer-completo-alltech.jpeg",
    iconName: "Recycle",
    highlightBadge: "Sustentabilidade",
  },
];

/**
 * GALERIA DE INSTALAÇÕES E PROJETOS
 * Identificados de forma transparente como projetos ilustrativos/referências técnicas.
 */
export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "proj-1",
    title: "Sistema de CFTV Perimetral de Alta Definição",
    category: "Segurança Eletrônica",
    environment: "Condomínio & Fachada Corporativa",
    description:
      "Instalação de câmeras Bullet e Dome com proteção IP67, infraestrutura em eletrodutos galvanizados e monitoramento noturno infravermelho.",
    image: "/images/hero-cameras.jpg",
    specs: ["Câmeras Full HD / IP", "Visão Noturna IR", "Eletroduto Vedado"],
    isIllustrativeExample: true,
  },
  {
    id: "proj-2",
    title: "Central de Monitoramento Remoto pelo Celular",
    category: "Segurança Eletrônica",
    environment: "Residência & Acompanhamento Familiar",
    description:
      "Configuração de acesso remoto em tempo real com visualização simultânea de 4 câmeras no smartphone para proteção residencial e acompanhamento de idosos.",
    image: "/images/service-cftv.jpg",
    specs: ["App Android e iOS", "Visualização Quad 4 Câmeras", "Acesso Criptografado"],
    isIllustrativeExample: true,
  },
  {
    id: "proj-3",
    title: "Montagem e Organização de Quadro Elétrico DIN",
    category: "Instalações Elétricas",
    environment: "Empresarial & Residencial",
    description:
      "Organização completa de quadro de distribuição com barramentos pente, disjuntores termomagnéticos, interruptores DR, DPS e cabos anilhados.",
    image: "/images/service-eletrica.jpg",
    specs: ["Padrão DIN", "Proteção DR + DPS", "Circuitos Identificados"],
    isIllustrativeExample: true,
  },
  {
    id: "proj-4",
    title: "Diagnóstico Instrumental e Manutenção Preventiva",
    category: "Manutenção Elétrica",
    environment: "Comércio & Estoque Empresarial",
    description:
      "Aferição de tensão entre fases, teste de continuidade e balanceamento de cargas utilizando multímetro digital de precisão.",
    image: "/images/service-manutencao.jpg",
    specs: ["Medição Digital", "Prevenção de Sobrecarga", "Reaperto de Bornes"],
    isIllustrativeExample: true,
  },
  {
    id: "proj-7",
    title: "Montagem, Upgrade de SSD e Manutenção de PC e Notebook",
    category: "Informática e Computadores",
    environment: "Laboratório Técnico Alltech",
    description:
      "Manutenção preventiva e corretiva de notebooks e computadores, formatação com backup, instalação de SSD NVMe e limpeza térmica.",
    image: "/images/service-informatica.jpg",
    specs: ["Formatação & Backup", "Upgrade SSD / RAM", "Limpeza Térmica"],
    isIllustrativeExample: true,
  },
  {
    id: "proj-5",
    title: "Kit 4 Câmeras para Proteção Residencial e Comercial",
    category: "Segurança Eletrônica",
    environment: "Pacote Alltech Soluções",
    description:
      "Referência visual oficial Alltech Soluções: combinação de câmeras Bullet, Dome e Speed Dome para cobertura 360° sem pontos cegos.",
    image: "/images/referencias/kit-4-cameras.jpeg",
    specs: ["Kit 4 Câmeras", "Gravação Contínua", "Acesso no Celular"],
    isIllustrativeExample: false,
  },
  {
    id: "proj-6",
    title: "Aluguel de Câmeras de Segurança — Pacotes Personalizados",
    category: "Segurança Eletrônica",
    environment: "Plano de Locação Alltech",
    description:
      "Referência visual oficial Alltech Soluções: modalidade de aluguel de câmeras a partir de R$ 199,99 com manutenção inclusa.",
    image: "/images/referencias/aluguel-cameras.jpeg",
    specs: ["A partir de R$ 199,99", "Pacotes Personalizados", "Suporte Incluso"],
    isIllustrativeExample: false,
  },
  {
    id: "proj-8",
    title: "Portfólio Completo Alltech: Computadores, Elétrica, CFTV e Coleta",
    category: "Informática e Computadores",
    environment: "Referência Oficial Alltech Soluções",
    description:
      "Arte oficial Alltech Soluções reunindo montagem e manutenção de computador e notebook, serviços elétricos, fechadura eletrônica, sistema CFTV e coleta de descarte.",
    image: "/images/referencias/flyer-completo-alltech.jpeg",
    specs: ["PC & Notebook", "Elétrica & CFTV", "Coleta de Descarte"],
    isIllustrativeExample: false,
  },
];
