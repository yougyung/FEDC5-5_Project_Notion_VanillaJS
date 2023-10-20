import {request} from "./api.js";

export default function PostList({ $target, initialState }){

  const $postList = document.createElement('div');
  $target.appendChild($postList);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    $postList.innerHTML = `
      ${this.state.map(post => renderTree(post)).join('')}
      <div class="post-add"> + </div>
      <div class="modal-content">
        <div >삭제</div>
      </div>
    `;
  }

  const checkChild = (documents) => Array.isArray(documents) && documents.length > 0;

  function renderTree(post, path = ''){
    const isToggled = post.isToggled || false;
    
    path = path === '' ? post.id.toString() : `${path}-${post.id}`; // path를 수정
    const depth = path.match(/-/g)?.length || 0;
    const tabLevel = '&nbsp;'.repeat(depth * 2);

    const childrenHTML = post.documents.map(child => renderTree(child, path)).join('');

    return `
      <div data-id="${post.id}" data-path="${path}">
        <span class="post-toggle-button">${tabLevel}${isToggled ? '&#5167;' : '&#5171;'}</span>
        <span class="post-title">${post.title}</span>
        <span class="post-load-more-button" > ··· </span>
        <span class="post-add-child"> + </span>
      </div>
      
      ${isToggled ? childrenHTML : ''}
      ${isToggled && post.documents.length === 0 ? `${tabLevel}하위 페이지 없음` : ''}
    `
  }


  function togglePostState(posts, postId){
    return posts.map(post => {
      if(post.id === postId){
        return { ...post, isToggled: !post.isToggled };
      }else if(checkChild(post.documents)){
        return { ...post, documents: togglePostState(post.documents, postId) };
      }
      return post;
    });
  }


  $postList.addEventListener('click', async (e) => {
    const $div = e.target.closest('div')

    if($div){
      const {className} = e.target
      const {id, path} = $div.dataset;

      if(className === 'post-toggle-button'){
        const nextState = togglePostState(this.state, parseInt(id));
        this.setState(nextState);
      }else if(className === 'post-title'){
        // 포스트 제목 클릭 시의 동작
      }else if(className === 'post-load-more-button'){
        // 더보기 버튼 클릭 시의 동작
        const $modal = $postList.querySelector('.modal-content');
        const $button = e.target;

        $modal.style.top = $button.offsetTop + $button.offsetHeight + 'px';
        $modal.style.left = $button.offsetLeft + 'px';
        $modal.style.display = $modal.style.display === 'none' ? 'block' : 'none';

      }else if(className === 'post-add-child') {
        // 자식 추가 버튼 클릭 시의 동작
        const createdPost = await request(`/documents`, {
          method: 'POST',
          body: JSON.stringify({
            'title': '제목 없음',
            'parent': id
          })
        })

        const nextState = await togglePostState(this.state, parseInt(id), createdPost)
        this.setState(nextState)
      }
    }

  })

  this.render();

}