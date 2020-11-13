import { Banner } from 'app/modules/banners/models/banner.model';
import { Event } from 'app/modules/events/models/event.model';
import { Promotion } from 'app/modules/promotions/models/promotion.model';

export interface Landing {
  banners: Banner[];
  events: Event[];
  promotions: Promotion[];
}