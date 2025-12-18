import React from 'react'

import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { type AccordionBlock as AccordionBlockProps } from '@/payload-types'

export const AccordionBlock: React.FC<AccordionBlockProps> = ({ items }) => {
  const defaultItemValue =
    items.find((item) => item.defaultOpen)?.id ?? items[0]?.id ?? items[0]?.title

  return (
    <div className="container">
      <Accordion type="single" collapsible defaultValue={defaultItemValue ?? undefined}>
        {items.map(({ id, title, content }) => {
          const value = id ?? title

          return (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>
                <RichText data={content} enableGutter={false} />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
