import * as url from 'url';

export function getPath(urlParam: string): string {
  if (typeof window === 'undefined') {
    const path = url.parse(urlParam).pathname;
    return path ? path : '/';
  }
  return browserGetPath(urlParam);
}

let link: HTMLAnchorElement;
function browserGetPath(url: string): string {
  if (!link) {
    link = document.createElement('a');
  }
  link.href = url;
  let path = link.pathname;
  if (path[0] !== '/') {
    path = `/${path}`;
  }
  return path;
}
