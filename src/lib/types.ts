// ─── Type definitions for all API responses & domain models ──────────────────
// Navigation  → MenuItem, RibbonItem, FooterItem, NavigationResponse
// Collection  → TemplateComponent, StoryModel, CollectionItem, HomeTemplateResponse
// Story       → PopularApiItem, LatestApiItem (union → StoryModel via toStoryModel)
// Category    → CategoryItem
// ─────────────────────────────────────────────────────────────────────────────

// Navigation
export interface MenuItem {
  id: number;
  displayTitle: string;
  name: string;
  clientUrl: string;
  parentId: number;
  sequenceNumber: number;
  navigationItemType: string;
  navigationItemValue: string;
  children: MenuItem[];
}

export interface RibbonItem {
  id: number;
  name: string;
  clientUrl: string;
  sequenceNumber: number;
  navigationItemType: string;
  link: string;
}

export interface FooterItem {
  id: number;
  displayTitle: string;
  name: string;
  clientUrl: string;
  sequenceNumber: number;
  navigationItemType: string;
  navigationItemValue: string;
}

export interface NavigationResponse {
  menuList: MenuItem[];
  ribbonResponseDtoList: RibbonItem[];
  ribbonData: string;
  footerList: FooterItem[];
}

// Collection
export interface TemplateComponent {
  id: number;
  title: string;
  collectionId: number;
  sequence: number;
  activeStatus: boolean;
  templateId: number;
  componentId: string;
}

export interface StoryModel {
  storyId: number;
  mainTitle: string;
  subTitle: string;
  fileName: string;
  orderId?: number;
  passedTime: string;
  isLive: number;
  isVideo: number;
  canonicalUrl: string;
  langVersion?: string;
}

export interface StoryListGroup {
  displayTitle?: string;
  slug?: string;
  categoryOrder?: number;
  storyListType?: string;
  stories: StoryModel[];
}

export interface CollectionItem {
  storyList: StoryListGroup[];
  details: Record<string, unknown>;
}

export interface HomeTemplateResponse {
  templateComponentList: TemplateComponent[];
  collection: Record<string, CollectionItem>;
}

// Category
export interface CategoryItem {
  id: number;
  name: string;
  displayTitle: string;
  parentId: number;
  menuId: number;
  slug: string;
  type: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface PaginatedStoryResponse {
  model: StoryModel[];
  totalPages: number;
  currentPage: number;
  totalElements: number;
}

export interface CategoryWithStoriesResponse extends CategoryItem {
  stories: PaginatedStoryResponse;
  canonicalUrl: string;
  ampUrl: string;
  children: CategoryWithStoriesResponse[];
}

// Story details
export interface StoryDetail {
  id: number;
  storyId: number;
  batchNo: number;
  body: string;
  detailType: string;
  creationTime: string;
  banglaDate: string;
  textEditor: boolean;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Writer {
  name: string;
  banglaName: string;
  authorUrl: string;
}

export interface Attachment {
  id: number;
  fileName: string;
  fileExtension: string;
  caption: string;
  alt: string;
  sequenceNumber: number;
}

export interface StoryDetailsResponse {
  id: number;
  version: string;
  mainTitle: string;
  subtitle: string;
  mainImageFileName: string;
  mainOgImageFileName: string;
  bannerImageFileName: string;
  alt: string;
  passedTime: string;
  seoMetaTitle: string;
  expired: boolean;
  live: boolean;
  liveContent: boolean;
  shoulderText: string;
  canonicalUrl: string;
  ampUrl: string;
  storyGroupId: number;
  storyType: string;
  embeddedVideoLink: string | null;
  embeddedVideoType: string | null;
  details: StoryDetail[];
  tags: Tag[];
  writers: Writer[];
  categories: CategoryItem[];
  timelineStories: StoryModel[];
  readMoreStories: StoryModel[];
  attachments: Attachment[];
}

export interface StoryExtraResponse {
  relatedStories: StoryModel[];
}

export interface PopularStoryItem extends StoryModel {
  viewCount: number;
}

export interface PopularStoryResponse {
  json: PopularStoryItem[];
}

export interface CategoryListResponse {
  json: CategoryItem[];
}

export interface CityListResponse {
  json: string[];
}

export interface PrayerTime {
  uniqueID: number;
  currentDate: string;
  date: string;
  hijriDate: string;
  sunrise: string;
  sunset: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  iftar: string;
  sehr: string;
}

export interface PrayerTimeResponse {
  data: PrayerTime[];
}

// Sidebar widget API types
export interface PopularApiItem {
  id: number;
  mainTitle: string;
  subTitle: string;
  fileName: string;
  hasVideo: boolean;
  canonicalUrl: string;
  isLive: number;
  viewCount: number;
}

export interface LatestApiItem {
  id: number;
  mainTitle: string;
  passedTime: string;
  fileName?: string;
  hasVideo: boolean;
  canonicalUrl: string;
  isLive: number;
  datePublish: string;
  viewCount: number;
}

export interface LatestResponse {
  model: LatestApiItem[];
}
