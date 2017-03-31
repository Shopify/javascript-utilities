export function nodeContainsDescendant(
  rootNode: HTMLElement,
  descendant: HTMLElement,
): boolean {
  if (rootNode === descendant) { return true; }

  let parent = descendant.parentNode;

  while (parent != null) {
    if (parent === rootNode) { return true; }
    parent = parent.parentNode;
  }

  return false;
}

export function closest(node: HTMLElement, selector: string) {
  if (node.closest) {
    return node.closest(selector);
  }

  const matches = document.querySelectorAll(selector);
  let i;
  let el: HTMLElement | null = node;
  do {
    el = el.parentElement;
    i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {
      continue;
    };
  } while ((i < 0) && (el));
  return el;
}
