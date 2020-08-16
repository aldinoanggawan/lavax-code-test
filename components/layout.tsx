import React, { ReactNode } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title }: Props) => (
  <>
    <Head>
      <title>LavaNote {title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link
        href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap'
        rel='stylesheet'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
      <meta name='apple-mobile-web-app-title' content='LavaNote' />
      <meta name='application-name' content='LavaNote' />
      <meta name='msapplication-TileColor' content='#b91d47' />
      <meta name='theme-color' content='#ffffff' />
    </Head>
    <Navbar />
    {children}
  </>
)

export default Layout
