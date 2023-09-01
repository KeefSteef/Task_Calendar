import React, { FC } from 'react'
import cls from './Toasts.module.scss'
import { useSyncExternalStore } from 'react'
import Toast from './Toast'
import { toastStore, toasts} from '../../store/ToastStore'

function getSnapshot() {
  return toasts
}

const Toasts: FC = () => {
  const toastList = useSyncExternalStore(toastStore.subscribe, toastStore.getToasts, getSnapshot)

  return (
    <div className={cls.toast_wrapper}>
      <ul className={cls.toasts_list}>
        {toastList?.map(({ id, message, type }) => (
          <Toast message={message} type={type} key={id} id={id} />
        ))}
      </ul>
    </div>
  )
}

export default Toasts
