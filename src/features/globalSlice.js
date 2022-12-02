import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showTagDropdown: false,
  showValueDropdown: false,
  showPreFilterTags: false,
  displayLabel: "",
  displayValue: "",
  tagContent: [],
  preFilterTag: {},
  filterTags: [],
  showFilterTags: false,
  showAddfilter: false,
};

const globalStateSlice = createSlice({
  name: "globalstate",
  initialState,
  reducers: {
    setShowTagDropdown: (state, action) => {
      state.showTagDropdown = action.payload;
    },
    setShowValueDropdown: (state, action) => {
      state.showValueDropdown = action.payload;
    },
    setShowPreFilterTags: (state, action) => {
      state.showPreFilterTags = action.payload;
    },
    setTagContent: (state, action) => {
      state.tagContent = action.payload;
    },
    setDisplayLabel: (state, action) => {
      state.displayLabel = action.payload;
    },
    setDisplayValue: (state, action) => {
      state.displayValue = action.payload;
    },
    setTag: (state) => {
      const obj = {
        label: state.displayLabel,
        tag: state.tagContent,
      };
      state.preFilterTag = obj;
    },
    setFilterTags: (state, action) => {
      const [label, tag, value] = action.payload;
      const obj = {
        label,
        tag,
        value,
      };
      state.filterTags.push(obj);
    },
    setShowFilterTags: (state, action) => {
      state.showFilterTags = action.payload;
    },
    setShowAddFilter: (state, action) => {
      state.showAddfilter = action.payload;
    },
  },
});

export default globalStateSlice.reducer;
export const {
  setShowTagDropdown,
  setShowValueDropdown,
  setShowPreFilterTags,
  setTagContent,
  setDisplayLabel,
  setDisplayValue,
  setDisplayContainerContent,
  setTag,
  setFilterTags,
  setShowFilterTags,
  setShowAddFilter,
} = globalStateSlice.actions;
