/**
 * Unit tests for shared schemaHelpers (CMS schema item extraction).
 * Run: npm run test:unit
 */
import { describe, it, expect } from 'vitest';
import {
  getItemByKey,
  getTextByKey,
  getContentByKey,
  getHeading,
  getImageSrc,
  getImage,
  getImageAlt,
  getButton,
  getArrayItems,
  getText,
  extractPropsFromItems,
  mergeProps,
  parseMemberFromSubItems,
  type SchemaItem,
} from './schemaHelpers';

describe('schemaHelpers', () => {
  const sampleItems: SchemaItem[] = [
    { key: 'title', type: 'heading', level: 1, content: 'Welcome' },
    { key: 'description', type: 'text', content: 'A short description.' },
    { key: 'hero-image', type: 'image', src: '/img/hero.jpg', alt: 'Hero' },
    { key: 'cta', type: 'button', content: 'Sign up', link: '/signup' },
    {
      key: 'faqs',
      type: 'array',
      items: [
        { key: 'q1', type: 'text', content: 'Question 1?' },
        { key: 'a1', type: 'text', content: 'Answer 1.' },
      ],
    },
  ];

  describe('getItemByKey', () => {
    it('returns item by key (case-insensitive)', () => {
      expect(getItemByKey(sampleItems, 'title')).toEqual(sampleItems[0]);
      expect(getItemByKey(sampleItems, 'TITLE')).toEqual(sampleItems[0]);
      expect(getItemByKey(sampleItems, 'hero-image')).toEqual(sampleItems[2]);
    });
    it('returns undefined for missing key or invalid input', () => {
      expect(getItemByKey(sampleItems, 'missing')).toBeUndefined();
      expect(getItemByKey(undefined, 'title')).toBeUndefined();
      expect(getItemByKey([], 'title')).toBeUndefined();
    });
  });

  describe('getTextByKey / getContentByKey / getText', () => {
    it('returns text content by key', () => {
      expect(getTextByKey(sampleItems, 'description')).toBe('A short description.');
      expect(getContentByKey(sampleItems, 'description')).toBe('A short description.');
      expect(getText(sampleItems, 'description')).toBe('A short description.');
    });
    it('returns empty string for missing key', () => {
      expect(getTextByKey(sampleItems, 'missing')).toBe('');
    });
  });

  describe('getHeading', () => {
    it('returns heading content with optional key and level', () => {
      expect(getHeading(sampleItems)).toBe('Welcome');
      expect(getHeading(sampleItems, 'title')).toBe('Welcome');
      expect(getHeading(sampleItems, undefined, 1)).toBe('Welcome');
    });
    it('returns empty string when no heading matches', () => {
      expect(getHeading(sampleItems, 'missing')).toBe('');
      expect(getHeading([])).toBe('');
    });
  });

  describe('getImageSrc / getImage / getImageAlt', () => {
    it('returns image src and full image object', () => {
      expect(getImageSrc(sampleItems, 'hero-image')).toBe('/img/hero.jpg');
      expect(getImage(sampleItems, 'hero-image')).toEqual({ src: '/img/hero.jpg', alt: 'Hero' });
      expect(getImageAlt(sampleItems, 'hero-image')).toBe('Hero');
    });
    it('returns empty or null for missing image', () => {
      expect(getImageSrc(sampleItems, 'missing')).toBe('');
      expect(getImage(sampleItems, 'missing')).toBeNull();
      expect(getImageAlt(sampleItems, 'missing')).toBe('');
    });
  });

  describe('getButton', () => {
    it('returns button text and url', () => {
      const btn = getButton(sampleItems, 'cta');
      expect(btn).not.toBeNull();
      expect(btn!.text).toBe('Sign up');
      expect(btn!.url).toBe('/signup');
      expect(btn!.content).toBe('Sign up');
      expect(btn!.link).toBe('/signup');
    });
    it('returns null for missing button', () => {
      expect(getButton(sampleItems, 'missing')).toBeNull();
    });
  });

  describe('getArrayItems', () => {
    it('returns nested items for array type', () => {
      const arr = getArrayItems(sampleItems, 'faqs');
      expect(arr).toHaveLength(2);
      expect(arr[0].content).toBe('Question 1?');
      expect(arr[1].content).toBe('Answer 1.');
    });
    it('returns empty array for missing or invalid input', () => {
      expect(getArrayItems(sampleItems, 'missing')).toEqual([]);
      expect(getArrayItems(undefined, 'faqs')).toEqual([]);
    });
  });

  describe('extractPropsFromItems', () => {
    it('extracts title, description, image, button, items', () => {
      const props = extractPropsFromItems(sampleItems);
      expect(props.title).toBe('Welcome');
      expect(props.description).toBe('A short description.');
      expect(props.imageSrc).toBe('/img/hero.jpg');
      expect((props.button as { text: string }).text).toBe('Sign up');
      expect(Array.isArray(props.items)).toBe(true);
    });
    it('returns empty object for empty or undefined items', () => {
      expect(extractPropsFromItems([])).toEqual({});
      expect(extractPropsFromItems(undefined)).toEqual({});
    });
  });

  describe('mergeProps', () => {
    it('merges extracted props with direct props; direct wins', () => {
      const direct = { title: 'Overridden' };
      const merged = mergeProps(direct, sampleItems);
      expect(merged.title).toBe('Overridden');
      expect(merged.description).toBe('A short description.');
    });
    it('returns only direct props when items undefined', () => {
      expect(mergeProps({ a: 1 }, undefined)).toEqual({ a: 1 });
    });
  });

  describe('parseMemberFromSubItems', () => {
    it('parses name, role, description, image from sub-items', () => {
      const subItems: SchemaItem[] = [
        { type: 'heading', level: 2, content: 'Jane Doe' },
        { type: 'heading', level: 4, content: 'Designer' },
        { type: 'text', content: 'Bio here' },
        { type: 'image', src: '/team/jane.jpg' },
      ];
      expect(parseMemberFromSubItems(subItems)).toEqual({
        name: 'Jane Doe',
        role: 'Designer',
        description: 'Bio here',
        image: '/team/jane.jpg',
      });
    });
    it('returns empty strings for empty sub-items', () => {
      expect(parseMemberFromSubItems([])).toEqual({
        name: '',
        role: '',
        description: '',
        image: '',
      });
      expect(parseMemberFromSubItems(undefined)).toEqual({
        name: '',
        role: '',
        description: '',
        image: '',
      });
    });
  });
});
