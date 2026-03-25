export type SourceType = 'tab_constellation' | 'notes' | 'symbols' | 'moods' | 'project_fragments';

export interface Fragment {
  id: string;
  text: string;
  sourceType?: SourceType;
  tags?: string[];
}

export interface InputBundle {
  id: string;
  timestamp: string;
  sourceType: SourceType;
  fragments: Fragment[];
  userTags: string[];
  contextNote?: string;
  inputSummary?: string;
}
