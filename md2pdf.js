const mdToPdf = require('md-to-pdf');
 
var mdDocs = ["docs/chapter1.md", "docs/chapter2.md"]
 , bookPath = "pdf/document.pdf"

(async () => {
    const pdf = await mdToPdf('docs/chapter1.md', { dest: 'pdf/md1.pdf' }).catch(console.error);
 
    if (pdf) {
        console.log(pdf.filename);
    }
})();