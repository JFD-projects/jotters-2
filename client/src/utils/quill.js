export const toolbarModules = {
  toolbar: [
    [{header: [1, 2, 3, 4, 5, 6, false]}],
    ['bold', 'italic', 'underline', 'strike'],
    [{align: []}],
    [{color: []}, {background: []}],
    [{script: 'sub'}, {script: 'super'}],
    ['blockquote', 'code-block'],
    [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
    ['link'],
    ['clean']
  ]
}

export const toolbarModulesEmpty = {
  toolbar: null
}

// All tools of Quill
//
// const modules = {
//   toolbar: [
//     [{font: []}],
//     [{header: [1, 2, 3, 4, 5, 6, false]}],
//     ['bold', 'italic', 'underline', 'strike'],
//     [{align: []}],
//     [{color: []}, {background: []}],
//     [{script: 'sub'}, {script: 'super'}],
//     ['blockquote', 'code-block'],
//     [{list: 'ordered'}, {list: 'bullet'}],
//     [{indent: '-1'}, {indent: '+1'}],
//     ['link', 'image', 'video'],
//     ['clean']
//   ]
// }
