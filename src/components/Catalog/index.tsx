import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import api from "../../services/api";
import { addProductToCart } from "../../store/modules/cart/actions";

import { ProductsProps } from "../../store/modules/cart/types/products";

export function Catalog() {
  const dispatch = useDispatch();
  const [catalog, setCatalog] = useState<ProductsProps[]>([]);

  useEffect(() => {
    api.get("products").then((response: any) => {
      setCatalog(response.data);
    });
  }, []);

  const handleAddProductToCart = useCallback(
    (product: ProductsProps) => {
      dispatch(addProductToCart(product));
    },
    [dispatch]
  );

  return (
    <main>
      <h1>Catalog</h1>

      {catalog.map((product) => (
        <article key={product.id}>
          <strong>{product.title}</strong> {"--"}
          <span>{product.price}</span> {"  "}
          <button type="button" onClick={() => handleAddProductToCart(product)}>
            Adicionar ao carrinho
          </button>
        </article>
      ))}
    </main>
  );
}
