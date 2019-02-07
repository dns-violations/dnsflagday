---
title: 2019
lang: ru
redirect_from:
  - /ru/
---

**Этот перевод ожидает обновления, пожалуйста, смотрите [английскую версию](/en/) для последней информации.**

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
Для ознакомления с соответствием EDNS мы рекомендуем использовать форму выше, которая дает упрощенный результат для всего домена.

Также возможно протестировать ваши DNS-серверы напрямую, используя инструмент [ednscomp](https://ednscomp.isc.org/ednscomp) который отображает подробный технический отчет. Просто введите название зоны, размещенной на ваших DNS-серверах, в поле `zone name` и нажмите кнопку `Submit`.

Итоговый результат тестов [ednscomp](https://ednscomp.isc.org/ednscomp) желательно должнен быть зеленым сообщением `All Ok`.

Минимальная рабочая настройка, которая позволит вашему домену выжить в 2019 DNS flag day - отсутствие результата `timeout` в любом из простых тестов DNS и EDNS версии 0, реализованных в инстурменте [ednscomp](https://ednscomp.isc.org/ednscomp). Обратите внимание, что эта минимальная настройка все еще не соответствует стандартам и рано или поздно вызовет другие проблемы. По этой причине **мы настоятельно рекомендуем вам получить полное соответствие EDNS (все тесты `ok`)** вместо того, чтобы выполнять минимальную очистку, иначе вам придется столкнуться с новыми проблемами позже.

Если есть проблема, инструмент ednscomp отображает объяснение каждого неудачного теста. Сбои в этих тестах обычно вызваны:

* неправильным программным обеспечением DNS
* неправильной конфигурацией брандмауэра

Чтобы устранить проблемы, обновите программное обеспечение DNS до последних стабильных версий и повторите тестирование. Если тесты по-прежнему не проходят даже после обновления DNS, проверьте конфигурацию брандмауэра.

**Межсетевые экраны не должны отбрасывать пакеты DNS** с расширениями EDNS, включая неизвестные расширения. Современное программное обеспечение DNS может развертывать новые расширения (например [DNS cookies](https://tools.ietf.org/html/rfc7873) для защиты от DoS атак). Брандмауэры, которые отбрасывают пакеты DNS с такими расширениями, ухудшают ситуацию для всех, в том числе обостряют атаки DoS и увеличивают задержку трафика DNS.

Подсказки продавца:

* Более старые версии Juniper SRX по умолчанию отбрасывают пакеты EDNS. Обходной путь - отключить лечение DNS с помощью `# set security alg dns doctoring none`. Обновление до последних версий для поддержки EDNS.
* [Akamai](https://community.akamai.com/customers/s/article/CloudSecurityDNSFlagDayandAkamai20190115151216?language=en_US)
* [BlueCat](https://www.bluecatnetworks.com/blog/dns-flag-day-is-coming-and-bluecat-is-ready/)
* [Citrix](https://support.citrix.com/article/CTX241493)
* [efficient iP](http://www.efficientip.com/dns-flag-day-notes/)
* [F5 BIG-IP](https://support.f5.com/csp/article/K07808381?sf206085287=1)
* [Google](https://groups.google.com/d/msg/public-dns-announce/-qaRKDV9InA/CsX-2fJpBAAJ)
* [Infoblox](https://community.infoblox.com/t5/Community-Blog/DNS-Flag-Day/ba-p/15843?es_p=8449211)
* [Microsoft Azure](https://azure.microsoft.com/en-us/updates/azure-dns-flag-day/), [Microsoft DNS](https://support.microsoft.com/en-sg/help/4489468/windows-server-domain-name-system-dns-flag-day-compliance)
* [Pulse Secure](https://kb.pulsesecure.net/articles/Pulse_Secure_Article/KB43996)

Разработчикам DNS ПО
=======================
Основное изменение заключается в том, что программное обеспечение DNS от вышеперечисленных поставщиков будет интерпретировать тайм-ауты как признак проблемы сети или сервера. С 1 февраля 2019 **нет попытки отключить EDNS** как реакцию на тайм-аут DNS-запроса.

Это фактически означает, что все DNS-серверы, которые **вообще не отвечают на запросы EDNS** будут рассматриваться как *мертвые*.

Пожалуйста, проверьте ваши реализации, используя инструмент [ednscomp](https://ednscomp.isc.org/ednscomp) чтобы убедиться, что вы правильно обрабатываете EDNS. Исходный код инструмента также [доступен](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing).

Важно отметить, что EDNS все еще не является обязательным. Если вы решите не поддерживать EDNS, это нормально, если ваше программное обеспечение отвечает в соответствии с [EDNS раздел стандарта 7](https://tools.ietf.org/html/rfc6891#section-7).

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
