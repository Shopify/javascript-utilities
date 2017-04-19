import {matches} from '@shopify/javascript-utilities/dom';

export const FOCUSABLE_SELECTOR = 'a,frame,iframe,input:not([type=hidden]),select,textarea,button,*[tabindex]';

export function findFirstFocusableNode(element: HTMLElement, onlyDescendants = true) {
  if (!onlyDescendants && matches(element, FOCUSABLE_SELECTOR)) { return element; }
  return element.querySelector(FOCUSABLE_SELECTOR) as HTMLElement | null;
}

export function focusFirstFocusableNode(element: HTMLElement, onlyDescendants = true) {
  const firstFocusable = findFirstFocusableNode(element, onlyDescendants);
  if (firstFocusable) {
    firstFocusable.focus();
  }
}

export function findLastFocusableNode(element: HTMLElement, onlyDescendants = true) {
  if (!onlyDescendants && matches(element, FOCUSABLE_SELECTOR)) { return element; }
  const allFocusable = element.querySelectorAll(FOCUSABLE_SELECTOR);
  return allFocusable[allFocusable.length - 1] as HTMLElement | null;
}

export function focusLastFocusableNode(element: HTMLElement, onlyDescendants = true) {
  const lastFocusable = findLastFocusableNode(element, onlyDescendants);
  if (lastFocusable) {
    lastFocusable.focus();
  }
}
