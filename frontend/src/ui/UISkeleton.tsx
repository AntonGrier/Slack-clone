import { Skeleton } from '@mui/material'
import { FunctionComponent } from 'react'

interface UISkeletonProps {
  heights: number[]
}
export const UISkeleton: FunctionComponent<UISkeletonProps> = ({ heights }) => {
  return (
    <>
      {heights.map((height, idx) => (
        <Skeleton style={{ margin: '5px 10px' }} key={idx} height={height} />
      ))}
    </>
  )
}
