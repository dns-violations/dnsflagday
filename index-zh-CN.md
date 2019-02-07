---
title: 2019
lang: zh-CN
redirect_from:
  - /zh-CN/
---

**此翻译正在等待更新，[请参阅英文版以获取最新信息](/en/)。**


发生了什么事？
==================
当前 [DNS](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F) 缓慢的速度是不必要的，并且 DNS 无法部署新功能。为了解决这些问题，[DNS 软件供应商](#支持者)以及大型[公共 DNS 提供商](#支持者)将在2019年2月1日删除某些变通方案。

这一更改仅影响运行不符合已发布标准的软件的网站。您受影响了吗？

域名所有者
=============
请检查您的域名是否受到影响：
{% include checker.html lang=site.data.checker.zh-CN %}

DNS 解析器运营商
======================

在2019年2月1日左右，主要的开源解析器供应商将发布实施更严格的 EDNS 处理的更新。 具体而言，以下版本引入了此更改：

* BIND 9.13.3 (development) 和 9.14.0 (production)
* Knot Resolver 已经在当前版本中实施了更严格的 EDNS 处理
* PowerDNS Recursor 4.2.0
* Unbound 1.9.0

此外，[下面列出的公共 DNS 提供商](#支持者) 将会禁用变通方案。

DNS 服务器运营商
====================
为了使 EDNS 合规，我们建议您利用上面的表单，为整个域生成简化的结果。

也可以直接使用工具 [ednscomp](https://ednscomp.isc.org/ednscomp) 测试 DNS 服务器，该工具会显示详细的技术报告。只需您在 `Zone Name` 字段输入 DNS 服务器上所承载的域名并单击 `Submit` 按钮。

[ednscomp](https://ednscomp.isc.org/ednscomp) 最好的测试总结结果是一条绿色的信息 `一切正常/All Ok`。

允许您的域名在 2019 DNS flag day 后继续运行的最低工作设置是在 [ednscomp](https://ednscomp.isc.org/ednscomp) 工具的测试中，所有普通 DNS 以及 EDNS0 不包含 `超时/timeout` 的测试结果。请注意, 此最低设置仍不符合标准, 迟早会导致其他问题。出于这个原因，**我们强烈建议您完全遵守 EDNS 标准（所有测试都 `正常/ok`）**，而不是仅进行极少的整顿工作，否则您将不得不在以后面临新的问题。

如果出现问题，ednscomp 工具将会显示每个为何失败的测试的说明。这些失败的测试通常是因为：

* 损坏的 DNS 软件
* 损坏的防火墙配置

要解决问题，请将您的 DNS 软件升级到最新的稳定版本，然后再次测试。如果即使在升级了 DNS 之后仍然测试失败，请检查您的防火墙配置。

**防火墙不得丢弃 DNS 数据包**，无论是具有 EDNS 扩展的数据包，还是包含未知扩展的数据包。现代 DNS 软件可能会部署新的扩展（例如 [DNS cookies](https://tools.ietf.org/html/rfc7873)，用以防止 DoS 攻击）。丢弃具有此类扩展的 DNS 数据包的防火墙会使每个人的情况变得更加糟糕，包括恶化的 DoS 攻击以及导致更高的 DNS 流量延迟。

供应商的提示：

* 较早版本的 Juniper SRX 默认会丢弃 EDNS 数据包 —— 解决方法是通过 `# set security alg dns doctoring none` 关闭 DNS doctoring。升级到最新版本以获得 EDNS 支持。
* [Akamai](https://community.akamai.com/customers/s/article/CloudSecurityDNSFlagDayandAkamai20190115151216?language=zh_CN)
* [BlueCat](https://www.bluecatnetworks.com/blog/dns-flag-day-is-coming-and-bluecat-is-ready/)
* [Citrix](https://support.citrix.com/article/CTX241493)
* [efficient iP](http://www.efficientip.com/dns-flag-day-notes/)
* [F5 BIG-IP](https://support.f5.com/csp/article/K07808381?sf206085287=1)
* [Google](https://groups.google.com/d/msg/public-dns-announce/-qaRKDV9InA/CsX-2fJpBAAJ)
* [Infoblox](https://community.infoblox.com/t5/Community-Blog/DNS-Flag-Day/ba-p/15843?es_p=8449211)
* [Microsoft Azure](https://azure.microsoft.com/en-us/updates/azure-dns-flag-day/), [Microsoft DNS](https://support.microsoft.com/en-sg/help/4489468/windows-server-domain-name-system-dns-flag-day-compliance)
* [Pulse Secure](https://kb.pulsesecure.net/articles/Pulse_Secure_Article/KB43996)

DNS 软件开发人员
=======================
主要变化是来自上述供应商的 DNS 软件会将超时解释为网络问题或服务器问题的标志。从2019年2月1日开始，将**不会尝试禁用 EDNS** 作为对 DNS 查询超时的反应。

这实际上意味着**所有对 EDNS 查询完全没有响应**的 DNS 服务器将被视为*死机*。

请使用 [ednscomp](https://ednscomp.isc.org/ednscomp) 工具测试您的实现方式，以确保正确处理 EDNS。该工具的源代码也是[可以获得的](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)。

值得注意的是，EDNS 仍然不是强制性的。如果您决定不支持EDNS，只要您的软件根据 [EDNS 标准第七章节](https://tools.ietf.org/html/rfc6891#section-7) 进行回应即可。

研究人员
===========
研究人员和 TLD 运营商等其他方可能会对此感兴趣：

* 由 [EDNS 合规性测试套件](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)生成的 [EDNS 合规性统计](https://ednscomp.isc.org/) by ISC
* [EDNS 区域扫描仪](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/) by CZ.NIC，旨在评估 DNS flag day 的实际影响

在解释数据之前，请阅读各自的解析方法。无论如何，请不要犹豫，立即使用上面的 GitLab 链接与工具作者联系。

演讲
=============

* DNS-OARC 28: [摘要](https://indico.dns-oarc.net/event/28/contributions/515/), [幻灯片](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [视频](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)
* LOADAYS 2018: [摘要](http://loadays.org/pages/dnsupdate.html), [幻灯片](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [视频](https://www.youtube.com/watch?v=OXbbH0ORmSY)
* RIPE 76: [幻灯片](https://ripe76.ripe.net/presentations/159-edns.pdf), [视频](https://ripe76.ripe.net/archives/video/161)
* DNS-OARC 29: [摘要](https://indico.dns-oarc.net/event/29/contributions/662/), [幻灯片](https://indico.dns-oarc.net/event/29/contributions/662/attachments/634/1063/EDNS_Flag_Day_-_OARC29.pdf)

工具
=====

 * [ISC EDNS 合规性测试器](https://ednscomp.isc.org/)，[源代码](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)
 * [DNSViz](http://dnsviz.net/)

联系
========

 * 请在 GitHub 上的 [dnsflagday repo](https://github.com/dns-violations/dnsflagday/issues) 中提交关于此网站的评论
 * 有关此站点生成的测试结果或由 [ednscomp 测试工具](https://ednscomp.isc.org/ednscomp)直接生成的测试结果的注释属于 ISC GitLab 中的 [DNS 合规性测试](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)项目

支持者
==========
{% include supporters.html %}

扩展阅读
==================
 * [最低的 EDNS 合规性要求](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)
