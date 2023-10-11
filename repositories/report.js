import Report from "../models/Report.js"

const all = async (startIndex, size) => {
	const listReport = await Report.find().skip(startIndex).limit(size);
	if (!listReport || listReport.length <= 0) {
		throw new Error("Don't have any report!");
	}
	return listReport;
}

const report = async ({ postId, commentId, userId, description }) => {
	try{
		const newReport = await Report.create({ post: postId, comment: commentId, user: userId, description });
		if(postId != "" && postId != undefined){
			
		}
		return newReport;
	}catch(error){
		throw new Error(error);	
	}
}
export default {
	all,
	report
}