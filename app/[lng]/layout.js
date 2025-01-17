import "./style.css";
import SideBar from '@/components/SideBar'
import { locales } from '@/config.js'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// 在生成静态路由的时候会生成n份
export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }))
}

export default async function RootLayout({ 
  children,
  params: {
    lng
  }
}) {
  return (
    <html lang={lng}>
      <body>
        <div className="container">
          <div className="main">
            <SideBar lng={lng} />
            <section className="col note-viewer">{children}</section>
          </div>
          <Footer lng={lng} />
        </div>
      </body>
    </html>
  );
}
