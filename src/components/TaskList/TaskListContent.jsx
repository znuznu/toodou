import { Droppable, Draggable } from 'react-beautiful-dnd';

import React from 'react';

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
                    >
                      <Task
                        key={`task-${taskId}`}
                        id={taskId}
                        taskListId={id}
                        isDragged={snapshot.isDragging}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <TaskAdd taskListId={id}></TaskAdd>
    </>
  );
};

TaskListContent.propTypes = {
  id: PropTypes.number.isRequired,
};

export default TaskListContent;
