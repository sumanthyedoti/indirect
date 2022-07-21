import { FC } from 'react'

// import api from '../axios'

interface SidePanelProps {
  dummy?: null
}

const SidePanel: FC<SidePanelProps> = () => {
  return (
    <aside
      className={`w-1/4 md:w-1/5 h-full
      px-2 py-2 md:px-3 border-r border-neutral-600
      bg-slate-900
     `}
    >
      <h4>Channels</h4>
    </aside>
  )
}

export default SidePanel
