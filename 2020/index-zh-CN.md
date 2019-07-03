---
title: 2020
lang: zh-CN
redirect_from:
  - /zh-CN/
  - /2020/zh-CN/
flagdayyear: 2020
---

{% include 2020_languages.html %}

<img class="logo float-right" alt="DNS flag day logo" src="/images/DNS_Flag.svg">

感谢！
==========

2019年DNS Flag Day是一个非常成功的活动。互联网社区共同努力解决了一系列带给全球互联网用户
延迟和其他故障的问题。我们要感谢所有合作的运营者，是他们帮助互联网变得更好。

DNS Flag Day过去的总结和未来计划请参考： https://youtu.be/mH_elg9EUWw?t=649.

目录
========
- [下一步的计划？](#下一步的计划)
- [DNS Flag Day 2020](#dns-flag-day-2020)
  - [注: 在开展的工作](#注-在开展的工作)
  - [行动: 权威DNS运营者](#行动-权威DNS运营者)
  - [行动: 递归DNS运营者](#行动-递归DNS运营者)
  - [行动: DNS软件供应商](#行动-DNS软件供应商)
  - [如何测试?](#如何测试)
- [以前的 flag days](#以前的-flag-days)
- [谁在推动 DNS flag day?](#谁在推动-dns-flag-day)
- [联系我们](#联系我们)
- [支持者](#支持者)
- [常见问题](#常见问题)

下一步的计划？
============

下一步的DNS flag day的计划正在制定中. 它将聚焦由IP报文分片导致的DNS的运营和安全的问题。

为了获得及时的信息推送，请订阅 [dns-announce邮件列表](https://lists.dns-oarc.net/mailman/listinfo/dns-announce)
或者关注 [Twitter账号 @dnsflagday](https://www.twitter.com/dnsflagday)


DNS Flag Day 2020
=================

DNS社群一直在行业邮件列表和会议中讨论DNS持续的互操作性与系统性能问题，例如
[DNS-OARC 30](https://www.dns-oarc.net/oarc30)， 专题讨论会 ([video](https://youtu.be/mH_elg9EUWw?t=680),
[slides](https://indico.dns-oarc.net/event/31/contributions/678/attachments/673/1102/dns_flag_day_panel.pdf)).

2020 DNS Flag Day计划建议稿在[RIPE78](https://ripe78.ripe.net) 会议期间由 CZ.NIC的Petr Špaček, 和ISC的Ondřej Surý发布
([video](https://ripe78.ripe.net/archives/video/28)，[slides](https://ripe78.ripe.net/presentations/53-plenary.pdf)).
这一次我们要聚焦在DNS报文的IP分片问题上。

IP分片是一个当前互联网存在的问题，尤其是当DNS应答消息比较大的时候。 即使IP分片工作正常，它对DNS来说也可能不够安全。

请参考：
- Bonica R. et al, "[IP Fragmentation Considered Fragile](https://tools.ietf.org/html/draft-bonica-intarea-frag-fragile)", Work in Progress, July 2018
- Huston G., "[IPv6, Large UDP Packets and the DNS](http://www.potaroo.net/ispcol/2017-08/xtn-hdrs.html)",  August 2017
- Fujiwara K., "[Measures against cache poisoning attacks using IP fragmentation in DNS](https://indico.dns-oarc.net/event/31/contributions/692/)", May 2019

这些问题的解决方法是通过设置一个固定的EDNS buffer size (缓冲区大小)，使其不会导致IP层分片。
当有DNS大包超过这个缓冲区大小的时候，DNS将会从UDP模式切换到TCP传输（通过设置应答包的TC位）


注: 在开展的工作
----------------------

这个网站和2020 DNS Flag Day的一些工作还在开展中（尚未确定）。
- 2020 DNS Flag Day 的准确时间还没有确定
- **请注意** 推荐的EDNS 缓冲区大小的精确值还没有确定，现在它的大致范围是 1200字节（1220, 1232, ...）。 这个取值主要目的是为了减少IPv6分片风险。

然而，技术需求已经足够清晰，运营者和开发者可以开始准备测试和改动他们的系统。

如果你对此有评论或建议，请参加[dns-operations](https://lists.dns-oarc.net/mailman/listinfo/dns-operations) 邮件列表的讨论.

行动: 权威DNS运营者
-----------------------------------

对于权威侧来说，需要你帮助做的是应答DNS over TCP的查询（53端口）。同时检查你的防火墙！

你也应该使用一个固定的EDNS 缓冲区大小，那样就不会造成分片。这里建议采用大概1220字节，但是这个取值仍然在讨论中。

最后，权威DNS服务器**不可以**发送超过查询报文中请求的EDNS 缓冲区大小的报文!

**新闻！** 现在你可以测试检查你的域名了！通过在下面输入你的域名，然后按Test! 这个测试使用了[ISC的EDNS合规性测试器](https://ednscomp.isc.org/)，它会从所有通用合规性测试例中选择`edns512tcp` 来测试。

{% include 2020_checker.html lang=site.data.2020_checker.cn %}

行动: 递归DNS运营者
------------------------------

对递归解析测来说，或多或少与权威的要求类似，即能够通过TCP(53端口)应答DNS查询，用固定的EDNS 缓冲区大小 (大概1220字节)从而避免IP分片。记得要检查你的防火墙。

最重要的是，递归解析服务器**必须**要通过TCP重复查询，如果他们收到一个被截断的UDP应答报文（TC被设置为1）！

**对递归解析服务器的测试器还在开发中！**


行动: DNS软件供应商
----------------------------

对DNS软件供应商重要的一点就是要**符合标准**，采用 **EDNS 缓冲区大小默认值** （~ 1220字节），这样就不会造成分片。

相关重要的标准主要是[RFC 7766](https://tools.ietf.org/html/rfc7766),
[RFC 6891 section 6.2.3.](https://tools.ietf.org/html/rfc6891#section-6.2.3)
和 [RFC 6891 section 6.2.4.](https://tools.ietf.org/html/rfc6891#section-6.2.4).

这一改动的动机记录在[IETF草案 intarea-frag-fragile section 6.1](https://tools.ietf.org/html/draft-ietf-intarea-frag-fragile-10#section-6.1) 和 [IETF草案 iab-protocol-maintenance](https://datatracker.ietf.org/doc/draft-iab-protocol-maintenance/).

如何测试？
------------

如果你是一个域名的所有者，或者是权威DNS服务器运营者，你可以用我们基于网页的测试工具来检查一个域名，你可以在[“行动: 权威DNS运营者”](#行动-权威DNS运营者) 中找到。

我也在开发针对客户端和DNS递归运营者的一套基于网页的测试工具。一旦准备好，你就可以在这个页面找到它。

你也可以通过下面的CLI命令行来测试：

```shell
$ dig +tcp @auth_IP yourdomain.example.
$ dig +tcp @resolver_IP yourdomain.example.
$ dig @resolver_IP test.knot-resolver.cz. TXT
```
无论是否使用‘+tcp’选项,所有的DNS查询必须是成功的。如果你是一项业务的提供商，你也可以通过允许DNS支持TCP，以及改变下面默认的EDNS 缓冲区大小的配置来测试你的权威和递归服务。

- BIND
```
options {
    edns-udp-size 1220;
    max-udp-size 1220;
};
```

- Knot DNS
```
server:
    max-udp-payload: 1220
```

- Knot Resolver
```
net.bufsize(1220)
```

- PowerDNS Authoritative
```
udp-truncation-threshold=1220
```

- PowerDNS Recursor
```
edns-outgoing-bufsize=1220
udp-truncation-threshold=1220
```

- Unbound
```
server:
    edns-buffer-size: 1220
```

- NSD
```
server:
    ipv4-edns-size: 1220
    ipv6-edns-size: 1220
```

如果一切工作正常（支持TCP），以上的配置不会有明显的影响。如果递归或者权威不支持TCP，一些查询就会失败。

以前的 flag days
==================

下面是以前的Flag day活动列表：
- [2019 EDNS workarounds](/2019/)

谁在推动 DNS flag day?
==========================

DNS Flag Day的倡议活动由DNS软件和服务提供者社群发起，该活动也得到了[DNS-OARC](https://www.dns-oarc.net/)的支持（OARC的会员大部分都在这个社群内）。

如果你有围绕DNS Flag Day相关的技术的问题，你可以参与[DNS-operations邮件列表](https://lists.dns-oarc.net/mailman/listinfo/dns-operations)来向他们提问.

联系我们
============

新闻与媒体的问题请发信给 media (at) dns-oarc.net, 请将“DNS Flag Day” 填入邮件的主题栏。 注：邮箱(at)替换成@

- Web: <https://dnsflagday.net/>
- Twitter: <https://twitter.com/dnsflagday>
- Announcements: <https://lists.dns-oarc.net/mailman/listinfo/dns-announce>
- Discussion: <https://lists.dns-oarc.net/mailman/listinfo/dns-operations>

支持者
==========

{% include 2020_supporters.html %}

常见问题
======

- Q: 是不是DNS over UDP要消失绝迹了?

  A: 不，UDP 将仍然是主要的DNS传输协议, 因为它大规模的可扩展性，很高资源效率和容错特性。

- Q: 能一句话解释[RFC 7766](https://tools.ietf.org/html/rfc7766)么？

  A: DNS**必须**能在TCP上工作!

- Q: 在2020即将发布的那一天，所有的通信都会出故障么？

  A: 当然不是所有！只有少量的站点会受影响，而且这个数量会逐步减少当运营者开始修补他们的系统。
     在即将发布的那一天，主要的DNS递归解析运营者将停止接受错误的、违反标准的行为，所以这个
     改变不会影响那些符合标准的站点。另外，在发布的那一天软件供应商只在新版DNS软件中改变行为，
     所以这个改变只会逐渐的影响到那些运营自己DNS递归解析服务的人。（翻译解释：新版DNS软件的推广和应用
     需要一段时间，作为缓冲）

- Q: 为什么支持TCP（对DNS）这么重要？

  A: 阻断TCP通信或者不能支持TCP可能会造成解析失效和应用层的超时。

     另外TCP通常实现了路径MTU检测，能够避免TCP分段在IP层分片。采用TCP也能够增加DNS应答欺骗的难度。

     最后一点，早期的DNS标准中是建议“支持TCP”，但是一些软件开发人员当作TCP是可选项，所以大概10年之后
     （2010年8月）[RFC 5966](https://tools.ietf.org/html/rfc5966)明确要求为了符合DNS的Internet标准，
     TCP支持是绝对必要的。


- Q: 为什么不直接切换到纯TCP（放弃UDP）?

  A: DNS通过UDP传输特别适合小数据包，而且不需要IP分片，因此这类DNS数据包仍然会
     采用UDP的传输，而且它们将占据大部分互联网DNS流量。切换所有的DNS流量到TCP
     会给DNS服务带来压力。虽然原则上采用TCP的DNS是可行的，但它比采用UDP的DNS慢4倍
     （根据一项Baptiste Jonglez的工作，[发表在RIPE76会议](https://ripe76.ripe.net/archives/video/63/)），因此他会限制DNS服务器能接受的并发连接的数量。


- Q: 将来Flag Day是否需要一个软件更新?

  A: 符合标准的DNS软件不需要软件升级，能够继续正常工作。比如，支持主要的开源软件的
     DNS服务器将会工作的很好

     特定部署是否兼容取决于软件的配置方式，以及该站点使用的防火墙配置。不太常用的定制
     或专有DNS软件可能不兼容，可能需要更新。


- Q: DNS对TCP传输的要求是DNS标准么？

  A: 是的，是标准的要求。[RFC 1035](https://tools.ietf.org/html/rfc1035)的4.2节
     明确列出了UDP和TCP传输是同等要求的。此外 [RFC 7766](https://tools.ietf.org/html/rfc7766)
     强制要求DNS软件提供商支持DNS TCP. 虽然是否允许TCP 53端口流量是由网络运营者决定的，
     但是如果当DNS应答数据包大于客户端选择的EDNS 缓冲区大小，无法通过TCP响应可能导致DNS
     解析失败。（翻译注:这种情况权威服务器将设置TC，要求Resolver用TCP重新发起请求）

- Q: 我想要支持2020 DNS Flag Day，我应该怎么做?

  A: 太好了！你可以把自己添加到支持者列表中。请生成过一个[合并请求](https://github.com/dns-violations/dnsflagday/pulls),
     增加你的名字，图标，和URL到 `_data/2020_supporters.yml`,
     或者通过添加一个[问题描述](https://github.com/dns-violations/dnsflagday/issues/new) 提供这些信息。
