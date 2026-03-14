import { API_BASE } from '@/utils/adminApi'

export type ApiBlog = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  featured_image?: string;
  author?: string;
  status?: 'published' | 'draft';
  created_at?: string;
  updated_at?: string;
};

export async function fetchBlogs(): Promise<ApiBlog[]> {
  const res = await fetch(`${API_BASE}/api/blogs`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data: ApiBlog[] = await res.json();
  return data.map(b => ({
    ...b,
    featured_image: (() => {
      const src = b.featured_image || '';
      if (!src) return src;
      const absolutized = src.startsWith('/')
        ? `${API_BASE}${src}`
        : (/^https?:\/\//i.test(src) || /^data:/i.test(src))
          ? src
          : `${API_BASE}/${src.replace(/^\.?\/*/, '')}`;
      const stamp = Date.parse(b.updated_at || b.created_at || '') || 0;
      return stamp ? `${absolutized}${absolutized.includes('?') ? '&' : '?'}v=${stamp}` : absolutized;
    })()
  }));
}

export async function fetchBlogBySlug(slug: string): Promise<ApiBlog | null> {
  const res = await fetch(`${API_BASE}/api/blog/${encodeURIComponent(slug)}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const b: ApiBlog = await res.json();
  const absolutize = (html?: string) =>
    (html || '').replace(/<img([^>]+?)src=["']([^"']+)["']([^>]*)>/gi, (_m, pre, src, post) => {
      let finalSrc = src;
      if (src && src.startsWith('/')) {
        finalSrc = `${API_BASE}${src}`;
      } else if (src && !/^https?:\/\//i.test(src) && !/^data:/i.test(src)) {
        finalSrc = `${API_BASE}/${src.replace(/^\.?\/*/, '')}`;
      }
      return `<img${pre}src="${finalSrc}"${post}>`;
    });
  return {
    ...b,
    content: absolutize(b.content),
    featured_image: (() => {
      const src = b.featured_image || '';
      if (!src) return src;
      const absolutized = src.startsWith('/')
        ? `${API_BASE}${src}`
        : (/^https?:\/\//i.test(src) || /^data:/i.test(src))
          ? src
          : `${API_BASE}/${src.replace(/^\.?\/*/, '')}`;
      const stamp = Date.parse(b.updated_at || b.created_at || '') || 0;
      return stamp ? `${absolutized}${absolutized.includes('?') ? '&' : '?'}v=${stamp}` : absolutized;
    })()
  };
}
