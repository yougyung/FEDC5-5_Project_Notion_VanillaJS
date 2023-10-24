import { createComponent } from "@/core";
import { DocumentItem } from "@/components";
import { navigateTo } from "@/utils";
import { DocumentPostRequestDto, DocumentResponseDto } from "@/types";
import styles from "./sidebar.module.scss";

const { s_sidebar, s_button } = styles;

interface SidebarProps {
  documents: DocumentResponseDto[];
  createDocument: ({ title, parent }: DocumentPostRequestDto) => void;
  removeDocument: (id: number) => void;
}

function Sidebar({ documents, createDocument, removeDocument }: SidebarProps) {
  const handleClickAddDocumentButton = (target: HTMLElement) => {
    const id = Number(target.parentElement?.dataset.id);

    createDocument({ title: "Untitled", parent: id });
  };

  const handleClickDeleteButton = (target: HTMLElement) => {
    const id = Number(target.parentElement?.dataset.id);

    removeDocument(id);
  };

  const handleClickAddRootDocumentButton = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;

    if (target.dataset && target.dataset.parentId === "null") {
      createDocument({ title: "Untitled", parent: null });
    }
  };

  const handleToggleDocuments = (target: HTMLElement) => {
    const $clickedItem = target.closest(".documentItem") as HTMLElement;
    const $firstChildList = $clickedItem.querySelector(".childrenDocumentList:first-of-type") as HTMLElement;

    if ($firstChildList) {
      const isHidden = $firstChildList.style.display === "none" || $firstChildList.style.display === "";

      $firstChildList.style.display = isHidden ? "block" : "none";
    }

    if (target.classList.contains("rotated")) {
      target.classList.remove("rotated");
    } else {
      target.classList.add("rotated");
    }
  };

  const handleClickDocumentItem = (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("documentToggle")) {
      handleToggleDocuments(target);
      return;
    }

    if (target && target.dataset.id) {
      const id = target.dataset.id;

      navigateTo(`/documents/${id}`);
    }

    if (target.dataset && !isNaN(Number(target.dataset.parentId))) {
      if (target.classList.contains("addDocumentButton")) {
        handleClickAddDocumentButton(target);
      }

      if (target.classList.contains("deleteDocumentButton")) {
        handleClickDeleteButton(target);
      }
    }
  };

  const bindEvents = () => {
    const $addRootDocumentButton = document.querySelector(".addRootDocumentButton") as HTMLButtonElement;
    const $documentList = document.querySelector(".documentList") as HTMLUListElement;

    $addRootDocumentButton.addEventListener("click", handleClickAddRootDocumentButton);
    $documentList.addEventListener("click", handleClickDocumentItem);
  };

  const documentList = documents
    .map((document, index) => {
      const documentItemComponent = createComponent(DocumentItem, { document, index: String(index + 1) });

      return documentItemComponent.element;
    })
    .join("");

  return {
    element: `
      <div class=${s_sidebar}>
        <button data-parent-id="null" class="addRootDocumentButton ${s_button}" aria-label="새 문서 추가" type="button">+</button>
        <ul class="documentList">
          ${documentList}
        </ul>
      </div>
    `,
    bindEvents,
  };
}

export default Sidebar;
