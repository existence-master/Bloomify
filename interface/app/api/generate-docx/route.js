import { marked } from "marked";
import { NextResponse } from "next/server"; 
import katex from "katex"; 
import "katex/dist/katex.min.css"; 

// Custom renderer for marked
const renderer = new marked.Renderer();

renderer.paragraph = (text) => {
  // Convert LaTeX expressions in paragraphs
  const latexConverted = text
    .replace(/\$\$(.*?)\$\$/g, (_, expr) => {
      try {
        // Render block equations in display mode
        return `\n$$\n${expr}\n$$\n`; // Keep it in Markdown format
      } catch (e) {
        return expr; 
      }
    })
    .replace(/\$(.*?)\$/g, (_, expr) => {
      try {
        // Render inline equations in inline mode
        return `$${expr}$`; // Keep it in Markdown format
      } catch (e) {
        return expr;
      }
    });

  return `${latexConverted}\n`; // Return as plain text
};

// Set marked options
marked.setOptions({
  renderer: renderer,
});

export const POST = async (request) => {
  const { markdown } = await request.json(); // Get markdown from request body

  if (!markdown) {
    return new NextResponse("Bad Request: No Markdown content provided", {
      status: 400,
    });
  }

  // Convert markdown to HTML (if needed, but not necessary for .md file)
  const messageHTML = marked(markdown);

  // Prepare the Markdown content for download
  const markdownContent = markdown; // Use the original markdown content

  try {
    const response = new NextResponse(markdownContent, { status: 200 });
    response.headers.set("Content-Type", "text/markdown");
    response.headers.set("Content-Disposition", "attachment; filename=Natural_Equation.md");

    return response;
  } catch (error) {
    console.error("Error generating Markdown file:", error); // Log the error for debugging
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};