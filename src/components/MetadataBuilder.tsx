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
}

const MetadataBuilder = ({ seo }: { seo?: any }) => {
  const metadata: Metadata = {};

  // Add title and description (ensure valid values)
  if (seo?.metaTitle) {
    metadata.title = seo.metaTitle;
  }
  if (seo?.metaDescription) {
    metadata.description = seo.metaDescription;
  }
  if (seo?.keywords) {
    metadata.keywords = seo.keywords;
  }

  // Build OpenGraph (include only if properties exist)
  const openGraph: Metadata['openGraph'] = {};
  if (seo?.metaSocial?.length > 0) {
    openGraph.type = 'website';
    openGraph.locale = 'en_us'; // Adjust as needed
    openGraph.url = 'https://enriquemontes.com'; // Replace with your URL
    openGraph.siteName = 'Enrique Montes'; // Replace with your site name
    // Add more OpenGraph properties based on `seo` data
  }
  if (seo?.metaImage?.data?.attributes?.url) {
    openGraph.images = [seo.metaImage.data.attributes.url];
  }
  if (Object.keys(openGraph).length > 0) {
    metadata.openGraph = openGraph;
  }

  // Build Twitter (include only if properties exist)
  const twitter: Metadata['twitter'] = {};
  if (seo?.metaSocial?.length > 0) {
    twitter.card = 'summary_large_image';
    twitter.creator = '@el_ade'; // Replace with your Twitter handle
    // Add more Twitter properties based on `seo` data
  }
  if (Object.keys(twitter).length > 0) {
    metadata.twitter = twitter;
  }

  return metadata;
};

export default MetadataBuilder;