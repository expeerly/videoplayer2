// app/server-sitemap.xml/route.ts
import { getServerSideSitemap, ISitemapField, IVideoEntry } from 'next-sitemap';
import { getAllVideos } from '../api/services/video.services';

export const revalidate = 0;
export async function GET() {
  const sitemapData: ISitemapField[] = [];

  const Allvideos = await getAllVideos('en');

  let sitemapField: ISitemapField = {
    loc: 'https://example.com/page1',
    lastmod: '2023-07-03',
    trailingSlash: true,
    videos: [],
  };

  let Video: IVideoEntry = {
    title: '',
    thumbnailLoc: new URL(
      'https://stream.mux.com/q2EyUPCM0000k3QbfjLVTmEL5N6PDL701aovfWx7QByv84.m3u8'
    ),
    description: '',
    uploader: { name: '' },
  };

  if (Allvideos) {
    let DetailPageLinks;

    Allvideos.map(data => {
      const videoTitle = data.videoTitle;
      const description = data.metaDescription;

      const videoId = data.id;
      const categorySlug = data.category?.slug;
      const brandSlug = data.brand?.brandSlug;
      const productSlug = data.product?.productSlug;

      DetailPageLinks = `${process.env.SITEBASEURL}video-reviews/${
        categorySlug
      }/${brandSlug}/${productSlug}/${videoId}`;

      const playbackID = data.playbackId;

      Video = {
        title: videoTitle,
        description: description,
        uploader: {
          name: data.creator?.name || 'Unknown',
          info: new URL(DetailPageLinks),
        },
        contentLoc: new URL(data.videoUrl),
        thumbnailLoc: new URL(`https://image.mux.com/${playbackID}/thumbnail.webp?time=1`),
        requiresSubscription: false,
        tag: `${data.brand?.name}`,
        rating: data?.rating ?? undefined,
      };

      sitemapField = {
        loc: DetailPageLinks,
        lastmod: data.updatedAt
          ? data.updatedAt.toISOString()
          : data.createdAt
            ? data.createdAt.toISOString()
            : undefined,
        trailingSlash: false,
        videos: [Video],
      };

      sitemapData.push(sitemapField);
    });
  }

  return getServerSideSitemap(sitemapData);
}
