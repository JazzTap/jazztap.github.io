---
title: Software Instruments - The Medium and its Data Flow
author: Jasmine Otto
---

## Software Expression

I have discussed how the *affordances* of *interfaces* participate in the perception-action loop that underlies human use of toys, tools, and instruments from the perspective of *enactivist cognition*.

In the case of *software interfaces*, any interface produced by a programmer depends on the affordances available to that programmer. Thanks to the object-oriented programming paradigm, it is possible to study the *software meta-medium* by drawing on the *methods* acting on *data structures* that comprise individual *application programming interfaces* (*APIs*). 

Given one of these interactive softwares (i.e. a software interface, which is an instance of a certain software medium), it is useful to characterize its capacity to perceive user actions and knowledge (through its representations of inputs and data), and to act on objects in the world (through its representations of artifacts and outputs).

I will read Timothy Binkley on creative coding to compare and contrast the 'ways of knowing' possessed by a computer-human co-creative system, with those of say, a paper-human co-creative system. (Since there is no way to remove human creative influences from data ontologies, we need only consider co-creative systems.)

For instance, Binkley cites cases of creative practitioners developing novel software interfaces and software mediums to explore new spaces of representations and artifacts. Binkley describes the software representations which those practitioners manipulate simply as numbers and their arrangements. Since the '80s, more sophisticated characterizations have been developed for software representations, i.e. data structures and *strongly typed methods* of operating on them.

How do interface affordances arise from the program's internal *data structures* and 'data flow'? I will here describe, using type theory, a few distinct families of typed methods - from the perspective of exploring and manipulating (collections of) artifacts.

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

#### Operations (T -> T)

Methods with algebraic properties.

#### Pipelines (List[T] -> List[T])

#### Augmentation Algorithms (T -> F[T])

#### Views and Representations (F[T] -> T)

#### Dimensionality Reduction (List[F[T]] -> List[T])

#### Expressive Range Analyses (List[T] -> T)

#### Example-Driven Synthesis (T -> List[T])


---

Where 'integer' is a primitive type, i.e. it is stored directly in the data structure instance in memory. (All variable-length data structures require the use of *pointers*, whose lifecycle is typically managed by a programming language's compiler or interpreter.)