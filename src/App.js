import { request } from './api.js';

export default function App({ $target }) {
  const apiRequest = async () => {
    const documents = await request(`/documents`, {
      method: 'GET',
    });

    console.log(documents);
  };

  apiRequest();
}
