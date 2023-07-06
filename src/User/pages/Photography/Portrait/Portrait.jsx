import React, { memo } from 'react';
import style from './style.module.css'

export const Portrait = () => {
  return (
<>
<div className={style.portrait}>
<h1>PORTRAIT</h1>
</div>
</>
  )
}

export default memo(Portrait)

