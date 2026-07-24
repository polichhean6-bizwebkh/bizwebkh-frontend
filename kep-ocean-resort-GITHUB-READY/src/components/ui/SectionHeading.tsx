interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: Props) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-3 mb-10 ${alignCls}`}>
      {eyebrow && (
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-turquoise-700">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal-900 max-w-2xl">{title}</h2>
      {subtitle && <p className="text-charcoal-600 max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
  );
}
