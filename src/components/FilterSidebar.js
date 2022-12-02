import Sidebar from "./Sidebar";
import Header from "./Header";
import MainSection from "./MainSection";
import "./FilterSidebar.css";

function FilterSidebar() {
  return (
    <div>
      <Header />
      <div className="page-container">
        <Sidebar />
        <MainSection />
      </div>
    </div>
  );
}

export default FilterSidebar;
