export interface CourseRoot {
	userHasHidden: boolean
	courseCardColorIndex: number
	role: string
	course: Course
	courseId: string
	modifiedDate: string
	isAvailable: boolean
	userId: string
	lastAccessDate: string
	timeLimitExceptionType: string
	receiveEmail: boolean
	includedInRoster: boolean
	dueDateExceptionType: string
	enrollmentDate: string
	dataSourceId: string
	courseRole: CourseRole
	id: string
}

export interface Course {
	isAllowGuests: boolean
	displayId: string
	effectiveAvailability: boolean
	isBannerVisible: boolean
	isAllowObservers: boolean
	isHonorTermAvailability: boolean
	isClosed: boolean
	courseId: string
	createdDate: string
	modifiedDate: string
	isAvailable: boolean
	batchUid: string
	uuid: string
	navStyle: string
	durationType: string
	classificationId: string
	dataSourceId: string
	enrollmentType: string
	paceType: string
	bannerAltText: string
	isLocaleEnforced: boolean
	defaultViewContent: string
	termId: string
	description: string
	displayName: string
	term: Term
	permissions: Permissions2
	isOrganization: boolean
	externalAccessUrl: string
	homePageUrl: string
	ultraStatus: string
	courseViewOption: string
	name: string
	id: string
}

export interface Term {
	coursesPerTerm: number
	daysOfUse: number
	isAvailable: boolean
	endDate: string
	startDate: string
	durationType: string
	dataSrcId: string
	description: Description
	permissions: Permissions
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

export interface Permissions2 {
	editDuration: boolean
	editTerm: boolean
	chooseUltraStatus: boolean
	editBanner: boolean
	editBannerVisibility: boolean
	editAvailability: boolean
	edit: boolean
	export: boolean
	editName: boolean
	copy: boolean
	delete: boolean
	archive: boolean
	editLocale: boolean
	import: boolean
	viewAutoArchive: boolean
	messagesEnabled: boolean
	convert: boolean
	editClosed: boolean
	viewEnrollments: boolean
}

export interface CourseRole {
	isActAsInstructor: boolean
	courseName: CourseName
	roleBucket: string
	identifier: string
	sortOrder: number
	roleAvailability: string
	id: string
}

export interface CourseName {
	languageKey: string
	bundle: string
}
