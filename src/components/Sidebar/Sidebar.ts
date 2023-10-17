import { createComponent } from "@/core";
import { DocumentItem } from "@/components";
import { Document } from "@/types";
import styles from "./sidebar.module.scss";

const { s_sidebar } = styles;

interface SidebarProps {
  documents: Document[];
}

function Sidebar({ documents }: SidebarProps) {
  return {
    element: `
      <div class=${s_sidebar}>

        <ul>
          ${documents
            .map((document) => {
              const documentItemComponent = createComponent(DocumentItem, {
                document,
              });

              return documentItemComponent.element;
            })
            .join("")}
        </ul>
      </div>
    `,
  };
}

export default Sidebar;
