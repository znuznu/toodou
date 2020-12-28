import './TaskList.scss';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Box } from '@chakra-ui/react';

import Task from '../Task/Task';
import TaskAdd from '../Task/TaskAdd';

import { useSelector, shallowEqual } from 'react-redux';

const selectTaskList = (state, taskListId) => {
  return state.taskLists[taskListId];
};

const TaskListContent = (props) => {
  const { id } = props;

  // Focus the newly created task
  const [newTaskId, setNewTaskId] = useState(-1);

  const taskList = useSelector(
    (state) => selectTaskList(state, id),
    shallowEqual
  );

  return (
    <>
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
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      mb={3}
                    >
                      <Task
                        key={`task-${taskId}`}
                        id={taskId}
                        taskListId={id}
                        isDragged={snapshot.isDragging}
                        isNew={taskId === newTaskId}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <TaskAdd taskListId={id} setNewTaskId={setNewTaskId}></TaskAdd>
    </>
  );
};

TaskListContent.propTypes = {
  id: PropTypes.number.isRequired,
};

export default TaskListContent;
