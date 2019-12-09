export interface IPostConfig {
    type?: string;
    postType?:string;
    filters?: {
      tag?: string,
      author?: string,
      favorited?: string,
      limit?: number,
      offset?: number
    };
  }