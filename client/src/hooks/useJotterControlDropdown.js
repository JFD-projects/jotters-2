import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import JotterSettings from '../components/forms/jotterSettings'
import Confirmation from '../components/modal/confirmation'

const initialSettingItems = {
  title: 'New Jotter',
  color: '#CCC'
}

const useJotterControlDropdown = (handleUpdateJotter, handleDeleteJotter) => {
  const {t} = useTranslation()
  const [settingItems, setSettingItems] = useState()
  const [currentJotter, setCurrentJotter] = useState()
  const [isVisibleSettingsCard, setIsVisibleSettingsCard] = useState(false)
  const [isVisibleDeleteConfirm, setIsVisibleDeleteConfirm] = useState(false)

  const paramsDropdownBtn = {
    img: <svg className="dropdown__icon dropdown__icon--primary">
      <use xlinkHref="/sprite.svg#icon-circle-down"/>
    </svg>,
    title: t('CONTROL'),
    onClick: handleDropdownBtn,
    items: [
      {
        action: 'settings',
        title: t('SETTINGS'),
        img: <svg className="dropdown-item__icon">
          <use xlinkHref="/sprite.svg#icon-settings"/>
        </svg>,
        disabled: false
      },
      {
        action: 'delete',
        title: t('DELETE_JOTTER'),
        img: <svg className="dropdown-item__icon">
          <use xlinkHref="/sprite.svg#icon-bin"/>
        </svg>,
        disabled: false
      }
    ]
  }

  const showSettingsCard = (jotter) => {
    setSettingItems(jotter ? jotter : initialSettingItems)
    setIsVisibleSettingsCard(true)
  }

  const hideDeleteConfirm = () => {
    setIsVisibleDeleteConfirm(false)
  }

  const hideSettingsCard = () => {
    setIsVisibleSettingsCard(false)
  }

  function handleDropdownBtn(action, jotter) {
    if (action === 'settings') {
      showSettingsCard(jotter)
    } else if (action === 'delete') {
      setCurrentJotter(jotter)
      setIsVisibleDeleteConfirm(true)
    }
  }

  const renderControlDropdown = (<>
    {isVisibleSettingsCard &&
    <JotterSettings header={t('JOTTER')}
                    settingsData={settingItems}
                    onHideModal={hideSettingsCard}
                    onSubmit={handleUpdateJotter}/>
    }

    {isVisibleDeleteConfirm &&
    <Confirmation header={t('DELETE_JOTTER')}
                  context={`${currentJotter.title}`}
                  action={t('DELETE')}
                  onConfirm={() => handleDeleteJotter(currentJotter._id)}
                  onCancel={() => setIsVisibleDeleteConfirm(false)}/>
    }
  </>)

  return {paramsDropdownBtn, showSettingsCard, hideDeleteConfirm, renderControlDropdown}
}

export default useJotterControlDropdown
