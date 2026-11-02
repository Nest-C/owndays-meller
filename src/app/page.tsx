import { Footer } from '@/components/layout/Footer/Footer';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Hero } from '@/components/layout/Hero/Hero';
import { ProductCatalog } from '@/components/product/ProductCatalog/ProductCatalog';
import { getProducts } from '@/lib/products';
import { productListJsonLd, toJsonLdString } from '@/lib/seo';

/**
 * Server Component: products are fetched on the server, so every card
 * (names, prices, descriptions) is already in the HTML crawlers receive.
 */
export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <ProductCatalog products={products} />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdString(productListJsonLd(products)) }}
      />
    </>
  );
}
