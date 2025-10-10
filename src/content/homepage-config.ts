export const featuredCaseStudySlugs = [
  'mtv-ux-leadership',
  'oritain-ux-research-strategy',
  'ui-design-complex-workflows',
] as const;

export type FeaturedCaseStudySlug = (typeof featuredCaseStudySlugs)[number];
