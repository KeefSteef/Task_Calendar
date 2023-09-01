import cls from './Completed.module.scss'
import CompletedMain from '../../components/CompletedMain'
import { FC } from 'react'

const Completed: FC = () => {
  return (
    <section className={cls.completed_section}>
      <div className={cls.main}>
        <CompletedMain />
      </div>
    </section>
  )
}

export default Completed
