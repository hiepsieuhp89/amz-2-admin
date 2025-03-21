export interface Language {
  code: string;
  name: string;
  flag: any;
  isSelected?: boolean;
}

export interface LanguageGroup {
  languages: Language[];
}
