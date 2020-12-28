import React, { useState } from 'react';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import PropTypes from 'prop-types';

import { Flex, Heading } from '@chakra-ui/react';

import { moveTaskList } from '../../actions/board.action';
import { moveTaskSelf, moveTaskBetween } from '../../actions/taskList.action';

import TaskList from '../TaskList/TaskList';
import TaskListAdd from '../TaskList/TaskListAdd';

const selectBoardFromId = (state, id) => {
  return state.boards[id];
};

const BoardContent = (props) => {
  const { id } = props;

  // Focus the newly created taskList
  const [openTaskListId, setOpenTaskListId] = useState(-1);

  const board = useSelector(
    (state) => selectBoardFromId(state, id),
    shallowEqual
  );

  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'taskList') {
      dispatch(moveTaskList(id, source.index, destination.index));
    } else {
      if (source.droppableId === destination.droppableId) {
        dispatch(
          moveTaskSelf(source.droppableId, source.index, destination.index)
        );
      } else {
        dispatch(
          moveTaskBetween(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index
          )
        );
      }
    }
  };

  return (
    <Flex flexDir="horizontal" overflowX="auto" h="100%">
      {board && board.taskLists.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId={`droppable-board-${id}`}
            direction="horizontal"
            type="taskList"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  display: 'flex',
                }}
              >
                {board.taskLists.map((taskListId, index) => (
                  <Draggable
                    key={taskListId}
                    draggableId={`draggable-tasklist-${taskListId}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskList
                          id={taskListId}
                          boardId={id}
                          key={`tlid-${taskListId}`}
                          shouldBeFocused={openTaskListId === taskListId}
                        ></TaskList>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Heading as="em" mr="4">
          No list found.
        </Heading>
      )}
      <TaskListAdd boardId={id} setOpenTaskListId={setOpenTaskListId} />
    </Flex>
  );
};

BoardContent.propTypes = {
  id: PropTypes.number.isRequired,
};

export default BoardContent;
