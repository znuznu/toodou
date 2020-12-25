import React, { useState, useEffect } from 'react';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import {
  addTaskListToBoard,
  updateTitleBoard,
} from '../../actions/board.action';
import { addTaskList } from '../../actions/taskList.action';

import { getNextId } from '../../utils/functions';

import PropTypes from 'prop-types';

import { Flex, Box, Heading, IconButton, Input } from '@chakra-ui/react';
import { ArrowBackIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';

import TaskList from '../TaskList/TaskList';
import TaskListAdd from '../TaskList/TaskListAdd';

const selectBoardFromId = (state, id) => {
  return state.boards[id];
};

const selectNextTaskListId = (state) => {
  return getNextId(state.taskLists);
};

const Board = (props) => {
  const { id, onDelete } = props;

  const board = useSelector(
    (state) => selectBoardFromId(state, id),
    shallowEqual
  );

  const lastTaskListId = useSelector(
    (state) => selectNextTaskListId(state),
    shallowEqual
  );

  const [editMode, setEditMode] = useState({ title: false });
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const toggleEditTitle = () => {
    setEditMode({ ...editMode, title: !editMode.title });
  };

  const onSaveTitle = () => {
    dispatch(updateTitleBoard(id, title));
    toggleEditTitle();
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onAddTaskList = () => {
    dispatch(addTaskList(`Tasks #${board.taskLists.length + 1}`));
    dispatch(addTaskListToBoard(id, lastTaskListId));
  };

  const Header = () => {
    return (
      <>
        <Heading>{board && board.title}</Heading>
        <Box>
          <IconButton
            aria-label="Edit the board"
            mx="2"
            icon={<EditIcon />}
            onClick={toggleEditTitle}
          />
          {/* <IconButton
            aria-label="Delete the board"
            icon={<DeleteIcon />}
            onClick={onDelete}
          /> */}
        </Box>
      </>
    );
  };

  return (
    <>
      <Flex>
        {editMode.title ? (
          <>
            <Input
              size="lg"
              placeholder={board && board.title}
              w="50"
              name="title"
              value={title}
              onChange={onTitleChange}
              autoFocus
            />
            <Box my="auto">
              <IconButton
                aria-label="Save the title"
                mx="2"
                icon={<CheckIcon />}
                onClick={onSaveTitle}
              />
              <IconButton
                aria-label="Undo editing the title"
                icon={<ArrowBackIcon />}
                onClick={toggleEditTitle}
              />
            </Box>
          </>
        ) : (
          <Header />
        )}
      </Flex>
      <Flex flexDir="horizontal" wrap="wrap">
        {board && board.taskLists.length ? (
          board.taskLists.map((taskListId) => {
            return (
              <TaskList
                id={taskListId}
                boardId={id}
                key={`tlid-${taskListId}`}
              ></TaskList>
            );
          })
        ) : (
          <Heading as="em" mt="auto" mr="4">
            No list found.
          </Heading>
        )}
        <TaskListAdd onAddTaskList={onAddTaskList}></TaskListAdd>
      </Flex>
    </>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Board;

//   const Header = () => {
//     return (
//       <>
//         <Heading>{board && board.title}</Heading>
//         <Box>
//           <IconButton
//             aria-label="Edit the board"
//             mx="2"
//             icon={<EditIcon />}
//             onClick={toggleEditTitle}
//           />
//           {/* <IconButton
//             aria-label="Delete the board"
//             icon={<DeleteIcon />}
//             onClick={onDelete}
//           /> */}
//         </Box>
//       </>
//     );
//   };

//   return (
//     <>
//       <Flex>
//         {editMode.title ? (
//           <>
//             <Input
//               size="lg"
//               placeholder={board && board.title}
//               w="50"
//               name="title"
//               value={title}
//               onChange={onTitleChange}
//             />
//             <Box my="auto">
//               <IconButton
//                 aria-label="Save the title"
//                 mx="2"
//                 icon={<CheckIcon />}
//                 onClick={onSaveTitle}
//               />
//               <IconButton
//                 aria-label="Undo editing the title"
//                 icon={<ArrowBackIcon />}
//                 onClick={toggleEditTitle}
//               />
//             </Box>
//           </>
//         ) : (
//           <Header />
//         )}
//       </Flex>
//       <Flex flexDir="horizontal" wrap="wrap">
//         {board && board.taskLists.length ? (
//           board.taskLists.map((taskListId) => {
//             return (
//               <TaskList
//                 id={taskListId}
//                 boardId={id}
//                 key={`tlid-${taskListId}`}
//               ></TaskList>
//             );
//           })
//         ) : (
//           <Heading as="em" mt="auto" mr="4">
//             No list found.
//           </Heading>
//         )}
//         <TaskListAdd onAddTaskList={onAddTaskList}></TaskListAdd>
//       </Flex>
//     </>
//   );
// };
