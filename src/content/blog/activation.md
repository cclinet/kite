---
title: "几个常见激活函数的导数"
description: "几个常见激活函数的导数"
pubDate: "2024-04-17"
updatedDate: "2024-04-17"
draft: true
---

## sigmoid

$$
Sigmoid(x) = \sigma(x) = \frac{1}{1+e^{-x}}
$$

导数

$$
\begin{aligned}
\sigma^{'}(x) &= -\frac{1}{(1+e^{-x})^2}*(-e^{-x}) \\
              &= \frac{1}{1+e^{-x}}*\frac{e^{-x}}{1+e^{-x}} \\
              &= \frac{1}{1+e^{-x}}*(1-\frac{1}{1+e^{-x}}) \\
              &= \sigma(x)*(1-\sigma(x))
\end{aligned}
$$

## relu

$$
ReLU(x) = (x)^ += max(0,x)
$$

导数

$$


$$
