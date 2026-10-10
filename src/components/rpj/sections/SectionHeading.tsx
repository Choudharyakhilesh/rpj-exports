import { SplitText } from '../motion/SplitText';

export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = 'light',
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  body?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
}) {
  const dark = tone === 'dark';
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p
        className={`eyebrow flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${
          dark ? 'text-gold-bright' : 'text-gold-deep'
        }`}
      >
        <span className={`h-px w-8 ${dark ? 'bg-gold-bright' : 'bg-gold-deep'}`} />
        {eyebrow}
      </p>
      <SplitText
        as="h2"
        className={`mt-5 font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.05] ${
          dark ? 'text-cream' : 'text-ink'
        }`}
      >
        {title}
      </SplitText>
      {body && (
        <p
          className={`mt-6 text-base leading-relaxed md:text-lg ${
            dark ? 'text-cream/65' : 'text-stone-ink'
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}
