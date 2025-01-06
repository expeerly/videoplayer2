import { NextResponse } from 'next/server';
import { getCategoryCount } from '../services/category.services';
import { getBrandsCount } from '../services/brand.services';
import { getProductsCount } from '../services/product.services';
import { getCreatorsCount } from '../services/creator.services';

export const GET = async () => {
  try {
    const [categories, brands, products, creators] = await Promise.all([
      getCategoryCount(),
      getBrandsCount(),
      getProductsCount(),
      getCreatorsCount(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        categories: categories.count,
        brands: brands.count,
        products: products.count,
        creators: creators.count,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};
