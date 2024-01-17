import cls from './Navbar.module.scss'
import Image from 'next/image'
import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import User from '../User'

const Navbar: FC = () => {
  const { pathname } = useRouter()
  return (
    <>
      <User />
      <nav className={cls.nav}>
        <div
          className={cls.link}
          style={{ pointerEvents: pathname.includes('/calendar') ? 'none' : 'auto' }}
        >
          <Link href="/calendar" passHref>
            <a href="/calendar">
              <Image src={'/calendar.svg'} width={60} height={60} alt={'calendar'} />
            </a>
          </Link>
        </div>
        <div
          className={cls.link}
          style={{ pointerEvents: pathname.includes('/completed') ? 'none' : 'auto' }}
        >
          <Link href="/completed" passHref>
            <a>
              <Image src={'/completed.svg'} width={60} height={60} alt={'completed'} />
            </a>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
