import React, { FC } from 'react'
import classnames from 'classnames'
import { Disclosure } from '@headlessui/react'

import { ChevronRight } from '../../icons'

interface SectionProps {
  title: string
  actionIcon: React.ReactElement
  body: React.ReactElement
}

const Section: FC<SectionProps> = ({ title, actionIcon, body }) => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="relative">
          <Disclosure.Button className="flex items-center justify-between w-full">
            <h2 className="flex items-center w-full mb-0 text-base space-x-1">
              <span
                className={classnames('origin-center transition-transform', {
                  'rotate-90': open,
                })}
              >
                <ChevronRight />
              </span>
              <span>{title}</span>
            </h2>
          </Disclosure.Button>
          <span className="absolute h-3 top-0.5 right-2">{actionIcon}</span>
          <div className="">
            <Disclosure.Panel className="">{body}</Disclosure.Panel>
          </div>
        </div>
      )}
    </Disclosure>
  )
}

export default Section
