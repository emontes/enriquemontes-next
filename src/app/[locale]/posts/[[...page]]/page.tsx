// src/app/[locale]/posts/[[...page]]/page.tsx

import { fetchAllPosts } from "@/app/utils/posts";
import type { PostsListData } from "@/app/utils/posts";
import PostsList from "@/components/Posts/PostsList";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import React from 'react';

// Componente de loading skeleton
function PostsLoadingSkeleton() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="pt-8 container mx-auto px-4">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-8 animate-pulse"></div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4 space-y-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-48 h-32 bg-gray-300 rounded"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/4 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de error
function PostsError({ locale }: { locale: string }) {
  // Auto-recargar después de 30 segundos
  React.useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md mx-4">
        <div className="text-6xl mb-4">😴</div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          El servidor de contenido está descansando
        </h1>
        <p className="text-gray-600 mb-6">
          El servidor de Strapi parece estar temporalmente desconectado. 
          Estamos intentando reconectar automáticamente.
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Reintentar ahora
          </button>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Volver
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          La página se actualizará automáticamente en 30 segundos...
        </p>
      </div>
    </div>
  );
}

// Componente wrapper que maneja el estado
function PostsPageContent({ locale, page }: { locale: string; page: number }) {
  return (
    <Suspense fallback={<PostsLoadingSkeleton />}>
      <PostsPageServer locale={locale} page={page} />
    </Suspense>
  );
}

// Componente principal del servidor
async function PostsPageServer({ locale, page }: { locale: string; page: number }) {
  const postsData: PostsListData = await fetchAllPosts(locale, page);
  const messages = await getMessages();

  // Verificar si hay datos válidos o si Strapi está caído
  const hasValidData = postsData && postsData.data && Array.isArray(postsData.data) && postsData.meta;
  const isStrapiDown = !hasValidData || postsData.data.length === 0;

  if (isStrapiDown) {
    return (
      <NextIntlClientProvider messages={messages} locale={locale}>
        <PostsError locale={locale} />
      </NextIntlClientProvider>
    );
  }

  return (
    <div className="bg-gray-100">
      <NextIntlClientProvider messages={messages} locale={locale}>
        <PostsList
          posts={postsData.data || []}
          locale={locale}
          pagination={postsData.meta.pagination}
        />
      </NextIntlClientProvider>
    </div>
  );
}

// Configuración ISR - revalidar cada 5 minutos
export const revalidate = 300;

// Generate static params for common pages at build time
// Additional pages will be generated on-demand (ISR)
export async function generateStaticParams() {
  // Para comportamiento ISR dinámico, generamos solo la primera página
  // Las demás se generarán on-demand
  return [
    {}, // page 1 (empty para catch-all root)
  ];
}

export default async function PostsListPage({
  params,
}: {
  params: Promise<{ locale: string; page?: string[] }>;
}) {
  const {locale, page = []} = await params;
  const pageNumber = page.length > 0 ? parseInt(page[0], 10) : 1;

  return <PostsPageContent locale={locale} page={pageNumber} />;
}

