import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/api";
import ProductDetail from "./product-detail";
import { ProductDetailSkeleton } from "@/components/ui/skeleton";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(Number(params.id));
  
  if (!product) {
    return {
      title: "Product Not Found | StyleShop",
      description: "The requested product could not be found.",
    };
  }
  
  return {
    title: `${product.title} | StyleShop`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(Number(params.id));
  
  if (!product) {
    notFound();
  }
  
  // Get related products (same category)
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </Suspense>
    </div>
  );
}
