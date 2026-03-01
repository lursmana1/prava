import {
  VISIBLE_PAGES_THRESHOLD,
  START_EDGE_COUNT,
  END_EDGE_OFFSET,
  PAGES_AROUND_CURRENT,
} from "@/CONSTS/pagination";

export type PageItem = number | "ellipsis";

export function getPageNumbers(
  current: number,
  totalPages: number
): PageItem[] {
  if (totalPages <= VISIBLE_PAGES_THRESHOLD) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: PageItem[] = [];

  if (current <= START_EDGE_COUNT - 1) {
    for (let i = 1; i <= START_EDGE_COUNT; i++) pages.push(i);
    pages.push("ellipsis", totalPages);
  } else if (current >= totalPages - END_EDGE_OFFSET) {
    pages.push(1, "ellipsis");
    for (let i = totalPages - (START_EDGE_COUNT - 1); i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1, "ellipsis");
    for (let i = current - PAGES_AROUND_CURRENT; i <= current + PAGES_AROUND_CURRENT; i++) {
      pages.push(i);
    }
    pages.push("ellipsis", totalPages);
  }

  return pages;
}
