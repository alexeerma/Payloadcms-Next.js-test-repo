import React from 'react'
import { CircularText } from '../Logo/CircularText'

export default function AdminLogo() {
  return (
    <div>
      <img src="../public/media/logo.png" alt="Admin logo" style={{ height: 40 }} />
      <CircularText text="ALEXEERMA • KALA • FITNESS •" onHover="goBonkers" size={50} />
    </div>
  )
}
