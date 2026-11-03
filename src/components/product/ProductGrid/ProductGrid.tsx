import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import styles from './ProductGrid.module.css';
import type { ProductGridProps } from './ProductGrid.types';

export function ProductGrid({ products, onOpen }: ProductGridProps) {
  return (
    <section id="products" className={styles.section} aria-label="商品一覧">
      <div className={styles.grid}>
        {products.map((item) => (
          <ProductCard key={item.product.id} item={item} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
