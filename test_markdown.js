// var markdownpdf = require("markdown-pdf")
//   , fs = require("fs")
//   , split = require("split")
//   , through = require("through")
//   , duplexer = require("duplexer")
 
// // fs.createReadStream("/path/to/document.md")
// //   .pipe(markdownpdf())
// //   .pipe(fs.createWriteStream("/path/to/document.pdf"))
 
// // --- OR ---
 
// var mdDocs = ["docs/chapter1.md", "docs/chapter2.md"]
// , bookPath = "pdf/document.pdf"



// markdownpdf().concat.from(mdDocs).to(bookPath, function () {
//   console.log("Done")
// })



// var markdownpdf = require("markdown-pdf")
//   , split = require("split")
//   , through = require("through")
//   , duplexer = require("duplexer")
 
// function preProcessMd () {
//   // Split the input stream by lines
//   var splitter = split()
 
//   // Replace occurences of "foo" with "bar"
//   var replacer = through(function (data) {
//     this.queue(data.replace(/foo/g, "bar") + "\n")
//   })
 
//   splitter.pipe(replacer)
//   return duplexer(splitter, replacer)
// }
 
// markdownpdf({preProcessMd: preProcessMd})
//   .from("docs/chapter1.md")
//   .to("pdf/document2.pdf", function () { console.log("Done") })