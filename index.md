---
title: 2019
lang: en-US
---


What is happening?
==================
The current [DNS](https://en.wikipedia.org/wiki/Domain_Name_System) is unnecessarily slow and inefficient because of efforts to accommodate a few DNS systems that are not in compliance with DNS standards established more than a decade ago. 

To ensure further sustainability of the system it is time to end these accommodations and remediate the non-compliant systems. This change will make most DNS operations slightly more efficient, and also allow operators to deploy new functionality, including new mechanisms to protect against DDoS attacks. [DDoS] attack.

DNS software and service providers listed on this site have agreed to coordinate removing accommodations for non-compliant DNS implementations from their software or services, on or around **February 1st 2019**.
This change will affect only sites operating software which does not comply to the main DNS standard, ([RFC1035]) or the newer standards for Extensions to DNS [EDNS], ([RFC2671], [RFC6891]).  These sites are either using outdated or unmaintained DNS software, or have excessively restrictive firewall settings that block important DNS signals.

For more information select the group you belong to:

- [I'm an Internet user, without my own domain](#users)
- [I'm a domain holder](#domain-holders)
- [I'm a DNS administrator](#dns-admins)
- [I'm a DNS expert (DNS software developer, research, etc.)](#experts)


[vendors of DNS software](#supporters) and also big [public DNS providers](#supporters) are going to remove certain workarounds on February 1st, 2019.

This change affects only sites which operate software which is not following published standards. Are you affected?

<a name="users"></a>

I'm an Internet user
=================
There is no reason to worry if you are an Internet user without your own domain name. This change is affecting you only indirectly and you do not need to take any other steps. Thank you for your interest in [DNS]!


<a name="domain-holders"></a>

I'm a domain holder
=================
If you are a domain holder, please use the form below to check if your domain is ready for the planned change. It is only necessary to validate one zone if you have multiple zones on the same server or cluster of servers. Your test result will include advice on any further steps that may be necessary.

{% include checker.html lang=site.data.checker.en %}


<a name="dns-admins"></a>

I'm a DNS administrator
=====================
The impact of the scheduled change to the client side of DNS is described in the section [for DNS resolver operators](#resolver-ops). A small percentage of authoritative servers might require changes [described below](#auth-ops). Further down we list [technical details of tests](#test-details) and [tools for experts](#experts).

<a name="resolver-ops"></a>

DNS resolver operators
----------------------
On or around Feb 1st, 2019, major open source resolver vendors will release updates that will stop accommodating non-standard responses. This change will affect authoritative servers which do not comply either with the original DNS standard from 1987 ([RFC1035]) or the newer [EDNS] standards from 1999 ([RFC2671] and [RFC6891]).  Incompatible sites may become unreachable through updated resolvers. Major [public DNS resolver operators listed below](#supporters) are also removing accommodations.

The [web form above](#domain-holders) diagnostic tool may be helpful while investigating problems with a particular domain. Domains which repeatedly fail the test above have problems with either their DNS software or their firewall configuration.

The following versions of DNS resolvers will not accommodate [EDNS] non-compliant responses:

* BIND 9.13.3 (development) and 9.14.0 (production)
* Knot Resolver has already implemented stricter EDNS handling in all current versions
* PowerDNS Recursor 4.2.0
* Unbound 1.9.0


<a name="auth-ops"></a>

DNS server operators
--------------------
After February 1st 2019 major [public DNS resolver operators listed below](#supporters) will disable work arounds for standards non-compliance. This change will affect domains hosted on authoritative servers which do not comply either with original DNS standard from 1987 ([RFC1035]) or the newer [EDNS] standards from 1999 ([RFC2671] and [RFC6891]). Non-compliant domains may become unreachable through these services.

We advise you to take the following preparatory steps to avoid operational problems:
1. Test your authoritative servers using [test form above](#domain-holders). It is sufficient to test a single DNS zone hosted on a particular set of authoritative servers. (If any single zone on the server passes the test, that is sufficient, because the test is not dependant on the content of the zone.)
1. Random network instability can affect test results. Part of the problem is in interpreting timeouts, which can be caused by unresponsive DNS software, a firewall blocking the response, or packet loss on the Internet. If a problem is reported please retry the test.
1. If the tested domain fails the test, please update your DNS software to the latest stable version and repeat the test. If the tests are failing even after the DNS software update please check your firewall configuration.
1. **Firewalls must not drop DNS packets** with [EDNS] extensions, including unknown extensions which follow the standards. Relevant information from vendors can be found here:
  * [Akamai](https://community.akamai.com/customers/s/article/CloudSecurityDNSFlagDayandAkamai20190115151216?language=en_US)
  * [BlueCat](https://www.bluecatnetworks.com/blog/dns-flag-day-is-coming-and-bluecat-is-ready/)
  * [F5 BIG-IP](https://support.f5.com/csp/article/K07808381?sf206085287=1)
  * Older versions of the Juniper SRX will drop EDNS packets by default. The workaround is to disable DNS doctoring via `# set security alg dns doctoring none`. Upgrade to latest versions for EDNS support.

If the problem persists after DNS software and firewall updates please contact your firewall vendor and request fixes.


<a name="test-details"></a>

Test details
------------
The [test form above](#domain-holders) uses [ednscomp](https://ednscomp.isc.org/ednscomp) for individual technical tests, and these partial results are summarized into an aggregate result by the web application.

This hosted tool is a low-capacity service for ad-hoc checks only.  Do not attempt to automate queries.  Excessive use will be rate-limited or blocked.  If you need to send bulk queries, you must download and build the tools to run your own test instance - see https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing and https://gitlab.labs.nic.cz/knot/edns-zone-scanner/.

It is also possible to test your DNS servers directly using the tool [ednscomp](https://ednscomp.isc.org/ednscomp) which displays a more detailed technical report. Simply enter the name of a zone hosted on your DNS servers into the `zone name` field and click the `Submit` button. 

Your domain name may include "www", e.g. "www.domainname.com"; or it may not, e.g. "domainname.com".  If you are not sure, we suggest that you test both.  Names that are not DNS zones will report that this was the most likely reason for
the test failure; this is not a cause for concern.

The summary result of [ednscomp](https://ednscomp.isc.org/ednscomp) tests should ideally be a green message `All Ok`.

The minimal working setup which will allow your domain to survive 2019 DNS flag day must not have a `timeout` result in any of the plain DNS and EDNS version 0 tests implemented in the [ednscomp](https://ednscomp.isc.org/ednscomp) tool. FAilures of the EDNS(1) tests, for example, will not cause any immediate problem. Please note that this minimal compliance is still not full compliance and will cause other issues sooner or later. For this reason **we strongly recommend you to work towards full EDNS compliance (all tests `ok`)** instead of doing just the minimum.

If there is a problem, the ednscomp tool displays an explanation for each failed test. Failures in these tests are typically caused by:

* broken DNS software
* broken firewall configuration

**Firewalls must not drop DNS packets** with EDNS extensions, including unknown extensions. Modern DNS software may deploy new extensions (e.g. [DNS cookies](https://tools.ietf.org/html/rfc7873) to protect from DoS attacks). Firewalls which drop DNS packets with such extensions are making the situation worse for everyone, including worsening DoS attacks and inducing higher latency for DNS traffic.


<a name="experts"></a>

I'm a DNS expert
==============

DNS software developers
-----------------------
The main change is that DNS software from vendors named above will interpret timeouts as sign of a network or server problem. Starting February 1st, 2019 there will be **no attempt to disable EDNS** in reaction to a DNS query timeout.

This effectively means that all DNS servers which **do not respond at all to EDNS queries** are going to be treated as *dead*.

Please test your implementations using the [ednscomp](https://ednscomp.isc.org/ednscomp) tool to make sure that you handle EDNS properly. Source code for the tool [is available](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) as well.

It is important to note that EDNS is still not mandatory. If you decide not to support EDNS it is okay as long as your software replies according to [EDNS standard section 7](https://tools.ietf.org/html/rfc6891#section-7).

In other words, software which correctly implements the original DNS standard [RFC1035] from 1987 does not require any changes. Only non-compliant software has to be fixed.

Researchers
-----------
Researchers and other parties such as TLD operators might be interested in:

* [EDNS compliance statistics](https://ednscomp.isc.org/) generated by [EDNS compliance test suite](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) by ISC
* [EDNS zone scanner](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/) by CZ.NIC which aims to evaluate real-world impact of the DNS flag day

Please read the respective methodologies before interpreting the data. In any case, do not hesitate to reach out to tool authors using links above.

Presentations
=============

General audience
----------------
* RIPE 77: Will your DNS break in 2019? [slides](https://ripe77.ripe.net/presentations/7-flagday.pdf), [video](https://ripe77.ripe.net/archives/video/2233/)
* LOADAYS 2018: Is Your DNS Server Up-To-Date [abstract](http://loadays.org/pages/dnsupdate.html), [slides](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)
* UKNOF 2019: DNS Flag Day and Beyond [presentation](https://indico.uknof.org.uk/event/44/contributions/580/)

Technical
---------
* DNS-OARC 29: A tale of five ccTLDs [abstract](https://indico.dns-oarc.net/event/29/contributions/662/), [slides](https://indico.dns-oarc.net/event/29/contributions/662/attachments/634/1063/EDNS_Flag_Day_-_OARC29.pdf), [video](https://youtu.be/rneu1lnJmUI?list=PLCAxS3rufJ1cOBd1D4K4QJFmLcSypixh3&t=2010)
* DNS-OARC 29: Estimating impact of the (E)DNS flag day [abstract](https://indico.dns-oarc.net/event/29/contributions/644/), [slides](https://indico.dns-oarc.net/event/29/contributions/644/attachments/632/1018/edns.pdf), [video](https://youtu.be/rneu1lnJmUI?list=PLCAxS3rufJ1cOBd1D4K4QJFmLcSypixh3&t=3001)
* DNS-OARC 28: First announcement [abstract](https://indico.dns-oarc.net/event/28/contributions/515/), [slides](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [video](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)

Tools
=====

 * [ISC EDNS Compliance tester](https://ednscomp.isc.org/), [source code](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)
 * [EDNS zone scanner](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/) for mass scanning and evaluation of real-world impact of the DNS flag day
 * [DNSViz](http://dnsviz.net/)
 * [Testing EDNS Compatibility with dig](https://kb.isc.org/docs/edns-compatibility-dig-queries)

Contacts
========

 * Please file comments regarding this web in [dnsflagday repo](https://github.com/dns-violations/dnsflagday/issues) on GitHub
 * Comments regarding test results generated by this web or directly by [ednscomp test tool](https://ednscomp.isc.org/ednscomp) belong to [DNS Compliance Testing](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) project in ISC GitLab

Supporters
==========
{% include supporters.html %}

Additional reading
==================
 * [Minimal EDNS compliance requirements](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)

[DDoS]: https://en.wikipedia.org/wiki/Denial-of-service_attack#Distributed_DoS_attack
[DNS]: https://en.wikipedia.org/wiki/Domain_Name_System
[RFC1035]: https://tools.ietf.org/html/rfc1035
[EDNS]: https://en.wikipedia.org/wiki/Extension_mechanisms_for_DNS
[RFC2671]: https://tools.ietf.org/html/rfc2671
[RFC6891]: https://tools.ietf.org/html/rfc6891
