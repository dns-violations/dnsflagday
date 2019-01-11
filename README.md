<img class="logo" alt="DNS flag day logo" src="/images/DNS_Flag.svg">

<div class="translations">
<nav>
	<a href="/cs"><img alt="Česky" src="/flags/cs.svg"/></a>
	<a href="/"><img alt="English" src="/flags/en.svg"/></a>
	<a href="/es"><img alt="Español" src="/flags/es.svg"/></a>
        <a href="/pt-br"><img alt="Português Brasileiro" src="/flags/pt-br.svg"/></a>
</nav>
</div>
<div class="social">
<nav>
	<a href="https://twitter.com/dnsflagday"><img alt="@dnsflagday" src="/images/Twitter_Social_Icon_Rounded_Square_Color.svg"></a>
</nav>
</div>

What is happening?
==================
The current <a href="https://en.wikipedia.org/wiki/Domain_Name_System">DNS</a> is unnecessarily slow and suffers from inability to deploy new features. To remediate these problems, <a href="#supporters">vendors of DNS software</a> and also big <a href="#supporters">public DNS providers</a> are going to remove certain workarounds on February 1st, 2019.

This change affects only sites which operate software which is not following published standards. Are you affected?

Domain owners
=============
Please check if your domain is affected:
<div id="domain-checker">
	<form action="https://ednscomp.isc.org/ednscomp" method="GET" target="_blank">
		<fieldset>
			<legend>Test your domain</legend>
			<label for="zone">Domain name (without www):
				<input type="text" name="zone" id="zone" required title="Please enter name of a DNS zone hosted on DNS servers you want to test. (The name must contain SOA and NS records.)">
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
		reportOkHtml: ': <span style="color: green;">All Ok!</span></div>' +
		'<div><img style="height: 5em;" src="/signs/ok.svg"/></div>' +
		'<div>This domain is perfectly ready, congratulations!',

		reportCompatibleHtml: ': <span style="color: orange;">Minor problems detected!</span></div>' +
		'<div><img style="height: 5em;" src="/signs/compatible.svg"/></div>' +
		'<div>This domain is going to work after the 2019 DNS flag day BUT it does not support the latest DNS standards. As a consequence this domain cannot support the latest security features and might be an easier target for network attackers than necessary, and might face other issues later on. We recommend your domain administrator to fix issues listed in the following',

		reportHighLatencyHtml: ': <span style="color: red;">Serious problem detected!</span></div>' +
		'<div><img style="height: 5em;" src="/signs/high_latency.svg"/></div>' +
		'<div>This domain will face issues after the 2019 DNS flag day. It will work in practice, BUT clients will experience delays when accessing this domain. We recommend you request a fix from your domain administrator! You can refer them to https://dnsflagday.net/ and',

		reportFailHtml: ': <span style="font-weight: bold; color: red;">Fatal error detected!</span></div>' +
		'<div><img style="height: 5em;" src="/signs/dead.svg"/></div>' +
		'<div>This domain is going to STOP WORKING after the 2019 DNS flag day! Please retry the test to eliminate random network failures. If the problem persists you really need to request a fix from your domain administrator. You can refer them to https://dnsflagday.net/ and',

		reportTestErrorHtml: ': Test cannot be evaluated because of an error. Please make sure the domain name entered refers to a <strong>DNS zone</strong>, i.e. use "example.com" instead of "www.example.com". Retry the test to eliminate random network failures or investigate',
		reportLinkText: ' technical report ',  // text before URL to report
	},
	status: {
		loading: 'Testing in progress, please wait… It might take several tens of seconds.',
		done: 'Testing completed:',
		errorApi: 'Communication error! API unavailable… please try again later',
		errorInput: 'Invalid input or other unexpected error, sorry!',
	},
};
</script>
<script src="/domain-checker.js"></script>
<br>

DNS resolver operators
======================

On or around Feb 1st, 2019, major open source resolver vendors will release updates that implement stricter EDNS handling. Specifically, the following versions introduce this change:

* BIND 9.13.3 (development) and 9.14.0 (production)
* Knot Resolver already implemented stricter EDNS handling in all current versions
* PowerDNS Recursor 4.2.0
* Unbound 1.9.0

Also <a href="#supporters">public DNS providers listed below</a> will disable workarounds over a short period of time.

DNS server operators
====================
For introduction to EDNS compliance we recommend you to use form above which produces simplified result for a whole domain.

It is also possible to test your DNS servers directly using the tool [ednscomp](https://ednscomp.isc.org/ednscomp) which displays detailed technical report. Simply enter the name of a zone hosted on your DNS servers into the `zone name` field and click the `Submit` button.

The summary result of [ednscomp](https://ednscomp.isc.org/ednscomp) tests should preferably be a green message `All Ok`.

Minimal working setup which will allow your domain to survive 2019 DNS flag day must not have `timeout` result in any of plain DNS and EDNS version 0 tests implemented in [ednscomp](https://ednscomp.isc.org/ednscomp) tool. Please note that this minimal setup is still not standards compliant and will cause other issues sooner or later. For this reason **we strongly recommend you to get full EDNS compliance (all tests `ok`)** instead of doing just minimal cleanup otherwise you will have to face new issues later on.

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

Researchers
===========
Researches and other parties like TLD operators might be interested in:
 * [EDNS compliance statistics](https://ednscomp.isc.org/) generated by [EDNS compliance test suite](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) by ISC
 * [EDNS zone scanner](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/) by CZ.NIC which aims to evaluate real-world impact of the DNS flag day

Please read respective methodologies before interpreting the data. In any case, do not hesitate to reach out to tool authors using Gitlab links above.

Presentations
=============

 * DNS-OARC 28: [abstract](https://indico.dns-oarc.net/event/28/contributions/515/), [slides](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [video](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)
 * LOADAYS 2018: [abstract](http://loadays.org/pages/dnsupdate.html), [slides](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)
 * RIPE 76: [slides](https://ripe76.ripe.net/presentations/159-edns.pdf), [video](https://ripe76.ripe.net/archives/video/161)
 * DNS-OARC 29: [abstract](https://indico.dns-oarc.net/event/29/contributions/662/), [slides](https://indico.dns-oarc.net/event/29/contributions/662/attachments/634/1063/EDNS_Flag_Day_-_OARC29.pdf)

Tools
=====

 * [ISC EDNS Compliance tester](https://ednscomp.isc.org/), [source code](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)
 * [DNSViz](http://dnsviz.net/)

Contacts
========

 * Please file comments regarding this web in [dnsflagday repo](https://github.com/dns-violations/dnsflagday/issues) on Github
 * Comments regarding test results generated by this web or directly by [ednscomp test tool](https://ednscomp.isc.org/ednscomp) belong to [DNS Compliance Testing](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) project in ISC Gitlab

Supporters
==========
<script id="do-not-translate-randomize-this-section" src="/supporters-randomiser.js" defer></script>

[![PowerDNS](/images/powerdns.svg)](https://blog.powerdns.com/2018/03/22/removing-edns-workarounds/)

[![ISC](/images/isc.png)](https://www.isc.org/blogs/end-to-bandaids/)

[![NLnet Labs](/images/nlnetlabs.svg)](https://www.nlnetlabs.nl/news/2018/Jun/07/putting-an-end-to-workarounds-for-broken-software/)

[![CZ.NIC](/images/cznic.svg)](https://en.blog.nic.cz/2018/03/14/together-for-better-stability-speed-and-further-extensibility-of-the-dns-ecosystem/)

[![Quad9](/images/quad9.png)](https://quad9.net/)

[![CleanBrowsing](https://cleanbrowsing.org/images/CleanBrowsing-logo-small-dark.png)](https://cleanbrowsing.org/)

[![Cloudflare](/images/cloudflare.png)](https://www.cloudflare.com/)

[![Cisco](/images/cisco.svg)](https://www.opendns.com/cisco-opendns/)

[![Google](/images/google.svg)](https://developers.google.com/speed/public-dns/)

[![Facebook](/images/facebook.svg)](https://www.facebook.com/)

Additional reading
==================
 * [Minimal EDNS compliance requirements](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)
