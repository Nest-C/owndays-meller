import { getProducts } from '@/api/products';
import { productListJsonLd, toJsonLdString } from '@/lib/seo';
import { Hero } from '@/components/layout/Hero/Hero';
import { ProductCatalog } from '@/components/product/ProductCatalog/ProductCatalog';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <ProductCatalog products={products} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdString(productListJsonLd(products)) }}
      />
    </>
  );
}
