import type { ProductItem } from '@/lib/types';
import { ALL_ITEMS_URL } from '@/constants/site';
import { ProductCard } from '@/components/product/ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: ProductItem[];
  onOpen: (item: ProductItem) => void;
}

export function ProductGrid({ products, onOpen }: ProductGridProps) {
  return (
    <section id="products" className={styles.section} aria-label="商品一覧">
      <div className={styles.grid}>
        {products.map((item) => (
          <ProductCard key={item.product.id} item={item} onOpen={onOpen} />
        ))}
      </div>

      <a href={ALL_ITEMS_URL} className={styles.allItems} target="_blank" rel="noopener noreferrer">
        ALL ITEMS
      </a>
    </section>
  );
}
