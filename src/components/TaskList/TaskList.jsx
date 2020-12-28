import './TaskList.scss';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import React from 'react';

import PropTypes from 'prop-types';

import { Box, useColorModeValue } from '@chakra-ui/react';

import Task from '../Task/Task';
import TaskAdd from '../Task/TaskAdd';
import TaskListHeader from './TaskListHeader';

import { addTaskToTaskList } from '../../actions/taskList.action';
import { addTask } from '../../actions/task.action';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getNewNextId } from '../../utils/functions';

const selectTaskList = (state, taskListId) => {
  return state.taskLists[taskListId];
};

const selectNextTaskId = (state) => {
  return getNewNextId(state.tasks);
};

const TaskList = (props) => {
  const { id, boardId } = props;

  // Background of the taskList, need one due to the dnd
  const bg = useColorModeValue('white', 'gray.800');

  const dispatch = useDispatch();

  const taskList = useSelector(
    (state) => selectTaskList(state, id),
    shallowEqual
  );

  const lastTaskId = useSelector(
    (state) => selectNextTaskId(state),
    shallowEqual
  );

  const onAddTask = () => {
    dispatch(addTask(`A task...`));
    dispatch(addTaskToTaskList(id, lastTaskId));
  };

  return (
    <>
      <Box
        minW="xs"
        maxW="sm"
        borderWidth="1px"
        overflow="hidden"
        borderRadius="lg"
        px="3"
        pt="3"
        mr="4"
        boxShadow="base"
        display="inline-table"
        bg={bg}
      >
        <TaskListHeader id={id} boardId={boardId} />

        <Droppable droppableId={`${id}`} type="task">
          {(provided) => (
            <Box ref={provided.innerRef} minH="5" className="tasks">
              {taskList &&
                taskList.tasks &&
                taskList.tasks.map((taskId, index) => (
                  <Draggable
                    key={`draggable-task-${taskId}`}
                    draggableId={`draggable-task-${taskId}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task
                          key={`task-${taskId}`}
                          id={taskId}
                          taskListId={id}
                          isDragged={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>

        <TaskAdd onAddTask={onAddTask}></TaskAdd>
      </Box>
    </>
  );
};

TaskList.propTypes = {
  id: PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
};

export default TaskList;
