import React from 'react';
import {
  Link,
  type LinkProps,
  NavLink,
  type NavLinkProps,
  type To,
} from 'react-router-dom';
import { useThemeBasePath } from '@/hooks/useThemeBasePath';

function resolveTo(basePath: string | undefined, to: To): To {
  if (basePath === undefined || basePath === '') return to;
  if (typeof to !== 'string') return to;
  if (!to.startsWith('/')) return to;
  if (to.startsWith(basePath)) return to;
  if (to.startsWith('/theme/')) return to;
  return `${basePath}${to}` as To;
}

export function ThemeLink(props: LinkProps) {
  const basePath = useThemeBasePath();
  return <Link {...props} to={resolveTo(basePath ?? '', props.to)} />;
}

export function ThemeNavLink(props: NavLinkProps) {
  const basePath = useThemeBasePath();
  return <NavLink {...props} to={resolveTo(basePath ?? '', props.to)} />;
}

export function themeHref(basePath: string | undefined, href: string): string {
  if (!href.startsWith('/')) return href;
  const base = basePath ?? '';
  if (base && href.startsWith(base)) return href;
  if (href.startsWith('/theme/')) return href;
  return base ? `${base}${href}` : href;
}
