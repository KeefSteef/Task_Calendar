import { gql } from '@apollo/client'

export const REGISTER_MUTATION = gql`
  mutation createUser($registerInput: RegisterInput) {
    createUser(registerInput: $registerInput) {
      username
      email
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      username
      token
    }
  }
`

export const UPDATE_TASK_MUTATION = gql`
  mutation EditTask($id: ID!, $taskInput: TaskInput) {
    editTask(ID: $id, taskInput: $taskInput)
  }
`

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($taskInput: TaskInput) {
    createTask(taskInput: $taskInput) {
      id
    }
  }
`
export const REMOVE_TASK = gql`
  mutation Mutation($id: ID!) {
    removeTask(ID: $id)
  }
`

export const DO_COMPLETE_TASK = gql`
mutation DoCompleteTask($id: ID!) {
  doCompleteTask(ID: $id) {
    id
  }
}
`

export const BACK_COMPLETED_TASK = gql`
mutation BackCompletedTask($id: ID!, $taskInput: TaskInput) {
  backCompletedTask(ID: $id, taskInput: $taskInput) {
    id
  }
}
`
