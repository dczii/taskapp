import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  subscription GetTasks {
    tasks {
      id
      owner
      priority
      task
      done
      date
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    delete_tasks(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddTask($task: String!, $owner: String!, $date: String) {
    insert_tasks(objects: { owner: $owner, task: $task, date: $date }) {
      affected_rows
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $done: Boolean, $priority: Int) {
    update_tasks(where: { id: { _eq: $id } }, _set: { done: $done, priority: $priority }) {
      affected_rows
    }
  }
`;
