// Link Types for Project Proof (Not Just GitHub!)
// Updated: May 2, 2026 - Non-Tech Student Support

export interface LinkType {
  id: string;
  label: string;
  icon: string;
  category: 'tech' | 'design' | 'media' | 'document' | 'credential' | 'other';
  placeholder: string;
  enrichment: 'api' | 'og_image' | 'ping' | 'none';
  proofWeight: 'highest' | 'high' | 'medium' | 'lower';
  buttonLabel: string;
}

// 15 link types across 5 categories
export const LINK_TYPES: Record<string, LinkType> = {
  github: {
    id: 'github',
    label: 'GitHub Repository',
    icon: 'code',
    category: 'tech',
    placeholder: 'https://github.com/username/repository',
    enrichment: 'api', // GitHub API for stars, commits, languages
    proofWeight: 'highest',
    buttonLabel: 'View Code'
  },
  live: {
    id: 'live',
    label: 'Live Deployment',
    icon: 'globe',
    category: 'tech',
    placeholder: 'https://myproject.vercel.app',
    enrichment: 'ping', // HTTP ping for online/offline status
    proofWeight: 'highest',
    buttonLabel: 'View Live'
  },
  figma: {
    id: 'figma',
    label: 'Figma / Design File',
    icon: 'palette',
    category: 'design',
    placeholder: 'https://figma.com/file/...',
    enrichment: 'og_image',
    proofWeight: 'high',
    buttonLabel: 'View Design'
  },
  behance: {
    id: 'behance',
    label: 'Behance / Dribbble',
    icon: 'image',
    category: 'design',
    placeholder: 'https://behance.net/gallery/...',
    enrichment: 'og_image',
    proofWeight: 'high',
    buttonLabel: 'View Portfolio'
  },
  video: {
    id: 'video',
    label: 'Demo Video',
    icon: 'video',
    category: 'media',
    placeholder: 'https://youtube.com/watch?v=...',
    enrichment: 'og_image',
    proofWeight: 'medium',
    buttonLabel: 'Watch Demo'
  },
  presentation: {
    id: 'presentation',
    label: 'Presentation / Slides',
    icon: 'presentation',
    category: 'document',
    placeholder: 'https://docs.google.com/presentation/...',
    enrichment: 'og_image',
    proofWeight: 'medium',
    buttonLabel: 'View Slides'
  },
  document: {
    id: 'document',
    label: 'Document / Report',
    icon: 'file-text',
    category: 'document',
    placeholder: 'https://docs.google.com/document/...',
    enrichment: 'og_image',
    proofWeight: 'medium',
    buttonLabel: 'View Report'
  },
  spreadsheet: {
    id: 'spreadsheet',
    label: 'Spreadsheet / Data',
    icon: 'table',
    category: 'document',
    placeholder: 'https://docs.google.com/spreadsheets/...',
    enrichment: 'og_image',
    proofWeight: 'lower',
    buttonLabel: 'View Data'
  },
  article: {
    id: 'article',
    label: 'Published Article',
    icon: 'book-open',
    category: 'media',
    placeholder: 'https://medium.com/@username/...',
    enrichment: 'og_image',
    proofWeight: 'high',
    buttonLabel: 'Read Article'
  },
  social: {
    id: 'social',
    label: 'Social Media Page',
    icon: 'users',
    category: 'media',
    placeholder: 'https://instagram.com/page',
    enrichment: 'og_image',
    proofWeight: 'lower',
    buttonLabel: 'View Page'
  },
  event: {
    id: 'event',
    label: 'Event Page / Recap',
    icon: 'calendar',
    category: 'document',
    placeholder: 'https://lu.ma/event',
    enrichment: 'og_image',
    proofWeight: 'medium',
    buttonLabel: 'Event Details'
  },
  certificate: {
    id: 'certificate',
    label: 'Certificate / Course',
    icon: 'award',
    category: 'credential',
    placeholder: 'https://coursera.org/verify/...',
    enrichment: 'og_image',
    proofWeight: 'medium',
    buttonLabel: 'View Certificate'
  },
  research: {
    id: 'research',
    label: 'Research Paper',
    icon: 'search',
    category: 'document',
    placeholder: 'https://arxiv.org/abs/...',
    enrichment: 'og_image',
    proofWeight: 'high',
    buttonLabel: 'Read Paper'
  },
  podcast: {
    id: 'podcast',
    label: 'Podcast / Audio',
    icon: 'headphones',
    category: 'media',
    placeholder: 'https://open.spotify.com/...',
    enrichment: 'og_image',
    proofWeight: 'medium',
    buttonLabel: 'Listen'
  },
  other: {
    id: 'other',
    label: 'Other URL',
    icon: 'link',
    category: 'other',
    placeholder: 'https://...',
    enrichment: 'none',
    proofWeight: 'lower',
    buttonLabel: 'View'
  }
};

// Get all link types as array
export const ALL_LINK_TYPES = Object.values(LINK_TYPES);

// Get link types by category
export function getLinkTypesByCategory(category: LinkType['category']): LinkType[] {
  return ALL_LINK_TYPES.filter(lt => lt.category === category);
}

// Get link type by ID
export function getLinkType(id: string): LinkType | undefined {
  return LINK_TYPES[id];
}

// Validate URL format for link type
export function validateLinkURL(linkTypeId: string, url: string): boolean {
  if (!url || url.trim() === '') return false;

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    return false;
  }

  // Type-specific validation
  const linkType = getLinkType(linkTypeId);
  if (!linkType) return false;

  switch (linkTypeId) {
    case 'github':
      return url.includes('github.com/');
    case 'figma':
      return url.includes('figma.com/file/') || url.includes('figma.com/design/');
    case 'behance':
      return url.includes('behance.net/') || url.includes('dribbble.com/');
    case 'video':
      return url.includes('youtube.com/') || url.includes('youtu.be/') || url.includes('loom.com/') || url.includes('vimeo.com/');
    case 'presentation':
      return url.includes('docs.google.com/presentation/') || url.includes('canva.com/design/') || url.includes('slides.com/');
    case 'document':
      return url.includes('docs.google.com/document/') || url.includes('notion.so/');
    case 'spreadsheet':
      return url.includes('docs.google.com/spreadsheets/') || url.includes('airtable.com/');
    case 'article':
      return url.includes('medium.com/') || url.includes('linkedin.com/pulse/') || url.includes('dev.to/');
    case 'social':
      return url.includes('instagram.com/') || url.includes('linkedin.com/company/') || url.includes('twitter.com/') || url.includes('x.com/');
    case 'event':
      return url.includes('lu.ma/') || url.includes('eventbrite.com/') || url.includes('notion.so');
    case 'certificate':
      return url.includes('coursera.org/verify/') || url.includes('credential.net/') || url.includes('udemy.com/certificate/');
    case 'research':
      return url.includes('arxiv.org/') || url.includes('researchgate.net/') || url.includes('scholar.google.com/');
    case 'podcast':
      return url.includes('spotify.com/') || url.includes('anchor.fm/') || url.includes('soundcloud.com/');
    default:
      return true; // 'other' and 'live' accept any valid URL
  }
}

// Get appropriate icon for Lucide React
export function getLucideIcon(iconName: string): string {
  const iconMap: Record<string, string> = {
    'code': 'Code',
    'globe': 'Globe',
    'palette': 'Palette',
    'image': 'Image',
    'video': 'Video',
    'presentation': 'Presentation',
    'file-text': 'FileText',
    'table': 'Table',
    'book-open': 'BookOpen',
    'users': 'Users',
    'calendar': 'Calendar',
    'award': 'Award',
    'search': 'Search',
    'headphones': 'Headphones',
    'link': 'Link'
  };
  return iconMap[iconName] || 'Link';
}

// Get contextual button based on link types present
export function getContextualButtons(linkTypes: string[]): { label: string; icon: string; linkTypeId: string }[] {
  const buttons: { label: string; icon: string; linkTypeId: string }[] = [];

  // Priority order: highest weight first
  const priorityOrder = ['github', 'live', 'figma', 'article', 'research', 'behance', 'video', 'presentation', 'document', 'event', 'certificate', 'podcast', 'spreadsheet', 'social', 'other'];

  for (const typeId of priorityOrder) {
    if (linkTypes.includes(typeId)) {
      const linkType = getLinkType(typeId);
      if (linkType) {
        buttons.push({
          label: linkType.buttonLabel,
          icon: linkType.icon,
          linkTypeId: typeId
        });
      }

      // Max 2 primary buttons
      if (buttons.length >= 2) break;
    }
  }

  return buttons;
}
