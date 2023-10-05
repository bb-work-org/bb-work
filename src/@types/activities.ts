export interface ActivityResult {
  permissions: unknown;
  paging: {
    count: number;
    limit: number;
    nextPage: string;
    offset: number;
    previousPage: string;
  };
  results?: Activity[];
}

export type ActivityWithChildren = Activity & {
  children?: ActivityWithChildren[];
};

export interface Activity {
  iconUrl: string;
  launchInNewWindow: boolean;
  contentDetail: ContentDetail;
  modifiedDate: number;
  courseId: string;
  title: string;
  isReviewable: boolean;
  isGroupContent: boolean;
  inSequence: boolean;
  dueDateExceptionType: string;
  renderType: string;
  thumbnailAltText: string;
  aiState: string;
  inLesson: boolean;
  titleColor: string;
  position: number;
  contentHandler: ContentHandler;
  description: string;
  body: Body;
  permissions?: Permissions;
  id: string;
  state: string;
  visibility?: string;
  parentId?: string;
  adaptiveReleaseRules?: AdaptiveReleaseRules;
}

export type ContentHandler =
  | "resource/x-bb-folder"
  | "resource/x-bb-file"
  | "resource/x-bb-assignment"
  | "resource/x-bb-lesson"
  | "resource/x-bb-document"
  | "resource/x-bb-externallink";

export interface ContentDetail {
  "resource/x-bb-folder"?: ResourceXBbFolder;
  "resource/x-bb-file"?: ResourceXBbFile;
  "resource/x-bb-assignment"?: ResourceXBbAssignment;
  "resource/x-bb-externallink"?: ResourceXBbExternallink;
}

export interface ResourceXBbFolder {
  isBbPage: boolean;
  isFolder: boolean;
}

export interface ResourceXBbFile {
  file: File;
  fileAssociationMode: string;
}

export interface File {
  existingFileReference: string;
  permanentUrl: string;
  mimeType: string;
  viewerUrl: string;
  forceDownload: boolean;
  isMedia: boolean;
  fileName: string;
  xid: string;
}

export interface ResourceXBbAssignment {
  gradingColumn: GradingColumn;
  groupContent: boolean;
  safeAssignOptions: SafeAssignOptions;
}

export interface GradingColumn {
  gradebookCategory: GradebookCategory;
  localizedColumnName: LocalizedColumnName;
  effectiveColumnName: string;
  isAttemptBased: boolean;
  gradeScoreDesignation: string;
  formativeIndicator: string;
  isFormative: boolean;
  courseId: string;
  scoreProviderHandle: string;
  visible: boolean;
  peerGrading: boolean;
  delegatedGrading: boolean;
  contentId: string;
  dueDate: string;
  anonymousGrading: boolean;
  dateCreated: string;
  deleted: boolean;
  gradingSchemaId: string;
  columnName: string;
  aggregationModel: string;
  hideAttempt: boolean;
  scorable: boolean;
  visibleInAllTerms: boolean;
  visibleInBook: boolean;
  showStatsToStudent: boolean;
  limitedAttendance: boolean;
  userCreatedColumn: boolean;
  autoPostGrades: boolean;
  ltiDomainId: any;
  gradesReleased: boolean;
  enforceDueDate: boolean;
  position: number;
  possible: number;
  multipleAttempts: number;
  calculationType: string;
  gradebookCategoryId: string;
  id: string;
  "@id": string;
}

export interface GradebookCategory {
  isUserDefined: boolean;
  courseId: string;
  title: string;
  localizableTitle: LocalizableTitle;
  description: any;
  id: string;
}

export interface LocalizableTitle {
  languageKey: string;
  bundle: string;
}

export interface LocalizedColumnName {
  languageKey: string;
  bundle: string;
}

export interface SafeAssignOptions {
  checkAttempts: boolean;
  canStudentViewReports: boolean;
  excludeSubmissions: boolean;
  globalSearch: boolean;
}

export interface ResourceXBbExternallink {
  url: string;
}

export interface Body {
  rawText: string;
  displayText: string;
  webLocation: string;
  fileLocation: string;
}

export interface Permissions {
  edit: boolean;
  contentHandlerPermissionMap: ContentHandlerPermissionMap;
  modifyAvailability: boolean;
  adaptiveRelease: AdaptiveRelease;
  canHaveReviewState: boolean;
  canViewReviewState: boolean;
  canUpdateReviewState: boolean;
  dashboardView: boolean;
  createLearningStandardsAlignment: boolean;
  viewDesigner: boolean;
  delete: boolean;
  copy: boolean;
}

export interface ContentHandlerPermissionMap {
  createDiscussion: boolean;
}

export interface AdaptiveRelease {
  edit: boolean;
  criteria: Criteria;
  delete: boolean;
  create: boolean;
  view: boolean;
}

export interface Criteria {
  performance: Performance;
  acl: Acl;
  dates: Dates;
}

export interface Performance {
  edit: boolean;
  delete: boolean;
  create: boolean;
}

export interface Acl {
  edit: boolean;
  delete: boolean;
  create: boolean;
}

export interface Dates {
  edit: boolean;
  delete: boolean;
  create: boolean;
}

export interface AdaptiveReleaseRules {
  endDate: string;
  startDate: any;
}
