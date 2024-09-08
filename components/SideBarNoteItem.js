
import SidebarNoteItemContent from '@/components/SideBarNoteItemContent';
import SideBarNoteItemHeader from './SideBarNoteItemHeader';

export default function SidebarNoteItem({ noteId, note}) {

  const { title, content = '', updateTime } = note;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }>
        <SideBarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  );
}