<div class="translations">
<nav>
	<a href="/cs"><img alt="Česky" src="/flags/cs.svg"/></a>
	<a href="/"><img alt="English" src="/flags/en.svg"/></a>
	<a href="/es"><img alt="Español" src="/flags/es.svg"/></a>
</nav>
</div>

What is happening?
==================
The current DNS suffers from unnecessary delays and an inability to deploy new features. To remediate these problems, vendors of DNS software [BIND (ISC)](https://www.isc.org/blogs/end-to-bandaids/), 
[Knot Resolver (CZ.NIC)](https://en.blog.nic.cz/2018/03/14/together-for-better-stability-speed-and-further-extensibility-of-the-dns-ecosystem/), [PowerDNS](https://blog.powerdns.com/2018/03/22/removing-edns-workarounds/), and [Unbound (NLnet Labs)](https://www.nlnetlabs.nl/news/2018/Jun/07/putting-an-end-to-workarounds-for-broken-software/) are going to remove certain workarounds on February 1st, 2019.

This change affects only sites which operate broken software. Are you affected?

Domain owners
=============
Please check if your domain is affected:
<div id="domain-checker">
	<form action="https://ednscomp.isc.org/ednscomp" method="GET" target="_blank">
		<fieldset>
			<legend>Test your domain</legend>
			<label for="zone">Domain name (without www):
				<input type="text" name="zone" id="zone" required>
			</label>
			<input type="submit" value="Test!">
			<noscript>Your browser does not support JavaScript! Technical report will be shown in a new window.<br>
The result of the <a href="https://ednscomp.isc.org/ednscomp">ednscomp</a> test must be a green message "All Ok". If you get any other result your DNS deployment is going to be affected by this change and your domain might be become inaccessible. In that case please contact your DNS administrator and request fixes!
			</noscript>
		</fieldset>
	</form>
</div>
<script><!-- translate the form above and these constants, please keep the whitespaces! -->
const domainCheckerInit = {
	placeIntoElement: document.getElementById( "domain-checker" ),
	texts: {
		formTitle: 'Test your domain',
		labelText: 'Domain name (without www): ',
		submitText: 'Test!',
		reportOkHtml: ': <span style="color: green;">All Ok!</span>',
		reportFailHtml: ': <span style="color: red;">This domain has one or more problems!</span> If the problem persists contact your DNS administrator and refer him to https://dnsflagday.net/ and',
		reportLinkText: ' technical report ',  // text before URL to report
	},
	status: {
		loading: 'Testing in progress, please wait… It might take several tens of seconds.',
		done: 'Testing completed:',
		errorApi: 'Communication error! API unavailable… please try again later',
		errorInput: 'Invalid input! IDN is not supported yet.',
	},
};
</script>
<script src="/domain-checker.js"></script>
<br>

DNS administrators
==================
It is possible to test your DNS servers using the tool [ednscomp](https://ednscomp.isc.org/ednscomp). Simply enter the name of a zone hosted on your DNS servers into the `zone name` field and click the `Submit` button.

The summary result of [ednscomp](https://ednscomp.isc.org/ednscomp) tests must be a green message `All Ok`.

If there is a problem, the ednscomp tool displays an explanation for each failed test. Failures in these tests are typically caused by:
* broken DNS software
* broken firewall configuration

To remediate problems please upgrade your DNS software to the latest stable versions and test again. If the tests are still failing even after a DNS upgrade please check your firewall configuration.

**Firewalls must not drop DNS packets** with EDNS extensions, including unknown extensions. Modern DNS software may deploy new extensions (e.g. [DNS cookies](https://tools.ietf.org/html/rfc7873) to protect from DoS attacks). Firewalls which drop DNS packets with such extensions are making the situation worse for everyone, including worsening DoS attacks and inducing higher latency for DNS traffic.

DNS software developers
=======================
The main change is that DNS software from vendors named above will interpret timeouts as sign of a network or server problem. Starting February 1st, 2019 there will be **no attempt to disable EDNS** as reaction to a DNS query timeout.

This effectivelly means that all DNS servers which **do not respond at all to EDNS queries** are going to be treated as *dead*.

Please test your implementations using the [ednscomp](https://ednscomp.isc.org/ednscomp) tool to make sure that you handle EDNS properly. Source code of the tool [is available](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) as well.

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

Supporters
==========

[![PowerDNS](/images/powerdns.png)](https://www.powerdns.com/)

[![ISC](/images/isc.png)](https://www.isc.org/)

[![NLnet Labs](/images/nlnetlabs.svg)](https://nlnetlabs.nl/)

[![CZ.NIC](/images/cznic.png)](https://www.nic.cz/)

[![Quad9](/images/quad9.png)](https://quad9.net/)

[![CleanBrowsing](https://cleanbrowsing.org/images/CleanBrowsing-logo-small-dark.png)](https://cleanbrowsing.org/)

Additional reading
==================
 * [Minimal EDNS compliance requirements](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)
