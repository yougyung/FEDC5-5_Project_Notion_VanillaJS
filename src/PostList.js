export default function PostList({ $target, onToggle, onDelete, onAdd }){
  const $postList = document.createElement('div');
  $postList.classList.add('post-list');
  $target.appendChild($postList);

  this.state = {
    postList: [],
    selectedPost: {
      id:'',
      path:'',
      top:'0px',
      left:'0px',
    },
    modalState: false
  }
  
  this.setState = (nextState) => {
    this.state = {
      ...this.state, 
      ...nextState 
    }
    this.render();
  }
  
  this.render = () => {
    checkArray(this.state.postList) ? 
      $postList.innerHTML = `
        ${this.state.postList.map(post => renderTree(post, '')).join('')}
        <div class="post-add"> + </div>

        <div class="modal-content" style="
          display:${this.state.modalState ? 'block' : 'none'}; 
          top:${this.state.selectedPost.top};
          left:${this.state.selectedPost.left}";
        >
          <div class="post-delete">삭제</div>
        </div>
      `
      : '';
  }

  const renderTree = (post, path = '') => {
    path = `${path}${path ? '-' : ''}${post.id}`;
    const isToggled = post.isToggled || false;
    const depth = path.match(/-/g)?.length || 0;
    const isVisible = depth === 0 ? true : post.isVisible || false;
    const tabLevel = '&nbsp;'.repeat(depth * 2);
    
    const nodeHTML = renderTreeNode(post, path, isToggled, isVisible, tabLevel);
    const childHTML = post.documents.map(child => renderTree(child, path)).join('');
    return `${nodeHTML}${childHTML}`;
  }

  const renderTreeNode = (post, path, isToggled, isVisible, tabLevel) => {
    return `
      <div data-id="${post.id}" data-path="${path}" style="display: ${isVisible ? 'block' : 'none'}">
        <span class="post-toggle-button">${tabLevel}${isToggled ? '&#5167;' : '&#5171;'}</span>
        <span class="post-title">${post.title}</span>
        <span class="post-load-more-button"> ··· </span>
        <span class="post-add-child"> + </span>
        ${isVisible && isToggled && post.documents.length === 0 ? `<div>${tabLevel}하위 페이지 없음</div>` : ''}
      </div>
    `;
  }
      
  const checkArray = (documents) => Array.isArray(documents) && documents.length > 0;

  $target.addEventListener('click', async (e) => {
    const $div = e.target.closest('div')

    if($div){
      const {className} = e.target
      const {id, path} = $div.dataset;

      if(className === 'post-toggle-button'){
        // 포스트 토글
        onToggle(path)

      }else if(className === 'post-title'){
        // 포스트 제목

      }else if(className === 'post-load-more-button'){
        // 포스트 더보기
        const modalResult = $postList.querySelector(".modal-content").style.display === 'none';
        const selectedPost = modalResult 
          ? { id, path, top: e.target.offsetTop + e.target.offsetHeight+'px', left: e.target.offsetLeft+'px'} 
          : { id: '', path: '', top: '0px', left: '0px' };

        this.setState({
          ...this.state,
          selectedPost,
          modalState: modalResult
        });

      }else if(className === 'post-add-child') {
        // 자식 추가 버튼
        onAdd(id, path)
      }else if(className === 'post-delete'){
        // 삭제 버튼
        onDelete(this.state.selectedPost.id, this.state.selectedPost.path, findChild(this.state.selectedPost.path));
      }else if(className === 'post-add'){
        // 부모 추가 버튼
        onAdd()
      }
    }

  })

  const findChild = (path) => {
    return Array.from($postList.querySelectorAll('div[data-path*="'+path+'"]'))
                .map(div => div.getAttribute('data-id'));
  }

  this.render();
}