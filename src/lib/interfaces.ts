export interface INotify {
    message: string,
    options?: {
        type: "success" | "error" | "info" | "warning",
        autoClose: number
    }
}

export interface ISearchedArticleJson {
    pages: IWikipediaArticle[];
}

export interface IWikipediaArticle {
    id: number;
    title: string;
    excerpt: string;
    key: string;
    description: string;
    matched_title: null | string;
    thumbnail: {
        duration: number;
        height: number;
        width: number;
        mimetype: string;
        url: string;
    }

}

export interface IArticleStructure {
    tag: string;
    content: string | null;
  }

  interface ContentUrls {
    desktop: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
    mobile: {
      page: string;
      revisions: string;
      edit: string;
      talk: string;
    };
  }
  
  interface Image {
    source: string;
    width: number;
    height: number;
  }
  
  interface Titles {
    canonical: string;
    display: string;
    normalized: string;
  }
  
  export interface IDailyArticleStructure {
    content_urls: ContentUrls;
    description: string;
    description_source: string;
    dir: string;
    displaytitle: string;
    extract: string;
    extract_html: string;
    lang: string;
    namespace: {
      id: number;
      text: string;
    };
    normalizedtitle: string;
    originalimage: Image;
    pageid: number;
    revision: string;
    thumbnail: Image;
    tid: string;
    timestamp: string;
    title: string;
    titles: Titles;
    type: string;
    wikibase_item: string;
  }