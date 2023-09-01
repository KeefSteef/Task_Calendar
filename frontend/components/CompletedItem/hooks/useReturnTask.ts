import { useMutation } from '@apollo/client'
import { BACK_COMPLETED_TASK } from '../../../graphql/Mutations'
import { ITask } from '../../../types/task'

type TaskWithOwner = ITask & { owner: string }

export const useReturnTask = () => {
  const [doBackCompletedTask] = useMutation(BACK_COMPLETED_TASK)

  const doBack = (task: TaskWithOwner) => {
    doBackCompletedTask({
      variables: {
        id: task.id,
        taskInput: {
          date: task.date,
          owner: task.owner,
          timeStart: task.timeStart,
          timeEnd: task.timeEnd,
          name: task.name,
        },
      },
    }).then((r) => r)
  }

  return {
    doBack,
  }
}
