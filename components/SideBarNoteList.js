import { getAllNotes } from '@/lib/redis'
import { sleep } from '@/lib/utils';
import SidebarNoteListFilter from './SideBarNoteListFilter';
import SidebarNoteItem from './SideBarNoteItem';
import SideBarNoteItemHeader from './SideBarNoteItemHeader';

export default async function NoteList() {

  await sleep(1000)

  const notes = await getAllNotes()
  const arr = Object.entries(notes)
  if (arr.length === 0) { 
    return (
      <div className="notes-empty">
        No Notes created yet!
      </div>
    )
  }
  
  const propNotes = Object.entries(notes).map(([noteId, note]) => {
    const noteData = JSON.parse(note)
    return {
      noteId,
      note: noteData,
      header: <SideBarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />
    }
  })


  return (
    <SidebarNoteListFilter notes={propNotes}>
    </SidebarNoteListFilter>
  )
}