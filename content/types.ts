/**
 * Content model for the Telcobright site.
 *
 * Every page is data. Page bodies are a flat, ordered list of blocks in exactly
 * the order they appeared on telcobright.com, so the migration is verifiable
 * line by line against the old page rather than being a rewrite.
 *
 * `html` fields carry sanitised inline markup (`a`, `strong`, `b`, `em`, `i`,
 * `br`, `img`, …) taken straight from the WordPress render. Elementor's own
 * wrappers, classes and inline styles were dropped; the words were not.
 */

export type Block =
  /** A heading. `id` is the anchor the Quick Navigation sidebar links to. */
  | { t: 'h'; level: 2 | 3 | 4 | 5 | 6; html: string; text: string; id: string }
  /** A paragraph of rich text. */
  | { t: 'p'; html: string }
  /** A bulleted or numbered list; every item is rich text. */
  | { t: 'ul'; ordered?: boolean; items: string[] }
  /**
   * A table. Cells carry block-level HTML (paragraphs, nested lists, figures),
   * plus the row/column spans the WordPress markup used — several tables merge
   * cells, and dropping the spans leaves those rows short.
   */
  | {
      t: 'table';
      rows: { head: boolean; cells: { html: string; rowSpan?: number; colSpan?: number }[] }[];
    }
  /**
   * A figure. `row` marks one the old page showed beside its neighbours, so
   * consecutive ones render side by side rather than stacked:
   *
   *   'carousel' — vendor logos from a slider (Billing Solutions). Different
   *                marks, normalised to one height so the strip reads evenly.
   *   'column'   — separate Elementor columns of one row (the book covers and
   *                the tool logos on SMS Gateway). Shown at their own size,
   *                because these are pictures rather than a logo set.
   */
  | { t: 'img'; src: string; alt: string; row?: 'carousel' | 'column' }
  /** A link rendered as a button. */
  | { t: 'cta'; label: string; href: string };

export interface SolutionPage {
  slug: string;
  /** Page title, exactly as the old <h1> read. */
  title: string;
  /** The line under the title in the page hero, where the old page had one. */
  subtitle?: string;
  /** Short line used on home-page cards and in <meta description>. */
  summary: string;
  /** Legacy WordPress path, kept so redirects stay in sync with content. */
  legacyPath: string;
  /** Shown in the "Our Product & Solutions" nav dropdown and the home grid. */
  featured?: boolean;
  blocks: Block[];
}

/** Every heading a page offers the Quick Navigation sidebar. */
export function tableOfContents(blocks: Block[], maxLevel = 3) {
  return blocks
    .filter((b): b is Extract<Block, { t: 'h' }> => b.t === 'h' && b.level <= maxLevel)
    .map(({ id, text, level }) => ({ id, text, level }));
}
