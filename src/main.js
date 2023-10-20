import App from './App.js';
import { request } from './services/api.js';

const $target = document.querySelector('#app');

new App({ $target });

const API_TEST = async () => {
  // POST
  const createDocument = await request('/documents', {
    method: 'POST',
    body: {
      title: '안에 파일',
      parent: 100997,
    },
  });
  console.log(createDocument);
  // GET;
  const documents = await request('/documents');
  console.log(documents);
  // PUT
  const updateDocument = await request('/documents/100997', {
    method: 'PUT',
    body: {
      title: '안에 파일 있어요',
      content: '내용 수정',
    },
  });
  console.log(updateDocument);
  // DELETE
  // const deleteDocument = await request('/documents/100999', {
  //   method: 'DELETE',
  // });
};

// API_TEST();
