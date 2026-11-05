import { defaultSkuIndex } from '@/lib/product';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import styles from './ProductGrid.module.css';
import type { ProductGridProps } from './ProductGrid.types';

export function ProductGrid({ products, cardSkus, onSelectSku, onOpen }: ProductGridProps) {
  return (
    <section data-section="products" className={styles.section} aria-label="商品一覧">
      <div className={styles.grid}>
        {products.map((item) => (
          <ProductCard
            key={item.product.id}
            item={item}
            skuIndex={cardSkus[item.product.id] ?? defaultSkuIndex(item)}
            onSelectSku={onSelectSku}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}
