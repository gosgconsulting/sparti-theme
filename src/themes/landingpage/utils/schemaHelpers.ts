/**
 * Landingpage theme schema helpers.
 * Re-exports shared helpers and adds theme-specific extractors (FAQ, testimonials, services, result slides).
 */
import {
  type SchemaItem,
  getItemByKey,
  getContentByKey,
  getTextByKey,
  getText,
  getHeading,
  getImageSrc,
  getImageAlt,
  getButton,
  getArrayItems,
} from '@/utils/schemaHelpers';

export type { SchemaItem };

export interface SchemaComponent {
  key?: string;
  name?: string;
  type?: string;
  items?: SchemaItem[];
  [key: string]: unknown;
}

export {
  getItemByKey,
  getContentByKey,
  getTextByKey,
  getText,
  getHeading,
  getImageSrc,
  getImageAlt,
  getButton,
  getArrayItems,
};

export function getFAQItems(
  items: SchemaItem[] | undefined,
  key: string
): Array<{ question: string; answer: string }> {
  const arrayItems = getArrayItems(items, key);
  return arrayItems
    .filter((item) => item.type === 'faq' && item.props)
    .map((item) => ({
      question: ((item.props as Record<string, string>)?.question) || '',
      answer: ((item.props as Record<string, string>)?.answer) || '',
    }));
}

export function getTestimonialItems(
  items: SchemaItem[] | undefined,
  key: string
): Array<{ name: string; role: string; text: string; image?: string; alt?: string }> {
  const arrayItems = getArrayItems(items, key);
  return arrayItems.map((testimonialItem) => {
    const testimonialItems = testimonialItem.items || [];
    const name =
      getHeading(testimonialItems, 'testimonial1_name', 4) ||
      getContentByKey(testimonialItems, 'testimonial1_name') ||
      getContentByKey(testimonialItems, 'name');
    const role =
      getText(testimonialItems, 'testimonial1_role') || getContentByKey(testimonialItems, 'role');
    const text =
      getText(testimonialItems, 'testimonial1_text') ||
      getContentByKey(testimonialItems, 'text') ||
      getContentByKey(testimonialItems, 'content');
    const image =
      getImageSrc(testimonialItems, 'testimonial1_image') ||
      getContentByKey(testimonialItems, 'image');
    const alt =
      getImageAlt(testimonialItems, 'testimonial1_image') ||
      getContentByKey(testimonialItems, 'alt') ||
      name;
    return { name, role, text, image, alt };
  });
}

export function getServiceItems(
  items: SchemaItem[] | undefined,
  key: string
): Array<{
  title: string;
  highlight: string;
  description: string;
  button?: { content: string; link?: string };
  carousel?: SchemaItem;
}> {
  const arrayItems = getArrayItems(items, key);
  return arrayItems.map((serviceItem) => {
    const serviceItems = serviceItem.items || [];
    const title =
      getHeading(serviceItems, 'title', 2) || getContentByKey(serviceItems, 'title');
    const highlight =
      getHeading(serviceItems, 'highlight', 2) || getContentByKey(serviceItems, 'highlight');
    const description =
      getText(serviceItems, 'description') || getContentByKey(serviceItems, 'description');
    const btn = getButton(serviceItems, 'button');
    const carousel = getItemByKey(serviceItems, `${serviceItem.key} Carousel`);
    return {
      title,
      highlight,
      description,
      button: btn ? { content: btn.content ?? btn.text, link: btn.link ?? btn.url } : undefined,
      carousel,
    };
  });
}

export function getResultSlides(
  items: SchemaItem[] | undefined,
  key: string
): Array<{ image: string; alt: string; caption: string }> {
  const arrayItems = getArrayItems(items, key);
  return arrayItems.map((slideItem) => {
    const slideItems = slideItem.items || [];
    const image =
      getImageSrc(slideItems, `${slideItem.key} Image`) ||
      getContentByKey(slideItems, 'image');
    const alt =
      getImageAlt(slideItems, `${slideItem.key} Image`) ||
      getContentByKey(slideItems, 'alt') ||
      '';
    const caption =
      getHeading(slideItems, `${slideItem.key} Caption`, 3) ||
      getContentByKey(slideItems, 'caption');
    return { image, alt, caption };
  });
}
