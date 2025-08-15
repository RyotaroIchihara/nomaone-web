import type { SiteData } from '../types/schema';
import { siteSchema } from '../types/schema';
import allData from './all.json';

export function formatTime(time: string): string {
  return time.replace('?', '–');
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/[^\d-]/g, '');
}

export function formatAddress(address: {
  prefecture: string;
  city: string;
  street: string;
}): string {
  return `${address.prefecture}${address.city}${address.street}`;
}

export async function getSiteData(): Promise<SiteData> {
  const parsed = siteSchema.parse(allData);
  
  // 時間の表記ゆれ補正
  parsed.operations.office_hours = formatTime(parsed.operations.office_hours);
  parsed.operations.service_hours = formatTime(parsed.operations.service_hours);
  
  // 電話番号の正規化
  parsed.office.contacts.tel_fax = formatPhoneNumber(parsed.office.contacts.tel_fax);
  parsed.flow.authority_contact.tel = formatPhoneNumber(parsed.flow.authority_contact.tel);
  
  return parsed;
}

export async function getServiceById(id: string): Promise<SiteData['services'][0] | undefined> {
  const data = await getSiteData();
  return data.services.find(service => service.id === id);
}

export async function getFlowSteps(): Promise<SiteData['flow']['steps']> {
  const data = await getSiteData();
  return data.flow.steps.sort((a, b) => a.no - b.no);
}

export async function getRecruitPositions(): Promise<SiteData['recruit']['positions']> {
  const data = await getSiteData();
  return data.recruit.positions;
}

export function getSiteMetadata() {
  return {
    title: '障害福祉サービス事業所 ノマワン・フレンド',
    description: '東京都小金井市を中心に、移動支援・行動援護・指定特定相談支援のサービスを提供しています。障害のある人もない人も安心で普通に地域生活や社会参加行動を行うための支援を行います。',
    url: 'https://www.nomaone.or.jp/',
    siteName: 'ノマワン・フレンド',
  };
}
