import { NextResponse } from 'next/server';
import { getCategoryCount } from '../services/category.services';
import { getBrandsCount } from '../services/brand.services';
import { getProductsCount } from '../services/product.services';
import { getCreatorsCount } from '../services/creator.services';
import { getVideosCount } from '../services/video.services';
import { handleError } from '../utils/errorHandler';

export const GET = async () => {
  try {
    const [categories, brands, products, creators, videos] = await Promise.all([
      getCategoryCount(),
      getBrandsCount(),
      getProductsCount(),
      getCreatorsCount(),
      getVideosCount(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        categories: categories.count,
        brands: brands.count,
        products: products.count,
        creators: creators.count,
        videos: videos.count,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};
