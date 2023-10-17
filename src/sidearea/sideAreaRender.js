import SideAreaPage from "./sideAreaPage.js";
const $ = document;
export default function SideAreaRender({ $target, initialState }) {
  new SideAreaPage({ $target });
}
