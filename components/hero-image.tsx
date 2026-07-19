"use client"

import Image from "next/image"

export function HeroImage() {
  return (
    <div className="space-y-6 hero-image">
      <div className="container max-w-[64rem] tilt-back md:pt-14 md:-mb-14">
        <Image
          src="/images/ExamTimer.png"
          alt="ExamManager classroom exam timer preview"
          width={1280}
          height={720}
          priority
          className="aspect-[2/1] w-full rounded-md border border-border object-cover object-top"
        />
      </div>
    </div>
  )
}
