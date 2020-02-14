exports.header = {
    height: "1.2cm",
    contents: phantom.callback(function(pageNum, numPages) {
      return "<h1>Header <span style='float:right'>" + pageNum + " / " + numPages + "</span></h1>";
    })
  }

exports.footer = null

/**
 * header and footer might be of format specified in http://phantomjs.org/api/webpage/property/paper-size.html
 *
 * Example:
 *  {
 *    height: "1cm",
 *    contents: function(pageNum, numPages) {
 *      return "<h1>Header <span style='float:right'>" + pageNum + " / " + numPages + "</span></h1>"
 *    }
 *  }
 */