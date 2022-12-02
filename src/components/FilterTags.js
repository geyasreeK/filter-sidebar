import React from "react";
import "./FilterTags.css";
import { useSelector } from "react-redux";

function FilterTags() {
  const filterTags = useSelector((state) => state.globalState.filterTags);
 
  const renderTags = (items, classname) => {
    return items.map((item, index) => (
      <span className={classname} key={item.id}>
        {item.item}
        {items.length > 1 && index !== items.length - 1 ? "," : ""}
      </span>
    ));
  };

  const renderValueList = (items, classname) => {
    items.sort((a, b) => {
      let c = Number(a.id.substring(1)),
        d = Number(b.id.substring(1));

      if (c < d) {
        return -1;
      }
      if (c > d) {
        return 1;
      }
      return 0;
  })
     
    return items.map((item, index) => (
      <span className={classname} key={item.id}>
        {index < 3 && item.item}
        {items.length > 1 && index < 3 && index !== items.length - 1 ? "," : ""}
        {items.length > 3 && index === items.length - 1
          ? `and ${items.length - 3} more`
          : ""}
      </span>
    ));
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

  const renderList = (items) => {
    return items.map((item, index) => (
      <div className="tag-container" key={index}>
        {index > 0 ? (
          items[index].label !== items[index - 1].label ? (
            <div className="or-text">or</div>
          ) : (
            <div className="and-text">AND</div>
          )
        ) : (
          ""
        )}
        {index > 0 ? (
          items[index].label !== items[index - 1].label && (
            <div className={`display-label ${classColor(items[index].label)}`}>
              {item.label}
            </div>
          )
        ) : (
          <div className={`display-label ${classColor(items[index].label)}`}>
            {item.label}
          </div>
        )}
        <div className="display-tags">
          <div className="display-tags-text">
            {renderTags(item.tag, "tag-item")}
            <span className="is-text">is</span>
          </div>
          <div className="input-cum-display-field">
            {renderValueList(item.value.slice())}
          </div>
        </div>
      </div>
    ));
  };

  return <>{renderList(filterTags)}</>;
}

export default FilterTags;
