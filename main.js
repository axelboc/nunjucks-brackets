
define(function (require, exports, module) {
	'use strict';
	
	var LanguageManager = brackets.getModule("language/LanguageManager");
	
	// Load CodeMirror with the simple mode addon
	brackets.getModule([
		"thirdparty/CodeMirror2/lib/codemirror",
		"thirdparty/CodeMirror2/addon/mode/simple"
	], function (CodeMirror) {
		
		// Define a new CodeMirror simple mode 
		CodeMirror.defineSimpleMode("njk", {
			start: [
				{ regex: /{% raw %}/, token: "tag", mode: { spec: "htmlmixed", end: /{% endraw %}/ } },
				{ regex: /\{\{/, push: "block", token: "tag" },
				{ regex: /\{\%\-?/, push: "block", token: "tag" },
				{ regex: /\{\#/, push: "comment", token: "comment" }
			],
			block: [
				{ regex: /}}/, pop: true, token: "tag" },
				{ regex: /\-?\%\}/, pop: true, token: "tag" },

				// Double and single quotes
				{ regex: /"(?:[^\\]|\\.)*?"/, token: "string" },
				{ regex: /'(?:[^\\]|\\.)*?'/, token: "string" },

				// Keywords
				{ regex: /\b(?:block|if|for|macro|call|raw)\b/, token: "keyword" },
				{ regex: /\b(?:endblock|endif|endfor|endmacro|endcall|endraw)\b/, token: "keyword" },
				{ regex: /\b(?:extends|include|elif|else|import|set)\b/, token: "keyword" },
				{ regex: /\b(?:asyncEach|endeach|asyncAll|endall)\b/, token: "keyword" },
				{ regex: /\b(?:and|or|not|in|as|from)\b/, token: "keyword" },
				
				// Atoms
				{ regex: /\b(?:true|false)\b/, token: "atom" },

				// Numeral
				{ regex: /\b\d+(?:\.\d+)?\b/, token: "number" },

				// Operators and punctuation
				{ regex: /(?:\=|\+|\-|\/|\*|%|\!|<|>)/, token: "operator" },
				{ regex: /(?:\.|,)/, token: "punctuation" },
				
				// Functions and filters
				{ regex: /\w+(?=\()/, token: "def" },
				{ regex: /(\|)( ?)(\w+)/, token: ["operator", null, "def"] },
				
				// Variable
				{ regex: /\w+/, token: "variable" }
			],
			comment: [
				{ regex: /\#\}/, pop: true, token: "comment" },
				{ regex: /./, token: "comment" }
			]

		});
		
		// Overlay the new mode with CodeMirror's HTML mode
		CodeMirror.defineMode("nunjucks", function(config, parserConfig) {
			return CodeMirror.overlayMode(
				CodeMirror.getMode(config, "htmlmixed"),
				CodeMirror.getMode(config, "njk")
			);
		});

		// Let Brackets know about the new language
		LanguageManager.defineLanguage("nunjucks", {
			name: "Nunjucks",
			mode: "nunjucks",
			fileExtensions: ["html", "htm", "nunjucks", "njk"],
			blockComment: ["{#", "#}"],
			lineComment: ["{#", "#}"]
		});
		
	});
});
