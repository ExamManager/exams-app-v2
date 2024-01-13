"use client"

import * as React from "react"
import Image from "next/image"
import '../styles/HeroImg.css'

export function HeroImage() {
    return (
        <div className="space-y-6 hero-image">
            <div className="container max-w-[64rem] tilt-back md:pt-14 md:-mb-14 ">
                <Image src={'/images/ExamTimer.png'} className="rounded-md" alt="Hero" width={1200} height={600} />
            </div>
        </div>
    )
}