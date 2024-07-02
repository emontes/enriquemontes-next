interface Metadata {
  title?: string;
  description?: string;
  keywords?: string;
  openGraph?: {
    type?: string;
    locale?: string;
    url?: string;
    siteName?: string;
    images?: string[];
  };
  twitter?: {
    card?: string;
    creator?: string;
  };
  alternates?: {
    canonical?: string;
  };
}

const MetadataBuilder = ({ seo }: { seo?: any }): Metadata => {
  const metadata: Metadata = {};

  // Asignar valores principales
  if (seo?.metaTitle) {
    metadata.title = seo.metaTitle;
  }
  if (seo?.metaDescription) {
    metadata.description = seo.metaDescription;
  }
  if (seo?.keywords) {
    metadata.keywords = seo.keywords;
  }

  // Asignación de Canonical URL
  if (seo?.canonical) {
    metadata.alternates = {
      canonical: seo.canonical
    };
  }

  // Construir OpenGraph
  if (seo?.metaSocial?.length > 0 || seo?.metaImage?.data?.attributes?.url) {
    metadata.openGraph = {
      type: 'website',
      locale: 'en_us', // Ajustar según sea necesario
      url: 'https://enriquemontes.com', // Reemplaza con tu URL
      siteName: 'Enrique Montes', // Reemplaza con el nombre de tu sitio
    };

    if (seo?.metaImage?.data?.attributes?.url) {
      metadata.openGraph.images = [seo.metaImage.data.attributes.url];
    }
  }

  // Construir Twitter
  if (seo?.metaSocial?.length > 0) {
    metadata.twitter = {
      card: 'summary_large_image',
      creator: '@el_ade' // Reemplaza con tu handle de Twitter
    };
  }

  return metadata;
};

export default MetadataBuilder;
