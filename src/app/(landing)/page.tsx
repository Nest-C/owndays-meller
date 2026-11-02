import { Hero } from '@/components/layout/Hero/Hero';
import { ProductCatalog } from '@/components/product/ProductCatalog/ProductCatalog';
import { getProducts } from '@/lib/products';
import { productListJsonLd, toJsonLdString } from '@/lib/seo';

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
