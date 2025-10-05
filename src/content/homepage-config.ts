export const featuredCaseStudySlugs = [
  'building-design-systems',
  'mtv-brand-cohesion',
  'optimizing-showmax-funnel',
] as const;

export type FeaturedCaseStudySlug = (typeof featuredCaseStudySlugs)[number];
