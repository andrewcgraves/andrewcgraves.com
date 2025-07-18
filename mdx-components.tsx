import type { MDXComponents } from 'mdx/types'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '400'],
    variable: '--font-body'
})
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({children}) => <h1 className={`${roboto.variable} font-sans bg-red-500`}>{children}</h1>,
    ...components,
  }
}