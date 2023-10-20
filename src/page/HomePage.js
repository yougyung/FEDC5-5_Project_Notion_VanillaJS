import DocumentDetail from '../components/template/DocumentDetail.js';
import NotionSideBar from '../components/template/NotionSideBar.js';

/*
 * HomePage
 * - NotionSideBar
 * - DocumentDetail
 * */
export default function HomePage({ $target, initialState }) {
  const $homePage = document.createElement('div');
  $homePage.style.display = 'flex';
  $homePage.style.flexDirection = 'row';
  $target.appendChild($homePage);
  new NotionSideBar({ $target: $homePage, initialState });
  new DocumentDetail({ $target: $homePage, initialState });
}
