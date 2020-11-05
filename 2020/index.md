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

<img class="logo float-right" alt="DNS Flag Day logo" src="/images/DNS_Flag.svg">

Contents
========
- [What's next?](#whats-next)
- [DNS Flag Day 2020](#dns-flag-day-2020)
  - [Action: Authoritative DNS Operators](#action-authoritative-dns-operators)
  - [Action: DNS Resolver Operators](#action-dns-resolver-operators)
  - [Action: DNS software vendors](#action-dns-software-vendors)
  - [How to test?](#how-to-test)
- [Who's behind DNS Flag Day?](#whos-behind-dns-flag-day)
- [Get in touch](#get-in-touch)
- [Supporters](#supporters)
- [FAQ](#faq)
- [Previous DNS Flag Days](#previous-dns-flag-days)

What's next?
============

The next DNS Flag Day is scheduled for 2020-10-01. It focuses on the
operational and security problems in DNS caused by Internet Protocol
packet fragmentation.

On this page you can find comprehensive description of the problem,
technical changes planned for 2020-10-01, and ways to test your systems
before the set date.

You can also subscribe to
[the dns-announce mailing list](https://lists.dns-oarc.net/mailman/listinfo/dns-announce)
or follow [@dnsflagday on Twitter](https://www.twitter.com/dnsflagday)
to receive a notification about significant changes.

The exact date
==============

**2020-10-01** (October 1st 2020)

DNS Flag Day 2020
=================

The DNS community has been discussing persistent interoperability and
performance issues with the DNS system on industry mailing lists and at
conferences such as [DNS-OARC 30](https://www.dns-oarc.net/oarc30) panel
discussion ([video](https://youtu.be/mH_elg9EUWw?t=680),
[slides](https://indico.dns-oarc.net/event/31/contributions/678/attachments/673/1102/dns_flag_day_panel.pdf)).

The proposed plan for DNS Flag Day 2020 was announced in October 2019 at
[RIPE78](https://ripe78.ripe.net) by Petr Špaček, CZ.NIC and Ondřej Surý,
ISC ([video](https://ripe78.ripe.net/archives/video/28),
[slides](https://ripe78.ripe.net/presentations/53-plenary.pdf)). This
year, we are focusing on problems with IP fragmentation of DNS packets.

IP fragmentation is unreliable on the Internet today, and can cause
transmission failures when large DNS messages are sent via UDP. Even
when fragmentation does work, it may not be secure; it is theoretically
possible to spoof *parts* of a fragmented DNS message, without easy
detection at the receiving end.
- Bonica R. et al, "[IP Fragmentation Considered Fragile](https://tools.ietf.org/html/draft-bonica-intarea-frag-fragile)", Work in Progress, July 2018
- Huston G., "[IPv6, Large UDP Packets and the DNS](https://www.potaroo.net/ispcol/2017-08/xtn-hdrs.html)", August 2017
- Fujiwara K., "[Measures against cache poisoning attacks using IP fragmentation in DNS](https://indico.dns-oarc.net/event/31/contributions/692/)", May 2019
- Fujiwara K. et al, "[Avoid IP fragmentation in DNS](https://tools.ietf.org/html/draft-fujiwara-dnsop-avoid-fragmentation)", September 2019

Recently, there was an paper and presentation [Defragmenting DNS - Determining
the optimal maximum UDP response size for DNS
](https://indico.dns-oarc.net/event/36/contributions/776/) by Axel Koolhaas, and
Tjeerd Slokker in collaboration with NLnet Labs that explored the real world data
using the RIPE Atlas probes and the researchers suggested different values for
IPv4 and IPv6 and in different scenarios.  This is practical for the server
operators that know their environment, and the defaults in the DNS software
should reflect the minimum safe size which is **1232**.

These issues can be addressed by a) configuring servers to limit DNS
messages sent over UDP to a size that will not trigger fragmentation on
typical network links, and b) ensuring that DNS servers can switch from
UDP to TCP when a DNS response is too big to fit in this limited buffer
size.

Message Size Considerations
---------------------------

The optimum DNS message size to avoid IP fragmentation while minimizaing
the use of TCP will depend on the Maximum Transmission Unit (MTU) of the
physical network links connecting two network endpoints.  Unfortunately,
there is not yet a standard mechanism for DNS server implementors to access
this information.  Until such a standard exists, we recommend that the EDNS
buffer size should, by _default_, be set to a value small enough to avoid
fragmentation on the majority of network links in use today.

An EDNS buffer size of 1232 bytes will avoid fragmentation on nearly all current
networks. This is based on an MTU of 1280, which is required by the IPv6
specification, minus 48 bytes for the IPv6 and UDP headers and the
aforementioned research.

Note that this recomendation is for a _default_ value, to be used when
better information is not available.  Operators may still configure larger
values if their networks support larger data frames and they are certain
there is no risk of IP fragmentation.  DNS server vendors may use higher
(or lower) packet sizes if better information about the MTU is available
from the kernel.

Action: Authoritative DNS Operators
-----------------------------------

If you are an authoritative DNS server operator, what you should do to help
with these issues is ensure that your DNS servers can answer DNS queries
over TCP (port 53). _Check your firewall(s) as well,_ as some of them block
TCP/53.

You should also configure your servers to negotiate an EDNS buffer size
that will not cause fragmentation. The value recommended here is
1232 bytes.

_Authoritative DNS servers **MUST NOT** send answers larger than the
requested EDNS buffer size!_

You can now check your servers by entering your domain name below and
pressing "Test!".  This tester uses
[ISC's EDNS Compliance Tester](https://ednscomp.isc.org/) and will
check that its `edns512tcp` test is successful, among other tests for
general standards compliance.

{% include 2020_checker.html lang=site.data.2020_checker.en %}

Action: DNS Resolver Operators
------------------------------

Requrirements on the resolver side are more or less the same as for
authoritative: ensure that your servers can answer DNS queries over TCP
(port 53), and configure an EDNS buffer size of 1232 bytes to avoid
fragmentation. Remember to check your firewall(s) for problems with
DNS over TCP!

Most importantly: _Resolvers **MUST** resend queries over TCP if they
receive a truncated UDP response (with TC=1 set)!_

**NEW!** This checker will test your browser, system and ISP's resolver by
loading an image on a specific URL that can only be looked up if there is
support for TCP at the last resolver querying the authority. For more
information, go to [Check My DNS](https://cmdns.dev.dns-oarc.net) which
this checker uses.

{% include 2020_cli_checker.html lang=site.data.2020_checker.en %}

Action: DNS Software Vendors
----------------------------

It is important for DNS software vendors to **comply with DNS standards**,
and to use a default EDNS buffer size (1232 bytes) that will not cause
fragmentation on typical network links.

Relevant standards include [RFC 7766](https://tools.ietf.org/html/rfc7766),
[RFC 6891 section 6.2.3.](https://tools.ietf.org/html/rfc6891#section-6.2.3)
and
[RFC 6891 section 6.2.4.](https://tools.ietf.org/html/rfc6891#section-6.2.4).

The motivation for this effort is described in
[IETF draft intarea-frag-fragile section 6.1](https://tools.ietf.org/html/draft-ietf-intarea-frag-fragile-10#section-6.1)
and [IETF draft iab-protocol-maintenance](https://datatracker.ietf.org/doc/draft-iab-protocol-maintenance/).

How to test?
------------

If you're the owner of a domain or the operator of an authoritative DNS
server, you can use our web-based testing tool to check your domains; you
can find it above under
[Action: Authoritative DNS Operators](#action-authoritative-dns-operators).

Our web-based testing tool for clients and DNS resolver operators can be
found above under
[Action: DNS Resolver Operators](#action-dns-resolver-operators).

You can also test by using the following CLI commands:

```shell
$ dig +tcp @auth_IP yourdomain.example.
$ dig +tcp @resolver_IP yourdomain.example.
$ dig @resolver_IP test.knot-resolver.cz. TXT
```

All DNS queries must be successful, and commands should return the same
results both with and without the `+tcp` option.

If you are a service provider, you can test your authoritative and
recursive DNS services by configuring the default EDNS buffer size:

- BIND
```
options {
    edns-udp-size 1232;
    max-udp-size 1232;
};
```

- Knot DNS
```
server:
    max-udp-payload: 1232
```

- Knot Resolver
```
net.bufsize(1232)
```

- PowerDNS Authoritative
```
udp-truncation-threshold=1232
```

- PowerDNS Recursor
```
edns-outgoing-bufsize=1232
udp-truncation-threshold=1232
```

- Unbound
```
server:
    edns-buffer-size: 1232
```

- NSD
```
server:
    ipv4-edns-size: 1232
    ipv6-edns-size: 1232
```

The configuration above will have no visible effect if everything works
correctly. Some queries will fail to resolve if the TCP transport is not
available.

Who's behind DNS Flag Day?
==========================

The DNS Flag Day effort is community driven by DNS software and service
providers, and supported by [The DNS Operations, Analysis, and Research Center (DNS-OARC)](https://www.dns-oarc.net/)
which most in the community are members of.

If you have technical questions about DNS Flag Day, you can join
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

- Q: TL;DR [RFC 7766](https://tools.ietf.org/html/rfc7766)

  A: DNS **MUST** work over TCP!

- Q: Is DNS over UDP dead?

  A: No, DNS over UDP will still be the primary mode of transmission, as it
     is massively scalable, very resource-efficient, and fault-tolerant.

- Q: Will everything break on 2020-10-01?

  A: No! Latest measurements shown that only
     a [tiny percentage](https://github.com/dns-violations/dnsflagday/issues/139#issuecomment-673489183)
     of sites will be affected.  On the
     flag day software vendors will change their default
     behavior in new software releases so that the default message size
     used over UDP will be 1232 bytes.  As these new releases are
     deployed, sites that return DNS responses larger than 1232 bytes,
     but which cannot answer DNS queries via TCP, may fail to resolve.
     Note that these sites are already unreliable today.

- Q: Why is TCP support so important?

  A: Blocking TCP, or failure to support TCP, may result in resolution
     failure and application-level timeouts.

     Furthermore, TCP normally implements Path MTU Discovery and can avoid
     IP fragmentation of TCP segments. It also makes it harder to spoof
     DNS responses.

     TCP support was recommended in the earliest DNS standard
     specifications. Some implementers may have taken that to mean TCP
     was optional, and so in August 2010
     [RFC 5966](https://tools.ietf.org/html/rfc5966) made it clear that TCP
     support is absolutely required for compliance with the Internet
     standards for DNS.

- Q: Why not just switch to TCP only?

  A: DNS over UDP is fine for small packets that do not require IP
     fragmentation. It can still be used for that class of DNS messages,
     which is the majority of DNS traffic. Switching everything
     over to TCP may cause stress on DNS services. While in principle
     DNS over TCP only should be feasible, it is slower than DNS over UDP
     by at least a factor of 4 (based on Baptiste Jonglez work
     [presented at RIPE76](https://ripe76.ripe.net/archives/video/63/)),
     and it may limit the number of connections a DNS server can accept
     simultaneously.

- Q: What if we want to use bigger packet sizes in the future?

  A: Our goal is simply to avoid IP fragmentation by choosing a _default_
     EDNS buffer size that will work well on typical networks today. This
     is not a permanent change to any DNS specification.  Default values
     can always be overridden locally if better information is avaialble.
     If a standard method for retrieving MTU data from the kernel becomes
     available, that can be used as well.

- Q: Will DNS Flag Day 2020 require a software update?

  A: In most cases, no. DNS software which follows published standards does
     not require upgrade and will continue to work. All supported versions
     of major open source DNS servers work correctly now and will continue
     to do so. They can all be configured to use the recommended EDNS
     buffer sizes, even if they have not yet been updated to use those
     sizes by default.

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

- Q: I want to support DNS Flag Day 2020, what do I do?

  A: Great to hear!  You can add yourself as a supporter by making a
     [pull request](https://github.com/dns-violations/dnsflagday/pulls) and
     add name, image and URL to `_data/2020_supporters.yml`, or make
     an [issue](https://github.com/dns-violations/dnsflagday/issues/new)
     and supply the same information in that.

Previous DNS Flag Days
======================

Here is a list of the previous DNS Flag Days:
- [2019 EDNS workarounds](/2019/)

The [2019 DNS Flag Day](/2019/) was a very successful event. The Internet
community worked together and fixed problems which were causing delays and
other problems for Internet users worldwide. We would like to thank all
operators who cooperated and helped to make Internet a better place.

Summary of the past and future DNS Flag Days can be found e.g. in
[https://youtu.be/mH_elg9EUWw?t=649](https://youtu.be/mH_elg9EUWw?t=649).
