import React, { useState, useRef } from "react";
import { VALUE_LIST } from "../shared/common-constants";
import "./CheckboxDropdown.css";
import {
  setShowValueDropdown,
  setDisplayValue,
  setFilterTags,
  setShowFilterTags,
  setShowPreFilterTags,
} from "../features/globalSlice";
import { useSelector, useDispatch } from "react-redux";

function CheckboxDropdown() {
  const [list, setList] = useState(VALUE_LIST);
  const [items, setItems] = useState(list);
  const [selectedTags, setSelectedTags] = useState([]);
  const allInputRef = useRef(null);
  const refArray = useRef([]);
  refArray.current = [];
  const dispatch = useDispatch();
  const filterTags = useSelector((state) => state.globalState.filterTags);
  const label = useSelector((state) => state.globalState.displayLabel);
  const tagContent = useSelector((state) => state.globalState.tagContent);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const filterList = (input) => {
    const filteredValues = list.filter((value) => {
      const value_ = value.item.toLocaleLowerCase();
      const input_ = input.toLocaleLowerCase();
      return value_.includes(input_);
    });
    setItems(filteredValues);
  };

  const addToRefs = (el) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  const loopOverRefs = (bool) => {
    refArray.current.map((ref) => {
      ref.checked = bool;
    });
  };

  const isEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const apply = () => {
    dispatch(setDisplayValue(selectedTags));
    const array = [label, tagContent, selectedTags];
    dispatch(setFilterTags(array));
    dispatch(setShowValueDropdown(false));
    dispatch(setShowPreFilterTags(false));
    dispatch(setShowFilterTags(true));
  };

  const valueSelect = () => {
    return selectedTags.length > 0 ? true : false;
  };

  const isValid = () => {
    let res = [];
    for (let index = filterTags.length - 1; index >= 0; index--) {
      const a = isEqual(selectedTags, filterTags[index]?.value);
      const b = isEqual(label, filterTags[index]?.label);
      const c = isEqual(tagContent, filterTags[index]?.tag);
      res.push(a && b && c);
    }
    return res.filter((r) => r === true).length > 0 ? false : true;
  };

  const renderList = (items, classname, type) => {
    return (
      <>
        <input
          type="text"
          placeholder={`Search tags...`}
          className="value-input"
          onChange={(e) => filterList(e.target.value)}
        ></input>
        <div className="select-all-checkbox">
          <input
            type="checkbox"
            ref={allInputRef}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedTags(items);
                loopOverRefs(true);
              } else {
                setSelectedTags([]);
                loopOverRefs(false);
              }
            }}
          />
          <label>Select all</label>
        </div>
        {items.map((item, index) => (
          <div className={classname} key={item.id}>
            <input
              type={type}
              className={"checkbox-input"}
              ref={addToRefs}
              onChange={(e) => {
                if (e.target.checked) {
                  if (selectedTags.indexOf(item) === -1)
                    setSelectedTags((prevArray) => [...prevArray, item]);
                } else {
                  const filterArray = selectedTags.filter(
                    (tag) => tag !== item
                  );
                  setSelectedTags(filterArray);
                  allInputRef.current.checked = false;
                }
              }}
            />
            <label className="checkbox-label">{item.item}</label>
          </div>
        ))}
        {<div className="error-message">{errorMessage}</div>}

        <button
          className="apply-button"
          onClick={() => {
            valueSelect()
              ? filterTags.length > 0
              ? isValid()
                  ? apply()
                  : setErrorMessage(
                      "*** Similar label and similar tag cannot have similar values"
                    )
                : apply()
              : setErrorMessage("*** Select a value");
          }}
        >
          <span>Apply</span>
        </button>
      </>
    );
  };

  return (
    <div className="value-dropdown">
      {renderList(items, "dropdown-item", "checkbox")}
    </div>
  );
}

export default CheckboxDropdown;
