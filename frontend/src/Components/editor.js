"use client";
import React, { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';

export default function Editor({ onChange }) {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    const setupEditor = async () => {
      const QuillModule = await import('quill');
      const Quill = QuillModule.default;

      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean']
      ];

      if (editorRef.current && !quillInstance.current) {
        quillInstance.current = new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: toolbarOptions,
          },
        });

        // 🔁 on text change, call onChange
        quillInstance.current.on('text-change', () => {
          const html = editorRef.current.querySelector('.ql-editor').innerHTML;
          onChange && onChange(html);
        });
      }
    };

    setupEditor();
  }, [onChange]);

  return (
    <div
      ref={editorRef}
      style={{ height: '300px', backgroundColor: 'white' }}
    />
  );
}
