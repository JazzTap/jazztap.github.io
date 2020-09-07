---
date: 3-8-2019
title: Notes - Solution Set Search
---

Incomplete and opinionated thoughts on a survey of solution set search. Originally for the Seminar in Generative Methods, Fall 2019.

[Daniele Gravina, Ahmed Khalifa, Antonios Liapis, Julian Togelius, Georgios N. Yannakakis. *Procedural Content Generation through Quality Diversity.* IEEE CoG 2019.](https://arxiv.org/pdf/1907.04053.pdf)

# Gravina et al. 2019

A survey of solution set search with local competition and/or novelty incentives.

## Motivation

* **I. Introduction**  
  How can we get many high-quality solutions out of large search spaces? How do these algorithms explain themselves human designers?

* **II. Quality-Diversity Approaches**

	* **IIA. Divergence Components**  
  	We can define 'novelty' as a distance in behavior space (not genotypic space!). We define 'surprise' similarly, but using a prediction of the future population.  
  	Or, we can partition behavior space into a 'feature map' of cells (with zero or one occupants each, i.e. a population bottleneck), in order to control its granularity.

    * **IIB. Quality Components**  
  Neighboring behaviors can compete directly on fitness. Or, a boolean condition (e.g. 'level can be completed') can separate feasible / infeasible populations, whose treatment depends on the algorithm.

    * **IIC. [Search] Algorithms**  
  	  * 1-3. Local competition in an archive divided into cells.
  	  
* * * 4-5. Feasible-Infeasible Two-Population (fi-2pop). Infeasible population provides "stepping stones toward multiple high-quality solutions"

(Use constrained novely search [14] to motivate reading of the Yuan plot, a visualization of the archive [?] in fi-2pop [21]?)

 * * * 6., Hybrid approach, each cell contains feasible and infeasible populations.
 * * * 7-8.  Local competition, but the archive contains the most novel past solutions. Individuals maximize novelty while trying to outcompete their k nearest neighbors.

### Surprise search

[9] D. Gravina, A. Liapis, and G. Yannakakis. *Surprise search: Beyond objectives and novelty*. Genetic and Evolutionary Computation Conference 2016.

Each generation, the initial configuration of the k centroids [in behavior space] is the centroids obtained in the previous generation. Then a k-means algorithm is applied to cheaply obtain the new centroids.

Distance to the nearest centroid is 'novelty'. To obtain 'surprise', centroids are linearly interpolated forward based on the past two generations, and the distance to those is rewarded.

## Outcomes

* **IIIB. Quality Components**  
  High-quality fitness functions can be overexploiting, but they need only act locally. Novelty (or surprise) suffices to promote exploration (and has domain-agnostic definitions?), a claim based on the authors' prior work.

* **Table I. Cases of PCG through Quality Diversity**  
  A map of the research on solution set optimization for game content. Note that MAP-Elites and FI-2Pop seem to explain strong correlation in the literature between P/LC (partitioning / local-competition), and D/C (clustering/feasibility).

* **V. Open Problems and Outlook**  
  Behavior characterization - the feasible locus in behavior space is multidimensional, but not every direction is interesting. What granularity should it be partitioned at?

  Can we discover 'motifs' using PCGML, i.e. dimension reduction on genotype space?
  
(Can motifs be characterized by those slight perturbations with disproportionate responses, adapting the lens of [parameter space analysis per Cook et al.](./parameter-analysis-notes.html)?)

* When the sampling is successful, what can we say about the 'feasible region of' behavior space? What about in domains such as rulesets, adaptive music, cooperative agents?

	* Many projects at ICCC '20 in each of these domains!