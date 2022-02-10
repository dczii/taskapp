import { useState } from 'react';
import moment from 'moment';
import {
  Table as _Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const actionStyle = {
  width: 200,
};

export const Table = ({ data, onDelete, onUpdate, onClickPriority }) => {
  const [activeSort, setActiveSort] = useState('owner');
  const [sortNameBy, setSortNameBy] = useState('asc');
  const [sortPriorityBy, setSortPriorityBy] = useState();

  let sortedData = data;

  if (sortNameBy === 'asc') {
    sortedData = data.sort((a, b) => (a.owner > b.owner ? 1 : -1));
  } else if (sortNameBy === 'desc') {
    sortedData = data.sort((a, b) => (a.owner > b.owner ? -1 : 1));
  }
  if (sortPriorityBy === 'asc') {
    sortedData = data.sort((a, b) => (a.priority > b.priority ? 1 : -1));
  } else if (sortPriorityBy === 'desc') {
    sortedData = data.sort((a, b) => (a.priority > b.priority ? -1 : 1));
  }

  function setSort(field) {
    if (field !== activeSort) {
      setActiveSort(field);
    }
    if (field === 'priority') {
      setSortPriorityBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      setSortNameBy(null);
    }
    if (field === 'owner') {
      setSortNameBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      setSortPriorityBy(null);
    }
  }

  return (
    <TableContainer component={Paper}>
      <_Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 30 }} align='left'>
              ID
            </TableCell>
            <TableCell
              style={{ width: 30 }}
              align='center'
              sortDirection={activeSort === 'priority' ? sortPriorityBy : false}
            >
              <TableSortLabel
                direction={activeSort === 'priority' ? sortPriorityBy : 'asc'}
                onClick={() => setSort('priority')}
                active={activeSort === 'priority'}
              >
                Priority
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>Task</TableCell>
            <TableCell align='center' sortDirection={activeSort === 'owner' ? sortNameBy : false}>
              <TableSortLabel
                direction={activeSort === 'owner' ? sortNameBy : 'asc'}
                onClick={() => setSort('owner')}
                active={activeSort === 'owner'}
              >
                Owner
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>Date created</TableCell>
            <TableCell style={actionStyle} align='center'>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(sortedData || []).map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{
                backgroundColor: row.done ? '#00e323' : '#FFF',
              }}
            >
              <TableCell size='small' align='left'>
                {row.id}
              </TableCell>
              <TableCell style={{ width: 30 }} align='left'>
                {row.priority !== 99999 ? (
                  row.priority
                ) : (
                  <Button size='small' onClick={() => onClickPriority(row)}>
                    Set Priority
                  </Button>
                )}
              </TableCell>
              <TableCell align='center'>{row.task}</TableCell>
              <TableCell align='center'>{row.owner}</TableCell>
              <TableCell align='center'>{moment(row.date).format('MMM DD, YYYY HH:mm')}</TableCell>
              <TableCell style={actionStyle} align='right'>
                <Button size='small' onClick={() => onUpdate(row)}>
                  Mark as {row.done ? 'Incomplete' : 'Complete'}
                </Button>
                <IconButton aria-label='delete' onClick={() => onDelete(row)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </_Table>
    </TableContainer>
  );
};
