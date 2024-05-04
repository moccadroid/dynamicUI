// app/layout.tsx
import { Providers } from './providers'
import {ReactNode} from "react";

export default function RootLayout({ children, }: { children: ReactNode, }) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}