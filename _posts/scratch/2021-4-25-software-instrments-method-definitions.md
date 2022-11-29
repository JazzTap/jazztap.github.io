---
title: Software Instruments - The Data Flow
author: Jasmine Otto
---

## Software Expression (cont'd)

the api of a software library written in a certain programming language is effectively a domain-specific language (DSL) embedded in that language.

https://freecontent.manning.com/the-what-and-why-of-domain-specific-lanugages/

in videogame development, it is typical to author content in a DSL specific to that game. many games incorporate multiple DSLs, such as The Sims 2, which exposes certain DSLs and their editors to players (sims, houses) and others only to developers (objects, neighborhoods).



https://www.gamasutra.com/view/feature/130077/the_whimsy_of_domainspecific_.php

certain libraries are explicity written as interfaces to a codebase written and maintained in another programming language, i.e. as a set of bindings to an external dependency. in data science software environments, where e.g. LAPACK (optimized Fortran routines for linear algebra) or GDAL (C++ parsers for geospatial vector data in various formats) may need to be imported, it is useful to manage such external dependencies.

within the Python data science ecosystem, while most Python libraries are distributed and managed through `pip`, the alternative package manager `conda` additionally supports libraries which contain extensive non-Python dependencies.

https://www.earthdatascience.org/courses/intro-to-earth-data-science/python-code-fundamentals/use-python-packages/introduction-to-python-conda-environments/


in addition to its data structure(s), any software library or domain-specific language provides methods on those structures. some methods re-present (portions of) the data, such as indexing into a list. others perform an analysis of the data, such as measuring the length of a list.

domain experts gain leverage over their data when they can import libraries of relevant abstractions, not when implementing them from scratch. in other words, the 'language at hand' consists more of library-specific abstractions than the features of the programming language in which these are embedded.

in this way, *programming instruments* are composed in a 'glue language' (such as python) and performed in the language of the 'programming stack' at hand, i.e. some set of libraries available from that language. the software meta-medium is capable of defining new software mediums, in the same way that the language of mathematics can define new languages of mathematics. (except that it is much easier to say that non-mathematicians do not use math, than that non-programmers do not use software.)

-> accessibility of programming. casual creators for representation languages.
-> interface languages. how do we transform representation languages into *interactive* software?


### Typed Methods

The *methods* of an object are the part of its representation that is verb-like. We are interested in the relationship between verbs comprising the library interface from an 'internal perspective' only (i.e. part of the programming instrument) or from an 'end-user perspective' as well (i.e. 'exposed' to the resulting software instrument).

We take preliminary steps toward putting strongly-typed methods on data structures in concordance with operational logics, following from Joe Osborn's catalog of these 'interaction primitives' proposed by Michael Mateas and Noah Wardrip-Fruin. We claim that any *software medium* (implied by a software instrument) comprises of both a family of representations for the target artifacts, and a set of interactions with those representations - ranging from data loading, to visual representation, and various forms of editing.

https://escholarship.org/content/qt2jh5c6k7/qt2jh5c6k7.pdf

IDEs and CAD software are a few samples of softwre instruments. Recall that the CAD software Blender includes both the Blender GUI and an extensive set of Python bindings for 3D geometric operations. the ecosystem of Blender packages is more representative of the maximal capabilities of a person using Blender, than the affordances of Blender alone. a similar situation exists in the contexts of (say) Python or Haskell, Maximus P or Ableton Live, Unity or Unreal Engine, and so on for a variety of other closed- and open-source creative communities.

In the process, we will incorporate operational logics from the catalog compiled by Joe Osborn.  
https://eis.ucsc.edu/analyses-and-approaches/operational-logics/

#### Operations, T -> T

Methods with algebraic properties. That is, when an operation is applied to an artifact (an object instance), its type does not change. Operations may be *composed* with each other without 'breaking' the artifact, in some sense.

For example, adding one ('+1') is an operation on the integers (usually called 'successor'). No matter what integer I add one to, I will never get a non-integer value like 6.5 back. Whereas dividing by two ('/2') is not an operation on the integers, since 13/2 is not an integer (although it is a rational number).

These guarantees are much harder to produce, and correspondingly more valuable, on more complex data types. For example, within the set of 'polygonal meshes' is a set of 'triangular meshes', and within these a set of 'well-conditioned triangular meshes' on which accurate numerical simulation is feasible, because none of the triangles are too skinny (which tends to introduce numeric errors). But not all operations on the vertices of a triangular mesh will preserve this well-conditioning, and it will be frustrating to someone intending to perform a numerical simulation if they have broken their mesh thus without realizing.

Higher-arity operations (i.e. with more than one operand) are also possible. The familiar 'addition' operation has data type (T, T) -> T. Multiple input types can occur, such as in matrix multiplication by a scalar, which has data type (T, Scalar) -> T. (In the scope of this primer, we do not attempt to reduce all operations to the form T -> T through currying.)

##### Application to 'graphical editors'

##### Application to collision logics

In virtual worlds, an especially important operation is character movement from Position -> Position. Because it is upsetting if characters can move inside of 'solid objects', it is better to constrain the *movement operation* so that it never returns a Position that is somehow occupied.

These constraints can be represented as 'qualitative/quantitative spatial constraints', but implemented in any number of ways.


#### Algorithms, T -> F[T]

Methods to augment or annotate structured records. The simplest examples are boolean classifiers (T -> Bool), which evaluate an object as either 'yes' or 'no'.

Among the most elegant examples is discrete Fourier transform, which turns a time-domain scalar function into a frequency-domain scalar function.

The most complex examples include program compilation (which produces running code from a parse graph initially represented by a string), methods of solving systems of equations (especially hybrid symbolic-numeric techniques), and other forms of domain-specific analysis.

##### Application to control logics

##### Application to entity-state logics


#### Views and Representations, F[T] -> T

Lossy methods including projections, summary statistics, and written summaries. Analogous to the map of a territory which is your data.

Absolutely necessary to render 3D objects on 2D screens. Also typical in 2D data visualizations, which can't fit every feature of an object into one screen of information. As Engelbart coins it:

> The computer can transform back and forth between the two-dimensional portrayal on the screen, of some limited view of the total structure, and the aspect of the n-dimensional internal image that represents this "view." If the human adds to or modifies such a "view," the computer integrates the change into the internal-image symbol structure (in terms of the computer's favored symbols and structuring) and thereby automatically detects a certain proportion of his possible conceptual inconsistencies.

##### Application to camera logics

##### Application to game mode logics


### Typed Methods on Collections

The majority of data takes the form of arrays of structured records, which we call 'rows of data'. If every row is of type T, then we have a homogenous dataset of type List[T].

Certain list methods are agnostic to the fields and methods of T objects, and make up the common core of data science and generative art. They are useful because of operations, algorithms, and views specific to T, all of which can be passed in as arguments.

#### Filters, List[T] -> List[T]

Focusing on certain rows to the exclusion of others, usually by user selection.

##### Application to persistence logics

##### Application to selection logics


#### Maps, List[T] -> List[F[T]]

Applying the same method to every row. Ubiquitious.

Highly applicable to worlds of multiple colliding, controllable, or otherwise stateful objects.

Also used to understand the effect of an algorithm over a distribution of inputs.

##### Application to 'graphical editors'

##### Application to physics logics


#### Reductions, List[T] -> F[T]

Summation, or any other kind of cumulative operation over rows in a dataset. This is the first kind of list method we have considered that does not itself return a list.

##### Application to progression logics

##### Application to recombinatory logics

##### Application to resource logics


#### Sampling, List[T] -> T

Focusing on one row to the exclusion of all others, usually by arbitrary choice. Basic method in procedural generation.

##### Application to chance logics

##### Application to linking logics


#### Clustering, List[T] -> List[F[T]]

Diverse family of methods that augment rows with information about their relationship to other rows.

Typical in dimensionality reduction algorithms, and in covariance analyses generally.

##### Application to spatial matching logics

##### Application to temporal matching logics


#### Expressive Range Analysis, List[T] -> F[T]

Special case of sampling from a dataset augmented with relational information. Useful for interactive browsing.

#### Example-Driven Synthesis (T -> List[T])
