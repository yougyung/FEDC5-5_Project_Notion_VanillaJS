import { createComponent } from "@/core";
import { DocumentItem } from "@/components";
import { Document } from "@/types";
import styles from "./sidebar.module.scss";

const { s_sidebar, s_button } = styles;

interface SidebarProps {
  documents: Document[];
  createDocument: ({ title, parent }: { title: string; parent: null | number }) => void;
}

function Sidebar({ documents, createDocument }: SidebarProps) {
  const addDocument = (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("add-document-button")) {
      if (target.dataset && target.dataset.parentId === "null") {
        createDocument({ title: "Untitled", parent: null });
        return;
      }
      if (target.dataset && !isNaN(Number(target.dataset.parentId))) {
        const parentId = Number(target.dataset.parentId);
        createDocument({ title: "", parent: parentId });

        return;
      }
      console.error("Invalid parent id:", target.dataset.parentId);
    }
  };
  const bindEvents = () => {
    const $sidebar = document.querySelector(`.${s_sidebar}`) as HTMLElement;

    $sidebar.addEventListener("click", addDocument);
  };

  return {
    element: `
      <div class=${s_sidebar}>
        <button data-parent-id="null" class="add-document-button ${s_button}" aria-label="새 문서 추가" type="button">+</button>
        <ul>
          ${documents
            .map((document) => {
              const documentItemComponent = createComponent(DocumentItem, {
                document,
                parentId: null,
              });

              return documentItemComponent.element;
            })
            .join("")}
        </ul>
      </div>
    `,
    bindEvents,
  };
}

export default Sidebar;
