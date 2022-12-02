import "./Sidebar.css";
import PlayIcon from "../svgs/PlayIcon";
import GroupIcon from "../svgs/GroupIcon";
import CollapseIcon from "../svgs/CollapseIcon";
import PlusIcon from "../svgs/PlusIcon";
import CurvedArrow from "../svgs/CurvedArrow";
import SaveIcon from "../svgs/SaveIcon";
import BasicDropdown from "./BasicDropdown";
import PreFilterTags from "./PreFilterTags";
import FilterTags from "./FilterTags";
import { useSelector, useDispatch } from "react-redux";
import { setShowTagDropdown, setShowAddFilter } from "../features/globalSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const showTagDropdown = useSelector(
    (state) => state.globalState.showTagDropdown
  );
  const showPreFilterTags = useSelector(
    (state) => state.globalState.showPreFilterTags
  );
  const showFilterTags = useSelector(
    (state) => state.globalState.showFilterTags
  );
  const showAddfilter = useSelector((state) => state.globalState.showAddfilter);

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-heading">
          <span className="sidebar-heading-text">Filters</span>
          <span
            className={
              showAddfilter ? "show-add-filter" : "add-filter-container"
            }
            onMouseEnter={() => {
              dispatch(setShowAddFilter(true));
            }}
            onClick={() => {
              dispatch(setShowTagDropdown(true));
            }}
          >
            <span className={showAddfilter ? "plus-icon" : ""}>
              <PlusIcon />
            </span>
            {showAddfilter && (
              <span className="add-filter-text">Add Filter</span>
            )}
          </span>
        </div>
        <div className="display-container">
          {showTagDropdown && <BasicDropdown />}
          {showFilterTags && <FilterTags />}
          {showPreFilterTags && <PreFilterTags />}
        </div>
        {!showPreFilterTags && !showFilterTags && (
          <>
            <div className="add-filter">
              <div className="arrow-icon">
                <CurvedArrow />
              </div>
              <div className="no-filter-text">No filters applied</div>
              <div className="apply-filter-text">
                Apply filters or select a view
              </div>
            </div>
            <div className="group-icon">
              <GroupIcon />
            </div>
            <div className="add-filter-tutorial">
              <span>
                <PlayIcon />
              </span>
              <span className="tutorial-text">Quick tutorial of filters</span>
            </div>
          </>
        )}
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-footer-cont">
          {showFilterTags && (
            <div className="save-icon-text">
              <div className="save-icon">
                <SaveIcon />
              </div>
              <div className="save-text">Save as View</div>
            </div>
          )}
        </div>
        <div className="sidebar-footer-icon">
          <CollapseIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
