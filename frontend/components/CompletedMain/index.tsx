import React, { FC } from 'react'
import cls from '../../pages/completed/Completed.module.scss'
import CompletedNav from '../CompletedNav'
import { LayoutGroup } from 'framer-motion'
import CompletedSection from '../CompletedSection'
import { useCompletedTasks } from '../../hooks/useCompletedTasks'
import NoTaskIcon from '../NoTaskIcon'

const CompletedMain: FC = () => {
  const [filterStateData, setState] = useCompletedTasks()
  const getFilterData = (value = ''): void => {
    const newData = filterStateData.map((section) => {
      if (!section.disable && section.tasks.some((task) => task.name.includes(value))) {
        section.show = true
        return section
      }

      section.show = false
      return section
    })

    setState(newData)
  }
  return (
    <div className={cls.main_container}>
      <CompletedNav filterHandler={getFilterData} />
      <LayoutGroup id={'tasks'}>
        <ul className={cls.completed_tasks}>
          {filterStateData.map((section, index: number) => {
            const { show, date, tasks } = section
            return (
              <CompletedSection
                setState={setState}
                show={show}
                key={date}
                tasks={tasks}
                date={date}
                index={index + 1}
              />
            )
          })}
        </ul>
        <NoTaskIcon show={filterStateData.some((item) => item.show)} />
      </LayoutGroup>
    </div>
  )
}

export default CompletedMain
