import React from 'react'
import ReactQuill from 'react-quill'
import {toolbarModules} from '../../utils/quill'
import DropdownBtn from '../formElements/dropdownBtn'

const QuillCard = ({readOnly, value, onChange, type, paramsDropdownBtn}) => {
  return (
    <div className={'quill-card card-container'}>

      {readOnly && type === 'PRIVATE' &&
      <DropdownBtn params={paramsDropdownBtn}/>}

      <ReactQuill modules={toolbarModules}
                  readOnly={readOnly}
                  className={readOnly ? 'hide-toolbar' : ''}
                  value={value}
                  onChange={onChange}
                  theme="snow"/>
    </div>
  )
}

export default QuillCard
