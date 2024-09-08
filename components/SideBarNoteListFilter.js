'use client'
// 获取到全量数据之后，再使用这个组件来进行filter

import { useSearchParams } from 'next/navigation';
import SideBarNoteItemContent from '@/components/SideBarNoteItemContent';

export default function SidebarNoteListFilter({notes}) {

  const searchParams = useSearchParams()
  const searchText = searchParams.get('q')

  return (
    <ul className="notes-list">
    {notes.map(noteItem => {
      const {noteId, note, header} = noteItem;
      if (!searchText || (searchText && note.title.toLowerCase().includes(searchText.toLowerCase()))) {
        return (
          <SideBarNoteItemContent
            key={noteId}
            id={noteId}
            title={note.title}
            expandedChildren={
              <p className="sidebar-note-excerpt">
                {note.content.substring(0, 20) || <i>(No content)</i>}
              </p>
            }>
              {header}
          </SideBarNoteItemContent>
        )
      }

      return null
    })}
  </ul>
  )
}
