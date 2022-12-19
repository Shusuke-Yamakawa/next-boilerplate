import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

export const SortableItem = (props: any) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: props.id})

  return (
    <div
      style={{transform: CSS.Transform.toString(transform), transition}}
      className="border-2"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </div>
  )
}
