
'use client';

import { useHomeStore } from '@/store/home-store';
import { COMPANY } from './catalog';

const SOCIAL_FALLBACKS: Record<string, string> = {
  instagram_url:
    'https://www.instagram.com/rpj.exports/',
  linkedln_url:
    'https://www.linkedin.com/company/rpj-exports/',
};

const SOCIAL_KEYS = [
  'facebook_url',
  'instagram_url',
  'twitter_url',
  'youtube_url',
  'linkedln_url',
];

export function useSettings() {
  const settings = useHomeStore((s) => s.homePageData?.setting);
  const map = useHomeStore((s) => s.homePageData?.map);

  const get = (key: string) =>
    settings?.find((s) => s.key === key)?.value?.trim() || '';

  const socials = SOCIAL_KEYS.map((key) => ({
    key,
    url: get(key) || SOCIAL_FALLBACKS[key] || '',
  })).filter((social) => social.url);

  return {
    email: get('office_mail_address') || COMPANY.email,
    address: get('office_address') || COMPANY.location,
    hours: get('opening_hours'),
    mapEmbed: map?.embed_url || '',
    socials,
  };
}
