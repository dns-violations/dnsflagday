<div class="translations">
<nav>
	<a href="/cs"><img alt="Česky" src="/flags/cs.svg"/></a>
	<a href="/"><img alt="English" src="/flags/en.svg"/></a>
	<a href="/es"><img alt="Español" src="/flags/es.svg"/></a>
</nav>
</div>

Co se připravuje?
=================
Současný systém DNS je z historických důvodů pomalý a neumožňuje nasadit novou funkcionalitu. Skupina výrobců DNS software [BIND (ISC)](https://www.isc.org/blogs/end-to-bandaids/), 
[Knot Resolver (CZ.NIC)](https://en.blog.nic.cz/2018/03/14/together-for-better-stability-speed-and-further-extensibility-of-the-dns-ecosystem/), [PowerDNS](https://blog.powerdns.com/2018/03/22/removing-edns-workarounds/) a Unbound (NLnet Labs) proto po **1. únoru 2019** ukončí podporu některých historických implementací DNS porušujících standardy.

Tato změna ovlivní jen domény, které používají nekvalitní DNS software. Ovlivní i vás?

Vlastníci domén
===============
Prosím zkontrolujte své domény pomocí následujícího formuláře:
<div id="domain-checker">
	<form action="https://ednscomp.isc.org/ednscomp" method="GET" target="_blank">
		<fieldset>
			<legend>Test domény</legend>
			<label for="zone">Jméno domény (bez www):
				<input type="text" name="zone" id="zone" required>
			</label>
			<input type="submit" value="Testuj!">
			<noscript>Váš prohlížeč nepodporuje JavaScript. Tento formulář otevře nové okno s technickou zprávou o stavu domény.<br>
Výsledkem zobrazený nástrojem <a href="https://ednscomp.isc.org/ednscomp">ednscomp</a> musí být zelená zpráva "All Ok". Pokud je výsledkem cokoliv jiného, potom je vaše doména postižena a může se stát nedostupnou. Prosím kontaktujte administrátora a požadujte nápravu!
			</noscript>
		</fieldset>
	</form>
</div>
<script><!-- translate the form above and these constants, please keep the whitespaces! -->
const domainCheckerInit = {
	placeIntoElement: document.getElementById( "domain-checker" ),
	texts: {
		formTitle: 'Test domény',
		labelText: 'Jméno domény (bez www): ',
		submitText: 'Testuj!',
		reportOkHtml: ': <span style="color: green;">V pořádku!</span>',
		reportFailHtml: ': <span style="color: red;">Tato doména je postižena!</span> Pokud problém přetrvává prosím kontaktujte správce DNS vaší domény a odkažte ho na web https://dnsflagday.net/ a ',
		reportLinkText: ' technickou zprávu ',  // text before URL to report
	},
	status: {
		loading: 'Probíhá test, prosím čekejte… Test může zabrat několik desítek sekund.',
		done: 'Testování dokončeno:',
		errorApi: 'Chyba při komunikaci! API není dostupné… prosím zkuste to později.',
		errorInput: 'Neplatné jméno!',
	},
};
</script>
<script src="/domain-checker.js"></script>
<br>

Správci DNS
===========
Je možné otestovat vaše DNS servery pomocí nástroje [ednscomp](https://ednscomp.isc.org/ednscomp). Zadejte do něj jméno jakékoliv zóny hostované na vašich DNS serverech do pole `zone name` a klikněte na tlačítko `Submit`.

Celkový výsledek musí být zelená zpráva `All Ok`.

Pokud bude zjištěn problém, nástroj ednscomp vám zobrazí vysvětlení pro každý test. Problémy jsou typicky způsobeny:
* nekvalitním DNS softwarem
* chybnou konfigurací firewallu

Doporučujeme upgradovat váš DNS software na poslední stabilní verzi a provést test znovu. Pokud testy selhávají i po upgrade DNS software, doporučujeme vám zkontrolovat konfiguraci firewallu.

**Firewally nesmí zahazovat DNS pakety** které obsahují rozšíření EDNS (ani dosud neznámá rozšíření splňující standard EDNS). Moderní DNS software používá rozšíření jako např. [DNS cookies](https://tools.ietf.org/html/rfc7873) pro ochranu proti DoS útokům. Firewally které zahazují DNS pakety s roršířeními tak zhoršují situaci pro všechny uživatele, včetně zhoršování DoS útoků a zpomalování DNS provozu.

Vývojáři DNS software
=====================
Hlavní změna spočívá v tom, že DNS software od výše uvedených výrobců bude nově interpretovat timeout (vypršení časového limitu požadavku) jako příznak problému na síti nebo vzdáleném serveru. Počínaje 1. únorem 2019 DNS timeout **nezpůsobí vypnutí EDNS**.

Důsledkem je, že DNS servery které **vůbec neodpovídají na EDNS dotazy** se stanou zcela nedostupnými.

Prosím otestujte svou implementaci DNS pomocí nástroje [ednscomp](https://ednscomp.isc.org/ednscomp) a ujistěte se, že správně zpracováváte rozšíření EDNS. Zdrojový kód testovacího nástroje je také [k dispozici](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing).

Upozorňujeme, že rozšíření EDNS stále není povinné. Pokud se rozhodnete nepodporovat EDNS, vše bude fungovat pokud se váš software bude řídit podle [EDNS standard section 7](https://tools.ietf.org/html/rfc6891#section-7).

Prezentace
==========

 * DNS-OARC 28: [abstract](https://indico.dns-oarc.net/event/28/contributions/515/), [slides](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [video](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)
 * LOADAYS 2018: [abstract](http://loadays.org/pages/dnsupdate.html), [slides](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)
 * RIPE 76: [slides](https://ripe76.ripe.net/presentations/159-edns.pdf), [video](https://ripe76.ripe.net/archives/video/161)

Nástroje
========

 * [ISC EDNS Compliance tester](https://ednscomp.isc.org/), [source code](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)
 * [DNSViz](http://dnsviz.net/)

Kontakty
========

 * Připomínky k tomuto webu prosím směřujte do [dnsflagday repozitáře](https://github.com/dns-violations/dnsflagday/issues) na Githubu
 * Komentáře k výsledkům testů z toho webu nebo přímo [nástroje ednscomp](https://ednscomp.isc.org/ednscomp) prosím hlaste do [DNS Compliance Testing](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) projektu v Gitlabu ISC

Akci podporují
==============

[![CZ.NIC](/images/cznic.svg)](https://www.nic.cz/)

[![PowerDNS](/images/powerdns.png)](https://www.powerdns.com/)

[![ISC](/images/isc.png)](https://www.isc.org/)

[![NLnet Labs](/images/nlnetlabs.svg)](https://nlnetlabs.nl/)

[![Quad9](/images/quad9.png)](https://quad9.net/)

[![CleanBrowsing](https://cleanbrowsing.org/images/CleanBrowsing-logo-small-dark.png)](https://cleanbrowsing.org/)

Literatura
==========
 * [Minimal EDNS compliance requirements](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)
