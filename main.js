// Code Mirror: Multiplexing Parsing of Digital Alchemy's merge-
// text templating language (based on/built with MS Visual FoxPro

define (function (require, exports, module) {
  var CodeMirror = brackets.getModule ("thirdparty/CodeMirror/lib/codemirror");
  var LanguageManager = brackets.getModule ("language/LanguageManager");


    // Define a new CodeMirror simple mode
    CodeMirror.defineMode("da-html", function(config) {
      return CodeMirror.multiplexingMode (
        CodeMirror.getMode(config, "text/html"),
          {open: "<<", close: ">>",
            mode: CodeMirror.getMode(config, "text/plain"),
             delimstyle: "delimit"}
        // add style to innerStyle with a tag if desired
      // .. more multiplexed styles could follow here
        parseDelimiters: true
      );
});
    // Let Brackets know about the new language
    LanguageManager.defineLanguage("da-html", {
      name: "DA-Merge-Text",
      mode: "da-html",
      fileExtensions: ["da_html"],
    });

  });

