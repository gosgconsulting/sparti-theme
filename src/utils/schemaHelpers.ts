/**
 * Shared schema helpers for CMS-driven theme components.
 * Extract data from schema items format (key, type, content, items, props, ...).
 * Used by gosgconsulting, str, landingpage (via re-export or direct).
 */

export interface SchemaItem {
  key?: string;
  type?: string;
  content?: string;
  icon?: string;
  level?: number;
  link?: string;
  src?: string;
  alt?: string;
  items?: SchemaItem[];
  props?: Record<string, unknown>;
  settings?: unknown;
  [key: string]: unknown;
}

/** Get item from items array by key (case-insensitive). */
export function getItemByKey(items: SchemaItem[] | undefined, key: string): SchemaItem | undefined {
  if (!items || !Array.isArray(items)) return undefined;
  return items.find((i) => i.key?.toLowerCase() === key.toLowerCase());
}

/** Get text content by key. */
export function getTextByKey(items: SchemaItem[] | undefined, key: string): string {
  const item = getItemByKey(items, key);
  return item?.content ?? '';
}

/** Alias for getTextByKey (landingpage compatibility). */
export const getContentByKey = getTextByKey;

/** Get heading content; optional key and level filter. */
export function getHeading(items: SchemaItem[] | undefined, key?: string, level?: number): string {
  if (!items) return '';
  const heading = items.find((i) => {
    if (i.type !== 'heading') return false;
    if (key != null && i.key?.toLowerCase() !== key.toLowerCase()) return false;
    if (level != null && i.level !== level) return false;
    return true;
  });
  return heading?.content ?? '';
}

/** Get image src by key (or first image if no key). */
export function getImageSrc(items: SchemaItem[] | undefined, key?: string): string {
  if (!items) return '';
  const image = items.find((i) => {
    if (i.type !== 'image') return false;
    if (key != null && i.key?.toLowerCase() !== key.toLowerCase()) return false;
    return true;
  });
  return image?.src ?? '';
}

/** Get image { src, alt } by key (or first image). */
export function getImage(items: SchemaItem[] | undefined, key?: string): { src: string; alt: string } | null {
  if (!items) return null;
  const image = items.find((i) => {
    if (i.type !== 'image') return false;
    if (key != null && i.key?.toLowerCase() !== key.toLowerCase()) return false;
    return true;
  });
  if (!image?.src) return null;
  return { src: image.src, alt: (image.alt as string) ?? '' };
}

/** Get image alt by key (or first image). */
export function getImageAlt(items: SchemaItem[] | undefined, key?: string): string {
  const img = getImage(items, key);
  return img?.alt ?? '';
}

/** Get button/link item; returns text/url and content/link for compatibility. */
export function getButton(
  items: SchemaItem[] | undefined,
  key?: string
): { text: string; url: string; content?: string; link?: string; icon?: string } | null {
  if (!items) return null;
  const button = items.find((i) => {
    if (i.type !== 'button' && i.type !== 'link') return false;
    if (key != null && i.key?.toLowerCase() !== key.toLowerCase()) return false;
    return true;
  });
  if (!button?.content && !button?.link) return null;
  const text = (button.content as string) ?? (button.link as string) ?? '';
  const url = (button.link as string) ?? '';
  return {
    text,
    url,
    content: text,
    link: url,
    icon: button.icon as string | undefined,
  };
}

/** Get nested array items by key (or first array). */
export function getArrayItems(items: SchemaItem[] | undefined, key?: string): SchemaItem[] {
  if (!items) return [];
  const arrayItem = items.find((i) => {
    if (i.type !== 'array') return false;
    if (key != null && i.key?.toLowerCase() !== key.toLowerCase()) return false;
    return true;
  });
  return Array.isArray(arrayItem?.items) ? arrayItem.items : [];
}

/** Get content of item by key when type is 'text' (alias for getTextByKey). */
export function getText(items: SchemaItem[] | undefined, key: string): string {
  return getTextByKey(items, key);
}

/**
 * Extract common props from items (title, description, image, button, items).
 */
export function extractPropsFromItems(items: SchemaItem[] | undefined): Record<string, unknown> {
  if (!items || items.length === 0) return {};

  const props: Record<string, unknown> = {};
  props.title = getHeading(items) || getTextByKey(items, 'title') || getTextByKey(items, 'heading');
  props.description =
    getTextByKey(items, 'description') || getTextByKey(items, 'text') || getTextByKey(items, 'content');
  props.subtitle = getTextByKey(items, 'subtitle');
  props.imageSrc = getImageSrc(items) || getImageSrc(items, 'image');
  props.image = getImage(items);
  const btn = getButton(items);
  props.button = btn;
  props.buttonText = btn?.text;
  props.buttonUrl = btn?.url;

  const arrayItems = getArrayItems(items);
  if (arrayItems.length > 0) props.items = arrayItems;

  items.forEach((item) => {
    if (item.props && typeof item.props === 'object') {
      Object.assign(props, item.props);
    }
  });

  return props;
}

/** Merge extracted props with direct props; direct wins. */
export function mergeProps(
  directProps: Record<string, unknown> | undefined,
  items: SchemaItem[] | undefined
): Record<string, unknown> {
  const extracted = extractPropsFromItems(items);
  return { ...extracted, ...directProps };
}

/**
 * Parse a team member from nested sub-items (heading level 2 = name, level 4 = role, text = bio, image = photo).
 */
export function parseMemberFromSubItems(subItems: SchemaItem[] | undefined): {
  name: string;
  role: string;
  description: string;
  image: string;
} {
  if (!subItems || subItems.length === 0) return { name: '', role: '', description: '', image: '' };
  const img = subItems.find((i) => i.type === 'image');
  const name = subItems.find((i) => i.type === 'heading' && i.level === 2);
  const role = subItems.find((i) => i.type === 'heading' && i.level === 4);
  const bio = subItems.find((i) => i.type === 'text');
  return {
    name: (name?.content as string) ?? '',
    role: (role?.content as string) ?? '',
    description: (bio?.content as string) ?? '',
    image: (img?.src as string) ?? '',
  };
}
