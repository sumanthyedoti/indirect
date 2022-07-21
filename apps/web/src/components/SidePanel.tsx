import { FC } from 'react'

interface SidePanelProps {
  dummy?: null
}

const SidePanel: FC<SidePanelProps> = () => {
  return (
    <aside className="w-1/4 h-full px-2 py-2 md:px-3 bg-slate-900 md:w-1/5">
      <h4>Channels</h4>
    </aside>
  )
}

export default SidePanel
