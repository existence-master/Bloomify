import { marked } from "marked";
import HTMLtoDOCX from 'html-to-docx';
import { NextResponse } from "next/server"; // Import Next.js server response
 
export const POST = async (request) => {
   
	const { markdown } = await request.json();

	if (!markdown) {
		return new NextResponse("Bad Request: No Markdown content provided", {
			status: 400,
		}); // 400 Bad Request
	}

	const messageHTML = marked.parse(markdown)
	console.log(messageHTML)

	try {

		const fileBuffer = await HTMLtoDOCX(messageHTML, null, {
			table: { row: { cantSplit: true } },
			footer: true,
			pageNumber: true,
		});

		const response = new NextResponse(fileBuffer, { status: 200 });
		response.headers.set(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		);
		response.headers.set(
			"Content-Disposition",
			"attachment; filename=Generated Paper.docx"
		);

		return response;
	} catch (error) {
		console.error("Error generating PDF:", error); // Log the error for debugging
		return new NextResponse("Internal Server Error", { status: 500 }); // 500 Internal Server Error
	}
};