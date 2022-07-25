import React, { FC } from 'react'
import classnames from 'classnames'
import { Disclosure, Transition } from '@headlessui/react'

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
          <span className="absolute h-3 top-0.5 right-4">{actionIcon}</span>
          <Transition
            className=""
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-3 opacity-75"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-3 opacity-25"
          >
            <Disclosure.Panel className="">{body}</Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  )
}

export default Section
