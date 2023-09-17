export interface CourseResponse {
	permissions: unknown;
	paging: {
		count: number
		limit: number
		nextPage: string
		offset: number
		previousPage: string;
	};
	results: CourseResult[];
}
export interface CourseResult {
	role: string
	course: Course
	courseId: string
	isAvailable: boolean
	modifiedDate: string
	userId: string
	lastAccessDate: string
	receiveEmail: boolean
	includedInRoster: boolean
	dueDateExceptionType: string
	timeLimitExceptionType: string
	enrollmentDate: string
	dataSourceId: string
	courseRole: CourseRole
	userHasHidden: boolean
	courseCardColorIndex: number
	id: string
}

export interface Course {
	courseId: string
	isAvailable: boolean
	createdDate: string
	modifiedDate: string
	batchUid: string
	uuid: string
	navStyle: string
	durationType: string
	classificationId: string
	dataSourceId: string
	enrollmentType: string
	paceType: string
	bannerImageFile?: string
	bannerAltText: string
	isLocaleEnforced: boolean
	defaultViewContent: string
	termId?: string
	isClosed: boolean
	description: string
	term?: Term
	banner?: Banner
	displayId: string
	effectiveAvailability: boolean
	isBannerVisible: boolean
	isAllowObservers: boolean
	isHonorTermAvailability: boolean
	bannerImageThumbnail?: BannerImageThumbnail
	isAllowGuests: boolean
	displayName: string
	permissions: Permissions2
	ultraStatus: string
	courseViewOption: string
	isOrganization: boolean
	externalAccessUrl: string
	homePageUrl: string
	name: string
	id: string
	guestAccessUrl?: string
}

export interface Term {
	isAvailable: boolean
	endDate: string
	startDate: string
	durationType: string
	daysOfUse: number
	description: Description
	dataSrcId: string
	permissions: Permissions
	coursesPerTerm: number
	name: string
	id: string
}

export interface Description {
	rawText: string
	displayText: string
	webLocation: any
	fileLocation: any
}

export interface Permissions {
	edit: boolean
	delete: boolean
}

export interface Banner {
	permanentUrl: string
	forceDownload: boolean
}

export interface BannerImageThumbnail {
	permanentUrl: string
	forceDownload: boolean
}

export interface Permissions2 {
	edit: boolean
	archive: boolean
	delete: boolean
	export: boolean
	copy: boolean
	editDuration: boolean
	editTerm: boolean
	chooseUltraStatus: boolean
	editBanner: boolean
	editBannerVisibility: boolean
	editAvailability: boolean
	editName: boolean
	editLocale: boolean
	import: boolean
	viewAutoArchive: boolean
	messagesEnabled: boolean
	convert: boolean
	editClosed: boolean
	viewEnrollments: boolean
}

export interface CourseRole {
	courseName: CourseName
	roleBucket: string
	sortOrder: number
	identifier: string
	roleAvailability: string
	isActAsInstructor: boolean
	id: string
}

export interface CourseName {
	bundle: string
	languageKey: string
}
