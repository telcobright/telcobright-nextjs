import Link from 'next/link';
import type { Block } from '@content/types';
import { media } from '@/lib/media';

/**
 * Renders the block list a page carries.
 *
 * `html` fields come from the old WordPress render and were sanitised at
 * extraction time down to a fixed tag allowlist (a, strong, b, em, i, u, s, br,
 * sup, sub, code, small, mark, img). They are authored content, not user input.
 */

/** Rewrites /media/... paths inside inline HTML through the media resolver. */
function resolveMedia(html: string): string {
  return html.replace(/src="\/media\/([^"]+)"/g, (_, p) => `src="${media(p)}"`);
}

function Html({ html, as: Tag = 'div', className }: { html: string; as?: 'div' | 'span' | 'li' | 'td' | 'th'; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: resolveMedia(html) }} />;
}

function Heading({ block }: { block: Extract<Block, { t: 'h' }> }) {
  const Tag = `h${block.level}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <Tag id={block.id} className="scroll-mt-28">
      <span dangerouslySetInnerHTML={{ __html: block.html }} />
    </Tag>
  );
}

type Cell = { html: string; rowSpan?: number; colSpan?: number };

function Td({ cell, as: Tag }: { cell: Cell; as: 'td' | 'th' }) {
  return (
    <Tag
      rowSpan={cell.rowSpan}
      colSpan={cell.colSpan}
      dangerouslySetInnerHTML={{ __html: resolveMedia(cell.html) }}
    />
  );
}

function Table({ block }: { block: Extract<Block, { t: 'table' }> }) {
  const [first, ...rest] = block.rows;
  const hasHead = first?.head ?? false;
  // Single-column tables are really spec lists (the 76-row Voice Broadcasting
  // list, for one). They need no minimum width and should just fill the column.
  const oneColumn = block.rows.every((r) => r.cells.length === 1);

  return (
    // Scrolls within the content column. Bleeding it edge-to-edge with negative
    // margins reads better but leaves the whole document horizontally
    // scrollable by a few pixels on a phone, which is worse. `.table-wrap`
    // carries the rounding, the hairline and the scroll (see globals.css).
    <div className="table-wrap">
      <table className={oneColumn ? undefined : 'min-w-[38rem]'}>
        {hasHead && (
          <thead>
            <tr>
              {first.cells.map((c, i) => (
                <Td key={i} cell={c} as="th" />
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {(hasHead ? rest : block.rows).map((row, ri) => (
            <tr key={ri}>
              {row.cells.map((c, ci) => (
                <Td key={ci} cell={c} as={row.head ? 'th' : 'td'} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Figure({ block }: { block: Extract<Block, { t: 'img' }> }) {
  const src = block.src.replace(/^\/media\//, '');
  return (
    <figure className="my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media(src)}
        alt={block.alt}
        loading="lazy"
        decoding="async"
        className="mx-auto h-auto max-w-full rounded-xl ring-1 ring-ink-200/60"
      />
    </figure>
  );
}

/**
 * Collapses each run of carousel figures into one row block, so the vendor
 * logos on the Billing Solutions page sit side by side the way the old
 * carousel showed them rather than stacking one per line.
 */
type Item = Block | { t: 'imgRow'; images: Extract<Block, { t: 'img' }>[] };

function group(blocks: Block[]): Item[] {
  const out: Item[] = [];
  for (const block of blocks) {
    if (block.t === 'img' && block.row) {
      const last = out[out.length - 1];
      if (last && last.t === 'imgRow') last.images.push(block);
      else out.push({ t: 'imgRow', images: [block] });
    } else {
      out.push(block);
    }
  }
  return out;
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="page-body">
      {group(blocks).map((block, i) => {
        switch (block.t) {
          case 'imgRow':
            return (
              <div key={i} className="my-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
                {block.images.map((img) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={img.src}
                    src={media(img.src.replace(/^\/media\//, ''))}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-auto max-w-[45%] object-contain sm:max-w-none"
                  />
                ))}
              </div>
            );
          case 'h':
            return <Heading key={i} block={block} />;
          case 'p':
            return <Html key={i} html={block.html} />;
          case 'ul': {
            const Tag = block.ordered ? 'ol' : 'ul';
            return (
              <Tag key={i}>
                {block.items.map((item, j) => (
                  <Html key={j} as="li" html={item} />
                ))}
              </Tag>
            );
          }
          case 'table':
            return <Table key={i} block={block} />;
          case 'img':
            return <Figure key={i} block={block} />;
          case 'cta':
            return (
              <p key={i}>
                <Link href={block.href} className="btn-gradient no-underline">
                  {block.label}
                </Link>
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
