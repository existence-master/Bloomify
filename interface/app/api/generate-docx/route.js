import { marked } from "marked";
import HTMLtoDOCX from "html-to-docx";
import { NextResponse } from "next/server"; // Import Next.js server response
import katex from "katex"; // Import KaTeX for LaTeX rendering
import "katex/dist/katex.min.css"; // Import KaTeX CSS

// Configure marked to use KaTeX for LaTeX rendering
marked.setOptions({
  // Handle LaTeX expressions (both inline and block)
  renderer: new marked.Renderer(),
});

export const POST = async (request) => {
  const { markdown } = await request.json();

  if (!markdown) {
    return new NextResponse("Bad Request: No Markdown content provided", {
      status: 400,
    }); // 400 Bad Request
  }

  // Convert LaTeX expressions in markdown to HTML using KaTeX
  const markdownWithLatex = markdown.replace(/\$\$(.*?)\$\$/g, (_, expr) => {
    try {
      return katex.renderToString(expr, { throwOnError: false, displayMode: true });
    } catch (e) {
      return expr; // In case of error, return the raw expression
    }
  }).replace(/\$(.*?)\$/g, (_, expr) => {
    try {
      return katex.renderToString(expr, { throwOnError: false });
    } catch (e) {
      return expr;
    }
  });

  // Convert markdown to HTML
  const messageHTML = marked.parse(markdownWithLatex);

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
    return new NextResponse("Internal Server Error", { status: 500 }); // 500 Internal Server Error
  }
};
