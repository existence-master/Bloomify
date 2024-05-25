import { promisify } from "util";
import fs from "fs";
import path from "path";
import markdownpdf from "markdown-pdf";
import convertMarkdownToPDF from "markdown-to-pdf-converter";
import { NextResponse } from "next/server"; // Import Next.js server response

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
 
export const POST = async (request) => {
   
	const { markdown } = await request.json();

	if (!markdown) {
		return new NextResponse("Bad Request: No Markdown content provided", {
			status: 400,
		}); // 400 Bad Request
	}

	const pdfPath = path.join(process.cwd(), "public", "generated.pdf");
	const markdownPath = path.join(process.cwd(), "public", "temp.md");

	try {
		// Write the Markdown content to a temporary file
		await writeFile(markdownPath, markdown);

		// Convert the Markdown file to PDF
		convertMarkdownToPDF(markdownPath, pdfPath)

		// Remove the temporary Markdown file
		await unlink(markdownPath);

		// Send the PDF file as a response
		const pdfBuffer = fs.readFileSync(pdfPath);
		const response = new NextResponse(pdfBuffer, { status: 200 });
		response.headers.set("Content-Type", "application/pdf");
		response.headers.set(
			"Content-Disposition",
			"attachment; filename=Generated Paper.pdf"
		);

		// Optionally, remove the PDF file after sending it
		await unlink(pdfPath);

		return response;
	} catch (error) {
		console.error("Error generating PDF:", error); // Log the error for debugging
		return new NextResponse("Internal Server Error", { status: 500 }); // 500 Internal Server Error
	}
};