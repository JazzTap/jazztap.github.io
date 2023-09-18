---
title: Literature Review - Software Instruments
author: Jasmine Otto
hidden: true
---

We restate [the introduction]({% post_url 2021-01-19-software-instruments-intro %}) in the terms of *data visualization*, and its attendant interests in science and industry.

# Introduction
## Data Problems
Expert knowledge that is based on data inevitably results in data that is high-dimensional and domain-specific. A physicist might cast the behavior of a car as a function over time in phase space (coupled appropriately to the behavior of other functions representing cars). A mechanical engineer might prefer to represent the car as an arrangement of physical linkages (an engine, a drivetrain, wheels). An experience designer would instead treat the car as an arrangement of driving-affordances exposed by its physical control surfaces (a gearshift, a steering wheel, pedals).

As in the parable of the blind men and the elephant, each of these experts has told us that the car has many different properties, some of them contradictory, such as if we neglect that the hard, metallic car body is different from the soft, leather seats. Here I will address the problem where each data representation is a dissimilar view of the elephant. Perhaps the dissimilar views represent different parts, so of course they're different. Or, perhaps the dissimilar views represent the same part (such as the algebra and the geometry of one system), in which case a data visualization tool can make sense of (and make use of) the translation between them.

That is, while high-dimensional data visualization is a powerful tool for understanding the behavior of complex systems, it is not agnostic to the knowledge domain (the ontology) from which that data arises.

Expert practitioners in a given domain will already be familiar with diverse visual representations of their data - ranging from standardized plots (e.g. in a paper), to abstract geometric representations (e.g. on a blackboard), to diagnostic illustrations (e.g. the response of bacteria to a Gram stain), to metaphors they personally find useful. All of these representations are in dialog with each other and with certain models within each domain. Those models are valuable to us as tool designers, because they translate between representations.

Another source of models for high-dimensional data, besides explicit readings of expert knowledge, is statistical inference on a given dataset. Popular modelling techniques include 'training' a given machine learning (ML) architecture by performing gradient descent on a very large parameter space. These black-box modelling techniques are certainly data-driven, but are not easy to combine with theory-driven models and inferences.

A taxonomy of data problems in natural language processing (NLP), a field in which ML competes strongly with hand-coded networks of relations, is given by Halvey, Norvig, and Pereira [3]. In order to reconcile the data-driven and theory-driven approaches to coding natural language (and generating it), they show that each cares about the same three orthogonal problems:

* choosing a representation language
* encoding a model in that language
* and performing inference on the model. 
  
Data-driven modelling approaches rely on theory to make good choices of representation, while theory-driven modelling approaches rely on data to make inferences about the measurable world.
## Visible Representation
Representation languages decompose artifacts into modular units. An artifact is an object of study. It has at least one kind of data representation, such as trophic networks in ecology (as graphs with weighted edges), or characters in a role-playing game (as character sheets), or crocheted accessories (as knitting patterns) [4].

Specific ML architectures typically incorporate domain-specific representation languages, such as kernel functions (in raster-based graphics), word embeddings (in NLP), or solutions to nonlinear dynamical systems (in reservoir computing). These representation languages provide gains in data visualization, equally.

If you have plotted data before, you are familiar with first-class visual encodings (e.g. line charts, bar charts, heat maps) for distributions of scalar values varying along one or more dimensions. How should we visually encode non-scalar values, such as kernel functions (as weight matrices?), or word embeddings (as semantic vectors?), or reservoir elements (as neural networks with random weights)? As soon as our values are more complex than scalar quantities, the conventions of axes and color scales become inadequate.

How shall we represent a distribution of non-scalar values, let alone a model, which is a rich parameterization of such distributions? In the domain of procedural generation, the visual analysis of a design space of artifacts (e.g. playable levels in a game) may take the form of an expressive range analysis [5]. I will build on this idea, that distributions of artifacts require first-class visual encodings, to motivate the concept of explorable models as implemented by software instruments.

In this literature review, we will draw on prior theories of embodied interaction and hypertextuality to discuss already-existing evaluation-execution loops conducted by experts with their data, to understand its models, producing both descriptions (representations) and inferences (analyses).

We will discover sets of operational logics that are used by these experts, including well-known patterns such as 'searching for' datum meeting certain criteria, and subsequently 'inspecting' these events or rules or artifacts. When we implement these logics into data-visualizing software, those will function as instruments of analysis.

Remarkably, these are very much the same operational logics as we encounter in instruments of expression, which allow experts to traverse an expressive range, embedded in a design space, to locate artifacts (or events, or rules). In other words, an expert navigates a model, embedded in a latent space, to locate a datum.
## Contents of This Review
In the following sections of this document, I will frame the problem of research debt in terms of design spaces, whose navigation is accomplished via software instruments. In particular, the analysis of specific artifacts is in conversation with the design of models from which they arise. Likewise, the design of specific artifacts is in conversation with the analysis of models from which they arise. Models connect the worlds of design and of analysis.

The first part of the background section concerns a case study in shared experiences of navigating design space, namely the Annals of the Parrigues, written by Emily Short [2]. We will read its appendix, which recounts designing a medium of expression whilst navigating the space it describes, against generative design mediums including Logo sketches and Twitterbots.

The second part of the background section of this essay will address the specific problem of 'research debt', coined in analogy to technical debt by Olah and Carter [1]. Along the way, we'll critique mathematics pedagogy, learn to tune a platformer game in real time, and discover a better way to code interactive artifacts.

In the case studies section, we will explore an avatar creation tool from a videogame, and a web-based library for binding data to visual representations.

In the final, theoretical section of this essay, we will introduce terminology for practitioners who intend to develop novel or existing software instruments, and to communicate their results through landmarks, scores, and other methods of orientation in design space using software instruments.

[1] [https://distill.pub/2017/research-debt/](https://distill.pub/2017/research-debt/)  
[2] [https://emshort.blog/2015/12/07/procjam-entries-nanogenmo-and-my-generated-generation-guidebook/](https://emshort.blog/2015/12/07/procjam-entries-nanogenmo-and-my-generated-generation-guidebook/)  
[3] [https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/35179.pdf](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/35179.pdf)  
[4] [https://aiweirdness.com/post/173096796277/skyknit-when-knitters-teamed-up-with-a-neural](https://aiweirdness.com/post/173096796277/skyknit-when-knitters-teamed-up-with-a-neural)  
[5] [https://web.archive.org/web/20120306215536/http://games.soe.ucsc.edu/sites/default/files/smith-expressiverange-fdgpcg10.pdf](https://web.archive.org/web/20120306215536/http://games.soe.ucsc.edu/sites/default/files/smith-expressiverange-fdgpcg10.pdf)  