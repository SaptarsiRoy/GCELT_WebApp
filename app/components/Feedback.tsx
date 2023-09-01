'use client'


import {ThumbsUp, ThumbsDown} from "lucide-react" 
function Feedback() {
  return (
    <a target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLScdBCKp4Zx-I4XCfS0LW7jJkegTPzo1HWmdOv_yS6DxjRXMqw/viewform?usp=sf_link'
     className='p-2  border-solid border-slate-600 shadow-md hover:bg-neutral-200 bg-neutral-100 dark:bg-slate-600 fixed bottom-2 right-2 rounded-lg
     flex flex-row justify-content items-center'>
        <ThumbsUp />
        <ThumbsDown />
        Feedback
    </a>
  )
}

export default Feedback