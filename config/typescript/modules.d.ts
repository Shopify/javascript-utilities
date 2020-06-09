declare module "url" {
  interface URLDetails {
    pathname: string;
  }

  export function parse(url: string): URLDetails;
}

declare var global: any;
