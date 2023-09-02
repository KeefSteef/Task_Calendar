import {useMutation} from '@apollo/client'
import {CREATE_TASK_MUTATION} from '../../../graphql/Mutations'
import {FormEvent} from 'react'

export const useCreateTask = (weekDaysList: string[]) => {
    const [createTask] = useMutation(CREATE_TASK_MUTATION)
    const onSubmitTask = (event: FormEvent<HTMLFormElement>) => {
        const target = event.target as HTMLFormElement
        const formData = new FormData(target)
        const inputsData = Object.fromEntries(formData)

        inputsData.owner = localStorage.getItem('user') as string
        createTask({
            variables: {
                taskInput: inputsData,
            },

            update(cache) {
                cache.modify({
                    fields: {
                        tasks: (existingData) => {
                            return [...existingData, inputsData]
                        },
                    },
                })
            },
        })
    }

    return {
        onSubmitTask,
    }
}
