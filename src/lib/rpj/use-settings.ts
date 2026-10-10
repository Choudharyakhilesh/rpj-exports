'use client';

import { useHomeStore } from '@/store/home-store';
import { COMPANY } from './catalog';

const SOCIAL_KEYS = ['facebook_url', 'instagram_url', 'twitter_url', 'youtube_url', 'linkedln_url'];

/** CMS settings from the backend, with catalogue values as fallbacks. */
export function useSettings() {
  const settings = useHomeStore((s) => s.homePageData?.setting);
  const map = useHomeStore((s) => s.homePageData?.map);
  const get = (key: string) => settings?.find((s) => s.key === key)?.value?.trim() || '';

  return {
    email: get('office_mail_address') || COMPANY.email,
    address: get('office_address') || COMPANY.location,
    hours: get('opening_hours'),
    mapEmbed: map?.embed_url || '',
    socials: SOCIAL_KEYS.map((key) => ({ key, url: get(key) })).filter((s) => s.url),
  };
}
