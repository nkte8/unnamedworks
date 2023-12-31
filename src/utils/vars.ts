// global vars
export const lambdaurl:string = import.meta.env.LAMBDA_URL;
export const post_url:string = "/post";
export const gallery_url:string = "/gallery";
export const gallery_contents_count: number = 8;
export const website_title:string = "ㅤ"
export const indexpage_slug:string = "index"
export const login_page_path:string = "/secret"
export const isProduction:boolean = import.meta.env.MODE === "production"

export const outDir:string = "./docs"