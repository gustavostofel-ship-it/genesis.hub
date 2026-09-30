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

// FASE 3: Removidos todos os mocks (INITIAL_EMPLOYEES, INITIAL_REQUESTS, INITIAL_FEED_POSTS)
