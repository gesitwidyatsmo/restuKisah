import { Great_Vibes, Cinzel, Cormorant_Garamond, Alex_Brush, Lora, Montserrat, Amiri } from 'next/font/google';

export const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
});

export const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-amiri',
});

export const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const alexBrush = Alex_Brush({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alex-brush',
});

export const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});
