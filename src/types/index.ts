export type localeParamType = {
  lang: string
}

export type StrapiButtonType = {
  id: number;
  Text: string;
  Link: string;
  Primary: boolean;
}

export type StrapiHeading = {
  HeadingText: string;
  HeadingType: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export type StrapiImage = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      url: string;
    }
  }
}
export type StrapiImageCollection = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      url: string;
    }
  }[]
}

export type StrapiResources = {
  data: {
    id: number;
    documentId: string;
    attributes: {
      title: string;
      date: string;
      url: string;
      slug?: string;
      image: StrapiImage;
    }
    
  }[];
}

export type StrapiDevelopments = {
  data: {
    id: number;
    attributes: {
      title: string;
      slug: string;
      description: string;
      github: string;
      url: string;
      created: Date;
      image: StrapiImage;
      resources: {
        data: {
          id: number;
          documentId: string;
          attributes: {
            title: string;
            date: string;
            url: string;
            slug?: string;
            image: StrapiImage;
          };
        }[];
      };
    }
    
  }[];
}

export type StrapiTestimonials = {
  data: {
    id: number;
    attributes: {
      name: string;
      title: string;
      text: string;
      image: StrapiImage;
    }
  }[];
}