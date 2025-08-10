import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const clearedItems = [];

    // CLEAR EVERYTHING - All common paths and API routes
    const allPaths = [
      // Home pages with locales
      '/',
      '/en',
      '/de',
      '/fr',
      '/it',

      // Video reviews section
      '/video-reviews',
      '/en/video-reviews',
      '/de/video-reviews',
      '/fr/video-reviews',
      '/it/video-reviews',

      // Brand routes
      '/video-reviews/brand',
      '/en/video-reviews/brand',
      '/de/video-reviews/brand',
      '/fr/video-reviews/brand',
      '/it/video-reviews/brand',

      // Category routes
      '/video-reviews/productcategory',
      '/en/video-reviews/productcategory',
      '/de/video-reviews/productcategory',
      '/fr/video-reviews/productcategory',
      '/it/video-reviews/productcategory',

      // Reviewers routes
      '/video-reviews/reviewers',
      '/en/video-reviews/reviewers',
      '/de/video-reviews/reviewers',
      '/fr/video-reviews/reviewers',
      '/it/video-reviews/reviewers',

      // Explore routes
      '/explore',
      '/en/explore',
      '/de/explore',
      '/fr/explore',
      '/it/explore',

      // API routes
      '/api/brand',
      '/api/brand/all',
      '/api/brand/logos',
      '/api/brand/pageInfo',
      '/api/brand/videos',
      '/api/category',
      '/api/category/all',
      '/api/category/pageInfo',
      '/api/category/videos',
      '/api/creator',
      '/api/creator/all',
      '/api/creator/videos',
      '/api/product',
      '/api/video',
      '/api/video/all',
      '/api/video/explore',
      '/api/counts',
      '/api/headings',
      '/api/landingPage',

      // Dynamic routes patterns (will clear related cached data)
      '/video-reviews/[productcategory]/[brandname]/[productname]/[uniqueId]',
      '/video-reviews/brand/[brandProfile]',
      '/video-reviews/productcategory/[categoryProfile]',
      '/video-reviews/reviewers/[reviewerProfile]',
      '/explore/[...videoId]',
      '/api/brand/[brandId]',
      '/api/category/[categoryId]',
      '/api/creator/[creatorId]',
      '/api/video/[videoId]',
    ];

    // Clear all common paths
    for (const path of allPaths) {
      try {
        revalidatePath(path);
        clearedItems.push(`Path: ${path}`);
      } catch (error) {
        console.error(`Failed to revalidate path ${path}:`, error);
      }
    }

    // Clear all common cache tags
    const allTags = [
      'posts',
      'users',
      'products',
      'api-data',
      'user-data',
      'dashboard',
      'auth',
      'settings',
    ];

    for (const tag of allTags) {
      try {
        revalidateTag(tag);
        clearedItems.push(`Tag: ${tag}`);
      } catch (error) {
        console.error(`Failed to revalidate tag ${tag}:`, error);
      }
    }

    // Also handle any custom paths/tags from request body if provided
    let requestBody;
    try {
      requestBody = await request.json();
    } catch {
      requestBody = {};
    }

    const { paths, tags } = requestBody || {};

    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        try {
          revalidatePath(path);
          clearedItems.push(`Custom Path: ${path}`);
        } catch (error) {
          console.error(`Failed to revalidate custom path ${path}:`, error);
        }
      }
    }

    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        try {
          revalidateTag(tag);
          clearedItems.push(`Custom Tag: ${tag}`);
        } catch (error) {
          console.error(`Failed to revalidate custom tag ${tag}:`, error);
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'ALL CACHES CLEARED - This endpoint automatically clears everything!',
        cleared: clearedItems,
        timestamp: new Date().toISOString(),
        totalCleared: clearedItems.length,
        instructions: {
          clientSide:
            'For complete cache clearing, also refresh your browser (Ctrl+F5) or clear client-side cache',
          swr: 'Call mutate(() => true, undefined, { revalidate: true }) to clear all SWR cache',
          reactQuery: 'Call queryClient.clear() to clear all React Query cache',
          next: 'All Next.js server-side caches have been cleared automatically',
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    console.error('Cache clearing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to clear cache',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
      }
    );
  }
}
