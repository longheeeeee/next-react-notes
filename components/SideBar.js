/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import SideBarNoteList from '@/components/SideBarNoteList'
import EditButton from './EditButton'
import { Suspense } from 'react'
import NoteListSkeleton from './NoteListSkeleton'
import SidebarSearchField from './SideBarSearchField'
import { useTranslation } from 'app/i18n'

export default async function SideBar({lng}) {
  const { t } = await useTranslation(lng)

  return (
    <>
      <section className='col sidebar'>
        <Link href={'/'} className='link-unstyled'>
        <section className='sidebar-header'>
          <img 
            className='logo'
            src='./logo.svg'
            width='22px'
            height='20px'
            alt=''
            role='presentation'
           />
           <strong>React Notes</strong>
        </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField lng={lng} />
          <EditButton noteId={null}>{t('new')}</EditButton>
        </section>

        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SideBarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}