import React, { FC, useState } from 'react'
import cls from './Checkbox.module.scss'

const Checkbox: FC<{ children: string }> = ({ children }) => {
  const [isActive, setActive] = useState<boolean>(false)
  return (
    <div className={cls.checkbox_container} onClick={() => setActive((prev) => !prev)}>
      <div style={{ background: isActive ? '#3C4450FF' : 'transparent' }} className={cls.checkbox}>
        <img style={{ display: isActive ? 'block' : 'none' }} className={cls.tick} src={'/tick.svg'} alt={'tick'} />
      </div>
      <p>{children}</p>
    </div>
  )
}

export default Checkbox
