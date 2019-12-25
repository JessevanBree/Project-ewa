export class CMS {
	id: number;
	location: String;
	content: String;
	page: String;
	adminInfo: String;

	constructor(location: String, content: String, page: String, id?: number, adminInfo?: String){
		this.location = location;
		this.content = content;
		this.page = page;
		
		this.id = id ? id : null;
		this.adminInfo = adminInfo ? adminInfo: null;
	}
}