export class BBError extends Error {
	constructor(...messages: string[]) {
		super(messages.join(" "));
	}
}