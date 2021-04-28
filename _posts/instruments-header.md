---
# Front matter
lang: en-US
title: "Software Instruments"
subtitle: "Interactive Construction of Interactive Artifacts"
author: "Jasmine T. Otto"
date: 4-27-21
abstract: "I will frame the problem of research debt in terms of design spaces, whose navigation is accomplished via software instruments. In particular, the analysis of specific artifacts is in conversation with the design of models from which they arise. Likewise, the design of specific artifacts is in conversation with the analysis of models from which they arise. Models connect the worlds of design and of analysis."
# keywords: "TODO"
# thanks: "For my cohort, whom I couldn't do this without. For my parents."

# Bibliography
csl: https://www.zotero.org/styles/chicago-note-bibliography # See https://www.zotero.org/styles for more styles.
bibliography: instruments.bib # See https://github.com/jgm/pandoc-citeproc/blob/master/man/pandoc-citeproc.1.md for more formats.
suppress-bibliography: false
link-citations: true
color-links: true # See https://ctan.org/pkg/xcolor for colors
linkcolor: black
urlcolor: black
citecolor: black
endnote: false

# Formatting
toc-title: "Contents"
toc: true # Table of contents
toc_depth: 3
lof: true # List of figures
lot: true # List of tables
fontsize: 12pt
linestretch: 1.5
# Uncomment and check https://tug.org/FontCatalogue/ and https://fonts.google.com/ for fonts
# mainfont: "Merriweather"
# sansfont: "Raleway"
# monofont: "IBM Plex Mono"
# mathfont:
documentclass: report # See https://en.wikibooks.org/wiki/LaTeX/Document_Structure#Document_classes for more classes and options
classoption: [notitlepage, onecolumn, openany]
geometry: [a4paper, bindingoffset=0mm, inner=30mm, outer=30mm, top=30mm, bottom=30mm] # See https://ctan.org/pkg/geometry for more options
header-includes:
  - \linepenalty=10 # the penalty added to the badness of each line within a paragraph (no associated penalty node) Increasing the value makes tex try to have fewer lines in the paragraph.
  - \interlinepenalty=0 # value of the penalty (node) added after each line of a paragraph.
  - \hyphenpenalty=50 # the penalty for line breaking at an automatically inserted hyphen
  - \exhyphenpenalty=50 # the penalty for line breaking at an explicit hyphen
  - \binoppenalty=700 # the penalty for breaking a line at a binary operator
  - \relpenalty=500 # the penalty for breaking a line at a relation
  - \clubpenalty=150 # extra penalty for breaking after first line of a paragraph
  - \widowpenalty=150 # extra penalty for breaking before last line of a paragraph
  - \displaywidowpenalty=50 # extra penalty for breaking before last line before a display math
  - \brokenpenalty=100 # extra penalty for page breaking after a hyphenated line
  - \predisplaypenalty=10000 # penalty for breaking before a display
  - \postdisplaypenalty=0 # penalty for breaking after a display
  - \floatingpenalty = 20000 # penalty for splitting an insertion (can only be split footnote in standard LaTeX)
  - \raggedbottom # or \flushbottom
  - \usepackage{float} # keep figures where there are in the text
  - \floatplacement{figure}{H} # keep figures where there are in the text
# if you use RStudio uncomment these lines
# output:
#   word_document:
#     path: academic-pandoc-template.docx
#   pdf_document:
#     path: academic-pandoc-template.pdf
---