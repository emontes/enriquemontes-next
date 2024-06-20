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
    attributes: {
      title: string;
      date: string;
      url: string;
      image: StrapiImage;
    }
    
  }[];
}