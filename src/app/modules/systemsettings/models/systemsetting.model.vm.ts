export class SystemSettingVm {
  email: string;
  phone: string;
  address: string;
  about_us: string;
  privacy_policy: string;
  terms_and_conditions: string;

  allow_public_registration: boolean;
  verification_type: string;
  default_usergroups: number[];

  facebook: string;
  instagram: string;
  whatsapp: string;

  user_ios_version: string;
  user_ios_link: string;
  user_android_version: string;
  user_android_link: string;

  merchant_ios_version: string;
  merchant_ios_link: string;
  merchant_android_version: string;
  merchant_android_link: string;

  credit_announcement: number;
}