This is repository for the EDNS Workaround removal flag day!

What is happening?
==================
Current DNS system suffers from unnecessary delays and inability to deploy new features. To remediate this problem, vendors of DNS software [BIND (ISC)](https://www.isc.org/blogs/end-to-bandaids/), 
[Knot Resolver (CZ.NIC)](https://en.blog.nic.cz/2018/03/14/together-for-better-stability-speed-and-further-extensibility-of-the-dns-ecosystem/), [PowerDNS](https://blog.powerdns.com/2018/03/22/removing-edns-workarounds/), and Unbound (NLnet Labs) are going to remove certain workarounds on February 1st, 2019.

This change affects only sites which operate broken software. Are you affected?

Domain owners
=============
Domain owners can check if their domain is affected by this change using tool [ednscomp](https://ednscomp.isc.org/ednscomp). Simply enter name of your domain into `zone name` field and click `Submit` button.

The result of [ednscomp](https://ednscomp.isc.org/ednscomp) test must be green message `All Ok`. If you get any other result your DNS deployment is going to be affected by this change and your domain might be become inaccessible. In that case please contact your DNS administrator and request fixes!

DNS administrators
==================
It is possible to test your DNS servers using tool [ednscomp](https://ednscomp.isc.org/ednscomp). Simply enter name of a zone hosted on your DNS servers into `zone name` field and click `Submit` button.

Summary result of [ednscomp](https://ednscomp.isc.org/ednscomp) tests must be green message `All Ok`.

If there is a problem, the ednscomp tool display explanation for each failed test. Failures in these tests are typically caused by:
* broken DNS software
* broken firewall configuration

To remediate problems please upgrade your DNS software to latest stable versions and test again. If the tests are still failing even after DNS upgrade please check your firewall configuration.

**Firewalls must not drop DNS packets** with EDNS extension, including extensions unknown at the moment. Modern DNS software deploys new extensions, e.g. [DNS cookies](https://tools.ietf.org/html/rfc7873) to protect from DoS attacks. Firewalls which drop DNS packets with such extensions are making situation worse for everyone, including worsening DoS attacks and inducing higher latency for DNS traffic.

DNS software developers
=======================
Main change is that DNS software of vendors named above is going to interpret timeouts as sign of network/server problem. Starting from February 1st, 2019 there will be **no attempt to disable EDNS** as reaction to DNS query timeout.

This effectivelly means that all DNS servers which **do not respond at all to EDNS queries** are going to be treated as *dead*.

Please test your implementations using [ednscomp](https://ednscomp.isc.org/ednscomp) tool to make sure that you handle EDNS properly. Source code of the tool [is available](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) as well.

It is important to note that EDNS is still not mandatory. If you decide not to support EDNS it is okay as long as your software replies according to [EDNS standard section 7](https://tools.ietf.org/html/rfc6891#section-7).


Presentations
=============

 * DNS-OARC 28: [abstract](https://indico.dns-oarc.net/event/28/contributions/515/), [slides](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [video](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)
 * LOADAYS 2018: [abstract](http://loadays.org/pages/dnsupdate.html), [slides](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)
 * RIPE 76: [slides](https://ripe76.ripe.net/presentations/159-edns.pdf), [video](https://ripe76.ripe.net/archives/video/161)

Tools
=====

 * [ISC EDNS Compliance tester](https://ednscomp.isc.org/), [source code](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)
 * [DNSViz](http://dnsviz.net/)

Background
==========
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)
