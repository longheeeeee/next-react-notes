'use client';
// 用到了事件，所以需要绑定

import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useTranslation } from "@/app/i18n/client.js"


function Spinner({active = true}) {
  return (
    <div
      className={['spinner', active && 'spinner--active'].join(' ')}
      role="progressbar"
      aria-busy={active ? 'true' : 'false'}
    />
  );
}

export default function SidebarSearchField({
  lng
}) {
  const { replace } = useRouter()
  // 实时获取pathname来填充到search上
  const pathname = usePathname()
  // useTransition提供了低优先级更新
  const [isPending, startTransition] = useTransition()
  // 获取到翻译配置
  const { t } = useTranslation(lng, 'basic')


  // 在更新search的时候通过低优先级任务来把keyword更新到ur上
  function handleSearch(term) {
    const params = new URLSearchParams(window.location.search)
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="search" role="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder={t('search')}
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  );
}
