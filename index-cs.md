---
title: 2019
lang: cs
redirect_from:
  - /cs/
---

Co se připravuje?
=================
Současný systém [DNS] je z pomalý a potýká se s technickými problémy způsobenými nedodržováním standardů vydaných již před dvaceti lety.

Aby celosvětové DNS bylo i nadále udržitelné je nezbytné provést změny a ukončit podporu nestandardních implemendací. Tímto krokem dojde ke zlepšení efektivity systému a bude umožněno nasadit novou funkcionalitu jako je např. lepší ochrana před [DDoS] útoky.

Z výše uvedených důvodů po **1. únoru 2019** [níže uvedení výrobci](#supporters) ukončí podporu nestandardních implementací DNS. Tato změna ovlivní jen domény používající software, který nedodržuje standardy DNS.

Pro více informací klikněte na skupinu, do které spadáte:

- [Jsem uživatel Internetu, nemám svou vlastní doménu](#users)
- [Jsem držitel domény](#domain-holders)
- [Jsem správce DNS](#dns-admins)
- [Zajímám se o DNS z odborného hlediska (vývoj DNS softwaru, výzkum, atd.)](#experts)


<a name="users"></a>

Jsem uživatel Internetu
=======================
Pokud nemáte vlastní doménu, není třeba se strachovat. Vás se změna týká pouze nepřímo a není nutné podnikat žádné další kroky. Děkujeme za váš zájem o [DNS]!


<a name="domain-holders"></a>

Jsem držitel domény
===================
Jste-li držitel domény, zkontrolujte, zda je vaše doména připravena na změny v systému DNS pomocí následujícího formuláře. Výsledek testu vám v případě potřeby zároveň sdělí doporučený postup nápravy.

{% include checker.html lang=site.data.checker.cs %}

Pokud máte více domén hostovaných na stejné sadě serverů, stačí otestovat pouze jednu z nich. Další informace naleznete v části [technické detaily testů](#test-details).

<a name="dns-admins"></a>

Jsem správce DNS
================
Dopady plánované změny na klientskou stranu DNS popisuje následující kapitola [o DNS resolverech](#resolver-ops). Malé procento autoritativních serverů může vyžadovat změny, které jsou [popsány níže](#auth-ops). Pro zájemce o hlubší porozumění uvádíme další [technické detaily testů](#test-details) a [nástroje pro experty](#experts).

<a name="resolver-ops"></a>

Správci DNS resolverů
---------------------
V krátkém období po 1. únoru 2019 budou vydány nové verze DNS resolverů, které již nebudou obcházet problémy nestandarních implementací. Proto se autoritativní servery, které nedodržují starší standard DNS z roku 1987 ([RFC1035]) ani novější standard [EDNS] z roku 1999 ([RFC2671], [RFC6891]) stanou nedostupnými. Zároveň stejnou změnu nasadí také [poskytovatelé veřejných DNS resolverů, kteří jsou uvedení níže](#supporters), takže tato změna ovlivní uživatele Internetu bez ohledu na rychlost aktualizace software resolverů.

Důsledkem plánované změny se domény hostované na vadných autoritativních serverech stanou nedostupné. Pokud v období po 1. únoru 2019 budete řešit problémy s nedostupností domén, doporučujeme vám zkontrolovat postiženou domény pomocí [webového formuláře výše](#domain-holders). Pokud test domény opakovaně selhává, potom se nejedná o chybu na straně vašeho resolveru a oprava musí být provedena na straně autoritativního serveru.

Dále uvádíme verze DNS resolverů, které již nebudou obcházet problémy nestandarních implementací:

* BIND 9.13.3 (vývojová verze) a 9.14.0 (produkční)
* Knot Resolver ve všech současných verzích již implementuje striktní chování
* PowerDNS Recursor 4.2.0
* Unbound 1.9.0


<a name="auth-ops"></a>

Správci DNS serverů
-------------------
Po 1. únoru 2019 [poskytovatelé veřejných DNS resolverů, kteří jsou uvedení níže](#supporters) během krátkého období ukončí podporu autoritativních serverů, jež nedodržují starší standard DNS z roku 1987 ([RFC1035]) ani novější standard [EDNS] z roku 1999 ([RFC2671], [RFC6891]). Domény hostované na serverech, které nedodržují standardy se tak pro významnou část uživatelů Internetu stanou nedostupnými.

Pro minimalizaci problémů vám doporučujeme použít následující postup:
1. Otestujte své autoritativní servery pomocí [formuláře uvedeného výše](#domain-holders). Stačí otestovat libovolnou DNS zónu hostovanou na vašich DNS serverech. (Testované vlastnosti serverů nezávisí na obsahu zóny, takže není potřeba testovat všechny zóny jednotlivě, stačí pokrýt všechny autoritativní servery.)
1. Výsledek testu může být ovlivněn dočasným problémem v síti. Pokud je detekován problém, zkuste zopakovat test.
1. Pokud testy selhávají, aktualizujte váš DNS software na poslední stabilní verzi a zopakujte test. Pokud testy selhávají i po aktualizaci DNS softwaru, doporučujeme vám zkontrolovat konfiguraci firewallu.
1. **Firewally nesmí zahazovat DNS pakety** obsahující rozšíření [EDNS], včetně dosud neznámých rozšíření splňující standard EDNS. Články jednotlivých výrobců k tomuto tématu naleznete zde:
  * [Akamai](https://community.akamai.com/customers/s/article/CloudSecurityDNSFlagDayandAkamai20190115151216?language=en_US)
  * [BlueCat](https://www.bluecatnetworks.com/blog/dns-flag-day-is-coming-and-bluecat-is-ready/)
  * [F5 BIG-IP](https://support.f5.com/csp/article/K07808381?sf206085287=1)
  * Juniper SRX ve výchozím nastavení zahazují EDNS pakety. Řešením je buď upgrade na polední verzi, nebo vypnutí funkce "DNS doctoring" příkazem `# set security alg dns doctoring none`.

Pokud jste provedli upgrade DNS softwaru a problém přetrvává i po aplikaci postupů uvedených výše, prosím kontaktujte výrobce firewallu a požadujte opravu.

<a name="test-details"></a>

Podrobnosti o testování
-----------------------
Vaše doména může nebo nemusí obsahovat předponu `www`, např. doména může být `www.nic.cz` nebo pouze `nic.cz`. Pokud si nejste jistí, doporučujeme vám otestovat obě možnosti. Pro jména, která nejsou tzv. DNS zóny, bude testovací formulář upozorňovat, že se nejedná o zónu. V takovém případě lze konkrétní jméno ignorovat a otestovat pouze druhé z dvojice.

### Skenování velkého počtu domén

Testovací [formulář uvedený výše](#domain-holders) na pozadí používá server s nástrojem [ednscomp](https://ednscomp.isc.org/ednscomp), který nemá velkou kapacitu. Pokud potřebujete otestovat velké množství domén, použijte prosím [nástroje odkazované níže](#tools). Pokud budete nadmíru zatěžovat server automatizovanými dotazy, budeme nuceni omezit počet dotazů nebo vám službu odepřít.

### Podrobné výsledky testů

Testovací [formulář uvedený výše](#domain-holders) na pozadí provádí technické testy pomocí nástroje [ednscomp](https://ednscomp.isc.org/ednscomp) a z dílčích výsledků počítá souhrnné hodnocení.

DNS servery lze také otestovat přímo pomocí nástroje [ednscomp](https://ednscomp.isc.org/ednscomp), který zobrazuje podrobnou technickou zprávu. Do pole `zone name` zadejte jméno jakékoliv zóny hostované na vašich DNS serverech a klikněte na tlačítko `Submit`.

Celkový výsledek zobrazený nástrojem [ednscomp](https://ednscomp.isc.org/ednscomp) by měla být zpráva `All Ok` (zelenou barvou).

### Minimální funkční konfigurace

Pro minimální konfiguraci, která ještě bude v roce 2019 fungovat, nevypisuje nástroj [ednscomp](https://ednscomp.isc.org/ednscomp) výsledek `timeout` v žádném z testů pro původní DNS ani v testech pro rozšíření EDNS verze 0. Vezměte prosím na vědomí, že takováto minimální konfigurace stále neodpovídá standardům a dříve nebo později bude způsobovat potíže. Z tohoto důvodu **doporučujeme najednou opravit vaše DNS tak, aby všechny testy skončily výsledkem `ok`**. Vyhnete se tak problémům v budoucnu.

Pokud bude zjištěn problém, nástroj ednscomp vám zobrazí vysvětlení pro každý test. Problémy jsou typicky způsobeny:
* zastaralým nebo nekvalitním DNS softwarem
* chybnou konfigurací firewallu

**Firewally nesmí zahazovat DNS pakety** obsahující rozšíření [EDNS], včetně dosud neznámých rozšíření splňující standard EDNS. Moderní DNS software používá rozšíření jako např. [DNS cookies](https://tools.ietf.org/html/rfc7873) pro ochranu proti [DDoS] útokům. Firewally, které zahazují DNS pakety s rozšířeními ve skutečnosti zhoršují situaci pro všechny uživatele, včetně zhoršování DDoS útoků a zpomalování DNS provozu.

Další technické podrobnosti jsou uvedeny v [následující kapitole](#experts).


<a name="experts"></a>

Zajímám se o DNS z odborného hlediska
=====================================

Vývojáři DNS softwaru
---------------------
Hlavní změna spočívá v tom, že DNS software od výše uvedených výrobců bude nově interpretovat timeout (vypršení časového limitu požadavku) jako příznak problému na síti nebo vzdáleném serveru. Počínaje 1. únorem 2019 DNS timeout **nezpůsobí vypnutí EDNS**.

Důsledkem je, že DNS servery které **vůbec neodpovídají na EDNS dotazy** se stanou zcela nedostupnými.

Prosím otestujte svou implementaci DNS pomocí nástroje [ednscomp](https://ednscomp.isc.org/ednscomp) a ujistěte se, že správně zpracováváte rozšíření EDNS. Zdrojový kód testovacího nástroje je také [k dispozici](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing).

Zdůrazňujeme, že rozšíření [EDNS] stále není povinné. Pokud se rozhodnete nepodporovat EDNS, vše bude fungovat pokud se váš software bude řídit podle [EDNS standardu sekce 7](https://tools.ietf.org/html/rfc6891#section-7).

Jinak řečeno, software, který správně implementuje původní standard [RFC1035] z roku 1987 nevyžaduje změny. Opravy vyžaduje pouze software, který nedodržuje standardy.


Výzkumníci
----------
Další zdroje pro výzkumníky, operátory TLD atd.:

 * [Statistiky podpory EDNS](https://ednscomp.isc.org/) vygenerované pomocí [sady EDNS testů](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) vytvořené sdružením ISC.
 * [Prezentace](#presentations) níže
 * [Nástroje](#tools) pro skenování velkého počtu domén atd.


<a name="presentations"></a>

Prezentace
==========

Obecné
------
 * Bude vaše doména fungovat i v roce 2019? - CSNOG1: [abstrakt](https://csnog.eu/event/1/contributions/33/), [prezentace](https://csnog.eu/event/1/contributions/33/attachments/9/31/Petr_Spacek_01.pdf), [video](https://youtu.be/KQO48HbY6o0)
 * LOADAYS 2018: [abstrakt](http://loadays.org/pages/dnsupdate.html), [prezentace](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)

Technické
---------
* DNS-OARC 29: A tale of five ccTLDs [abstract](https://indico.dns-oarc.net/event/29/contributions/662/), [slides](https://indico.dns-oarc.net/event/29/contributions/662/attachments/634/1063/EDNS_Flag_Day_-_OARC29.pdf), [video](https://youtu.be/rneu1lnJmUI?list=PLCAxS3rufJ1cOBd1D4K4QJFmLcSypixh3&t=2010)
* DNS-OARC 29: Estimating impact of the (E)DNS flag day [abstract](https://indico.dns-oarc.net/event/29/contributions/644/), [slides](https://indico.dns-oarc.net/event/29/contributions/644/attachments/632/1018/edns.pdf), [video](https://youtu.be/rneu1lnJmUI?list=PLCAxS3rufJ1cOBd1D4K4QJFmLcSypixh3&t=3001)
* DNS-OARC 28: First announcement [abstract](https://indico.dns-oarc.net/event/28/contributions/515/), [slides](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [video](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)


<a name="tools"></a>

Nástroje
========

 * [ISC EDNS Compliance tester](https://ednscomp.isc.org/), [zdrojový kód](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) pro testování všech aspektů implementace EDNS
 * [EDNS zone scanner](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/) pro kontrolu velkého množství zón a vyhodnocení dopadů změny (CZ.NIC)
 * [Testování EDNS kompatibility pomocí nástroje dig](https://kb.isc.org/docs/edns-compatibility-dig-queries)
 * [DNSViz](http://dnsviz.net/)

Před interpretací dat si prosím přečtěte metodologii uvedenou u konkrétního zdroje. S dotazy se neváhejte obrátit na autory nástrojů pomocí odkazů uvedených výše.


Kontakty
========

 * Připomínky k tomuto webu prosím směřujte do [dnsflagday repozitáře](https://github.com/dns-violations/dnsflagday/issues) na Githubu
 * Komentáře k výsledkům testů z toho webu nebo přímo [nástroje ednscomp](https://ednscomp.isc.org/ednscomp) prosím hlaste do [DNS Compliance Testing](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) projektu v Gitlabu ISC

<a name="supporters"></a>

Akci podporují
==============
{% include supporters.html %}

Literatura
==========
 * [Minimal EDNS compliance requirements](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)

[DDoS]: https://cs.wikipedia.org/wiki/Denial_of_service#Distributed_DoS
[DNS]: https://cs.wikipedia.org/wiki/Domain_Name_System
[RFC1035]: https://tools.ietf.org/html/rfc1035
[EDNS]: https://en.wikipedia.org/wiki/Extension_mechanisms_for_DNS
[RFC2671]: https://tools.ietf.org/html/rfc2671
[RFC6891]: https://tools.ietf.org/html/rfc6891
