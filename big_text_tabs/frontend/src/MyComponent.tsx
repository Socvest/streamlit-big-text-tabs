import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps,
} from "streamlit-component-lib";
import React, { useCallback, useEffect, useMemo, useState, ReactElement } from "react";
import "./styles.css";

const BigTextTabs: React.FC<ComponentProps> = (props: any) => {
  const { args } = props
  const styles: any = args["styles"]
  const tabsData:any[] = args["tab_data"] 

  const [clickedTab, setClickedTab] = useState({ index: 0, value: tabsData[0].value })

  const onActiveTab = (index: any, value: any) => {
    const clickedTabCopy = { ...clickedTab }
    clickedTabCopy.index = index
    clickedTabCopy.value = value
    setClickedTab(clickedTabCopy)
  }

  const className = (index: any, value: any) => {
    if (clickedTab.index === index && clickedTab.value === value) {
      return "tab-text clicked-tab"
    } else {
      return "tab-text"
    }
  }

  useEffect(() => {
    Streamlit.setComponentValue(clickedTab)
  }, [clickedTab])

  useEffect(() => {
    Streamlit.setFrameHeight()
  })

  return (
    <>
      <style>{styles}</style>
      <div className="tab-container">
        <ul className="tab-text-container">
          {tabsData.map((obj: any) => (
            <li
              className={className(obj.index, obj.value)}
              id={`${obj.index}-${obj.value}`}
              onClick={() => onActiveTab(obj.index, obj.value)}
            >
              {obj.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default withStreamlitConnection(BigTextTabs)
