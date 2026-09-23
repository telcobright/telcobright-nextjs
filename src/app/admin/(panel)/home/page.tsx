import { getHome } from '@/server/content';
import { formatTitleParts } from '@/server/form';
import { Check, Field, GRADIENT_HINT, PageHeading, Panel, SaveButton, TextArea } from '@/components/admin/ui';
import {
  addClientAction,
  addFaqAction,
  addGalleryImageAction,
  addHighlightAction,
  addProductAction,
  addServiceAction,
  addTestimonialAction,
  removeClientAction,
  removeFaqAction,
  removeGalleryImageAction,
  removeHighlightAction,
  removeProductAction,
  removeServiceAction,
  removeTestimonialAction,
  saveAdditionalAction,
  saveClientsAction,
  saveFaqAction,
  saveGalleryAction,
  saveHeroAction,
  saveIntroAction,
  saveTestimonialsAction,
  saveHighlightsAction,
} from './actions';

/**
 * The home page, section by section.
 *
 * Each section is a separate form with its own save button: an editor working
 * on the FAQ never has to think about the hero, and two people editing
 * different sections cannot overwrite each other.
 */
export default async function HomeEditorPage() {
  const home = await getHome();

  return (
    <>
      <PageHeading
        title="Home page"
        description="Every section of the front page. Save a section to publish it — each one saves on its own."
      />

      {/* ------------------------------------------------------------ hero */}
      <form action={saveHeroAction}>
        <Panel title="Hero" description="The opening band: headline, intro and the card beside it.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Eyebrow" name="eyebrow" defaultValue={home.hero.eyebrow} />
            <Field
              label="Background image"
              name="background"
              defaultValue={home.hero.background}
              hint="Path under the media library."
            />
            <Field label="Headline, first line" name="titleLead" defaultValue={home.hero.titleLead} />
            <Field
              label="Headline, gradient line"
              name="titleAccent"
              defaultValue={home.hero.titleAccent}
              hint="This line always carries the gradient."
            />
          </div>
          <div className="mt-5">
            <TextArea label="Intro paragraph" name="body" defaultValue={home.hero.body} rows={3} />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Button label" name="ctaLabel" defaultValue={home.hero.cta.label} />
            <Field label="Button link" name="ctaHref" defaultValue={home.hero.cta.href} />
          </div>

          <div className="mt-8 border-t border-ink-200/70 pt-6">
            <h3 className="adm-label">The card beside the headline</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Image" name="cardImage" defaultValue={home.heroCard.image} />
              <Field label="Image description" name="cardImageAlt" defaultValue={home.heroCard.imageAlt} />
              <Field label="Greeting" name="cardGreeting" defaultValue={home.heroCard.greeting} />
              <Field label="Greeting icon" name="cardGreetingIcon" defaultValue={home.heroCard.greetingIcon} />
              <Field label="Card heading" name="cardTitle" defaultValue={home.heroCard.title} />
              <Field label="Small note" name="cardNote" defaultValue={home.heroCard.note} />
              <Field label="Button label" name="cardCtaLabel" defaultValue={home.heroCard.cta.label} />
              <Field label="Button link" name="cardCtaHref" defaultValue={home.heroCard.cta.href} />
            </div>
          </div>

          <SaveButton label="Save hero" />
        </Panel>
      </form>

      {/* -------------------------------------------------- intro + products */}
      <form action={saveIntroAction}>
        <Panel title="Products" description="The introduction on the left and the product cards on the right.">
          <Field label="Heading" name="title" defaultValue={formatTitleParts(home.introduction.titleParts)} hint={GRADIENT_HINT} />
          <div className="mt-5">
            <TextArea label="Introduction" name="body" defaultValue={home.introduction.body} rows={4} />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Button label" name="ctaLabel" defaultValue={home.introduction.cta.label} />
            <Field label="Button link" name="ctaHref" defaultValue={home.introduction.cta.href} />
          </div>

          <div className="mt-8 space-y-4 border-t border-ink-200/70 pt-6">
            {home.products.map((product, i) => (
              <div key={i} className="rounded-xl border border-ink-200/80 p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Title" name={`product.${i}.title`} defaultValue={product.title} />
                  <Field label="Link" name={`product.${i}.href`} defaultValue={product.href} />
                </div>
                <div className="mt-4">
                  <TextArea label="Description" name={`product.${i}.body`} defaultValue={product.body} rows={3} />
                </div>
                <div className="mt-3 text-right">
                  <button formAction={removeProductAction.bind(null, i)} className="adm-btn-danger">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button formAction={addProductAction} className="adm-btn-ghost">
              Add product card
            </button>
          </div>

          <SaveButton label="Save products" />
        </Panel>
      </form>

      {/* ------------------------------------------------ additional services */}
      <form action={saveAdditionalAction}>
        <Panel title="Additional services" description="The grid under “Why choose us”.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Eyebrow" name="eyebrow" defaultValue={home.additional.eyebrow} />
            <Field label="Heading" name="title" defaultValue={formatTitleParts(home.additional.titleParts)} hint={GRADIENT_HINT} />
            <Field label="Illustration" name="image" defaultValue={home.additional.image} />
            <Field label="Illustration description" name="imageAlt" defaultValue={home.additional.imageAlt} />
          </div>

          <div className="mt-8 space-y-4 border-t border-ink-200/70 pt-6">
            {home.additional.services.map((service, i) => (
              <div key={i} className="rounded-xl border border-ink-200/80 p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Title" name={`service.${i}.title`} defaultValue={service.title} />
                  <Field label="Icon" name={`service.${i}.icon`} defaultValue={service.icon} />
                </div>
                <div className="mt-4">
                  <TextArea label="Description" name={`service.${i}.body`} defaultValue={service.body} rows={2} />
                </div>
                <div className="mt-3 text-right">
                  <button formAction={removeServiceAction.bind(null, i)} className="adm-btn-danger">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button formAction={addServiceAction} className="adm-btn-ghost">
              Add service
            </button>
          </div>

          <SaveButton label="Save services" />
        </Panel>
      </form>

      {/* ------------------------------------------------------- highlights */}
      <form action={saveHighlightsAction}>
        <Panel title="Feature bands" description="The wide pastel cards further down the page.">
          <div className="space-y-4">
            {home.highlights.map((item, i) => (
              <div key={i} className="rounded-xl border border-ink-200/80 p-4">
                <Field label="Heading" name={`highlight.${i}.title`} defaultValue={formatTitleParts(item.titleParts)} hint={GRADIENT_HINT} />
                <div className="mt-4">
                  <TextArea label="Body" name={`highlight.${i}.body`} defaultValue={item.body} rows={3} />
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Button label" name={`highlight.${i}.ctaLabel`} defaultValue={item.cta.label} />
                  <Field label="Button link" name={`highlight.${i}.ctaHref`} defaultValue={item.cta.href} />
                  <Field label="Image" name={`highlight.${i}.image`} defaultValue={item.image} />
                  <Field label="Image description" name={`highlight.${i}.imageAlt`} defaultValue={item.imageAlt} />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Check label="Image on the left" name={`highlight.${i}.reverse`} defaultChecked={item.reverse} />
                  <button formAction={removeHighlightAction.bind(null, i)} className="adm-btn-danger">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button formAction={addHighlightAction} className="adm-btn-ghost">
              Add feature band
            </button>
          </div>

          <SaveButton label="Save feature bands" />
        </Panel>
      </form>

      {/* ----------------------------------------------------------- clients */}
      <form action={saveClientsAction}>
        <Panel title="Client logos" description="The strip under the hero. Logos scroll automatically.">
          <Field label="Heading" name="title" defaultValue={home.clients.title} />
          <div className="mt-6 space-y-3">
            {home.clients.logos.map((logo, i) => (
              <div key={i} className="grid items-end gap-3 rounded-xl border border-ink-200/80 p-4 sm:grid-cols-[1fr_1fr_auto]">
                <Field label="Image" name={`logo.${i}.image`} defaultValue={logo.image} />
                <Field label="Company name" name={`logo.${i}.alt`} defaultValue={logo.alt} />
                <button formAction={removeClientAction.bind(null, i)} className="adm-btn-danger">
                  Remove
                </button>
              </div>
            ))}
            <button formAction={addClientAction} className="adm-btn-ghost">
              Add logo
            </button>
          </div>

          <SaveButton label="Save logos" />
        </Panel>
      </form>

      {/* ----------------------------------------------------------- gallery */}
      <form action={saveGalleryAction}>
        <Panel title="Gallery" description="Office and team photographs. Wide images take two columns.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Eyebrow" name="eyebrow" defaultValue={home.gallery.eyebrow} />
            <Field label="Heading" name="title" defaultValue={formatTitleParts(home.gallery.titleParts)} hint={GRADIENT_HINT} />
          </div>
          <div className="mt-6 space-y-3">
            {home.gallery.images.map((image, i) => (
              <div key={i} className="grid items-end gap-3 rounded-xl border border-ink-200/80 p-4 sm:grid-cols-[1fr_1fr_auto_auto]">
                <Field label="Image" name={`image.${i}.src`} defaultValue={image.image} />
                <Field label="Description" name={`image.${i}.alt`} defaultValue={image.alt} />
                <Check label="Wide" name={`image.${i}.wide`} defaultChecked={image.wide} />
                <button formAction={removeGalleryImageAction.bind(null, i)} className="adm-btn-danger">
                  Remove
                </button>
              </div>
            ))}
            <button formAction={addGalleryImageAction} className="adm-btn-ghost">
              Add photograph
            </button>
          </div>

          <SaveButton label="Save gallery" />
        </Panel>
      </form>

      {/* ------------------------------------------------------ testimonials */}
      <form action={saveTestimonialsAction}>
        <Panel
          title="Client reviews"
          description="The section is hidden on the site while there are no reviews — nothing was invented to fill it."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Eyebrow" name="eyebrow" defaultValue={home.testimonials.eyebrow} />
            <Field label="Heading" name="title" defaultValue={formatTitleParts(home.testimonials.titleParts)} hint={GRADIENT_HINT} />
          </div>
          <div className="mt-6 space-y-4">
            {home.testimonials.items.map((item, i) => (
              <div key={i} className="rounded-xl border border-ink-200/80 p-4">
                <TextArea label="Quote" name={`item.${i}.quote`} defaultValue={item.quote} rows={3} />
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name={`item.${i}.name`} defaultValue={item.name} />
                  <Field label="Role" name={`item.${i}.role`} defaultValue={item.role ?? ''} />
                  <Field label="Company" name={`item.${i}.company`} defaultValue={item.company ?? ''} />
                  <Field label="Photo" name={`item.${i}.image`} defaultValue={item.image ?? ''} />
                </div>
                <div className="mt-3 text-right">
                  <button formAction={removeTestimonialAction.bind(null, i)} className="adm-btn-danger">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button formAction={addTestimonialAction} className="adm-btn-ghost">
              Add review
            </button>
          </div>

          <SaveButton label="Save reviews" />
        </Panel>
      </form>

      {/* --------------------------------------------------------------- faq */}
      <form action={saveFaqAction}>
        <Panel title="FAQ" description="Questions and answers, in order.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Eyebrow" name="eyebrow" defaultValue={home.faq.eyebrow} />
            <Field label="Heading" name="title" defaultValue={formatTitleParts(home.faq.titleParts)} hint={GRADIENT_HINT} />
          </div>
          <div className="mt-6 space-y-4">
            {home.faq.items.map((item, i) => (
              <div key={i} className="rounded-xl border border-ink-200/80 p-4">
                <Field label="Question" name={`item.${i}.q`} defaultValue={item.q} />
                <div className="mt-4">
                  <TextArea label="Answer" name={`item.${i}.a`} defaultValue={item.a} rows={3} />
                </div>
                <div className="mt-3 text-right">
                  <button formAction={removeFaqAction.bind(null, i)} className="adm-btn-danger">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button formAction={addFaqAction} className="adm-btn-ghost">
              Add question
            </button>
          </div>

          <SaveButton label="Save FAQ" />
        </Panel>
      </form>
    </>
  );
}

export const dynamic = 'force-dynamic';
