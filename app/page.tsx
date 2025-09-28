'use client'

import DraggableEmojiPicker from '@/components/DraggableEmojiPicker'

export default function HomePage() {
  return (
    <div className="w-full h-screen bg-transparent pointer-events-none">
      <DraggableEmojiPicker />
    </div>
  )
}
