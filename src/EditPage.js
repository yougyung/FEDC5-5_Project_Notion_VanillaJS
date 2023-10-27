import Editor from './Editor.js';

export default function EditPage({ $target, initialState }) {
  this.state = initialState;
  const $page = document.createElement('section');
  $page.className = 'editpage';

  const editor = new Editor({
    $target: $page,
    initialState: this.state,
    // 로컬 스토리지 저장
    onEditing: (post) => {
      // // 계속 입력하고 있는 경우 저장하는 타이머 해제
      // if (timer !== null) {
      //   clearTimeout(timer);
      // }
      // timer = setTimeout(async () => {
      //   setItem(postLocalSaveKey, {
      //     ...post,
      //     tempSaveDate: new Date(),
      //   });
      //   const isNew = this.state.postId === 'new';
      //   if (isNew) {
      //     const createdPost = await request(`/posts`, {
      //       method: 'POST',
      //       body: JSON.stringify(post),
      //     });
      //     history.replaceState(null, null, `/posts/${createdPost.id}`);
      //     removeItem(postLocalSaveKey);
      //     this.setState({
      //       postId: createdPost.id,
      //     });
      //   } else {
      //     await request(`/posts/${post.id}`, {
      //       method: 'PUT',
      //       body: JSON.stringify(post),
      //     });
      //     // 서버에 반영이 되면 로컬 삭제
      //     removeItem(postLocalSaveKey);
      //   }
      // }, 2000);
    },
  });

  this.setState = async () => {
    this.render();
  };

  this.render = async () => {
    $target.appendChild($page);
  };

  this.render();
}
