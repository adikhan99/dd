// ** Next Import
import dynamic from 'next/dynamic'

// ** Types
import { EditorProps } from 'react-draft-wysiwyg'

// ! To avoid 'Window is not defined' error
const ReactDraftWysiwyg = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor) as Promise<React.ComponentType<EditorProps>>, {
  ssr: false
})

export default ReactDraftWysiwyg
