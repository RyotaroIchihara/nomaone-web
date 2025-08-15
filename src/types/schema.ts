import { z } from 'zod';

// 住所スキーマ
const addressSchema = z.object({
  postal_code: z.string(),
  prefecture: z.string(),
  city: z.string(),
  street: z.string(),
  access_note: z.string().optional(),
});

// 連絡先スキーマ
const contactsSchema = z.object({
  tel_fax: z.string(),
  email: z.string().email(),
  website: z.string().url(),
});

// 代表者スキーマ
const representativeSchema = z.object({
  name: z.string(),
  title: z.string(),
  profile: z.string(),
});

// 協力団体スキーマ
const partnerSchema = z.object({
  name: z.string(),
  role: z.string(),
  representative: z.string().optional(),
  address: z.string().optional(),
  tel: z.string().optional(),
});

// 事務所スキーマ
const officeSchema = z.object({
  legal_name: z.string(),
  brand_name: z.string(),
  mission: z.string(),
  address: addressSchema,
  contacts: contactsSchema,
  representative: representativeSchema,
  partners: z.array(partnerSchema),
});

// 運営スキーマ
const operationsSchema = z.object({
  office_hours: z.string(),
  service_hours: z.string(),
  service_areas: z.array(z.string()),
});

// サービススキーマ
const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

// 連絡先スキーマ
const contactSchema = z.object({
  inquiry_url: z.string().url(),
  email: z.string().email(),
  note: z.string(),
});

// フローステップスキーマ
const flowStepSchema = z.object({
  no: z.number(),
  title: z.string(),
  detail: z.string(),
});

// フロースキーマ
const flowSchema = z.object({
  source: z.object({
    title: z.string(),
    url: z.string().url(),
  }),
  steps: z.array(flowStepSchema),
  authority_contact: z.object({
    department: z.string(),
    tel: z.string(),
  }),
});

// 採用ポジションスキーマ
const positionSchema = z.object({
  title: z.string(),
  employment_type: z.array(z.string()),
  wage: z.string(),
  description: z.string(),
  plus_work_if_qualified: z.string().optional(),
  appeal: z.string(),
  trial_period: z.object({
    length: z.string(),
    conditions: z.string(),
  }),
  requirements: z.object({
    must: z.array(z.string()),
    preferred: z.array(z.string()).optional(),
    special_allowance: z.array(z.string()).optional(),
  }),
});

// 採用スキーマ
const recruitSchema = z.object({
  url: z.string().url(),
  positions: z.array(positionSchema),
});

// メインコンテンツスキーマ
const mainSchema = z.object({
  main_copy: z.string(),
  notices: z.array(z.string()),
});

// ルートスキーマ
export const siteSchema = z.object({
  version: z.string(),
  updatedAt: z.string(),
  office: officeSchema,
  operations: operationsSchema,
  services: z.array(serviceSchema),
  contact: contactSchema,
  flow: flowSchema,
  recruit: recruitSchema,
  main: mainSchema,
});

export type SiteData = z.infer<typeof siteSchema>;
