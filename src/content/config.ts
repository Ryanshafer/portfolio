// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const studies = defineCollection({
  schema: z.object({
    title:            z.string(),
    description:      z.string(),
    pubDate:          z.coerce.date(),
    author:           z.string(),
    heroImageWide:    z.string(),
    heroImagePromo:   z.string(),
    bgFill:           z.string().optional(),
    readTime:         z.string(),
    categories:       z.array(z.string()),
    summary:          z.object({
    role:             z.string().optional(),
    problem:          z.string().optional(),
    insight:          z.string().optional(),
    approach:         z.string().optional(),
    impact:           z.string().optional(),
    stats:            z.array(z.object({
    stat:             z.string(),
    label:            z.string(),
    })).optional(),
  }).optional(),
  }),
});

export const collections = {
  studies,
};