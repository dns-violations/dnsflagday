<div class="translations">
<nav>
	<a href="/cs"><img alt="Česky" src="/flags/cs.svg"/></a>
	<a href="/"><img alt="English" src="/flags/en.svg"/></a>
	<a href="/es"><img alt="Español" src="/flags/es.svg"/></a>
</nav>
</div>

Co se připravuje?
=================
Současný systém <a href="https://cs.wikipedia.org/wiki/Domain_Name_System">DNS</a> je z historických důvodů pomalý a neumožňuje nasadit novou funkcionalitu. Pro zmírnění problému skupina <a href="#supporters">výrobců DNS software</a> a <a href="#supporters">významných poskytovatelů DNS infrastruktury</a> proto po **1. únoru 2019** ukončí podporu některých historických implementací DNS porušujících standardy.

Tato změna ovlivní jen domény používající software, který nedodržuje publikované standardy. Ovlivní i vás?

Vlastníci domén
===============
Prosím zkontrolujte své domény pomocí následujícího formuláře:
<div id="domain-checker">
	<form action="https://ednscomp.isc.org/ednscomp" method="GET" target="_blank">
		<fieldset>
			<legend>Test domény</legend>
			<label for="zone">Jméno domény (bez www):
				<input type="text" name="zone" id="zone" required title="Vložte jméno DNS zóny hostované na DNS serverech, které chcete otestovat. (Zadané jméno musí mít SOA a NS záznamy.)">
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
		reportOkHtml: ': <span style="color: green;">V pořádku.</span></div>' +
		'<div><img style="height: 5em;" src="/signs/ok.svg"/></div>' +
		'<div>Tato doména je perfektně připravena, gratulujeme!',

		reportCompatibleHtml: ': <span style="color: orange;">Menší nedostatky!</span></div>' +
		'<div><img style="height: 5em;" src="/signs/compatible.svg"/></div>' +
		'<div>Tato doména bude fungovat i po změnách v roce 2019, nicméně chybí u ní podpora nejnovějších DNS standardů. To znamená, že tato doména nemůže použít nejnovější metody zabezpečení a je zranitelnější vůči útokům. Nalezené nedostatky také mohou způsobit potíže v budoucnosti. Doporučujeme požádat vašeho správce domény o opravu zjištěných problémů. Můžete ho odkázat na web dnsflagday.net/cs a ',

		reportHighLatencyHtml: ': <span style="color: red;">Vážné problémy!</span></div>' +
		'<div><img style="height: 5em;" src="/signs/high_latency.svg"/></div>' +
		'<div>Tato doména bude po změnách v roce 2019 vážně postižena. Přestože doména nepřestane fungovat, uživatelé mohou čelit náhodným výpadkům a přístup na doménu bude zpomalený. Důrazně doporučujeme požádat vašeho správce domény o opravu zjištěných problémů. Můžete ho odkázat na web dnsflagday.net/cs a ',

		reportFailHtml: ': <span style="font-weight: bold; color: red;">Fatální chyba!</span></div>' +
		'<div><img style="height: 5em;" src="/signs/dead.svg"/></div>' +
		'<div>Tato doména bude po změnách v roce 2019 ZCELA NEFUNKČNÍ! Pro vyloučení nahodilých chyb v síti prosím zopakujte test. Pokud problém přetrvává, je nezbytné požadovat nápravu od vašeho správce domény. Můžete ho odkázat na web dnsflagday.net/cs a ',

		reportTestErrorHtml: ': Omlouváme se, výsledek testu v tomto okamžiku nelze vyhodnotit. Zájem o testování předčil naše očekávání a již pracujeme na posílení testovací infrastruktury. Zkuste prosím test zopakovat později. Pokud problém přetrvává, ujistěte se, že zadané jméno odpovídá <strong>DNS zóně</strong>, tj. zadejte "example.cz" na místo "www.example.cz".',

		reportLinkText: ' technickou zprávu ',  // text before URL to report
	},
	status: {
		loading: 'Probíhá test, prosím čekejte… Test může zabrat několik desítek sekund.',
		done: 'Testování dokončeno:',
		errorApi: 'Omlouváme se, výsledek testu v tomto okamžiku nelze vyhodnotit. Zájem o testování předčil naše očekávání a již pracujeme na posílení testovací infrastruktury.',
		errorInput: 'Neplatné jméno nebo jiná neočekávaná chyba!',
	},
};
</script>
<script src="/domain-checker.js"></script>
<br>

Správci DNS
===========
Pro seznámení s problematikou podpory EDNS vám doporučujeme použít formulář uvedený výše, který poskytuje zjednodušený výsledek pro celou doménu.

Dále je možné otestovat vaše DNS servery pomocí nástroje [ednscomp](https://ednscomp.isc.org/ednscomp), který zobrazuje podrobnou technickou zprávu. Do pole `zone name` zadejte jméno jakékoliv zóny hostované na vašich DNS serverech a klikněte na tlačítko `Submit`.

Celkový výsledek zobrazený nástrojem [ednscomp](https://ednscomp.isc.org/ednscomp) by měl být zelená zpráva `All Ok`.

Pro minimální konfiguraci, která ještě bude v roce 2019 fungovat, nevypisuje nástroj [ednscomp](https://ednscomp.isc.org/ednscomp) výsledek `timeout` v žádném z testů pro původní DNS ani v testech pro rozšíření EDNS verze 0. Vezměte prosím na vědomí, že takováto minimální konfigurace stále neodpovídá standardům a dříve nebo později bude způsobovat potíže. Z tohoto důvodu **doporučujeme najednou opravit vaše DNS tak, aby všechny testy skončily výsledkem `ok`**. Vyhnete se tak problémům v budoucnu.

Pokud bude zjištěn problém, nástroj ednscomp vám zobrazí vysvětlení pro každý test. Problémy jsou typicky způsobeny:
* zastaralým nebo nekvalitním DNS softwarem
* chybnou konfigurací firewallu

Doporučujeme aktualizovat váš DNS software na poslední stabilní verzi a zopakovat test. Pokud testy selhávají i po aktualizaci DNS software, doporučujeme vám zkontrolovat konfiguraci firewallu.

**Firewally nesmí zahazovat DNS pakety** které obsahují rozšíření EDNS (ani dosud neznámá rozšíření splňující standard EDNS). Moderní DNS software používá rozšíření jako např. [DNS cookies](https://tools.ietf.org/html/rfc7873) pro ochranu proti DoS útokům. Firewally které zahazují DNS pakety s rozšířeními ve skutečnosti zhoršují situaci pro všechny uživatele, včetně zhoršování DoS útoků a zpomalování DNS provozu.

Vývojáři DNS software
=====================
Hlavní změna spočívá v tom, že DNS software od výše uvedených výrobců bude nově interpretovat timeout (vypršení časového limitu požadavku) jako příznak problému na síti nebo vzdáleném serveru. Počínaje 1. únorem 2019 DNS timeout **nezpůsobí vypnutí EDNS**.

Důsledkem je, že DNS servery které **vůbec neodpovídají na EDNS dotazy** se stanou zcela nedostupnými.

Prosím otestujte svou implementaci DNS pomocí nástroje [ednscomp](https://ednscomp.isc.org/ednscomp) a ujistěte se, že správně zpracováváte rozšíření EDNS. Zdrojový kód testovacího nástroje je také [k dispozici](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing).

Upozorňujeme, že rozšíření EDNS stále není povinné. Pokud se rozhodnete nepodporovat EDNS, vše bude fungovat pokud se váš software bude řídit podle [EDNS standard section 7](https://tools.ietf.org/html/rfc6891#section-7).

Výzkumníci
==========
Další zdroje pro výzkumníky:
 * [Statistiky podpory EDNS](https://ednscomp.isc.org/) vygenerované pomocí [sady EDNS testů](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) vytvořené sdružením ISC.
 * [EDNS skener zón](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/) vytvořený sdružením CZ.NIC, který si klade za cíl vyhodnotit reálný dopad změny popsané na této stránce.

Před interpretací dat si prosím přečtěte metodologii uvedenou u konkrétního zdroje. S dotazy se neváhejte obrátit na autory pomocí odkazů do Gitlabu uvedených výše.

Prezentace
==========

 * Bude vaše doména fungovat i v roce 2019? - CSNOG1: [abstrakt](https://csnog.eu/event/1/contributions/33/), [prezentace](https://csnog.eu/event/1/contributions/33/attachments/9/31/Petr_Spacek_01.pdf), [video](https://youtu.be/KQO48HbY6o0)
 * DNS-OARC 28: [abstrakt](https://indico.dns-oarc.net/event/28/contributions/515/), [prezentace](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [video](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)
 * LOADAYS 2018: [abstrakt](http://loadays.org/pages/dnsupdate.html), [prezentace](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)
 * RIPE 76: [prezentace](https://ripe76.ripe.net/presentations/159-edns.pdf), [video](https://ripe76.ripe.net/archives/video/161)

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

Literatura
==========
 * [Minimal EDNS compliance requirements](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)
