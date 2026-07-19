import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  presets: [
    {
      GettingStarted: true,
      Solutions: true,
      Documentation: false,
    },
  ],
  accountPresets: [
    {
      AccountBadge: true,
      DashboardBadge: true,
      UserMenu: true,
      TeamMenu: true,
    },
  ],
  mainNav: [
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Product",
      items: [
        {
          title: "Overview",
          href: "/docs/documentation",
        },
        {
          title: "Classroom timer",
          href: "/docs/documentation/components",
        },
        {
          title: "Timetables & seating",
          href: "/docs/documentation/style-guide",
        },
        {
          title: "Plans & demo limits",
          href: "/docs/documentation/code-blocks",
        },
      ],
    },
    {
      title: "Guides",
      items: [
        {
          title: "All guides",
          href: "/guides",
        },
        {
          title: "Classroom timer basics",
          href: "/guides/classroom-timer",
        },
        {
          title: "Planning multiple exams",
          href: "/guides/multi-exam-planning",
        },
      ],
    },
  ],
}
