---
title: Software Instruments - The Medium and its Data Flow
author: Jasmine Otto
hidden: true
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

\* ...where 'integer' is a primitive type, i.e. it is stored directly in the data structure instance in memory. All variable-length data structures require the use of *pointers*, whose lifecycle is typically managed by a programming language's compiler or interpreter.

## Articulatory Distance

revisiting Engelbart, we find the distinction between

* 'artifacts', which are always physical objects
* language, which comprises representations of these artifacts
* methodology, which organizes problem-solving activities
* training, by which a person brings the above to bear

and discover that as of the early '60s, the plurality of languages in contemporary data science (and other software arts) had not fully appeared.

to restate it, Engelbart is glossing over *translation problems*.

> But let the human specify to the instrument his particular conceptual need of the moment, relative to this internal image. Without disrupting its own internal reference structure in the slightest, the computer will effectively stretch, bend, fold, extract, and cut as it may need in order to assemble an internal substructure that is its response, structured in its own internal way.

we find sixty years hence (amid an explosion of interest in NLP-based AI) that the more capability and data our computers possess, the more programming-literacy we need in people to transform those capacities into knowledge and effective action.

### the gulf of execution

although natural language is 'general purpose' for people, it is the programmer's job to change a 'general purpose' programming language such as C++ or Python into a 'domain-specific' set of tools.

in fact, 'domain-specific languages' appear in software engineering and especially videogame development. [what is a domain-specific language?]

[how are videogames a good example of interactive software?]

https://freecontent.manning.com/the-what-and-why-of-domain-specific-lanugages/
https://www.gamasutra.com/view/feature/130077/the_whimsy_of_domainspecific_.php

### the gulf of evaluation

compare Engelbart's techno-optimism to that of Hutchins et al. in '85, speaking to a community of *interface language designers*.

> If one is talking about sound patterns in the input interface language, the output could be the sounds themselves. The computer has  the  potential to  exploit articulatory  similarities  through technological innovation in the varieties of dimensions upon which it can op- erate.

