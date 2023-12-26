import { useState } from 'react'
import { EmptyState } from 'src/components'

function QuickPickTab({ selectedTags, setSelectedTags }) {
  const tags = ['All', 'Unread', 'Alerts']

  const isIncluded = selectedTags?.includes([...tags])

  const handleRemoveTag = (tag) => {
    setSelectedTags((prev) => [...prev.filter((t) => t !== tag)])
  }

  const handleAddTag = (tag) => {
    setSelectedTags([tag])
  }

  return (
    <div className=" self-start">
      <div className="flex gap-x-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleAddTag(tag)}
            className={`flex h-8 w-24 items-center justify-center rounded-lg  p-2 text-sm hover:bg-fuchsia-600 ${
              selectedTags?.includes(tag) ? 'bg-fuchsia-500' : 'bg-slate-500'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export function NotificationsPage() {
  const [selectedTags, setSelectedTags] = useState(['All'])
  return (
    <div className="px-2 py-4">
      <QuickPickTab selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      <EmptyState description="No notifications" />
    </div>
  )
}
