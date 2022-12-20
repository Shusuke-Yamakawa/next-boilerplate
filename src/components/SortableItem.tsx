import {FC, ReactNode} from 'react'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

type Props = {
  id: number
  children: JSX.Element
}

export const SortableItem: FC<Props> = ({id, children}) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

  return (
    <div
      style={{transform: CSS.Transform.toString(transform), transition}}
      className="w-96 border-2 border-orange-200 p-4"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}
