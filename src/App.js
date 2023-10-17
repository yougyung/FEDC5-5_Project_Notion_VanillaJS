import Layout from "./components/common/Layout.js";

/**
 * @description 루트 컴포넌트
 */
export default function App({ $app, initState }) {
  new Layout({ $app });
}
