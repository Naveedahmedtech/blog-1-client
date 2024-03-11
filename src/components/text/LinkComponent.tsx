import React from 'react'
import { Link } from 'react-router-dom'

interface LinkComponentProps {
    className?: string,
    to: string,
    style?: React.CSSProperties | undefined,
    children: React.ReactNode
}


const LinkComponent = ({ children, className, to, style ={ textDecoration: "none" } }: LinkComponentProps) => {
  return (
      <Link className={className} to={to} style={style}>{ children }</Link>
  )
}

export default LinkComponent
