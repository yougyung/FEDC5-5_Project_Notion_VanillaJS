export interface DocumentResponseDto {
  id: number;
  title: string;
  documents: DocumentResponseDto[];
}

export interface DocumentDetailResponseDto {
  id: number;
  title: string;
  content: string;
  documents: DocumentMetaDto[];
  createdAt: string;
  updatedAt: string;
}

interface DocumentMetaDto {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentPostRequestDto {
  title: string;
  parent: number | null;
}

export interface DocumentPostResponseDto {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentPutRequestDto {
  id: number;
  title: string;
  content: string;
}
