---
title: 2019
lang: en-US
---

What is happening?
==================
The current [DNS](https://en.wikipedia.org/wiki/Domain_Name_System) is unnecessarily slow and has technical difficulties because of non-compliance with standards. To ensure further sustainability of the system it is necessary to remediate non-compliance problems. This change will also allow to deploy new functionality, e.g. new mechanisms to protect from [DDoS] attack.

As a step to remediate problems, support for non-compliant DNS implementations is scheduled to end after **February 1st 2019**. This change will affect only sites operating software which does not comply neither to DNS standards from 1987 ([RFC1035]) or newer standard [EDNS] from 1999 ([RFC2671], [RFC6891]).

For more information select a group you belong to:

- [I'm Internet user, without own domain](#users)
- [I'm domain holder](#domain-holders)
- [I'm DNS administrator](#dns-admins)
- [I'm DNS expert (DNS software developer, research, etc.)](#experts)


[vendors of DNS software](#supporters) and also big [public DNS providers](#supporters) are going to remove certain workarounds on February 1st, 2019.

This change affects only sites which operate software which is not following published standards. Are you affected?

<a name="users"></a>

I'm Internet user
=================
There is no reason to worry if you are an Internet user without own domain name. This change is affecting you only indirectly and you do not need to take any other steps. Thank you for your interest in [DNS]!


<a name="domain-holders"></a>

I'm domain holder
=================
In case you are a domain holder, please use the form below to check if your domain is ready for the planned change. Test result will advice you what further steps are necessary (if any).

{% include checker.html lang=site.data.checker.en %}


<a name="dns-admins"></a>

I'm DNS administrator
=====================
Impact of the scheduled change to client side of DNS is described in chapter [for DNS resolver operators](#resolver-ops). A small percentage of authoritative servers might require changes [described below](#auth-ops). Further down we list [technical details of tests](#test-details) and [tools for experts](#experts).

<a name="resolver-ops"></a>

DNS resolver operators
----------------------
On or around Feb 1st, 2019, major open source resolver vendors will release updates that will stop working around standards non-compliance. This change will affect autoritative servers which do not comply either with original DNS standard from 1987 ([RFC1035]) or newer [EDNS] standard from 1999 ([RFC2671], [RFC6891]) and render them unreachanble. At the same time this change will be deployed by major [public DNS resolver operators listed below](#supporters), so this change will affect significant portion of Internet users even before software update.

As a result domains hosted on non-compliant authoritative servers will be unreachable. We advice you to use [web form above](#domain-holders) as diagnostic tool while investigating problems with a particular domain. Domain which repeatedly fail the test above has problems on the authoritative side and fixes must be deployed on the authoritative side.

Following versions of DNS resolvers will not work around [EDNS] standard non-compliance:

* BIND 9.13.3 (development) and 9.14.0 (production)
* Knot Resolver already implemented stricter EDNS handling in all current versions
* PowerDNS Recursor 4.2.0
* Unbound 1.9.0


<a name="auth-ops"></a>

DNS server operators
--------------------
After February 1st 2019 major [public DNS resolver operators listed below](#supporters) will disable work arounds for standards non-compliance. This change will affect domains hosted on autoritative servers which do not comply either with original DNS standard from 1987 ([RFC1035]) or newer [EDNS] standard from 1999 ([RFC2671], [RFC6891]) and render them unreachanble.

We advise you to take following preparatory steps to avoid operational problems:
1. Test your authoritative servers using [test form above](#domain-holders). It is sufficient to test arbitrary DNS zone hosted on particular set of authoritative servers. (Tested server properties are normally not dependent on zone content so it is sufficient to cover all your authoritative servers insted of all zones hosted on them.)
1. Random network instability can affect test results. In case a problem is detected please retry the test.
1. In case tests are failing, please update your DNS software to latest stable version and repeat the test. If tests are failing even after DNS software update please check your firewall configuration.
1. **Firewalls must not drop DNS packets** with [EDNS] extensions, including unknown extensions which follow the standards. Relevant information from vendors can be found here:
  * [Akamai](https://community.akamai.com/customers/s/article/CloudSecurityDNSFlagDayandAkamai20190115151216?language=en_US)
  * [BlueCat](https://www.bluecatnetworks.com/blog/dns-flag-day-is-coming-and-bluecat-is-ready/)
  * [F5 BIG-IP](https://support.f5.com/csp/article/K07808381?sf206085287=1)
  * Older versions of Juniper SRX will drop EDNS packets by default. Workaround is to disable DNS doctoring via `# set security alg dns doctoring none`. Upgrade to latest versions for EDNS support.

If the problem persists after DNS software and firewall update please contact firewall vendor and request fixes.


<a name="test-details"></a>

Test details
------------
The [test form above](#domain-holders) uses [ednscomp](https://ednscomp.isc.org/ednscomp) for individual technical tests, and these partial results are summarized into agregate result by the web application.

It is also possible to test your DNS servers directly using the tool [ednscomp](https://ednscomp.isc.org/ednscomp) which displays detailed technical report. Simply enter the name of a zone hosted on your DNS servers into the `zone name` field and click the `Submit` button.

The summary result of [ednscomp](https://ednscomp.isc.org/ednscomp) tests should preferably be a green message `All Ok`.

Minimal working setup which will allow your domain to survive 2019 DNS flag day must not have `timeout` result in any of plain DNS and EDNS version 0 tests implemented in [ednscomp](https://ednscomp.isc.org/ednscomp) tool. Please note that this minimal setup is still not standards compliant and will cause other issues sooner or later. For this reason **we strongly recommend you to get full EDNS compliance (all tests `ok`)** instead of doing just minimal cleanup otherwise you will have to face new issues later on.

If there is a problem, the ednscomp tool displays an explanation for each failed test. Failures in these tests are typically caused by:

* broken DNS software
* broken firewall configuration

**Firewalls must not drop DNS packets** with EDNS extensions, including unknown extensions. Modern DNS software may deploy new extensions (e.g. [DNS cookies](https://tools.ietf.org/html/rfc7873) to protect from DoS attacks). Firewalls which drop DNS packets with such extensions are making the situation worse for everyone, including worsening DoS attacks and inducing higher latency for DNS traffic.


<a name="experts"></a>

I'm DNS expert
==============

DNS software developers
-----------------------
The main change is that DNS software from vendors named above will interpret timeouts as sign of a network or server problem. Starting February 1st, 2019 there will be **no attempt to disable EDNS** as reaction to a DNS query timeout.

This effectively means that all DNS servers which **do not respond at all to EDNS queries** are going to be treated as *dead*.

Please test your implementations using the [ednscomp](https://ednscomp.isc.org/ednscomp) tool to make sure that you handle EDNS properly. Source code of the tool [is available](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) as well.

It is important to note that EDNS is still not mandatory. If you decide not to support EDNS it is okay as long as your software replies according to [EDNS standard section 7](https://tools.ietf.org/html/rfc6891#section-7).

In other words, software which correctly implements the original DNS standard [RFC1035] from 1987 does not require any changes. Only non-compliant software has to be fixed.

Researchers
-----------
Researchers and other parties like TLD operators might be interested in:

* [EDNS compliance statistics](https://ednscomp.isc.org/) generated by [EDNS compliance test suite](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) by ISC
* [EDNS zone scanner](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/) by CZ.NIC which aims to evaluate real-world impact of the DNS flag day

Please read respective methodologies before interpreting the data. In any case, do not hesitate to reach out to tool authors using links above.

Presentations
=============

General audience
----------------
* RIPE 77: Will your DNS break in 2019? [slides](https://ripe77.ripe.net/presentations/7-flagday.pdf), [video](https://ripe77.ripe.net/archives/video/2233/)
* LOADAYS 2018: Is Your DNS Server Up-To-Date [abstract](http://loadays.org/pages/dnsupdate.html), [slides](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)

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
