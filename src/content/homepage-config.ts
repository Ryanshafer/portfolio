export const featuredCaseStudySlugs = [
  'mtv-responsive-redesign',
  'mtv-digital-rebrand',
  'showmax-funnel-optimization',
] as const;

export type FeaturedCaseStudySlug = (typeof featuredCaseStudySlugs)[number];
