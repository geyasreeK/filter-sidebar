import React, { useState, useRef } from "react";
import "./BasicDropdown.css";
import { LABEL_LIST, TAG_LIST } from "../shared/common-constants";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowTagDropdown,
  setShowPreFilterTags,
  setTagContent,
  setDisplayLabel,
  setTag,
  setShowAddFilter,
} from "../features/globalSlice";

function BasicDropdown() {
  const [list, setList] = useState(TAG_LIST);
  const [items, setItems] = useState(TAG_LIST);
  const [labels, setLabels] = useState(LABEL_LIST);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const refArray = useRef([]);
  refArray.current = [];
  const displayLabel = useSelector((state) => state.globalState.displayLabel);
  const dispatch = useDispatch();

  const addToRefs = (el) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  const classColor = (key) => {
    switch (key) {
      case "ZENDESK":
        return "label-item-purple-color";
        break;
      case "INTERCOM":
        return "label-item-yellow-color";
        break;
      default:
        break;
    }
  };

  const loopOverRefs = (index, classname) => {
    for (let i = 0; i < refArray.current.length; i++) {
      if (i === index) {
        refArray.current[i].className =
          classname + " " + classColor(refArray.current[i].innerHTML);
        dispatch(setDisplayLabel(refArray.current[i].innerHTML));
      } else {
        refArray.current[i].className = classname;
      }
    }
  };

  const renderList = (
    items,
    classname,
    clickHandler,
    passParam,
    furtherStyling
  ) => {
    return items.map((item, index) => (
      <div
        className={classname}
        key={item.id}
        ref={furtherStyling ? addToRefs : null}
        onClick={(e) => {
          if (passParam) {
            clickHandler(item);
          } else {
            clickHandler(index, classname);
          }
        }}
      >
        {item.item}
      </div>
    ));
  };

  const clickHandler = (item) => {
    if (item.item === "All") {
      const filteredArray = items.filter((item) => item.item !== "All");
      displayLabel && dispatch(setTagContent(filteredArray));
    } else {
      displayLabel && dispatch(setTagContent([item]));
    }
    if (displayLabel) {
      dispatch(setTag());
      dispatch(setShowPreFilterTags(true));
      dispatch(setShowTagDropdown(false));
      dispatch(setShowAddFilter(false));
    } else {
      setShowErrorMessage(true);
    }
  };

  const clickHandler2 = (index, className) => {
    loopOverRefs(index, className);
  };

  const filterList = (input) => {
    const filteredValues = list.filter((value) => {
      const value_ = value.item.toLocaleLowerCase();
      const input_ = input.toLocaleLowerCase();
      return value_.includes(input_);
    });
    setItems(filteredValues);
  };

  return (
    <>
      <div className="dropdown">
        <div className={`dropdown-content`}>
          <div className="labels">
            {renderList(labels, "label-item", clickHandler2, false, true)}
          </div>
          <input
            type="text"
            placeholder="Search Filter"
            className="dropdown-input-filter"
            onChange={(e) => filterList(e.target.value)}
          ></input>
          {renderList(items, "dropdown-item", clickHandler, true, false)}
          {showErrorMessage && (
            <div className="error-message">*** Select label</div>
          )}
        </div>
      </div>
    </>
  );
}

export default BasicDropdown;
