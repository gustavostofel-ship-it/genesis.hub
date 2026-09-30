export interface Employee {
  id: string;
  name: string;
  role: string;
  department: 'marketing' | 'engenharia' | 'rh' | 'produto' | 'financeiro';
  departmentLabel: string;
  location: string;
  locationType: 'presencial' | 'remoto' | 'hibrido';
  ramal: string;
  email: string;
  avatar: string;
  status: 'online' | 'reuniao' | 'ausente';
  skills: string[];
  isFavorite?: boolean;
}

export interface RequestItem {
  id: string;
  protocol: string;
  category: string;
  categoryIcon: string;
  title: string;
  subtitle: string;
  assignee: {
    name: string;
    role: string;
    avatar: string;
  };
  createdAt: string;
  dueDate: string;
  status: 'aberta' | 'analise' | 'aprovada' | 'concluida';
  priority?: 'baixa' | 'media' | 'alta';
  description?: string;
  attachments?: Array<{ name: string; size: string }>;
}

export interface FeedPost {
  id: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
    badge?: string;
    isOfficial?: boolean;
  };
  timeAgo: string;
  subtitle: string;
  content: string;
  highlightText?: string;
  videoUrl?: string;
  videoTitle?: string;
  videoDuration?: string;
  videoCover?: string;
  imageCover?: string;
  imageCaption?: string;
  certificate?: {
    title: string;
    issuer: string;
    credentialId: string;
    isVerified: boolean;
  };
  birthday?: {
    name: string;
    wishesCount: number;
    quote: string;
  };
  welcome?: {
    name: string;
    role: string;
    desk: string;
    image: string;
    welcomesCount: number;
  };
  likesCount: number;
  congratsCount?: number;
  commentsCount: number;
  sharesCount: number;
  liked?: boolean;
  congratulated?: boolean;
}

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Mariana Alencar',
    role: 'Coordenadora de Branding',
    department: 'marketing',
    departmentLabel: 'Marketing',
    location: 'Presencial • São Paulo (Sede)',
    locationType: 'presencial',
    ramal: '#4402',
    email: 'mariana.a@genesis.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoz0oyBqqkzXY3BZ8w4jVE3WRicCgG72kFcha3gkXgGD0haoHB_oT2dRDNMg8sy5oP3vETJGQKEyMZ3gwEvqsChRsmRiv7ZqyBO_nmekBEVzU5ggO0Mfyb3qfI3DA3dCrkoJPV7IstNPgjQyBQVhiK-DKiqAtMuldJHqKAp-AC5eI8dHuz0QYYsTxa4cD55EAzcvgJl4O5Qas7BbYpCOK3rt_7zQGBf9kdJ4scF38KkUxj5_jZY4IY',
    status: 'online',
    skills: ['Design', 'Branding', 'Social Media', 'Identidade Visual'],
    isFavorite: false,
  },
  {
    id: 'emp-2',
    name: 'Felipe Costa',
    role: 'Desenvolvedor Full Stack Sênior',
    department: 'engenharia',
    departmentLabel: 'Engenharia',
    location: 'Remoto • Belo Horizonte',
    locationType: 'remoto',
    ramal: '#2109',
    email: 'felipe.costa@genesis.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHL7QxdJVj4sp6VDRnjZImRyK9otoTJCJPfg2orVuJaWZ3yBdMXADBaZ7fAzztFvIpS4uuMXRWdH6cjucfJteNfXdxUXb_r61p8Qa9Rb4gb0PhRhA9o3Fg4prNrCoquDbkPSDDuTkE_CQ6r00w_Le_qaq-hoNKwowiQE-aAkuJ4IZ3_sXdYuq67N2KW92s3xyXNK1yt5HvLgRNh3ODpk3jcdz1fGvGGLbv0WStGjSQLQG9x0H46rsB',
    status: 'online',
    skills: ['React', 'Node.js', 'TypeScript', 'Cloud'],
    isFavorite: false,
  },
  {
    id: 'emp-3',
    name: 'Beatriz Ramos',
    role: 'Especialista em Cultura & DHO',
    department: 'rh',
    departmentLabel: 'RH & Cultura',
    location: 'Presencial • São Paulo (Sede)',
    locationType: 'presencial',
    ramal: '#1055',
    email: 'beatriz.r@genesis.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu_KDBpUodKIL8VWaA---S0JvxtwGr-JfifFGf6b0Jn0VNURjN8tKNlqRAZiLZUJ4b0ZUQsYzei_vckArGquDSGasGxUVTLBYGEP1Lf-jXbI10STHKChFAvzFtswpGly18px1Nbjt29_rXoozHj0Lh9iS1WKdB6dDlC0blU5-wSqqYfjoEjN3ukOMXkYKNIDWX8NvddN3jBxSteCo9oK1hjfC2ymmP5Wa6N3vAZb_ctfnSSIlln0kw',
    status: 'reuniao',
    skills: ['Onboarding', 'Feedback 360', 'Clima Org', 'Liderança'],
    isFavorite: false,
  },
  {
    id: 'emp-4',
    name: 'Carlos Eduardo',
    role: 'Especialista de Vídeo e Motion',
    department: 'marketing',
    departmentLabel: 'Marketing',
    location: 'Híbrido • Rio de Janeiro',
    locationType: 'hibrido',
    ramal: '#4418',
    email: 'carlos.e@genesis.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVyCBfUplHvbXiXu820AJcOUMe3WW3d5dHLMk-f9QKO4ATksJ_rW6V7PNgRKKPon51N1BN8O7dwG7jTNu4jOFzlS4HCMlTrzKMpdSl5knZ0opT7dt9JQz61Kk1m2yyr0CzWAE2LyX4SMAltwBFprA9fZbRi3cmJteMpZojcx9tkOoo1N-F1WDpOjKvZ5ubDpbEoDaoVR4bdChFGahkfTckrZQpbNS5m1XKlhecllWwAaRYXB1GtkbB',
    status: 'ausente',
    skills: ['After Effects', 'Motion 3D', 'Premiere Pro', 'Storytelling'],
    isFavorite: false,
  },
  {
    id: 'emp-5',
    name: 'Juliana Mendes',
    role: 'Product Designer UX/UI',
    department: 'produto',
    departmentLabel: 'Produto & Design',
    location: 'Híbrido • Curitiba',
    locationType: 'hibrido',
    ramal: '#3312',
    email: 'juliana.m@genesis.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA56vqEdl5GqD0lon53Cavqz9aw9u89ldNozqogjT4JjlocVj99cIHJBaHR5wscKknlF0kX2LJvqdXHyDmQXFRwxI0V047uFYeqP_6VN5oyd5ETg8jKgrxi18AlPhQSjqxYiOVQsBVCw-IMo4FFzkzcyni7DIEaiTcMM8CKvSOPzYsW-u6yeAT4cQjXsxKfHbyj94XDOuVIkYdMa0p5vCz3BMCtM2M0TcvZqhLoDsAl_K7pBKmFgh2H',
    status: 'online',
    skills: ['Figma', 'Design System', 'UX Research', 'Prototipagem'],
    isFavorite: false,
  },
  {
    id: 'emp-6',
    name: 'Thiago Rocha',
    role: 'Arquiteto de Soluções Cloud',
    department: 'engenharia',
    departmentLabel: 'Engenharia',
    location: 'Presencial • São Paulo (Sede)',
    locationType: 'presencial',
    ramal: '#5512',
    email: 'thiago.rocha@genesis.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZxHiR_o2ubPCGDsYgnFu2wzmoTqbrNHr7YhJz0-TZOzwRu9Rwp2Tp_bEYNJmWRl2oPrYANIPSoCSUdZMVUdPvlhcgZ2YglFzpDVbuLSyN-Y5QizDqx02Z07rhqdyHum6EcV7kggoX6IeCSJWK7XxSyeDUxjlZQEEzitN27XmVktzl84NEdu1PIFCMS-b2hcP3dyxYAFAo6Ll8g59svhnEB1zn_OqIuuV88RpaLZGkCxTslL1hbQth',
    status: 'online',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'DevSecOps'],
    isFavorite: false,
  },
];

export const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: 'req-1',
    protocol: '#SOL-9821',
    category: 'Suporte T.I.',
    categoryIcon: 'terminal',
    title: 'Troca de fone de ouvido headset com ruído',
    subtitle: 'Posto de Trabalho • Andar 4',
    assignee: {
      name: 'Roberto Silva',
      role: 'Service Desk',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATHlgk5YwStScBmjo61uPkeZJfosR_uczCxR1X--DvX6NyVnekv1x_sdd4dQiTsaLaGq7ynWmxj1hWwuN6-TIMHUtKk8yxWXFcCaOs0lV-X7XrCDwL5vsjPI8d_YsgF4EgUePDntTRUtMka9I7jq6_9jJf7jIxwoKRONt-9EaeHhyyQ-Amj-HL7TRkxSyzZToDkiegrT9vMSiI7etuBU7MBNkbQXQ3NZhHf2UpRUgYPGUNSmIQoWCo',
    },
    createdAt: '24 Out, 14:15',
    dueDate: 'Hoje, 18:00',
    status: 'analise',
    priority: 'media',
    description: 'Headset corporativo com chiado intermitente no microfone durante reuniões no Google Meet. Solicito substituição ou revisão técnica.',
  },
  {
    id: 'req-2',
    protocol: '#MKT-4102',
    category: 'Marketing',
    categoryIcon: 'campaign',
    title: 'Campanha Dia dos Pais Redes Sociais',
    subtitle: 'Peças 1080x1080 + Reels • Briefing anexo',
    assignee: {
      name: 'Mariana A.',
      role: 'Coord. Branding',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUn7ic5aLwkiDvTVpXFn4InloJFwQ_ka3WdIYRr5Xr_D9fuT_cPKFjSCJFZFaBwd0nZgwjgXcCkTozFc-ZIGfuaBAIG894SAqPiE_WaDfCwEnoZZT4x2IIt_Iy9-q40Vh0uTxRNeeIovArUrt1uvYRCTyYxm80Cd0Hu2wNrrlgc11Vlz8sNnfbOp36b3fKbWMwn0MaryFYONRcC8xIWtFqwkQ8L-29ybIiqUfxOPYny4wQO9EOyazB',
    },
    createdAt: '22 Out, 09:30',
    dueDate: '28 Out',
    status: 'aprovada',
    priority: 'media',
    description: 'Conjunto de 3 lâminas estáticas e 1 reel de 30 segundos sobre paternidade e equilíbrio no trabalho.',
  },
  {
    id: 'req-3',
    protocol: '#RH-1844',
    category: 'Recursos Humanos',
    categoryIcon: 'groups',
    title: 'Solicitação de Férias Dezembro',
    subtitle: 'Período de 15 dias • Assinatura aprovada',
    assignee: {
      name: 'Beatriz R.',
      role: 'Gestão de Pessoas',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH61_GUYXY3WYEw3sAvkfKKpzrPM6gCf_9gM-S-CNOyTqkkfe-NpoTphzu_JaNhiDkOXEf1L_aYIZD8uvtgKUppsPknorsbRP1lb8Xu9Pqkv_DcjNXntSywSL371oRUxj14rIWRlhTzq2tG3y5OdF_RnYcmng_OOp8nAIPxYTJpz-KIZ8ORsZ4aNlcjMomDy7xosQhVPJ6hBS-SGiQ6neXPgKapuezpwadQkvH6hIVyu4xXrugn27u',
    },
    createdAt: '18 Out, 11:20',
    dueDate: '20 Out',
    status: 'concluida',
    priority: 'baixa',
    description: 'Agendamento de férias de 15 a 30 de dezembro de 2025 já alinhado com a liderança direta.',
  },
  {
    id: 'req-4',
    protocol: '#MKT-4089',
    category: 'Marketing',
    categoryIcon: 'campaign',
    title: 'Vídeo institucional depoimentos colaboradores',
    subtitle: 'Audiovisual • Produção em estúdio Genesis',
    assignee: {
      name: 'Carlos E.',
      role: 'Audiovisual Hub',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlmWi6kFVBW8YHgveFUR2zxsC3_hAmEL3IpqVALk-gy25ipG9P1EH0wA2vDI3BgMdtN1CTbwmMlrdNKQKlYmVHCgovKUi9Jk05BKxafWY2uVVT5xAZh5M7mBcepl6-G-CbM8gH9G8NcJbygEBSV8bSLwdm8ZJfB1VOfqzJ85iEm50tgyBqORoY5Zu_mAQyjFOOGDcPtZOU2-FckfDPgG2pIzApC-uM4IqTHHmeMuNbRz9VyqzW-kvw',
    },
    createdAt: '15 Out, 16:40',
    dueDate: '30 Out',
    status: 'aberta',
    priority: 'alta',
    description: 'Captação e edição de depoimentos de 4 colaboradores veteranos para o portal de carreiras e LinkedIn.',
  },
  {
    id: 'req-5',
    protocol: '#EQ-3022',
    category: 'Equipamentos',
    categoryIcon: 'devices',
    title: 'Monitor auxiliar 27" 4K para design gráfico',
    subtitle: 'Entregue na Estação 4B • Patrimônio #88910',
    assignee: {
      name: 'Amanda F.',
      role: 'Hardware Assets',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeVO-JFQSOS0CeVXw2pNSGqebV7zvVkw8l-7B6e6rjQK4PW2mQgmgzYCOW1RA_TVwYT78313ObRczFcwdnvqCOC1vhvZaM0EudBMqSBBQA7-NK0BC0EPvwF9jmdN1tQniMns0DnAj6XMuWQ9Je9phZ5l_BWRCXBQU8mzzxG9SYYQyQn_PToMlU8lV7zV242NI6K9GThcUpyL3juHeAhwAtcLZOSfP61_jDS76rz5gsNRChto8BmFBB',
    },
    createdAt: '10 Out, 08:50',
    dueDate: '12 Out',
    status: 'concluida',
    priority: 'media',
    description: 'Aquisição e instalação de monitor Dell 27 polegadas 4K para suportar demandas de edição e prototipagem no Figma.',
  },
];

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Genesis Comunicação Interna',
      badge: 'Oficial',
      isOfficial: true,
    },
    timeAgo: 'Há 2 horas',
    subtitle: 'Para toda a organização • Transmitido de São Paulo',
    content: 'Confira os bastidores da nossa Convenção Anual Genesis 2024! Mais de 800 colaboradores reunidos presencialmente e remotamente debatendo o futuro das nossas operações, produtos e soluções tecnológicas. Agradecemos a cada um pelo compromisso e energia contagiante. Dá o play e sinta o clima! 👇🎥',
    highlightText: 'Convenção Anual Genesis 2024',
    videoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOCGnS7Zu2qdCGf5UkPJSogJfZ_E1vXfLp3ungGD-p0E2KLZBOixdf8VU1HOap3oSqsjVLugJ9b_jZatVHuaox44HtNzT4ivQUumxHBGJY3pEVIxlhhGmjSghFsoOxsSIj-ea0aXY8kgcrfjc9JsQcKYjnBlB-LbiNEB_Kog9ip-hNNa1o8lTQpgyc7BVpzR5JnzcMUXYMLJDntGf0k_7BupaPLrVMo_dBm1-YXlK77Jm8iY7J8QKd',
    videoTitle: 'Convenção Nacional Genesis 2024 • Aftermovie HD',
    videoDuration: '04:22',
    likesCount: 48,
    commentsCount: 12,
    sharesCount: 5,
    liked: false,
  },
  {
    id: 'post-2',
    author: {
      name: 'Thiago Rocha',
      role: 'Arquiteto de Cloud Sênior',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg68UMSF4g8VmP308XsoEiCTpiF5pOpOT3Y_-1DE_bFT36H2y-Fi5QRYDJxPhUpLQyM6mStCK77xQGlLuzhs3-z_VRDX_rzAHSBmFx-FfpiPolWWwD-nd-MyYAb6cA7bxU7op1wtGr9xF6atCeKjqhiwLpNuLTittGFmrpKgqLMY6VQwVJAj0Y1iMYN3fMpk0QgkA3jbxuTXhu2I5NH1rhpExwP--MJwo8COJHU2sZPW_44qKJqzNT',
    },
    timeAgo: 'Há 4 horas',
    subtitle: 'Engenharia & Infraestrutura • Certificação Conquistada',
    content: 'Com muita alegria compartilho que acabo de obter a certificação AWS Certified Solutions Architect – Professional! Foram meses intensos de estudo, laboratórios e suporte incondicional do meu time de Arquitetura no Genesis Hub. Rumo à modernização total das nossas nuvens e microsserviços! 🚀☁️',
    certificate: {
      title: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      credentialId: '#GH-88219-AWS',
      isVerified: true,
    },
    likesCount: 94,
    congratsCount: 94,
    commentsCount: 18,
    sharesCount: 2,
    congratulated: false,
  },
  {
    id: 'post-3',
    author: {
      name: 'Camila Duarte',
      role: 'Business Partner Genesis',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5WeugcVb46BJH3vBuZoWp-3uYZx739f6fDP50u3KUuN-qcONj6ZNsUNJsiIRKIPJxoRHoB4zvhS1P2gkZ54nB9QYFqVAFCKMiqk_pcigSXEyimManBsNHgXn7mc8IqM7gPoUvnuwlitVQccXFLqwN-8lDLP6_iUOrfXGn3WoHnACmdthVlYKCHbQ32u6A4PaidFw439S9a4WvanJJDKcZgi9uiUol1ssa5wm2NtdsG4g4lD1dVzcv',
    },
    timeAgo: 'Hoje',
    subtitle: 'Recursos Humanos • Headquarter SP',
    content: 'Hoje é um dia especial para todo o nosso departamento!',
    birthday: {
      name: 'Camila Duarte',
      wishesCount: 42,
      quote: '“Desejamos à Camila um novo ciclo repleto de saúde, sucessos e realizações extraordinárias junto a toda a equipe Genesis!”',
    },
    likesCount: 42,
    commentsCount: 14,
    sharesCount: 1,
  },
  {
    id: 'post-4',
    author: {
      name: 'Boas-vindas ao Time!',
      badge: 'Onboarding',
      isOfficial: true,
    },
    timeAgo: 'Hoje às 09:30',
    subtitle: 'Gente & Gestão • Marketing & Design Hub',
    content: 'Damos calorosas boas-vindas ao Rafael Santos, nosso novo Product Designer Sênior no Marketing Hub! O Rafael traz ampla experiência em design systems empresariais e pesquisa de experiência do usuário. Conectem-se e deem um oi no ramal #4102 ou Teams! 🎨✨',
    welcome: {
      name: 'Rafael Santos',
      role: 'Product Designer Sênior',
      desk: 'Mesa 4B',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTPN4ChAh8AUMwL8Y_DJes-vh63yQaEMdnCRu-oRy-bMJyTdT1KDrcSacKftp7bGCFp7P2KwJ0mXwK8mUsMoLiZzIkVJ9RfOD1_D-Qd1O6sLlVo2CSJCgX5wRhwvD8CJZGa7JAxz8UdedfczM1NiXNtvHkCmQTxtwyoNdP1RRN20apSZtqTPEwJeR50JKAWZBPmF471XAEEc1_0DeVH7Drb3fT2JmsgXU4AQqTiRiFCH558boNqdzi',
      welcomesCount: 57,
    },
    likesCount: 57,
    commentsCount: 8,
    sharesCount: 0,
  },
];
