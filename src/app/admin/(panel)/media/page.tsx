import { listMedia } from '@/server/media';
import { media } from '@/lib/media';
import { Empty, PageHeading, Panel } from '@/components/admin/ui';
import { MediaUpload } from '@/components/admin/MediaUpload';
import { deleteImageAction } from './actions';

/**
 * The media library.
 *
 * Only uploads are listed. The 155 files migrated from WordPress live in
 * `public/media` and are referenced by their original path, for example
 * `2024/06/tb_bg.png` — they are not listed here because they are not managed
 * here; they are part of the checkout.
 */
export default async function MediaPage() {
  const files = await listMedia();

  return (
    <>
      <PageHeading
        title="Media"
        description="Images you upload here can be used in any image field, by the path shown under each one."
      />

      <Panel title="Upload">
        <MediaUpload />
      </Panel>

      <Panel title={`${files.length} uploaded ${files.length === 1 ? 'image' : 'images'}`}>
        {files.length === 0 ? (
          <Empty>
            Nothing uploaded yet. Images migrated from the old site are already available by their original
            path, for example 2024/06/tb_bg.png.
          </Empty>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {files.map((file) => (
              <li key={file.name} className="overflow-hidden rounded-xl border border-ink-200/80">
                <div className="flex h-32 items-center justify-center bg-surface-subtle p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={media(file.path)} alt="" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="space-y-2 p-3">
                  <code className="block truncate font-mono text-[11px] text-ink-500" title={file.path}>
                    {file.path}
                  </code>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-ink-400">{Math.round(file.size / 1024)} KB</span>
                    <form action={deleteImageAction.bind(null, file.name)}>
                      <button type="submit" className="adm-btn-danger px-2.5 py-1.5 text-[12px]">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}

export const dynamic = 'force-dynamic';
