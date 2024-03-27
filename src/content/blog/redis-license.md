---
title: "从Redis更换license说起谈谈开源盈利"
description: "Lorem ipsum dolor sit amet"
pubDate: "2024-03-25"
updatedDate: "2024-03-26"
---

就在几天前，[Redis宣布从7.4版本开始，开源 license 将会从从 BSD 更换为 RSALv2 和 SSPLv1](https://redis.com/blog/redis-adopts-dual-source-available-licensing/)。这不是 Redis[^1] 第一次更换第一次更换许可证了，早在2018年，Redis 就将调整了其部分模块的 license 。
如果你经常浏览开源项目的新闻的话，知名的开源项目MongoDB和ElasticSearch也先后更换过许可证。

## 变化是什么？

对于我们普通的开发者来说，似乎没有任何变化。我们依然可以免费使用redis，以及查看redis的源码。对于redis的第三方库，也不会有任何变化。

实际上，这次变化真正影响的是云服务厂商。在过去，云服务厂商可以随意的提供redis服务以及修改源码的redis服务，这与redis的商业模式产生了竞争。对于云服务厂商来说，现在必须购买redis的商业许可证才可以提供redis服务。

很明显，redis这次变动和之前mongodb以及es一样，就是针对云服务商的。在我看来，云服务商提供开源基础项目并收取**附加费用**，而不反馈给社区的行为就是在吸血。
以AWS的
Amazon ElastiCache
为例

cache.m7g.large	2	6.38 GiB	高达 12.5GB	USD 0.158

m7g.large	USD 0.0816	2	8GiB	仅限 EBS	高达 12500Mb

可以看到价格几乎翻倍。那么多出来的这部分钱redis能拿到多少呢，一分钱都拿不到。不仅如此，aws会宣称自己做的比redis更好，然而aws却并不会把自己更好的技术回馈给开源社区，这不就是白嫖么？那么aws会给redis捐助么，看起来也没有。也难怪redis会选择更改许可证。


## 开源or免费？

redhat

## 付费探索

## 云服务商吸血

[^1]: 本文中的redis有时候是指redis这个开源产品，有时候指代 Redis Ltd. 这家公司。请读者根据上下文自行理解。