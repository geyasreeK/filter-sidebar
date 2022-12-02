import React, { useState, useRef } from "react";
import { VALUE_LIST } from "../shared/common-constants";
import "./PreFilterTags.css";
import Dropdown from "./CheckboxDropdown";
import { setShowValueDropdown } from "../features/globalSlice";
import { useSelector, useDispatch } from "react-redux";

function PreFilterTags(props) {
  const [list, setList] = useState(VALUE_LIST);
  const [items, setItems] = useState(list);
  const dispatch = useDispatch();
  const showValue = useSelector((state) => state.globalState.showValueDropdown);
  const preFilterTag = useSelector((state) => state.globalState.preFilterTag);

  const renderList = (items, classname) => {
    return items.map((item, index) => (
      <span className={classname} key={item.id}>
        {item.item}
        {items.length > 1 && index !== items.length - 1 ? "," : ""}
      </span>
    ));
  };

  const filterList = (input) => {
    const filteredValues = list.filter((value) => {
      const value_ = value.item.toLocaleLowerCase();
      const input_ = input.toLocaleLowerCase();
      return value_.includes(input_);
    });
    setItems(filteredValues);
  };

  const classColor = (key) => {
    switch (key) {
      case "ZENDESK":
        return "display-label-purple-color";
        break;
      case "INTERCOM":
        return "display-label-yellow-color";
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="tag-container">
        <div className={`display-label ${classColor(preFilterTag.label)}`}>
          {preFilterTag.label}
        </div>
        <div className="display-tags">
          <div className="display-tags-text">
            {renderList(preFilterTag.tag, "tag-item")}
            <span className="is-text">
              {preFilterTag.tag.length === 1 ? "is" : "are"}
            </span>
          </div>
          <div className="input-field" 
          onClick={() => dispatch(setShowValueDropdown(true))}
          >
            <span className="input-text">Select Value...</span>
          </div>
        </div>
        <div className="dropdown-container">{showValue && <Dropdown />}</div>
      </div>
    </>
  );
}

export default PreFilterTags;
