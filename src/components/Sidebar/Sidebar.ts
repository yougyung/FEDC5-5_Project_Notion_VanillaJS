import styles from "./sidebar.module.scss";

const { s_sidebar } = styles;

function Sidebar() {
  return {
    element: `
      <div class=${s_sidebar}>
        <ul>
          <li>도큐먼트 1</li>
          <li>도큐먼트 2</li>
          <li>도큐먼트 3</li>
          <li>도큐먼트 4</li>
          <li>도큐먼트 5</li>
          <li>도큐먼트 6</li>
        </ul>
      </div>
    `,
  };
}

export default Sidebar;
