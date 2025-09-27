'use client'

import DraggableEmojiPicker from '@/components/DraggableEmojiPicker'

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <DraggableEmojiPicker />
      </div>
    </div>
  )
}
