import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'outline' | 'outlineLight' | 'ghost' | 'white' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const base = 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

const variants: Record<Variant, string> = {
  primary: 'bg-ocean-700 text-white hover:bg-ocean-800',
  secondary: 'bg-sand-400 text-charcoal-900 hover:bg-sand-500',
  outline: 'border border-white/70 text-white hover:bg-white/10',
  outlineLight: 'border border-ocean-200 text-ocean-800 hover:bg-ocean-50',
  ghost: 'text-ocean-800 hover:bg-ocean-50',
  white: 'bg-white text-turquoise-800 hover:bg-sand-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}

export function LinkButton({ variant = 'primary', size = 'md', className = '', to, ...props }: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  return <Link to={to} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
