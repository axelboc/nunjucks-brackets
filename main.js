
define(function (require, exports, module) {
	'use strict';
	
	var LanguageManager = brackets.getModule("language/LanguageManager");
	
	// Load CodeMirror with the simple mode addon
	brackets.getModule([
		"thirdparty/CodeMirror2/lib/codemirror",
		"thirdparty/CodeMirror2/addon/mode/simple"
	], function (CodeMirror) {
		
		// Define a new CodeMirror simple mode 
		CodeMirror.defineSimpleMode("nunjucks", {
			start: [
				{ regex: /\{\{!--/, push: "dash_comment", token: "comment" },
				{ regex: /\{\{!/,   push: "comment", token: "comment" },
				{ regex: /\{\{/,    push: "handlebars", token: "tag" }
			],
			handlebars: [
				{ regex: /\}\}/, pop: true, token: "tag" },

				// Double and single quotes
				{ regex: /"(?:[^\\]|\\.)*?"/, token: "string" },
				{ regex: /'(?:[^\\]|\\.)*?'/, token: "string" },

				// Handlebars keywords
				{ regex: />|[#\/]([A-Za-z_]\w*)/, token: "keyword" },
				{ regex: /(?:else|this)\b/, token: "keyword" },

				// Numeral
				{ regex: /\d+/i, token: "number" },

				// Atoms like = and .
				{ regex: /=|~|@|true|false/, token: "atom" },

				// Paths
				{ regex: /(?:\.\.\/)*(?:[A-Za-z_][\w\.]*)+/, token: "variable-2" }
			],
			dash_comment: [
				{ regex: /--\}\}/, pop: true, token: "comment" },

				// Commented code
				{ regex: /./, token: "comment"}
			],
			comment: [
				{ regex: /\}\}/, pop: true, token: "comment" },
				{ regex: /./, token: "comment" }
			]

		});

		// Let Brackets know about the new language
		LanguageManager.defineLanguage("nunjucks", {
			name: "Nunjucks",
			mode: "nunjucks",
			fileExtensions: ["html", "nunjucks", "njk"],
			blockComment: ["{#", "#}"],
			lineComment: ["{#", "#}"]
		});
		
	});
});
