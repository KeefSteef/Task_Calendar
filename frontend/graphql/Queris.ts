import { gql } from '@apollo/client'

export const QUERY_TASK = gql`
  query Tasks($dates: [String!], $owner: String!) {
    tasks(dates: $dates, owner: $owner) {
      id
      date
      name
      timeStart
      timeEnd,
    }
  }
`


export const QUERY_COMPLETED_TASKS = gql`
 query Query($owner: String!) {
  completedTasks(owner: $owner) {
    id
    date
    name
    timeStart
    owner
    timeEnd
  }
}
`
