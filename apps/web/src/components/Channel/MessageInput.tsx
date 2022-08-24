import { useState, useCallback, FC } from 'react'
import {
  createEditor,
  Transforms,
  BaseEditor,
  Editor,
  Descendant,
  Text,
  Node,
} from 'slate'
import {
  Slate,
  RenderElementProps,
  RenderLeafProps,
  Editable,
  ReactEditor,
  withReact,
} from 'slate-react'
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

const CodeBlock = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>
}
const Leaf = (props: RenderLeafProps) => {
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
}
const MessageInput: FC<MessageAreaProps> = ({ onSubmit }) => {
  const [editor] = useState(() => withHistory(withReact(createEditor())))
  const [input, setInput] = useState(initialValue)
  const [prevNodeType, setPrevNodeType] = useState('paragraph')

  const renderElement = useCallback(
    (props: RenderElementProps) => {
      switch (props.element.type) {
        case 'code':
          if (prevNodeType === 'code') {
            // return <CodeElement {...props} />
          }
          setPrevNodeType('code')
          return <CodeBlock {...props} />
        default:
          setPrevNodeType('paragraph')
          return <DefaultElement {...props} />
      }
    },
    [prevNodeType]
  )

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />
  }, [])

  const clearInput = useCallback(() => {
    editor.history = { redos: [], undos: [] } // clean up history
    // delete text in editor input
    Transforms.delete(editor, {
      at: {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      },
    })
  }, [])

  const handleSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const totalSring = input
      .map((line) => Node.string(line))
      .join('')
      .trim()
    if (!totalSring.length) {
      return
    }
    onSubmit(input)
    clearInput()
    setInput(initialValue)
  }

  return (
    <Slate editor={editor} value={input} onChange={setInput}>
      <Editable
        placeholder="Hi there.."
        id="slate-editable"
        className={`
            editor
            bg-slate-700 px-3 py-2
            overflow-x-none overflow-y-auto
            border border-gray-600 focus:border-gray-400
            outline-none rounded
        `}
        style={{
          maxHeight: '50vh',
        }}
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
  )
}

export default MessageInput
