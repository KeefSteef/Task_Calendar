import { useApiTaskBoardContext } from '../../../contexts/CreateTaskBoardContext/useCreateTaskBoardContext'
import React from 'react'

export const useCreateTaskBoard = () => {
  const api = useApiTaskBoardContext()

  const enableBoard = (event: MouseEvent, testGrid: HTMLElement, board: HTMLElement) => {
    const taskBoard = document.getElementById('task_board') as HTMLDivElement
    const grid = testGrid.offsetParent as HTMLElement
    const target = event.target as HTMLElement

    if (!taskBoard.contains(target) && !target.className.includes('card') && !target.className.includes('resize')) {
      const { clientX, clientY } = event
      const { x, y } = grid.getBoundingClientRect()
      const left = clientX - x
      const top = clientY - y < grid.offsetHeight - 80 ? clientY - y : grid.offsetHeight - 80

      board.style.display = 'block'
      const { offsetWidth } = taskBoard
      board.style.top = `${top}px`
      board.style.left = left > 4 * 160 ? `${clientX - x - offsetWidth}px` : `${left}px`

      api({ top, left })
    }
  }

  const mouseDownHandler = (event: React.MouseEvent<Element, MouseEvent>, grid: HTMLElement, board: HTMLElement) => {
    const target = event.target as HTMLElement
    if (target.className.includes && target.className.includes('grid')) {
      grid.addEventListener('mouseup', function handler(event: MouseEvent) {
        enableBoard(event, grid, board)
        this.removeEventListener('mouseup', handler)
      })
    }

    return false
  }

  return {
    enableBoard,
    mouseDownHandler,
  }
}
