import React from 'react'

import Modal from '../../../modal/modal'

const Sidebar = ({isMobile = false, hideSidebar, children}) => {
  return isMobile
    ?
    <Modal modalClass="mobile-sidebar"
           onRemoveModal={hideSidebar}>
        {children}
    </Modal>
    :
    <>
      {children}
    </>
}

export default Sidebar
