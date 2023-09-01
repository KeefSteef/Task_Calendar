import cls from './CompletedNav.module.scss'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FC, useState } from 'react'

const titleVariant = {
  hide: {
    y: 40,
  },

  view: {
    y: 0,
  },
}

const inputVariant = {
  hide: {
    y: 30,
    transition: {
      duration: 0.4,
    },
  },

  view: {
    y: -38,
    transition: {
      delay: 0.5,
      duration: 0.4,
    },
  },
}

interface ICompletedNav {
  filterHandler: (value: string) => void
}

const CompletedNav: FC<ICompletedNav> = ({ filterHandler }) => {
  const [searchBar, setBar] = useState(false)

  return (
    <div className={cls.completed_nav}>
      <div className={cls.completed_nav_container}>
        <div className={cls.title}>
          <h1>
            <motion.div
              variants={titleVariant}
              initial={'hide'}
              // onAnimationComplete={() => searchBar || filterHandler()}
              transition={{ duration: 0.4, delay: searchBar ? 0 : 0.4 }}
              animate={searchBar ? 'hide' : 'view'}
            >
              Completed
            </motion.div>
          </h1>
          <h1>
            <motion.div
              variants={titleVariant}
              initial={'hide'}
              transition={{ duration: 0.4, delay: searchBar ? 0.2 : 0.6 }}
              animate={searchBar ? 'hide' : 'view'}
            >
              Tasks
            </motion.div>
          </h1>
        </div>
        <div
          className={cls.search}
          onClick={() => {
            setBar((prev) => !prev)
          }}
        >
          <Image src={'/search.svg'} width={25} height={25} alt={'search'} />
        </div>
      </div>
      <motion.input
        onChange={(event) => filterHandler(event.target.value)}
        initial={{ y: 30 }}
        variants={inputVariant}
        animate={searchBar ? 'view' : 'hide'}
        placeholder={'Enter name of task'}
        type="text"
      />
    </div>
  )
}

export default CompletedNav
