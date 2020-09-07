---
date: 3-8-2019
title: Notes - Parameter Analysis
---

Incomplete and opinionated thoughts on a writeup of Danesh, an analysis plugin for Unity. Originally for the Seminar in Generative Methods, Fall 2019.

[Michael Cook, Simon Colton, Jeremy Gow, and Gillian Smith. *General Analytical Techniques For Parameter-Based Procedural Content Generators.* IEEE CoG 2019.](https://ieee-cog.org/2019/papers/paper_84.pdf)

# Cook et al. 2019
An implementation of parameter smoothness and codependence analysis.

## Motivation
* **I. Introduction**  
  Bridge the gulf of execution by analysis of inputs.

* **IIB. Related Work**  
  Summary of expressive range analysis, as a complementary approach.

* **IIIA. Problem Scenario**  
  Problem statement: codependent parameters are common in cellular automata, an exemplar of procedural generation methods.

* **IV. Measuring Change**  
  Summary of sample distribution as centroid and stddev (in 1 output metric with 2 parameters).

* **V. Smoothness**  
  The effect of a single parameter on a single metric. With all other parameters fixed, the subject parameter is partitioned into 10% intervals. For the resulting 11 parameterizations, the generator is sampled a few hundred times, measured using the metric, and results averaged.

  Ideally, the resulting curve is monotonic. It quantifies the impact of the parameter, but only along one line in parameter space. It does not quantify meaningfulness - that part of understanding is still a design prerequisite.

* **VI. Codependence**  
  Which quantifies 'impact' along a plane in parameter space.  the effect of a parameter on the smoothness of another, i.e. sweeping the smoothness curve of one parameter along the other parameter.

  We can envision quantification in multiple output metrics simultaneously, by producing vectors at each point of the sample grid rather than scalars.

  (In the case of multisampling, this vector contains the average value of each metric, but not variance. We could equip the correlation matrix though, given a decent visual representation. But ideally, our generator won't have a lot of nontrivial structure at most sample points?)

## Outcomes

* **VIIB. Parameter smoothing in Danesh**  
  Find a good mapping from [0,1] to [out_min, out_max], relative to current parameterization (!).

* **VIIC. Codependence highlighting in Danesh**
  Annotate the change in expressive range of each parameter q when parameter p is swept. This requires turning a comparison between two slices into a highlight color (1 or 2 dimensions of info).

* **VIII. Future Work**  
  Generalization to I) segmented monotonic parameterization, and II) multiple simultaneous output metrics.

* **IX. Conclusions**  
  Expressive tools as means of standardizing on theory. "A robust set of general analytical techniques..."

  It strikes me as unusual for a medium to encode its own theory, except in cases of creative software, e.g. GIMP and color theory. But Danesh is a Unity plugin; what form would it take in p5.js (building on dat.gui), or Jupyter Widgets (as a lerping toolbox)?
