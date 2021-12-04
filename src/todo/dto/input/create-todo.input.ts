import { TaskFlag } from "../../../utils/enums";

export class CreateTodoInput {
    title: string;
    text: string;
    deadline: Date
    flag: TaskFlag
}