---
title: 2019
lang: ru
redirect_from:
  - /ru/
---

Что происходит?
==================
Текущий [DNS](https://ru.wikipedia.org/wiki/DNS) излишне медленный и страдает от невозможности развертывания новых функций. Чтобы исправить эти проблемы, [производители программного обеспечения DNS](#supporters) а также большие [общедоступные DNS-провайдеры](#supporters) собираются убрать определенные обходные пути 1 февраля 2019 года.

Это изменение касается только сайтов, на которых установлено программное обеспечение, не соответствующее опубликованным стандартам. Вы затронуты?

Владельцам доменов
=============
Пожалуйста, проверьте затронут ли ваш домен:
{% include checker.html lang=site.data.checker.ru %}

Операторам DNS-резольвера
======================

1 февраля 2019(или около), основные поставщики средств распознавания с открытым исходным кодом будут выпускать обновления, которые реализуют более строгую обработку EDNS. В частности, следующие версии вводят это изменение:

* BIND 9.13.3 (development) и 9.14.0 (production)
* Knot Resolver уже внедрил более строгую обработку EDNS во всех текущих версиях
* PowerDNS Recursor 4.2.0
* Unbound 1.9.0

Также [общественные DNS провайдеры перечисленные ниже](#supporters) отключат обходные пути.

Операторам DNS серверов
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

Vendor hints:

* Older versions of Juniper SRX will drop EDNS packets by default - Workaround is to disable DNS doctoring via `# set security alg dns doctoring none`. Upgrade to latest versions for EDNS support. 
* [F5 BIG-IP DNS processing and DNS Flag Day](https://support.f5.com/csp/article/K07808381?sf206085287=1)
* [BlueCat is ready](https://www.bluecatnetworks.com/blog/dns-flag-day-is-coming-and-bluecat-is-ready/)
* [DNS Flag Day and Akamai](https://community.akamai.com/customers/s/article/CloudSecurityDNSFlagDayandAkamai20190115151216?language=en_US)

Разработчикам DNS ПО
=======================
The main change is that DNS software from vendors named above will interpret timeouts as sign of a network or server problem. Starting February 1st, 2019 there will be **no attempt to disable EDNS** as reaction to a DNS query timeout.

This effectively means that all DNS servers which **do not respond at all to EDNS queries** are going to be treated as *dead*.

Please test your implementations using the [ednscomp](https://ednscomp.isc.org/ednscomp) tool to make sure that you handle EDNS properly. Source code of the tool [is available](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) as well.

It is important to note that EDNS is still not mandatory. If you decide not to support EDNS it is okay as long as your software replies according to [EDNS standard section 7](https://tools.ietf.org/html/rfc6891#section-7).

Исследователям
===========
Исследователи и другие стороны, такие как операторы TLD, могут быть заинтересованы в:

* [Статистика соответствия EDNS](https://ednscomp.isc.org/) сгенерированная [набором тестов на соответствие EDNS](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) от ISC
* [Сканер зон EDNS](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/) от CZ.NIC цель которого - оценить реальное влияние DNS flag day

Пожалуйста, прочтите соответствующие методологии, прежде чем интерпретировать данные. В любом случае, не стесняйтесь обращаться к авторам инструментов, используя ссылки GitLab выше.

Презентации
=============

* DNS-OARC 28: [реферат](https://indico.dns-oarc.net/event/28/contributions/515/), [слайды](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [видео](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)
* LOADAYS 2018: [реферат](http://loadays.org/pages/dnsupdate.html), [слайды](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [видео](https://www.youtube.com/watch?v=OXbbH0ORmSY)
* RIPE 76: [слайды](https://ripe76.ripe.net/presentations/159-edns.pdf), [видео](https://ripe76.ripe.net/archives/video/161)
* DNS-OARC 29: [реферат](https://indico.dns-oarc.net/event/29/contributions/662/), [слайды](https://indico.dns-oarc.net/event/29/contributions/662/attachments/634/1063/EDNS_Flag_Day_-_OARC29.pdf)

Инструменты
=====

 * [Тестер соответствия ISC EDNS](https://ednscomp.isc.org/), [исходный код](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)
 * [DNSViz](http://dnsviz.net/)

Контакты
========

 * Пожалуйста, оставьте комментарии в [репозитории dnsflagday](https://github.com/dns-violations/dnsflagday/issues) на GitHub
 * Комментарии относительно результатов испытаний, сгенерированных этой сетью или непосредственно [инструмент тестирования ednscomp](https://ednscomp.isc.org/ednscomp) принадлежащий проекту [тестирования на соответствие DNS](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) на ISC GitLab

Сторонники
==========
{% include supporters.html %}

Дополнительное чтение
==================
 * [Минимальные требования соответствия EDNS](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“DNS верблюд”, или, рост сложности DNS](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)
