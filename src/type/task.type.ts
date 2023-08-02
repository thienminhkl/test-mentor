export type TaskForm = {
  listUserAsign:         number[];
  taskName:              string;
  description:           string;
  statusId:              string;
  originalEstimate:      number;
  timeTrackingSpent:     number;
  timeTrackingRemaining: number;
  projectId:             number;
  typeId:                number;
  priorityId:            number;
}

export type ProjectDetail = {
  lstTask:         LstTask[];
  members:         Member[];
  creator:         Creator;
  id:              number;
  projectName:     string;
  description:     string;
  projectCategory: Creator;
  alias:           string;
}

export type Creator = {
  id:   number;
  name: string;
}

export type LstTask = {
  lstTaskDeTail: LstTaskDeTail[];
  statusId:      string;
  statusName:    string;
  alias:         string;
}

export type LstTaskDeTail = {
  priorityTask:          PriorityTask;
  taskTypeDetail:        TaskTypeDetail;
  assigness:             Assigness[];
  lstComment:            LstComment[];
  taskId:                number;
  taskName:              string;
  alias:                 string;
  description:           string;
  statusId:              string;
  originalEstimate:      number;
  timeTrackingSpent:     number;
  timeTrackingRemaining: number;
  typeId:                number;
  priorityId:            number;
  projectId:             number;
}

export type Assigness = {
  id:     number;
  avatar: string;
  name:   string;
  alias:  string;
}

export type LstComment = {
  id:             number;
  idUser:         number;
  name:           string;
  avatar:         string;
  commentContent: string;
}

export type PriorityTask = {
  priorityId: number;
  priority:   string;
}

export type TaskTypeDetail = {
  id:       number;
  taskType: string;
}

export type Member = {
  userId:      number;
  name:        string;
  avatar:      string;
  email:       null;
  phoneNumber: null;
}

export type Priority = {
  priorityId:  number;
  priority:    string;
  description: string;
  deleted:     boolean;
  alias:       string;
}

export type Status = {
  statusId:   string;
  statusName: string;
  alias:      string;
  deleted:    string;
}

export type TaskType = {
  id:       number;
  taskType: string;
}
