/* eslint-disable @next/next/no-img-element */
'use client'
// 下置了客户端组件，并且把服务端组件的jsx通过props传进来

import { useState, useRef, useEffect, useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function SideBarNoteItemContent(props) {
  const {
    id,
    title,
    children,
    expandedChildren
  } = props

  const router = useRouter()
  const pathname = usePathname()
  // TODO 这里路由是
  const selectedId = pathname?.split('/')[1] || null

  const [isPending] = useTransition()
  const [isExpanded, setIsExpanded] = useState(false)
  const isActive = id === selectedId

  const itemRef = useRef(null)
  const prevTitleRef = useRef(title)

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title
      itemRef.current.classList.add('flash')
    }
  }, [title])

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current.classList.remove('flash')
      }}
      className={[
        'sidebar-note-list-item',
        isExpanded ? 'note-expended' : ''
      ].join(' ')}
    >
      { children }
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending
            ? 'var(--gray-80)'
            : isActive
              ? 'var(--tertiary-blue)'
              : '',
          border: isActive
            ? '1px solid var(--primary-border)'
            : '1px solid transparent',
        }}
        onClick={() => {
          const sidebarToggle = document.getElementById('sidebar-toggle')
          if (sidebarToggle) {
            sidebarToggle.checked = true
          }
          router.push(`/note/${id}`)
        }}
      >
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}>
        {isExpanded ? (
          <img
            src="/chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {isExpanded && expandedChildren}

    </div>
  )

}