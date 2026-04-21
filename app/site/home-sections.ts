import type { HomeSectionDepth, HomeSectionMeta } from "@/types";

export type { HomeSectionId } from "@/types";

const HOME_SECTION_SELECTOR = "section[data-toc-section='true'][id]";
const SECTION_TITLE_SELECTOR = "[data-section-title='true']";

export type HomeSection = HomeSectionMeta;

function normalizeDepth(value?: string): HomeSectionDepth {
  return value === "3" ? 3 : 2;
}

function humanizeId(id: string) {
  return id
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getSectionLabel(section: HTMLElement) {
  const explicitLabel = section.dataset.tocLabel?.trim();
  if (explicitLabel) {
    return explicitLabel;
  }

  const titleElement = section.querySelector<HTMLElement>(
    SECTION_TITLE_SELECTOR,
  );
  const titleLabel = titleElement?.textContent?.trim();
  if (titleLabel) {
    return titleLabel;
  }

  return humanizeId(section.id);
}

export function getVisibleHomeSectionsFromDocument(
  root: ParentNode = document,
): HomeSection[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(HOME_SECTION_SELECTOR),
  ).map((section) => ({
    id: section.id,
    depth: normalizeDepth(section.dataset.tocDepth),
    label: getSectionLabel(section),
  }));
}
