import { useState, useCallback, FC } from 'react'
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
import { HistoryEditor, withHistory } from 'slate-history'

type CustomTextT = { text: string; bold?: boolean }
type PElementT = { type: 'paragraph'; children: CustomTextT[] }
type CodeElementT = { type: 'code'; children: CustomTextT[] }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Text: CustomTextT
    Element: PElementT | CodeElementT
  }
}

const CustomEditor = {
  isBoldMarkActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      //@ts-ignore
      match: (n) => n.bold === true,
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
      { match: (n) => Editor.isBlock(editor, n), split: true }
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

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

interface MessageAreaProps {
  onSubmit: (text: Descendant[]) => void
  className?: string
}
const MessageInput: FC<MessageAreaProps> = ({ onSubmit, className }) => {
  const [editor] = useState(() => withHistory(withReact(createEditor())))
  const [input, setInput] = useState(initialValue)
  const handleSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    onSubmit(input)
    editor.history = { redos: [], undos: [] } // clean up history
    Transforms.delete(editor, {
      at: {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      },
    })
    setInput(initialValue)
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

  return (
    <div className={classnames(className)}>
      <Slate editor={editor} value={input} onChange={setInput}>
        <Editable
          placeholder="Hi there.."
          className={`
          w-full bg-slate-700 grow
          px-3 py-2
          border border-gray-600 focus:border-gray-400
          outline-none
          rounded
        `}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && event.shiftKey) {
              event.preventDefault()
              editor.insertSoftBreak()
              return
            }
            if (event.key === 'Enter') {
              handleSubmit(event)
              return
            }
            // When "`" is pressed, keep our existing code block logic.
            if (event.key === '`' && event.ctrlKey) {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
            }

            // When "B" is pressed, bold the text in the selection.
            if (event.key === 'b' && event.ctrlKey) {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
            }
          }}
        />
      </Slate>
    </div>
  )
}

export default MessageInput
