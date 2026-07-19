"use client"

export function HeroImage() {
  return (
    <div className="space-y-6 hero-image">
      <div className="container max-w-[64rem] tilt-back md:pt-14 md:-mb-14">
        <div
          aria-hidden="true"
          className="aspect-[2/1] w-full rounded-md border border-border bg-muted/40"
        />
      </div>
    </div>
  )
}
