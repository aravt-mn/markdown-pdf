var markdownpdf = require("markdown-pdf")
  , fs = require("fs")
 
// fs.createReadStream("/path/to/document.md")
//   .pipe(markdownpdf())
//   .pipe(fs.createWriteStream("/path/to/document.pdf"))
 
// --- OR ---
 
var mdDocs = ["docs/chapter1.md", "docs/chapter2.md"]
, bookPath = "pdf/document.pdf"



markdownpdf().concat.from(mdDocs).to(bookPath, function () {
  console.log("Done")
})
