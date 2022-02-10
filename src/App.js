import { useState } from 'react';
import Button from '@mui/material/Button';
import moment from 'moment';
import { useMutation, useSubscription } from '@apollo/client';

import { GET_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK } from './queries';
import { Loading, Table, CreateTask } from './components';
import './App.css';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading: getTaskloading, error } = useSubscription(GET_TASKS);
  const [addTask, { dataTask, loading: addTaskLoading }] = useMutation(ADD_TASK);
  const [deleteTask, { loading: deleteLoading }] = useMutation(DELETE_TASK);
  const [updateTask, { loading: updateLoading }] = useMutation(UPDATE_TASK);
  const loading = getTaskloading || deleteLoading || updateLoading;

  // Tasks calculation
  const priorityLength = data?.tasks.filter((v) => v.priority !== 99999);
  const completedTask = data?.tasks.filter((v) => v.done);

  // Submit Function
  const onSubmit = async (task, owner) => {
    const newDate = moment();
    await addTask({ variables: { task, owner, date: newDate } });
    setOpenModal(false);
  };

  // Delete Task Function
  const onDelete = (rowData) => {
    deleteTask({ variables: { id: rowData.id } });
  };

  // Update Task Function
  const onUpdate = (rowData) => {
    updateTask({ variables: { id: rowData.id, done: !rowData.done } });
  };

  // Priority Task Function
  const onClickPriority = (rowData) => {
    const prioNum = priorityLength?.length + 1;
    updateTask({ variables: { id: rowData.id, priority: prioNum } });
  };

  return (
    <div className='App'>
      <h2>TASK APP</h2>
      <h3>Total Tasks: {data?.tasks.length}</h3>
      <h3>Total Completed Tasks: {completedTask?.length}</h3>
      <Button
        variant='outlined'
        onClick={() => setOpenModal(!openModal)}
        style={{
          marginBottom: 16,
        }}
      >
        Create Task
      </Button>

      {loading && <Loading />}
      {!loading && (
        <Table
          data={data?.tasks}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onClickPriority={onClickPriority}
        />
      )}

      <CreateTask
        open={openModal}
        handleClose={() => setOpenModal(!openModal)}
        onSubmit={onSubmit}
        isLoading={addTaskLoading}
      />
    </div>
  );
}

export default App;
