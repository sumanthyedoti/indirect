import React, { useState, useCallback, FC } from 'react'
import classnames from 'classnames'
import {
  createEditor,
  Transforms,
  BaseEditor,
  Editor,
  Descendant,
  Text,
} from 'slate'
import { Slate, Editable, ReactEditor, withReact } from 'slate-react'
import { HistoryEditor } from 'slate-history'

type CustomTextT = { text: string }
type PElementT = { type: 'paragraph'; children: CustomTextT[] }
type CodeElementT = { type: 'code'; children: CustomTextT[] }
type BoldElementT = { bold: boolean }
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Text: CustomTextT
    Element: PElementT | CodeElementT | BoldElementT
  }
}

const CustomEditor = {
  isBoldMarkActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      //@ts-ignore
      match: (n) => n.bold === true,
      universal: true,
    })

    return !!match
  },

  isCodeBlockActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      //@ts-ignore
      match: (n) => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor: any) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor: any) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : 'code' },
      { match: (n) => Editor.isBlock(editor, n) }
    )
  },
}

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>
}
const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

interface MessageAreaProps {
  onSubmit?: (text: string) => void
  className?: string
}
const MessageArea: FC<MessageAreaProps> = ({
  onSubmit,
  className,
  // ...props
}) => {
  const [editor] = useState(() => withReact(createEditor()))
  const [text, setText] = useState('')
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit && onSubmit(text)
    setText('')
  }

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, [])

  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]

  return (
    <form onSubmit={handleSubmit} className={classnames(className)}>
      <Slate editor={editor} value={initialValue}>
        <Editable
          onChange={handleInput}
          placeholder="Message"
          className={`
          w-full bg-slate-800 grow
          px-3 py-2
          border border-gray-600 focus:border-gray-400
          outline-none
          rounded
        `}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return
            }
            switch (event.key) {
              // When "`" is pressed, keep our existing code block logic.
              case '`': {
                event.preventDefault()
                CustomEditor.toggleCodeBlock(editor)
                break
              }

              // When "B" is pressed, bold the text in the selection.
              case 'b': {
                event.preventDefault()
                CustomEditor.toggleBoldMark(editor)
                break
              }
            }
          }}
        />
      </Slate>
    </form>
  )
}

export default MessageArea
