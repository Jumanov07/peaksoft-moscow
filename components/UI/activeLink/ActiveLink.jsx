import { withRouter } from 'next/router'
import Image from 'next/image'
import Line from '../../../public/adminIcons/line.svg'

function ActiveLinkComponent({ router, href, children }) {
   ;(function prefetchPages() {
      if (typeof window !== 'undefined') {
         router.prefetch(router.pathname)
      }
   })()
   const handleClick = (event) => {
      event.preventDefault()
      router.push(href)
   }

   const isCurrentPath =
      router.pathname.includes(href) ||
      router.asPath.includes(href) ||
      (children === 'Баннер' && router.pathname === '/infoBanners' && (
         <Image src={Line} />
      ))
   const getActiveLinkLine = () => {
      const isActiveLinkLine =
         router.pathname.includes(href) || router.asPath.includes(href) ? (
            <Image src={Line} />
         ) : (
            children === 'Баннер' &&
            router.pathname === '/infoBanners' && <Image src={Line} />
         )
      return isActiveLinkLine
   }
   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '80px',
         }}
      >
         <a
            href={href}
            onClick={handleClick}
            style={{
               fontStyle: 'normal',
               fontWeight: ' 500',
               fontSize: '18px',
               lineHeight: '21px',
               color: isCurrentPath ? ' #000000' : ' #707070',
               paddingTop: '30px',
            }}
         >
            {children}
         </a>
         {getActiveLinkLine()}
      </div>
   )
}

export const ActiveLink = withRouter(ActiveLinkComponent)
