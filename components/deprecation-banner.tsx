import { AlertTriangleIcon } from "lucide-react"

export function DeprecationBanner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-[60] w-full border-b border-amber-800/25 bg-amber-500 text-amber-950"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs leading-none sm:gap-2.5 sm:text-sm">
        <AlertTriangleIcon
          className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
          aria-hidden="true"
        />
        <p className="min-w-0 truncate">
          <span className="font-semibold">Deprecated showcase.</span> ExamManager
          is no longer an active product — portfolio demo only.
        </p>
      </div>
    </div>
  )
}
