import { FC } from 'react'

// import api from '../axios'
import userStore from '../store/userStore'
import { useQueryChannels } from '../queries'

interface SidePanelProps {
  dummy?: null
}

const SidePanel: FC<SidePanelProps> = () => {
  const { spaceId } = userStore()
  const { data: channels, isSuccess } = useQueryChannels(spaceId)
  if (!isSuccess) return null

  return (
    <aside
      className={`w-1/4 md:w-1/5 h-full
      px-2 py-2 md:px-3 border-r border-neutral-600
      bg-slate-900
     `}
    >
      <h4>Channels</h4>
      {channels?.map((c) => {
        return (
          <span key={c.id}>
            <span className="text-neutral-400"># </span>
            {c.name}
          </span>
        )
      })}
    </aside>
  )
}

export default SidePanel
