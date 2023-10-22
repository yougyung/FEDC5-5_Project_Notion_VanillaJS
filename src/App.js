import MainPage from '@/pages/MainPage';

export default class App {
  constructor({ $target }) {
    this.$editorPage = new MainPage($target);
  }

  route() {}
}
