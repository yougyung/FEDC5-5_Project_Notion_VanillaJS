import Editor from './Editor.js';
import { request } from './api.js';

export default function EditPage({ $target, initialState }) {
  this.state = initialState;
  const $page = document.createElement('section');
  $page.className = 'editpage';

  const editor = new Editor({
    $target: $page,
    initialState: this.state,
    onEditing: async (document) => {
      await request(`/${document.id}`, {
        method: 'PUT',
        body: JSON.stringify(document),
      });
    },
  });

  this.setState = async (nextState) => {
    // 클릭으로 글 이동
    if (this.state.id !== nextState.postId) {
      this.state = nextState;
      this.render();
      editor.setState(
        this.state.post || {
          title: '',
          content: '',
        },
      );
    }
  };

  this.render = async () => {
    $target.appendChild($page);
  };
  // 새글이 아니면 기존 글 받아오기
  const fetchPost = async () => {
    const { postId } = this.state;

    const post = await request(`/${postId}`);

    this.setState({
      ...this.state,
      post,
    });
  };
  fetchPost();
}
