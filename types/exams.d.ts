export class Student {
    name: {
      first: string,
      last: string,
    };
    yearGroup: string;
    id: number;
    
    constructor(first: string, last: string, yearGroup: string, id: number) {
      this.name = {
        first: first,
        last: last,
      }
      this.yearGroup = yearGroup;
      this.id = id;
    }
  }
  
export class YearGroup {
    name: string;
    students: Student[];
    exams: Exam[];
    sessions: Session[];
    id: number;
  
    constructor(name: string, students: Student[], exams: Exam[], sessions: Session[], id: number) {
      this.name = name;
      this.students = students;
      this.exams = exams;
      this.sessions = sessions;
      this.id = id;
    }
  }

export class NewExam {
    name: string; // string
    about: string; // optional
    start: Date; // as a timestamp
    end?: Date; // as a timestamp
    duration?: number; // as a number in minutes
    readingtime?: number; // as a number in minutes
    extratime?: number; // as a percentage
    reminders?: number[]; 
  constructor(
    name: string,
    about: string,
    start: Date,
    end: Date,
    duration: number,
    readingtime: number,
    extratime: number,
    reminders: number[],
  ) {
    this.name = name;
    this.about = about;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.readingtime = readingtime;
    this.extratime = extratime;
    this.reminders = reminders;
  } 
}

export class Favourite {
  
  exam: NewExam;
  constructor(
    exam: NewExam,
  ) {
    this.exam = exam;
  }
}

export class Exam {
    /*
      extraTime is a percentage
      readingTime is a number in seconds
    */
      id: number; // number
      name: string;  // string
      about: string; // optional
      start: Date; // as a timestamp
      plannedstart: Date; // as a timestamp
      end: Date; // as a timestamp (Reading time + duration)
      plannedend: Date; // as a timestamp (Reading time + duration)
      duration: number; // as a string in seconds
      readingtime: number; // as a number in seconds
      readingtimeends?: Date; // as a timestampn (Just reading time, start + reading time)
      extratimepercentage: number; // as a percentage
      extratime?: number; // as a number in seconds
      extratimeends?: Date; // as a timestamp (All added up, latest time)
      timeleft: string; // as a string in seconds
      status: "Not Started" | "Reading" | "Active" | "Extra Time" | "Finished" | "Paused";
      reminders?: number[];
      started: boolean;
      intervalId?: number;
      yeargroup?: number;
      room?: string;
      invigilators?: string[];
    constructor(
      id: number,
      name: string,
      about: string,
      start: Date,
      plannedstart: Date,
      end: Date,
      plannedend: Date,
      duration: number,
      readingtime: number,
      readingtimeends: Date,
      extratime: number,
      extratimepercentage: number,
      extratimeends: Date,
      timeleft: string,
      status: "Not Started" | "Reading" | "Active" | "Extra Time" | "Finished" | "Paused",
      reinders: number[],
      started: boolean,
      intervalId: number,
      yeargroup: number,
      room: string,
      invigilators: string[],
    ) {
      this.id = id;
      this.name = name;
      this.about = about;
      this.start = start;
      this.plannedstart = plannedstart;
      this.end = end;
      this.plannedend = plannedend;
      this.duration = duration;
      this.readingtime = readingtime;
      this.readingtimeends = readingtimeends;
      this.extratime = extratime;
      this.extratimepercentage = extratimepercentage;
      this.extratimeends = extratimeends;
      this.timeleft = timeleft;
      this.status = status;
      this.reminders = reinders;
      this.started = started;
      this.intervalId = intervalId;
      this.yeargroup = yeargroup;
      this.room = room;
      this.invigilators = invigilators;
    }
    
  }
  
export class Session {
    start: Date;
    end: Date;
    room: string;
    invigilators: string[];
    seatingPlan: string;
    notes: string;
    exams: Exam[];
    type: string;
    id: number;
  
    constructor (
      start: Date,
      end: Date,
      room: string,
      invigilators: string[],
      seatingPlan: string,
      notes: string,
      exams: Exam[],
      id: number,
    )
    {
      this.start = start;
      this.end = end;
      this.room = room;
      this.invigilators = invigilators;
      this.seatingPlan = seatingPlan;
      this.notes = notes;
      this.exams = exams;
      this.type = "session"
      this.id = id;
    }
  
    // durations are in miliseconds
  
    calcDuration() {
      return this.end.getTime() - this.start.getTime();
    }
  
    miliToMinutes(mili: number, round = 1) {
      return Math.round(mili / 60000 / round) * round;
    }
  
    duration(round = 1) {
      return this.miliToMinutes(this.end.getTime() - this.start.getTime(), round)
    }
  
    fullDuration(round = 1) {
      return this.miliToMinutes(this.calcDuration(), round);
    }
  }

export default {
    Student,
    YearGroup,
    NewExam,
    Exam,
    Session,
}