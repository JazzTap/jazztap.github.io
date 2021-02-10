---
title: Software Instruments - Research Debt
excerpt: "A community of practice has research debt when its students and researchers know they need to learn some topic X, but the avalable exposition on topic X is very dense..."
author: Jasmine Otto
---

## What is research debt? Who has it?

A community of practice has research debt when its students and researchers know they need to learn some topic X, but the avalable exposition on topic X is very dense and requires a few years to digest [cite].

This becomes a problem when people keep re-inventing knowledge about topic X, but using a different terminology that is less inscrutable to them, usually one that is specialized to their use case.


## What instruments do they use?

Interactive articles are unreasonably effective at cutting through research debt. They are both demonstration, and instructions for a computer to reproduce that demonstration. They are more portable than other forms of software, because they can run in a browser or in a computational notebook environment.

Many computational notebooks are not articles themselves, but distributed alongside papers, providing a reproducible computational component. It is better to share notebooks than to share scripts because a notebook can encapsulate more of its own environment configuration, and is therefore more likely to run on someone else's computer. Some scripts (and other scientific softwares) are distributed in Docker containers for this reason.

It is typical to share both software and libraries through a package-management system, such as Python's pip, Javascript's npm, or Scala's sbt (to name a few). Because scientific software written in Python often has non-Python dependencies (such as the Math Kernel Library, or other C++ and Fortran code), the Anaconda distribution of Python has a specialized package manager that can handle such dependencies.

This is one of the complex software ecologies that makes it possible to share software instruments (including interactive articles) between computers via the internet. The development of HTML5 is another such story. Two decades ago, most portable software depended on Java (in the scientific use case) or Flash (in the explorables use case), neither of which runs in browsers anymore.


## Do instruments always reduce research debt?

Addressing research debt isn't just a question of software distribution, however.

In her Plea for Slow Science, an example given by Stengers is that of chemistry as an academic discipline. When its curriculum was first developed, 'chemistry' could encompass a myriad of applied traditions that each took decades to master. It was impractical to teach these all in a four-year degree program. One chemist designed an accelerated curriculum that addressed the needs of industrial chemistry, and only its needs. As this sector was wildly profitable at the time, it would hire all their students immediately. Thus, chemistry became an academic monoculture, despite (and because of) its rich heritage from alchemy and womens' crafts. This is one way to avoid research debt, by not addressing it.

Stengers' lecture describes this as a 'cut' placed between chemical crafts and academic/industrial chemistry, and its consequences as an detachment of the science of chemistry from public life. She warns us of a situation where scientific protections are extended to industrial work, so that scientists who ask difficult questions are stopped from pursuing them. Industrial chemistry (i.e. at scale, using materials that may or may not be toxic) can only predominate a science which deliberately ignores situations that are contingent or complicated.

This should remind us presently of computer science and programming for tech companies, which are distinct disciplines, despite occupying the same degree program [cite]. When Allison Parrish makes a similar plea, "Toward a new hacker ethic", she identifies that all models and data about the world are made from 'cuts', i.e. choosing which parts of the world to forget, so that the rest may be understood.

It is always necessary to distinguish between forms of superstition and of long-honed intuition, and between historical contingency and actual differences in needs, to make a cut that yields data whose shape is good.


## Which instruments reduce research debt?

Programming skill alone is simply insufficient to make a software instrument. The shape of its data must be amenable to representation, and there must be a set of actions defined on data of that shape which are sensible. In other words, domain expertise is required.

For instance, an avatar creator instrument such as Create-A-Sim must implement actions in a 'face space' of all faces that Sims can have. But it is more sensible to 'place the eyes' or to 'tweak their shape' than to (e.g.) change the position of one vertex comprising part of the eyelid. Our first case study will consider face spaces and Create-A-Sim in greater depth.

In the case of a scientific instrument, most actions are typical of data science, such as 'filter for events matching this condition' or 'show me a timeline of the remaining events'. However, as an example, nonlinear dynamical systems are a kind of model requiring more specialized actions. These systems consist of a 'set of rate equations', which describe the change in a state vector over time. Every combination of parameters and initial conditions may produce a very different traces (i.e. sequences of states taken on by the system).

For instance, one may 'draw a phase portrait', which is the plot of one trace of the system. 'Performing a parameter sweep' means to step one (or more) parameters by a fixed amount several times, yielding several conditions. The traces produced by the system in each condition are plotted together (usually in layers). To 'draw a bifurcation diagram' is similar, except instead of the trace, the steady-state solutions of the system (i.e. a description of the phase space) are plotted together (usually along an axis). These 'higher abstraction' visualizations help us to understand the effect of the parameters and their co-dependence with each other, or with certain conditions of the system [cite].

Bret Victor's interactive articles about dynamical systems visualization not only describe and demonstrate these operations, but they also articulate a vehement criticism of the research debt that has piled up in the terminology of nonlinear dynamical systems. I have just now described some simple tasks in this area of research using a volley of complicated terms.

(It beyond the scope of this document to consider games with 'simulation' or 'idle game' mechanics as research instruments themselves. Consider Dwarf Fortress, Crusader Kings III, or Universal Paperclips. In these cases, the artifact is a simulated life-world, and the research debt lies in an ontology of that life-world that may be shared by only one person. See Kreminski on narrative instruments, and Ryan on simulated life-worlds.)


## Are instruments self-documenting? How does a community of practice remember?

Interactive articles and video games are both generally meant to be widely accessible, functioning as casual creator support tools [cite]. Other software instruments are not only expected to take years to learn, but they may not even be usable without expert instruction.

For instance, it is unreasonable to expect to learn how to play a guitar without ever receiving instruction from a guitar player. At the same time, many expert guitar players are largely self-taught, because they are highly motivated to play with the instrument, and have discovered many features of its expressive range in that time.

In the course of their practice, a guitar player has presumably also discovered many more action sequences that produce noise than produce songs. Where a beginner's action space may include verbs like 'press down this string at that fret' and 'ready my pick above this string', an expert will have encapsulated the action sequences they have executed on hundreds of times, resulting in verbs like 'strum this chord' and 'arpeggiate this scale'.


## What is an API?

Programming languages are software instruments that programmers can use to create software. In practice, it is script libraries (like NumPy and matplotlib) and game engines (like the HTML5 document object model) that are the instruments used to create software instruments.

A script library always consists of methods - certain action sequences that have been encapsulated as their own verbs, - and objects, which are the data shapes those action sequences expect to operate on.