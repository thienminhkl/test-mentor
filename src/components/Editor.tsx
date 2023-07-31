import ReactQuill from 'react-quill';
//
import { EditorProps } from '~/hooks/RHFEditor';
import 'react-quill/dist/quill.snow.css';

// ----------------------------------------------------------------------

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  ...other
}: EditorProps) {
  const myColors = [
    'purple',
    '#785412',
    '#452632',
    '#856325',
    '#963254',
    '#254563',
    'white',
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ color: myColors }],
      [{ background: myColors }],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
  ];

  return (
    <>
      <ReactQuill
        id={id}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write something awesome..."
        {...other}
      />

      {helperText && helperText}
    </>
  );
}
