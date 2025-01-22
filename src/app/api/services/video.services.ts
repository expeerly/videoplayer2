import { db } from '@/src/db';
import { brand, creator, product, video } from '@/src/db/schema';
import { eq, sql } from 'drizzle-orm';
import { Video } from '@/src/db/types';
import { SupportedLanguage } from '../utils/requestHelpers';

export async function handleCreateVideo(input: Video[]): Promise<Video[]> {
  if (!input?.length) {
    throw new Error('Input is required and cannot be empty');
  }

  try {
    // Get unique creator and product IDs from input
    const uniqueCreatorIds = [...new Set(input.map(v => v.creatorId))].filter(
      (id): id is string => id != null
    );
    const uniqueProductIds = [...new Set(input.map(v => v.productId))].filter(
      (id): id is string => id != null
    );

    // Fetch only the relevant creators and products
    const [validCreatorIds, validProductIds] = await Promise.all([
      db.query.creator.findMany({
        where: (creator, { inArray }) => inArray(creator.id, uniqueCreatorIds),
        columns: { id: true },
      }),
      db.query.product.findMany({
        where: (product, { inArray }) => inArray(product.id, uniqueProductIds),
        columns: { id: true },
      }),
    ]);

    // Create sets for faster lookup
    const creatorIdSet = new Set(validCreatorIds.map(c => c.id));
    const productIdSet = new Set(validProductIds.map(p => p.id));

    // Filter videos with valid references
    const validVideos = input.filter(
      video => creatorIdSet.has(video.creatorId!) && productIdSet.has(video.productId!)
    );

    const invalidVideos = input.filter(
      video => !creatorIdSet.has(video.creatorId!) || !productIdSet.has(video.productId!)
    );
    console.log({ invalidVideos: invalidVideos });

    if (!validVideos.length) return [];

    return (
      (await db
        .insert(video)
        .values(validVideos)
        .onConflictDoUpdate({
          target: [video.id],
          set: {
            videoTitle: sql`EXCLUDED."videoTitle"`,
            videoUrl: sql`EXCLUDED."videoUrl"`,
            playbackId: sql`EXCLUDED."playbackId"`,
            productId: sql`EXCLUDED."productId"`,
            creatorId: sql`EXCLUDED."creatorId"`,
            siteTitle: sql`EXCLUDED."siteTitle"`,
            metaDescription: sql`EXCLUDED."metaDescription"`,
            summary: sql`EXCLUDED."summary"`,
            transcript: sql`EXCLUDED."transcript"`,
            faqs: sql`EXCLUDED."faqs"`,
            published: sql`EXCLUDED."published"`,
            cannonicalTag: sql`EXCLUDED."cannonicalTag"`,
            resolution: sql`EXCLUDED."resolution"`,
            starRating: sql`EXCLUDED."starRating"`,
            updatedAt: sql`CURRENT_TIMESTAMP`,
          },
        })
        .returning()) ?? []
    );
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to create videos');
  }
}

export async function getVideosCount(): Promise<{ count: number }> {
  try {
    const count = await db.$count(video);
    return { count };
  } catch (error) {
    console.error('Error fetching video count:', error);
    throw new Error((error as Error).message);
  }
}

export async function getVideoById(id: string, lang: SupportedLanguage) {
  if (!id) {
    throw new Error('Video ID is required');
  }
  try {
    const [videoData] = await db
      .select({
        id: video.id,
        videoTitle: sql<string>`COALESCE(${video.videoTitle}->${lang}->>'title', ${video.videoTitle}->'en'->>'title')`,
        videoUrl: video.videoUrl,
        playbackId: video.playbackId,
        productId: video.productId,
        creatorId: video.creatorId,
        published: video.published,
        cannonicalTag: video.cannonicalTag,
        resolution: video.resolution,
        starRating: video.starRating,
        siteTitle: sql<string>`COALESCE(${video.siteTitle}->${lang}->>'title', ${video.siteTitle}->'en'->>'title')`,
        metaDescription: sql<string>`COALESCE(${video.metaDescription}->${lang}->>'desc', ${video.metaDescription}->'en'->>'desc')`,
        summary: sql<string>`COALESCE(${video.summary}->${lang}->>'text', ${video.summary}->'en'->>'text')`,
        transcript: sql<string>`COALESCE(${video.transcript}->${lang}->>'transcriptText', ${video.transcript}->'en'->>'transcriptText')`,
        faqs: {
          1: {
            question: sql<string>`${video.faqs}->'faq1'->${lang}->>'faqTitle'`,
            answer: sql<string>`${video.faqs}->'faq1'->${lang}->>'faqAnswer'`,
          },
          2: {
            question: sql<string>`${video.faqs}->'faq2'->${lang}->>'faqTitle'`,
            answer: sql<string>`${video.faqs}->'faq2'->${lang}->>'faqAnswer'`,
          },
          3: {
            question: sql<string>`${video.faqs}->'faq3'->${lang}->>'faqTitle'`,
            answer: sql<string>`${video.faqs}->'faq3'->${lang}->>'faqAnswer'`,
          },
          4: {
            question: sql<string>`${video.faqs}->'faq4'->${lang}->>'faqTitle'`,
            answer: sql<string>`${video.faqs}->'faq4'->${lang}->>'faqAnswer'`,
          },
          5: {
            question: sql<string>`${video.faqs}->'faq5'->${lang}->>'faqTitle'`,
            answer: sql<string>`${video.faqs}->'faq5'->${lang}->>'faqAnswer'`,
          },
        },
        creator: {
          id: creator.id,
          name: creator.creatorName,
          logo: creator.profilePictureURL,
        },
        product: {
          id: product.id,
          globalTradeItemNumber: product.globalTradeItemNumber,
          productName: sql<string>`COALESCE(${product.productName}->${lang}->>'title', ${product.productName}->'en'->>'title')`,
          productSlug: sql<string>`COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title')`,
          productLink: product.productLink,
        },
        brand: {
          id: brand.id,
          name: brand.brandName,
          logo: brand.logo,
          brandSlug: brand.slug,
          websiteURL: brand.websiteURL,
        },
      })
      .from(video)
      .leftJoin(creator, eq(video.creatorId, creator.id))
      .leftJoin(product, eq(video.productId, product.id))
      .leftJoin(brand, eq(product.brandId, brand.id))
      .where(eq(video.id, Number(id)))
      .limit(1);

    return videoData;
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch video details');
  }
}
