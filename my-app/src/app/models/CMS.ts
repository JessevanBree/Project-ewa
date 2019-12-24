export class CMS {
	id: number;
	location: String;
	content: String;
	page: String;

	constructor(location: String, content: String, page: String, id?: number){
		this.location = location;
		this.content = content;
		this.page = page;
		this.id = id;
	}
}