---
title: Software Instruments - The Medium and its Data Flow
author: Jasmine Otto
---

## Software Expression

I have discussed how the *affordances* of *interfaces* participate in the perception-action loop that underlies human use of toys, tools, and instruments from the perspective of *enactivist cognition*. I will now discuss the construction of interfaces from a programming perspective, using the computational meta-medium.

In the case of *software interfaces* produced by programmers, their form depends on the affordances (in a programming environment) that are available to that programmer. Rather than having infinite flexibility to produce a novel interface, programmers always draw on a large and largely pre-existing stack of programming affordances (not just library APIs, but also compilers and drivers and so on) to implement their intended design.

It is possible to study the design of software interfaces by considering the *methods* acting on *structured records* that make up a *software library* and in particular its *application programming interface* (*API*). Due to the popularity of the *object-oriented programming paradigm*, most libraries can be analyzed in this way, because the complexity of various methods and data structures is encapsulated into *software objects*, i.e. representations, and their interfaces.

Given a software interface built with certain libraries of representations, it is useful to characterize its capacity to receive user actions and knowledge (through its representations of inputs and other data), and to act on objects in the world (through its representations of artifacts and other outputs). Objects in the world include screens, and users viewing them, and organizations run by users, but also things that aren't designed to be perceived, like robots and dams.

Timothy Binkley cites cases of creative practitioners developing novel software interfaces and software mediums to explore new spaces of representations and artifacts. Yet Binkley describes the software representations which those practitioners manipulate simply as numbers and their arrangements.

Since the '80s, more sophisticated characterizations have been developed for software representations, i.e. data structures and *strongly typed methods* of operating on them.

How do interface affordances arise from the program's internal *data structures* and 'data flow'? I will here describe, using type theory, a few distinct families of typed methods - from the perspective of exploring and manipulating (collections of) artifacts.

I will read Binkley on creative coding to compare and contrast the 'ways of knowing' possessed by a computer-human co-creative system, with those of a 'paper-human co-creative system' (such as sketching, whiteboarding, or painting). In the current context of AI systems, I emphasize that all data-driven systems are co-creative systems, because all data contains human-authored ontologies.

### Data Structures

Let's examine the representation of an object in memory.

The *data structure* of an object is the part of its representation that is noun-like. Typically a 'dictionary' of typed variables. For example, a linked list:

```scala
class ListBuffer[T] (
    var head: Maybe[Node[T]] = None
)
class Node[T] (
    var value: T,
    var next: Maybe[Node[T]]
)
```
is a ubiquitous data structure, used as a variable-length collection type. For instance:

```scala
val distribution = new ListBuffer[Int]()
distribution += 1
distribution += 2

distribution.head.value // 1
distribution.head.next.value // 2
```

The above code is verbose, because we are using the minimally functional set of methods. (We haven't defined this method yet, but assume that '+=' works as implied.)

If we add to our API a kind of *syntactic sugar* using appropriate 'constructor' and 'toString' methods, it becomes much more comfortable to use.

```scala
val distribution = ListBuffer[Int](1, 2)
distribution // [1,2]
```

### Typed Methods

The *methods* of an object are the part of its representation that is verb-like.

We will taxonomize these methods as follows.

#### Operations, T -> T

Methods with algebraic properties.

#### Algorithms, T -> F[T]

Methods to augment or annotate structured records. The simplest examples are boolean classifiers (T -> Bool), which evaluate an object as either 'yes' or 'no'.

Among the most elegant examples is discrete Fourier transform, which turns a time-domain scalar function into a frequency-domain scalar function.

The most complex examples include program compilation (which produces running code from a parse graph initially represented by a string), methods of solving systems of equations (especially hybrid symbolic-numeric techniques), and other forms of domain-specific analysis.

#### Views and Representations, F[T] -> T

Lossy methods including projections, summary statistics, and written summaries.

Absolutely necessary to render 3D objects on 2D screens. Also typical in 2D data visualizations, which can't fit every feature of an object into one screen of information. Pick any example of 'the map is not the territory, nor would that help.'


### Typed Methods on Data

The majority of data takes the form of arrays of structured records, which we call 'rows of data'. If every row is of type T, then we have a homogenous dataset of type List[T].

Certain list methods are agnostic to the fields and methods of T objects, and make up the common core of data science and generative art. They are useful because of operations, algorithms, and views specific to T, all of which can be passed in as arguments.

#### Filters, (List[T], T -> Bool) -> List[T]

Focusing on certain rows to the exclusion of others, usually by user selection.

#### Maps, (List[T], T -> F[T]) -> List[F[T]]

Transforming all rows in the same way.

#### Reductions, (List[T], (F[T], T) -> F[T], F[T]) -> F[T]

Summation, or any other kind of cumulative operation over rows in a dataset. This is the first kind of list method we have considered that does not itself return a list.

#### Sampling, List[T] -> T

Focusing on one row to the exclusion of all others, usually by arbitrary choice. Basic method in procedural generation.

#### Clustering, List[T] -> List[F[T]]

Diverse family of methods that augment rows with information about their relationship to other rows.

Typical in dimensionality reduction algorithms, and in covariance analyses generally.

#### Expressive Range Analysis, List[T] -> F[T]

Special case of sampling from a dataset augmented with relational information. Useful for interactive browsing.

#### Example-Driven Synthesis (T -> List[T])



---

Where 'integer' is a primitive type, i.e. it is stored directly in the data structure instance in memory. (All variable-length data structures require the use of *pointers*, whose lifecycle is typically managed by a programming language's compiler or interpreter.)