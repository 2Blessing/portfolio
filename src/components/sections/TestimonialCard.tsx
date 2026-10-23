import { SanityImage } from "@/components/shared/SanityImage";
import type { Testimonial } from "@/sanity/lib/types";

/** Un témoignage : citation, photo, nom, fonction. */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="reveal flex h-full flex-col rounded-2xl border border-border bg-background p-6">
      <blockquote className="flex-1 text-foreground">
        <p>
          <span className="font-heading text-3xl leading-none text-accent" aria-hidden="true">
            “
          </span>
          {testimonial.quote}
        </p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {testimonial.photo?.asset && (
          <SanityImage
            image={testimonial.photo}
            alt=""
            width={96}
            height={96}
            sizes="48px"
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold">{testimonial.author}</p>
          {testimonial.role && <p className="text-sm text-muted">{testimonial.role}</p>}
        </div>
      </figcaption>
    </figure>
  );
}
