export interface Avatar {
	forceDownload: boolean;
	permanentUrl: string;
}

export interface FieldPermissions {
	emailAddress: boolean;
	password: boolean;
	givenName: boolean;
	familyName: boolean;
	middleName: boolean;
	title: boolean;
}

export interface Permissions {
	create: boolean;
	editAccountInfo: boolean;
	editPassword: boolean;
	editSystemRoles: boolean;
	editAvatar: boolean;
	sendMessage: boolean;
	editInstitutionRoles: boolean;
	fieldPermissions: FieldPermissions;
	delete: boolean;
}

export interface UserMe {
	createdDate: string;
	passwordExpired: boolean;
	lastPasswordModifiedDate: string;
	visibilityScope: string;
	landingPage: string;
	changePasswordRedirectUrl: string;
	permissions: Permissions;
	emailAddress: string;
	familyName: string;
	preferredDisplayName: string;
	uuid: string;
	systemRole: string;
	showWorkInfo: boolean;
	showEmailInfo: boolean;
	showAddressInfo: boolean;
	showAddContactInfo: boolean;
	systemRoleIdentifier: string;
	givenName: string;
	avatar: Avatar;
	lastModifiedAt: string;
	id: string;
}
