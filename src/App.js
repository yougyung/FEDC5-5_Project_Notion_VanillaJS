import {request} from "./api.js";
import PostList from "./PostList.js"

export default function App({ $target }){

  const $postListContainer = document.createElement('div');
  const $editListContainer = document.createElement('div');

  $target.appendChild($postListContainer);
  $target.appendChild($editListContainer);

  this.state = {
    postList: [],
    selectedPostId : null,
    post: '',
    postLoading: false
  }

  const postList = new PostList({
    $target : $postListContainer,
    onToggle: async (path) => {
      const allPath = path.split('-');
      // toggle 누른 post
      const nowPost = returnPathList([...allPath], this.state.postList)
      // toggle 누른 post의 toggle 값 변경
      nowPost.isToggled = typeof nowPost.isToggled === 'undefined' ? true : !nowPost.isToggled;

      // 기준 토글의 toggle 값이 true인 경우, 하위 visible을 1단계만 true
      // 기준 토글의 toogle 값이 false 인 경우, 하위 visible을 전부 false
      childToggle(nowPost.documents, nowPost.isToggled);

      // 상위들을 불러와서 nowPost랑 합체
      const updateState = returnMap(this.state.postList, [...allPath], nowPost);
      const nextState = this.state.postList.map(post => post.id === updateState.id ? updateState : post)

      this.setState({
        ...this.state,
        postList: nextState
      })
    },
    onDelete: async(id, path, child) => {

      const allPath = path.split('-');
      let nextState;
      if(allPath.length === 1){
        nextState = this.state.postList.filter(post => parseInt(post.id) !== parseInt(id));
      }else{
        const parentPost = returnPathList([...allPath].slice(0, -1), this.state.postList);
        const siblingPost = parentPost.documents.filter(post => parseInt(post.id) !== parseInt(id));
        parentPost.documents = siblingPost
  
        const updateState = returnMap(this.state.postList, [...allPath].slice(0,-1), parentPost);
        nextState = this.state.postList.map(post => post.id === updateState.id ? updateState : post)
      }

      this.setState({
        ...this.state,
        postList: nextState
      })

      await Promise.all(child.map(async (id) => {
        await request(`/documents/${id}`, {
          method: 'DELETE'
        });
      }));
      
    },
    onAdd: async(id = null, path) => {
      const createdPost = await request(`/documents`, {
        method: 'POST',
        body: JSON.stringify({
          'title': '제목 없음',
          'parent': id
        })
      })

      createdPost.documents = [];

      if(id === null){
        createdPost.isVisible = true
        this.setState({
          ...this.state,
          postList: [...this.state.postList, createdPost]
        });
      }else{
        const allPath = path.split('-');
        const nowPost = returnPathList([...allPath], this.state.postList);
        nowPost.isToggled = true;
        nowPost.documents.push(createdPost);
        const updateState = returnMap(this.state.postList, [...allPath], nowPost);
        const nextState = this.state.postList.map(post => post.id === updateState.id ? updateState : post)
        childToggle(nowPost.documents, nowPost.isToggled);
        this.setState({
          ...this.state,
          postList: nextState
        })
        
      }
    }
  })

  // 변경된 것 포함해서 최상위 값 return
  const returnMap = (postList, path, child) => {
    if(path.length === 1) return child;
    const id = path.pop();
    const parent = returnPathList([...path], postList)
    const findIndex = parent.documents.findIndex(post => parseInt(post.id) === parseInt(id));
    parent.documents[findIndex] = child
    return returnMap(postList, path, parent)
  }

  // 마지막 path의 post return
  const returnPathList = (allPath, postList) => {
    let nextPath = allPath.shift();
    let nextPost = postList.find(post => post.id == nextPath);
    if (allPath.length === 0) return nextPost;
    return nextPost ? returnPathList(allPath, nextPost.documents) : null;
  }

  // 해당 toggle 값에 따른 자식들 visible 변경
  function childToggle(documents, state) {
    if (!Array.isArray(documents)) return;
    for (const document of documents) {
      document.isVisible = state;
      document.isToggled = false;
      if (!state && Array.isArray(document.documents) && document.documents.length > 0) {
        childToggle(document.documents, state); 
      }
    }
  }

  const fetchPostList = async () => {
    const postList = await request('/documents');
    this.setState({
      ...this.state,
      postList
    })
  }

  this.setState = nextState => {
    this.state = nextState

    postList.setState({
      postList:this.state.postList,
      selectedPost: {
        id:'',
        path:'',
        top:'0px',
        left:'0px',
      },
      modalState: false
    })
    
    this.render()
  }

  this.render = () => {
  }

  const init = async () => {
    await fetchPostList()
    
  }

  init()
}