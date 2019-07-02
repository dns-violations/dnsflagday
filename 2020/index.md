---
title: 2020
lang: en-US
redirect_from:
  - /
  - /en/
  - /ru/
  - /pt-br/
  - /de/
  - /cs/
  - /2020/en/
  - /2020/ru/
  - /2020/pt-br/
  - /2020/de/
  - /2020/cs/
flagdayyear: 2020
---

{% include 2020_languages.html %}

<img class="logo float-right" alt="DNS flag day logo" src="/images/DNS_Flag.svg">

Thank you!
==========

The [2019 DNS flag day](/2019/) was a very successful event. The Internet
community worked together and fixed problems which were causing delays and
other problems for Internet users worldwide. We would like to thank all
operators who cooperated and helped to make Internet a better place.

Summary of the past and future DNS flag days can be found e.g. in
[https://youtu.be/mH_elg9EUWw?t=649](https://youtu.be/mH_elg9EUWw?t=649).

Contents
========
- [What's next?](#whats-next)
- [DNS Flag Day 2020](#dns-flag-day-2020)
  - [Note: Work in progress](#note-work-in-progress)
  - [Action: Authoritative DNS Operators](#action-authoritative-dns-operators)
  - [Action: DNS Resolver Operators](#action-dns-resolver-operators)
  - [Action: DNS software vendors](#action-dns-software-vendors)
  - [How to test?](#how-to-test)
- [Previous flag days](#previous-flag-days)
- [Who's behind DNS flag day?](#whos-behind-dns-flag-day)
- [Get in touch](#get-in-touch)
- [Supporters](#supporters)
- [FAQ](#faq)

What's next?
============

The next DNS flag day is being planned right now. It will focus on the
operational and security problems in DNS caused by Internet Protocol
packet fragmentation.

Please subscribe to [the dns-announce mailing list](https://lists.dns-oarc.net/mailman/listinfo/dns-announce)
or follow [@dnsflagday on Twitter](https://www.twitter.com/dnsflagday)
to receive a notification when more information becomes available.

DNS Flag Day 2020
=================

The DNS community has been discussing persistent interoperability and
performance issues with the DNS system on industry mailing lists and at
conferences such as [DNS-OARC 30](https://www.dns-oarc.net/oarc30) panel
discussion ([video](https://youtu.be/mH_elg9EUWw?t=680),
[slides](https://indico.dns-oarc.net/event/31/contributions/678/attachments/673/1102/dns_flag_day_panel.pdf)).

The proposed plan for the DNS flag day 2020 was announced at
[RIPE78](https://ripe78.ripe.net) by Petr Špaček, CZ.NIC and Ondřej Surý,
ISC ([video](https://ripe78.ripe.net/archives/video/28),
[slides](https://ripe78.ripe.net/presentations/53-plenary.pdf)). This time,
we will focus on the problems with IP fragmentation of DNS packets.

IP fragmentation is a problem on the Internet today, especially when it
comes to large DNS messages. And even if fragmentation works it might not be
secure enough for DNS.
- Bonica R. et al, "[IP Fragmentation Considered Fragile](https://tools.ietf.org/html/draft-bonica-intarea-frag-fragile)", Work in Progress, July 2018
- Huston G., "[IPv6, Large UDP Packets and the DNS](http://www.potaroo.net/ispcol/2017-08/xtn-hdrs.html)",  August 2017
- Fujiwara K., "[Measures against cache poisoning attacks using IP fragmentation in DNS](https://indico.dns-oarc.net/event/31/contributions/692/)", May 2019

These issues can be fixed by honoring an EDNS buffer size that will
not cause fragmentation and by allowing DNS to switch from UDP to TCP when
larger buffer sizes are not enough.

Note: Work in progress
----------------------

This web site and some aspects of DNS flag day 2020 are work in progress.
- The _exact date_ for the 2020 DNS Flag Day is not yet determined.
- **Please note** that the _exact recommended EDNS buffer sizes_ have not
  been agreed upon, the current ballpark around 1200 (1220, 1232, ...) is
  to limit the risk of fragmentation in IPv6.

Nevertheless, the technical requirements are already clear enough that
operators and developers can start preparing by testing and fixing their
systems.

If you have comments or suggestion then please join the discussion at
[dns-operations](https://lists.dns-oarc.net/mailman/listinfo/dns-operations)
mailing list.

Action: Authoritative DNS Operators
-----------------------------------

For the authoritative side what you should do to help with these issues
is to answer DNS queries over TCP (port 53), _check your firewall(s) also!_

You should also use an EDNS buffer size that will not cause fragmentation,
recommended here is around 1220 bytes but it is still up for discussion.

And lastly, _Authoritative DNS servers **MUST NOT** send answers larger
than requested EDNS buffer size!_

**NEW!** You can now check your domain by entering it below and pressing
"Test!". This tester uses [ISC's EDNS Compliance Tester](https://ednscomp.isc.org/)
and will check that it's `edns512tcp` test is successful among other tests
for general compliance.

{% include 2020_checker.html lang=site.data.2020_checker.en %}

Action: DNS Resolver Operators
------------------------------

For the resolver side it's more or less the same requirement as for
the authoritative, answer DNS queries over TCP (port 53) and use an
EDNS buffer size _(~1220 bytes)_ that will not cause
fragmentation. _Remember to check your firewall(s)!_

And for that last important part, _Resolvers **MUST** repeat queries over
TCP if they receive a truncated UDP response (with TC=1 set)!_

**Tester for clients DNS resolver is in development!**

Action: DNS software vendors
----------------------------

As a DNS software vendor it is important to be **standards compliant** and
to use a _**default EDNS buffer size** (~1220)_ that will not cause
fragmentation.

Relevant standards are mainly [RFC 7766](https://tools.ietf.org/html/rfc7766),
[RFC 6891 section 6.2.3.](https://tools.ietf.org/html/rfc6891#section-6.2.3)
and [RFC 6891 section 6.2.4.](https://tools.ietf.org/html/rfc6891#section-6.2.4).

Motivation for the change is described in [IETF draft intarea-frag-fragile section 6.1](https://tools.ietf.org/html/draft-ietf-intarea-frag-fragile-10#section-6.1) and [IETF draft iab-protocol-maintenance](https://datatracker.ietf.org/doc/draft-iab-protocol-maintenance/).

How to test?
------------

If you're a domain owner or an authoritative DNS operator you can use our
web-based testing tool to check a domain, you will find it under
[Action: Authoritative DNS Operators](#action-authoritative-dns-operators).

We are working on a web-based testing tool for clients and DNS resolver
operators and once it's ready you will find it on this page,

You can also test by using the following CLI commands:

```shell
$ dig +tcp @auth_IP yourdomain.example.
$ dig +tcp @resolver_IP yourdomain.example.
$ dig @resolver_IP test.knot-resolver.cz. TXT
```

All DNS queries must be successful and commands with `+tcp` option or
without it should return the same. If you are a service provider you can
also test your authoritative and resolver services by allowing DNS over
TCP and changing the configuration for the default EDNS buffer size:

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

The configuration above will have no visible effect if everything works
correctly, but some queries will fail to resolve if TCP transport is not
available.

Previous flag days
==================

Here is a list of the previous flag days:
- [2019 EDNS workarounds](/2019/)

Who's behind DNS flag day?
==========================

The DNS flag day effort is community driven by DNS software and service
providers, and supported by [The DNS Operations, Analysis, and Research Center (DNS-OARC)](https://www.dns-oarc.net/)
which most in the community are members of.

If you have technical questions around DNS flag day you can join
[the DNS-operations mailing list](https://lists.dns-oarc.net/mailman/listinfo/dns-operations)
and ask them there.

Get in touch
============

For press & media inquiries please use media (at) dns-oarc.net and please put
“DNS Flag Day" in the email subject line.

- Web: <https://dnsflagday.net/>
- Twitter: <https://twitter.com/dnsflagday>
- Announcements: <https://lists.dns-oarc.net/mailman/listinfo/dns-announce>
- Discussion: <https://lists.dns-oarc.net/mailman/listinfo/dns-operations>

Supporters
==========

{% include 2020_supporters.html %}

FAQ
===

- Q: Is DNS over UDP dead?

  A: No, DNS over UDP will still be the main means of transportation as it
     is massively scalable, very resource-efficient and fault-tolerant.

- Q: TL;DR [RFC 7766](https://tools.ietf.org/html/rfc7766)

  A: DNS **MUST** work over TCP!

- Q: Will everything break on date-to-be-decided 2020?

  A: Certainly not everything! Only a small percentage of sites is affected,
     and this number is shrinking as operators work on fixing their systems.
     On the date that will be announced major DNS resolver operators will
     stop tolerating misbehavior which breaks published standards, so this
     change will not affect sites which follows published standards.
     Also, on the announced date software vendors will change behavior
     _**in new software releases**_, so this change will also slowly affect
     others who operate their own DNS resolvers.

- Q: Why is TCP support so important?

  A: Blocking TCP, or failure to support TCP, may result in resolution
     failure and application-level timeouts.

     Furthermore, TCP normally implements Path MTU Discovery and can avoid
     IP fragmentation of TCP segments. It also makes it harder to spoof
     DNS responses.

     Finally, TCP support was recommended from the early standards
     specification, but some implementers may have taken that to mean TCP
     was optional, and so about ten years ago (August 2010)
     [RFC 5966](https://tools.ietf.org/html/rfc5966) made it clear that
     TCP support is absolutely required for compliance with the Internet
     standards for DNS.

- Q: Why not just switch to TCP only?

  A: DNS over UDP is fine for small packets that do not require IP
     fragmentation. It can still be used for that class of DNS messages,
     which is the larger part of the Internet traffic. Switching everything
     over on TCP may cause stress on DNS services. While in principle
     DNS over TCP only should be feasible, it is slower than DNS over UDP,
     in the best case by a factor of 4 (based on Baptiste Jonglez work
     [presented at RIPE76](https://ripe76.ripe.net/archives/video/63/)),
     and it may limit the number of connections a DNS server can accept
     simultaneously.

- Q: Will this Flag Day require a software update?

  A: DNS software which follows published standards does not require upgrade
     and will continue to work. E.g. supported versions of major open source
     DNS servers will continue to work correctly.

     Whether a particular deployment is compliant depends on the way the
     software is configured, and on the firewall configuration used at
     that site. Less commonly-used and custom or proprietary DNS software
     may not be compliant, and may require updates.

- Q: Is the requirement for DNS over TCP actually a DNS standard?

  A: Yes, it is.  The [RFC 1035](https://tools.ietf.org/html/rfc1035)
     Section 4.2 Transport explicitly lists UDP and TCP transports as
     equals.  Furthermore, [RFC 7766](https://tools.ietf.org/html/rfc7766)
     makes the requirement for DNS over TCP mandatory to implement for DNS
     vendors.  While it's at operator's discretion to allow traffic on the
     TCP port 53, the inability to respond over TCP might lead to resolution
     failure in case of DNS answers bigger than EDNS buffer size chose at
     the client side.

- Q: I want to support DNS flag day 2020, what do I do?

  A: Great to hear!  You can add yourself as a supporter by making a
     [pull request](https://github.com/dns-violations/dnsflagday/pulls) and
     add name, image and URL to `_data/2020_supporters.yml`, or make
     an [issue](https://github.com/dns-violations/dnsflagday/issues/new)
     and supply the same information in that.
