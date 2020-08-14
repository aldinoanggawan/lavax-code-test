import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title }: Props) => (
  <>
    <Head>
      <title>LavaX Code Test {title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link
        href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap'
        rel='stylesheet'
      ></link>
    </Head>
    {children}
  </>
)

export default Layout
