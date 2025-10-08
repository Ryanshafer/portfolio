export const featuredCaseStudySlugs = [
  'oritain-ux-research-strategy',
  'mtv-ux-leadership',
  'showmax-funnel-optimization',
] as const;

export type FeaturedCaseStudySlug = (typeof featuredCaseStudySlugs)[number];
