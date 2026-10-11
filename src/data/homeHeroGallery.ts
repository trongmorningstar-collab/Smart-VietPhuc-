export interface GalleryCard {
  id: string;
  gender: 'nam' | 'nữ';
  eventId: string;
  title: string;
  image: string;
  description?: string;
}

export const homeHeroGallery: GalleryCard[] = [
  // Nam
  { id: 'm-chua', gender: 'nam', eventId: 'Đi lễ chùa', title: 'Đi lễ chùa', image: '/assets/images/event_1_chua.jpg' },
  { id: 'm-truong', gender: 'nam', eventId: 'Sự kiện trường', title: 'Sự kiện trường', image: '/assets/images/event_2_truong.jpg' },
  { id: 'm-lehoi', gender: 'nam', eventId: 'Lễ hội', title: 'Lễ hội', image: '/assets/images/event_3_lehoi.jpg' },
  { id: 'm-daopho', gender: 'nam', eventId: 'Dạo phố', title: 'Dạo phố', image: '/assets/images/event_5_daopho.jpg' },
  { id: 'm-dutiec', gender: 'nam', eventId: 'Dự tiệc', title: 'Dự tiệc', image: '/assets/images/event_6_dutiec.jpg' },
  
  // Nữ
  { id: 'f-chua', gender: 'nữ', eventId: 'Đi lễ chùa', title: 'Đi lễ chùa', image: '/assets/images/female-temple.jpg' },
  { id: 'f-truong', gender: 'nữ', eventId: 'Sự kiện trường', title: 'Sự kiện trường', image: '/assets/images/female-school.jpg' },
  { id: 'f-lehoi', gender: 'nữ', eventId: 'Lễ hội', title: 'Lễ hội', image: '/assets/images/female-festival.jpg' },
  { id: 'f-daopho', gender: 'nữ', eventId: 'Dạo phố', title: 'Dạo phố', image: '/assets/images/female-street.jpg' },
  { id: 'f-dutiec', gender: 'nữ', eventId: 'Dự tiệc', title: 'Dự tiệc', image: '/assets/images/female-party.jpg' }
];
