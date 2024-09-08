import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { locales, defaultLocale } from '@/config.js'
import { NextResponse } from 'next/server'

const publicFile = /\.(.*)$/
const excludeFile = ['logo.svg']


// 这里是用来获取浏览器首选配置
function getLocale(request) { 
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  // 这里不能直接传入 request，有更简单的写法欢迎评论留言
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale)
 }

// 主要的功能是拦截路径，然后对没有设置语言的路径进行自动跳转
// 会对图片/接口/页面都生效
export function middleware(request) {
  const { pathname } = request.nextUrl
  // 判断请求路径中是否已存在语言，已存在语言则跳过
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return

  // 如果是 public 文件，不重定向，额外添加图片处理白名单
  if (publicFile.test(pathname) && excludeFile.indexOf(pathname.substr(1)) == -1) return
 
  // 获取匹配的 locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // 默认语言不重定向
  if (locale == defaultLocale) {
    return NextResponse.rewrite(request.nextUrl)
  }
  // 重定向，如 /products 重定向到 /en-US/products
  return Response.redirect(request.nextUrl)
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

