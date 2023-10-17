export interface Document {
  id: number;
  title: string;
  documents: Document[];
}

export interface DocumentOverview {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentDetail extends DocumentOverview {
  content: string;
  documents: DocumentOverview[];
}
