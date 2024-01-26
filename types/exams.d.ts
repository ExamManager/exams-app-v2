
export type Exam = {
  id: String   
  title: String
  subject: String
  paper: String
  level: String
  start: Date
  end: Date
  duration: Number
  extratime: Number
  readingtime: Number
  reminders: Object | null
  extra: Object | null
  createdAt: Date
  updatedAt: Date
  authorId: String
}

export type NewExam = {
  title: String
  subject: String
  paper: String
  level: String
  start: Date
  end?: Date
  duration: Number
  readingtime?: Number
  extratime?: Number
  reminders?: Object | null
  authorId?: String
}

