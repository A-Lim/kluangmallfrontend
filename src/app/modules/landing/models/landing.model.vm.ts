import { LandingDetail } from 'app/modules/landing/models/landing-detail.model';

export class LandingVm {
  app: string;
  banners: LandingDetail[];
  events: LandingDetail[];
  promotions: LandingDetail[];
}