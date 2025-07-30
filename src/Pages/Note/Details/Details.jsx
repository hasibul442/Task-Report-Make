import { Editor } from '@monaco-editor/react'
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { getLanguage } from '../../../Helper/Helper';

function Details() {
	const { id } = useParams();
	const [note, setNote] = useState("");
	const [lang, setLang] = useState("");


	const getNote = async () => {
		const docRef = doc(db, 'notes', id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			setNote(docSnap.data().note);
			const fileName = docSnap.data().name;
			const fileExtension = fileName.split('.').pop();
			const language = getLanguage(fileExtension);
			setLang(language);
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}
	useEffect(() => {
		getNote();
	}, [id]);
	return (
		<>
			<section className='container-fluid mt-3'>
				<div style={{ height: '80vh', width: '100%' }}>
					<Editor
						height="100%"
						defaultLanguage={lang}
						language={lang}
						defaultValue={note}
						theme="vs-dark"
						value={note}
						onChange={setNote}
						options={{
							"acceptSuggestionOnCommitCharacter": true,
							"acceptSuggestionOnEnter": "on",
							"accessibilitySupport": "auto",
							"accessibilityPageSize": 10,
							"ariaLabel": "Editor content",
							"ariaRequired": false,
							"screenReaderAnnounceInlineSuggestion": true,
							"autoClosingBrackets": "languageDefined",
							"autoClosingComments": "languageDefined",
							"autoClosingDelete": "auto",
							"autoClosingOvertype": "auto",
							"autoClosingQuotes": "languageDefined",
							"autoIndent": "full",
							"autoSurround": "languageDefined",
							"bracketPairColorization": {
								"enabled": true,
								"independentColorPoolPerBracketType": false
							},
							"bracketPairGuides": {
								"bracketPairs": true,
								"bracketPairsHorizontal": "active",
								"highlightActiveBracketPair": true,
								"indentation": true,
								"highlightActiveIndentation": true
							},
							"stickyTabStops": true,
							"codeLens": true,
							"codeLensFontFamily": "",
							"codeLensFontSize": 0,
							"colorDecorators": true,
							"colorDecoratorActivatedOn": "clickAndHover",
							"colorDecoratorsLimit": 500,
							"columnSelection": false,
							"comments": {
								"insertSpace": true,
								"ignoreEmptyLines": true
							},
							"contextmenu": true,
							"copyWithSyntaxHighlighting": true,
							"cursorBlinking": "blink",
							"cursorSmoothCaretAnimation": "off",
							"cursorStyle": "line",
							"cursorSurroundingLines": 0,
							"cursorSurroundingLinesStyle": "default",
							"cursorWidth": 0,
							"disableLayerHinting": false,
							"disableMonospaceOptimizations": false,
							"domReadOnly": false,
							"dragAndDrop": true,
							"emptySelectionClipboard": true,
							"dropIntoEditor": {
								"enabled": true,
								"showDropSelector": "afterDrop"
							},
							"stickyScroll": {
								"enabled": false,
							},
							"experimentalWhitespaceRendering": "svg",
							"extraEditorClassName": "",
							"fastScrollSensitivity": 5,
							"find": {
								"cursorMoveOnType": true,
								"seedSearchStringFromSelection": "always",
								"autoFindInSelection": "never",
								"globalFindClipboard": false,
								"addExtraSpaceOnTop": true,
								"loop": true
							},
							"fixedOverflowWidgets": false,
							"folding": true,
							"foldingStrategy": "auto",
							"foldingHighlight": true,
							"foldingImportsByDefault": false,
							"foldingMaximumRegions": 5000,
							"unfoldOnClickAfterEndOfLine": false,
							"fontFamily": "Consolas, 'Courier New', monospace",
							"fontLigatures2": false,
							"fontSize": 14,
							"fontWeight": "normal",
							"fontVariations": false,
							"formatOnPaste": false,
							"formatOnType": false,
							"glyphMargin": true,
							"gotoLocation": {
								"multiple": null,
								"multipleDefinitions": "peek",
								"multipleTypeDefinitions": "peek",
								"multipleDeclarations": "peek",
								"multipleImplementations": "peek",
								"multipleReferences": "peek",
								"alternativeDefinitionCommand": "editor.action.goToReferences",
								"alternativeTypeDefinitionCommand": "editor.action.goToReferences",
								"alternativeDeclarationCommand": "editor.action.goToReferences",
								"alternativeImplementationCommand": "",
								"alternativeReferenceCommand": ""
							},
							"hideCursorInOverviewRuler": false,
							"hover": {
								"enabled": true,
								"delay": 300,
								"sticky": true,
								"hidingDelay": 300,
								"above": true
							},
							"inDiffEditor": false,
							"letterSpacing": 0,
							"lightbulb": {
								"enabled": "onCode"
							},
							"lineDecorationsWidth": 10,
							"lineHeight": 0,
							"lineNumbers": "on",
							"lineNumbersMinChars": 5,
							"linkedEditing": false,
							"links": true,
							"matchBrackets": "always",
							"minimap": {
								"enabled": false
							},
							"mouseStyle": "text",
							"mouseWheelScrollSensitivity": 1,
							"mouseWheelZoom": false,
							"multiCursorMergeOverlapping": true,
							"multiCursorModifier": "alt",
							"multiCursorPaste": "spread",
							"multiCursorLimit": 10000,
							"occurrencesHighlight": "singleFile",
							"overviewRulerBorder": true,
							"overviewRulerLanes": 2,
							"padding": {
								"top": 0,
								"bottom": 0
							},
							"pasteAs": {
								"enabled": true,
								"showPasteSelector": "afterPaste"
							},
							"parameterHints": {
								"enabled": true,
								"cycle": true
							},
							"peekWidgetDefaultFocus": "tree",
							"definitionLinkOpensInPeek": false,
							"quickSuggestions": {
								"other": "on",
								"comments": "off",
								"strings": "off"
							},
							"quickSuggestionsDelay": 10,
							"readOnly": false,
							"renameOnType": false,
							"renderControlCharacters": true,
							"renderFinalNewline": "on",
							"renderLineHighlight": "line",
							"renderLineHighlightOnlyWhenFocus": false,
							"renderValidationDecorations": "editable",
							"renderWhitespace": "selection",
							"revealHorizontalRightPadding": 15,
							"roundedSelection": true,
							"rulers": [],
							"scrollbar": {
								"vertical": "auto",
								"horizontal": "auto",
								"verticalScrollbarSize": 14,
								"horizontalScrollbarSize": 12,
								"scrollByPage": false,
								"ignoreHorizontalScrollbarInContentHeight": false
							},
							"scrollBeyondLastColumn": 4,
							"scrollBeyondLastLine": true,
							"scrollPredominantAxis": true,
							"selectionClipboard": true,
							"selectionHighlight": true,
							"selectOnLineNumbers": true,
							"showFoldingControls": "mouseover",
							"showUnused": true,
							"showDeprecated": true,
							"inlayHints": {
								"enabled": "on",
								"fontSize": 0,
								"fontFamily": "",
								"padding": false
							},
							"snippetSuggestions": "inline",
							"smartSelect": {
								"selectLeadingAndTrailingWhitespace": true,
								"selectSubwords": true
							},
							"smoothScrolling": false,
							"stopRenderingLineAfter": 10000,
							"suggest": {
								"insertMode": "insert",
								"filterGraceful": true,
								"localityBonus": false,
								"shareSuggestSelections": false,
								"selectionMode": "always",
								"snippetsPreventQuickSuggestions": false,
								"showIcons": true,
								"showStatusBar": false,
								"preview": false,
								"showInlineDetails": true,
								"maxVisibleSuggestions": 0,
								"filteredTypes": {},
								"showMethods": true,
								"showFunctions": true,
								"showConstructors": true,
								"showDeprecated": true,
								"matchOnWordStartOnly": true,
								"showFields": true,
								"showVariables": true,
								"showClasses": true,
								"showStructs": true,
								"showInterfaces": true,
								"showModules": true,
								"showProperties": true,
								"showEvents": true,
								"showOperators": true,
								"showUnits": true,
								"showValues": true,
								"showConstants": true,
								"showEnums": true,
								"showEnumMembers": true,
								"showKeywords": true,
								"showWords": true,
								"showColors": true,
								"showFiles": true,
								"showReferences": true,
								"showCustomcolors": true,
								"showFolders": true,
								"showTypeParameters": true,
								"showSnippets": true,
								"showUsers": true,
								"showIssues": true
							},
							"inlineSuggest": {
								"enabled": true,
								"showToolbar": "onHover",
								"suppressSuggestions": false,
								"fontFamily": "default"
							},
							"inlineEdit": {
								"enabled": false,
								"showToolbar": "onHover",
								"fontFamily": "default"
							},
							"inlineCompletionsAccessibilityVerbose": false,
							"suggestFontSize": 0,
							"suggestLineHeight": 0,
							"suggestOnTriggerCharacters": true,
							"suggestSelection": "first",
							"tabCompletion": "off",
							"tabIndex": 0,
							"unicodeHighlight": {
								"nonBasicASCII": "inUntrustedWorkspace",
								"invisibleCharacters": true,
								"ambiguousCharacters": true,
								"includeComments": "inUntrustedWorkspace",
								"includeStrings": true,
								"allowedCharacters": {},
								"allowedLocales": {
									"_os": true,
									"_vscode": true
								}
							},
							"unusualLineTerminators": "prompt",
							"useShadowDOM": true,
							"useTabStops": true,
							"wordBreak": "normal",
							"wordSegmenterLocales": [],
							"wordSeparators": "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",
							"wordWrap": "off",
							"wordWrapBreakAfterCharacters": " \t})]?|/&.,;¢°′″‰℃、。｡､￠，．：；？！％・･ゝゞヽヾーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻ｧｨｩｪｫｬｭｮｯｰ”〉》」』】〕）］｝｣",
							"wordWrapBreakBeforeCharacters": "([{‘“〈《「『【〔（［｛｢£¥＄￡￥+＋",
							"wordWrapColumn": 80,
							"wordWrapOverride1": "inherit",
							"wordWrapOverride2": "inherit",
							"defaultColorDecorators": false,
							"tabFocusMode": false,
							"wrappingIndent": {
								"wrappingIndent": "same"
							},
							"wrappingStrategy": {
								"wrappingStrategy": "simple"
							}
						}}
					/>
				</div>
			</section>
		</>
	)
}

export default Details