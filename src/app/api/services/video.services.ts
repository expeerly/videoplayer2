import { db } from '@/src/db';
import { brand, category, creator, product, video } from '@/src/db/schema';
import { eq, sql, not, and, notInArray } from 'drizzle-orm';
import { QAPair, Video } from '@/src/db/types';
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

export async function getVideoById(
  id: string | number,
  lang: SupportedLanguage,
  filters: { brandSlug?: string; productSlug?: string; categorySlug?: string }
) {
  if (!id) {
    throw new Error('Video ID is required');
  }

  const whereConditions = [eq(video.id, Number(id))];

  if (filters?.brandSlug) {
    whereConditions.push(eq(brand.slug, filters.brandSlug));
  }

  if (filters?.productSlug) {
    whereConditions.push(
      sql`COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title') = ${filters.productSlug}`
    );
  }

  if (filters?.categorySlug) {
    whereConditions.push(
      sql`COALESCE(${category.categoryData}->${lang}->>'urlSlug', ${category.categoryData}->'en'->>'urlSlug') = ${filters.categorySlug}`
    );
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
        creator: {
          id: creator.id,
          name: sql<string>`CONCAT(${creator.firstName}, ' ', LEFT(${creator.lastName}, 1), '.')`,
          logo: creator.profilePictureURL,
          slug: sql<string>`LOWER(CONCAT(REPLACE(${creator.firstName}, ' ', '-'), '-', ${creator.id}))`,
        },
        product: {
          id: product.id,
          globalTradeItemNumber: product.globalTradeItemNumber,
          productName: sql<string>`COALESCE(${product.productName}->${lang}->>'title', ${product.productName}->'en'->>'title')`,
          productSlug: sql<string>`COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title')`,
          productPicture: product.productPicture,
          productLink: product.productLink,
        },
        brand: {
          id: brand.id,
          name: brand.brandName,
          logo: brand.logo,
          brandSlug: brand.slug,
          websiteURL: brand.websiteURL,
        },
        category: {
          id: category.id,
          name: sql<string>`COALESCE(${category.categoryData}->${lang}->>'categoryName', ${category.categoryData}->'en'->>'categoryName')`,
          slug: sql<string>`COALESCE(${category.categoryData}->${lang}->>'urlSlug', ${category.categoryData}->'en'->>'urlSlug')`,
        },
      })
      .from(video)
      .leftJoin(creator, eq(video.creatorId, creator.id))
      .leftJoin(product, eq(video.productId, product.id))
      .leftJoin(brand, eq(product.brandId, brand.id))
      .leftJoin(category, eq(product.categoryId, category.id))
      .where(and(...whereConditions))
      .limit(1);

    if (!videoData) {
      throw new Error('Video not found');
    }

    return videoData;
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch video details');
  }
}

export async function getVideoDetailById(
  id: string | number,
  lang: SupportedLanguage,
  filters: { brandSlug?: string; productSlug?: string; categorySlug?: string }
) {
  if (!id) {
    throw new Error('Video ID is required');
  }

  const whereConditions = [eq(video.id, Number(id))];

  if (filters?.brandSlug) {
    whereConditions.push(eq(brand.slug, filters.brandSlug));
  }

  if (filters?.productSlug) {
    whereConditions.push(
      sql`COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title') = ${filters.productSlug}`
    );
  }

  if (filters?.categorySlug) {
    whereConditions.push(
      sql`COALESCE(${category.categoryData}->${lang}->>'urlSlug', ${category.categoryData}->'en'->>'urlSlug') = ${filters.categorySlug}`
    );
  }

  try {
    const [videoData] = await db
      .select({
        id: video.id,
        summary: sql<string>`COALESCE(${video.summary}->${lang}->>'text', ${video.summary}->'en'->>'text')`,
        transcript: {
          text: sql<string>`COALESCE(${video.transcript}->${lang}->>'transcriptText', ${video.transcript}->'en'->>'transcriptText')`,
          title: sql<string>`COALESCE(${video.transcript}->${lang}->>'transcriptTitle', ${video.transcript}->'en'->>'transcriptTitle')`,
        },
        starRating: video.starRating,
        faqs: {
          question_1: sql<string>`${video.faqs}->'faq1'->${lang}->>'faqTitle'`,
          answer_1: sql<string>`${video.faqs}->'faq1'->${lang}->>'faqAnswer'`,
          question_2: sql<string>`${video.faqs}->'faq2'->${lang}->>'faqTitle'`,
          answer_2: sql<string>`${video.faqs}->'faq2'->${lang}->>'faqAnswer'`,
          question_3: sql<string>`${video.faqs}->'faq3'->${lang}->>'faqTitle'`,
          answer_3: sql<string>`${video.faqs}->'faq3'->${lang}->>'faqAnswer'`,
          question_4: sql<string>`${video.faqs}->'faq4'->${lang}->>'faqTitle'`,
          answer_4: sql<string>`${video.faqs}->'faq4'->${lang}->>'faqAnswer'`,
          question_5: sql<string>`${video.faqs}->'faq5'->${lang}->>'faqTitle'`,
          answer_5: sql<string>`${video.faqs}->'faq5'->${lang}->>'faqAnswer'`,
        },
        product: {
          globalTradeItemNumber: product.globalTradeItemNumber,
          productName: sql<string>`COALESCE(${product.productName}->${lang}->>'title', ${product.productName}->'en'->>'title')`,
          productLink: product.productLink,
        },
        brand: {
          name: brand.brandName,
          logo: brand.logo,
          brandSlug: brand.slug,
        },
        creator: {
          name: sql<string>`CONCAT(${creator.firstName}, ' ', LEFT(${creator.lastName}, 1), '.')`,
        },
      })
      .from(video)
      .leftJoin(creator, eq(video.creatorId, creator.id))
      .leftJoin(product, eq(video.productId, product.id))
      .leftJoin(brand, eq(product.brandId, brand.id))
      .leftJoin(category, eq(product.categoryId, category.id))
      .where(and(...whereConditions))
      .limit(1);

    if (!videoData) {
      throw new Error('Video not found');
    }

    return {
      ...videoData,
      faqs: Object.entries(videoData.faqs).reduce((acc: QAPair[], [key, value]) => {
        if (key.startsWith('question')) {
          const index = key.split('_')[1];
          const answerKey = `answer_${index}` as keyof typeof videoData.faqs;
          const answer = videoData.faqs[answerKey];
          if (!!value && !!answer) {
            acc.push({
              question: value,
              answer: answer,
            });
          }
        }
        return acc;
      }, [] as QAPair[]),
    };
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch video details');
  }
}

export async function getProductWithRelatedVideos(videoId: string, lang: SupportedLanguage) {
  try {
    const existingVideo = await db.query.video.findFirst({
      where: eq(video.id, Number(videoId)),
    });

    if (!existingVideo) {
      throw new Error('Video not found');
    }

    const [[productInfo], productVideos] = await Promise.all([
      db
        .select({
          id: product.id,
          name: sql<string>`COALESCE(${product.productName}->${lang}->>'title', ${product.productName}->'en'->>'title')`,
          logo: product.productPicture,
          info: {
            reviewsCount: sql<number>`COUNT(${video.id})`,
            rating: sql<number>`(
              SELECT ROUND(COALESCE(AVG(${video.starRating}), 0)::numeric, 2)
              FROM ${video}
              WHERE ${video.productId} = ${product.id}
            )`,
          },
        })
        .from(product)
        .innerJoin(video, eq(video.productId, product.id))
        .groupBy(product.id)
        .where(eq(video.id, Number(videoId)))
        .limit(1),
      db
        .select({
          id: video.id,
          playbackId: video.playbackId,
          videoUrl: video.videoUrl,
          resolution: video.resolution,
          productName: sql<string>`COALESCE(${product.productName}->${lang}->>'title', ${product.productName}->'en'->>'title')`,
          productSlug: sql<string>`COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title')`,
          categorySlug: sql<string>`COALESCE(${category.categoryData}->${lang}->>'urlSlug', ${category.categoryData}->'en'->>'urlSlug')`,
          brandId: product.brandId,
          brandName: brand.brandName,
          brandLogo: brand.logo,
          brandSlug: brand.slug,
          rating: video.starRating,
        })
        .from(video)
        .innerJoin(product, eq(video.productId, product.id))
        .innerJoin(brand, eq(product.brandId, brand.id))
        .innerJoin(category, eq(product.categoryId, category.id))
        .where(
          and(eq(product.id, existingVideo.productId as string), not(eq(video.id, Number(videoId))))
        )
        .limit(3),
    ]);

    return {
      ...productInfo,
      videos: productVideos,
    };
  } catch (error) {
    console.error('Error fetching related videos:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch related videos');
  }
}

export async function getExploreVideos(
  videoIds: number[],
  lang: SupportedLanguage,
  {
    brandSlug,
    productSlug,
    creatorSlug,
  }: { brandSlug?: string; productSlug?: string; creatorSlug?: string }
) {
  try {
    const whereConditions = [notInArray(video.id, videoIds)];

    if (brandSlug) {
      whereConditions.push(eq(brand.slug, brandSlug));
    }

    if (productSlug) {
      whereConditions.push(
        sql`COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title') = ${productSlug}`
      );
    }

    if (creatorSlug) {
      whereConditions.push(
        sql`LOWER(CONCAT(REPLACE(${creator.firstName}, ' ', '-'), '-', ${creator.id})) = ${creatorSlug.trim()}`
      );
    }

    let randomVideoIds = (
      await db
        .select({
          id: video.id,
        })
        .from(video)
        .innerJoin(product, eq(video.productId, product.id))
        .innerJoin(brand, eq(product.brandId, brand.id))
        .innerJoin(creator, eq(video.creatorId, creator.id))
        .where(and(...whereConditions))
        .orderBy(sql`RANDOM()`)
        .limit(2)
    ).map(({ id }) => id);

    if (randomVideoIds.length === 0) {
      if (videoIds.length === 0) {
        throw new Error('No videos found');
      }
      randomVideoIds = videoIds;
    }

    if (randomVideoIds.length === 1 && videoIds.length > 0) {
      randomVideoIds = [randomVideoIds[0], videoIds[0]];
    }

    const videoResults = await Promise.all(randomVideoIds.map(id => getVideoById(id, lang)));

    return videoResults;
  } catch (error) {
    console.error('Error fetching related videos:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch related videos');
  }
}

export async function getAllVideos(lang: SupportedLanguage) {
  try {
    const videos = await db
      .select({
        id: video.id,
        videoTitle: sql<string>`COALESCE(${video.videoTitle}->${lang}->>'title', ${video.videoTitle}->'en'->>'title')`,
        videoUrl: video.videoUrl,
        playbackId: video.playbackId,
        metaDescription: sql<string>`COALESCE(${video.metaDescription}->${lang}->>'desc', ${video.metaDescription}->'en'->>'desc')`,
        rating: video.starRating,
        creator: {
          name: sql<string>`CONCAT(${creator.firstName}, ' ', LEFT(${creator.lastName}, 1), '.')`,
          slug: sql<string>`LOWER(CONCAT(REPLACE(${creator.firstName}, ' ', '-'), '-', ${creator.id}))`,
        },
        product: {
          id: product.id,
          productName: sql<string>`COALESCE(${product.productName}->${lang}->>'title', ${product.productName}->'en'->>'title')`,
          productSlug: sql<string>`COALESCE(${product.productSlug}->${lang}->>'title', ${product.productSlug}->'en'->>'title')`,
        },
        brand: {
          id: brand.id,
          name: brand.brandName,
          brandSlug: brand.slug,
        },
        category: {
          id: category.id,
          name: sql<string>`COALESCE(${category.categoryData}->${lang}->>'categoryName', ${category.categoryData}->'en'->>'categoryName')`,
          slug: sql<string>`COALESCE(${category.categoryData}->${lang}->>'urlSlug', ${category.categoryData}->'en'->>'urlSlug')`,
        },
        createdAt: video.createdAt,
        updatedAt: video.updatedAt,
      })
      .from(video)
      .leftJoin(creator, eq(video.creatorId, creator.id))
      .leftJoin(product, eq(video.productId, product.id))
      .leftJoin(brand, eq(product.brandId, brand.id))
      .leftJoin(category, eq(product.categoryId, category.id));

    if (!videos.length) {
      console.warn('No videos found.');
      return [];
    }

    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch videos');
  }
}
