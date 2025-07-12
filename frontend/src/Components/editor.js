"use client";
import React, { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';
//import 'quill-emoji/dist/quill-emoji.css';

export default function Editor() {
  const editorRef = useRef(null);

  useEffect(() => {
    let quillInstance;

    const setupEditor = async () => {
      const QuillModule = await import('quill');
      const Quill = QuillModule.default;

    //   const { default: Emoji } = await import('quill-emoji');
    //   Quill.register('module/emoji', Emoji);

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

      if (editorRef.current) {
        console.log(document)
        quillInstance = new Quill("#editor", {
          theme: 'snow',
          modules: {
            toolbar: toolbarOptions,
            // emoji: true // ✅ this activates emoji module
          }
        });
      }
    };

    setupEditor();

    return () => {
      quillInstance = null;
    };
  }, []);

  return (
    <div>
      <div
        ref={editorRef}
        id="editor"
        style={{ height: '300px', backgroundColor: 'white' }}
      />
    </div>
  );
}
