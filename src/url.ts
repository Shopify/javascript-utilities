// tslint:disable-next-line no-require-imports
const {parse} = require('url');

export function getPath(urlParam: string): string {
  // No window, or we are running in JSDOM for tests
  if (typeof window === 'undefined' || window.navigator.userAgent.indexOf('Node.js') >= 0) {
    const path = parse(urlParam).pathname;
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
