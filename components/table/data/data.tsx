import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  GearIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import { AtomIcon, BookIcon, CalculatorIcon, TreePineIcon } from "lucide-react"

export const additionaltimings = [
  {
    value: "extra",
    label: "Extra",
  },
  {
    value: "reading",
    label: "Reading",
  },
  {
    value: "both",
    label: "Reading + Extra"
  },
]

export const levels = [
  {
    value: "sl",
    label: "SL",
    icon: ArrowDownIcon,
  },
  {
    value: "hl",
    label: "HL",
    icon: ArrowUpIcon,
  },
  {
    value: "none",
    label: "None",
    icon: CrossCircledIcon,
  },
]

export const papers = [
  {
    value: "1",
    label: "Paper 1"
  },
  {
    value: "2",
    label: "Paper 2"
  },
  {
    value: "3",
    label: "Paper 3"
  },
  {
    value: "4",
    label: "Paper 4"
  },
  // add one which allows for custom paper and has the value other
  {
    value: "other",
    label: "Other"
  }
]

export const subjects = [
  {
    label: "Biology",
    value: "biology",
    icon: TreePineIcon,
  },
  {
    label: "Chemistry",
    value: "chemistry",
    icon: AtomIcon,
  },
  {
    label: "Physics",
    value: "physics",
    icon: GearIcon,
  },
  {
    label: "Maths",
    value: "maths",
    icon: CalculatorIcon,
  },
  {
    label: "English",
    value: "english",
    icon: BookIcon,
  },
]


export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]
