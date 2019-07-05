---
title: 2020
lang: fr-FR
redirect_from:
  - /fr/
  - /2020/fr/
flagdayyear: 2020
---

{% include 2020_languages.html %}

<img class="logo float-right" alt="DNS flag day logo" src="/images/DNS_Flag.svg">

Merci !
=======

Le [DNS flag day 2019](/2019/) a été un événément réussi. La communauté Internet a travaillé de manière concertée, ce qui a permis de résoudre des problèmes qui causaient des délais pour les utilisateurs d'Internet. Nous souhaitons remercier tous les opérateurs qui ont coopéré et ont contribué à un meilleur Internet.

Un résumé des "Flag Days" passés et à venir est disponible ici:
[https://youtu.be/mH_elg9EUWw?t=649](https://youtu.be/mH_elg9EUWw?t=649).

Contenu
=======
- [Quelle est la suite ?](#quelle-est-la-suite)
- [DNS Flag Day 2020](#dns-flag-day-2020)
  - [Note: Travail en cours](#note-travail-en-cours)
  - [Action: Opérateurs de serveurs DNS faisant Autorité](#action-opérateurs-de-serveurs-dns-faisant-autorité)
  - [Action: Opérateurs de serveurs DNS Récursifs](#action-opérateurs-de-serveurs-dns-récursifs)
  - [Action: Fournisseurs de logiciels DNS](#action-fournisseurs-de-logiciels-dns)
  - [Comment tester?](#comment-tester)
- [Précédents flag days](#précédents-flag-days)
- [Qui est derrière DNS flag day?](#qui-est-derrière-dns-flag-day)
- [Rentrer en contact](#rentrer-en-contact)
- [Supporters](#supporters)
- [FAQ](#faq)

Quelle est la suite?
====================

Le prochain DNS flag day est actuellement en cours de planification. Il sera focalisé sur les problèmes opérationnels et de sécurité dans le DNS, causés par la fragmentation des packets IP (Internet Protocol).

Veuillez vous abonner à la [mailing list dns-announce](https://lists.dns-oarc.net/mailman/listinfo/dns-announce) ou suivre [@dnsflagday sur Twitter](https://www.twitter.com/dnsflagday) pour recevoir une notification quand davantage d'informations seront disponibles.

DNS Flag Day 2020
=================

La communauté DNS a discuté des problèmes persistants d'interoperabilité et de performance du DNS sur les mailing-lists, ainsi qu'à des conférences telles que [DNS-OARC 30](https://www.dns-oarc.net/oarc30)  ([video](https://youtu.be/mH_elg9EUWw?t=680),
[slides](https://indico.dns-oarc.net/event/31/contributions/678/attachments/673/1102/dns_flag_day_panel.pdf)).

L'approche proposée pour le DNS flag day 2020 a été annoncée lors du [RIPE78](https://ripe78.ripe.net) par Petr Špaček, de CZ.NIC et Ondřej Surý,
de l'ISC ([video](https://ripe78.ripe.net/archives/video/28),
[slides](https://ripe78.ripe.net/presentations/53-plenary.pdf)). Cette fois, nous allons nous concentrer sur les problèmes de fragmentation IP des paquets DNS.

La fragmentation IP est un problème sur Internet aujourd'hui, en particulier avec les messages DNS larges. Et même si la fragmentation fonctionne, elle pourrait ne pas être assez sécurisée pour le DNS.

- Bonica R. et al, "[IP Fragmentation Considered Fragile](https://tools.ietf.org/html/draft-bonica-intarea-frag-fragile)", Work in Progress, Juillet 2018
- Huston G., "[IPv6, Large UDP Packets and the DNS](https://www.potaroo.net/ispcol/2017-08/xtn-hdrs.html)",  Août 2017
- Fujiwara K., "[Measures against cache poisoning attacks using IP fragmentation in DNS](https://indico.dns-oarc.net/event/31/contributions/692/)", Mai 2019

Ces problèmes peuvent être résolus en honorant une taille de tampon EDNS qui ne causera pas de fragmentation et en permettant au DNS de basculer d'UDP à TCP lorsque des tailles de tampon larges ne suffisent pas.

Note: Travail en cours
----------------------

Ce site web et certains aspects du DNS flag day 2020 sont toujours en cours de finalisation.
- La _date exacte_ pour le DNS Flag Day 2020 n'a pas encore été arrêtée.
- **Merci de noter** que les _tailles exactes des tampons EDNS_ n'ont pas encore été convenues, la taille approximative actuelle autour de 1200 (1220, 1232, ...) est pour limiter le risque de fragmentation en IPv6.

Néanmoins, les prérequis techniques sont déjà suffisament clairs et les opérateurs et  développeurs peuvent dores et déjà tester et reconfigurer leurs systèmes.

Si vous avez des commentaires ou des suggestions, merci de rejoindre la discussion sur la mailing-list [dns-operations](https://lists.dns-oarc.net/mailman/listinfo/dns-operations).

Action: Opérateurs de serveurs DNS faisant Autorité
---------------------------------------------------

En ce qui concerne le "DNS faisant Autorité", vous pouvez aider à résoudre ce genre de problèmes en répondant aux requêtes DNS sur TCP (port 53), _vérifiez aussi vos pare-feux !_

Vous devriez aussi utiliser une taille tampon EDNS qui ne causera pas de fragmentation, la recommandation ici est autour de 1220 octets, mais la valeur définitive est toujours en cours de discussion.

Enfin, _les serveurs DNS faisant Autorité **NE DOIVENT PAS** envoyer de réponses plus grandes que la taille du tampon EDNS demandée._

**NOUVEAU !!** Vous pouvez maintenant vérifier votre domaine en le rentrant dans le formulaire ci-dessous et en pressant "Test!". Ce testeur utilise l'[EDNS Compliance Tester de l'ISC](https://ednscomp.isc.org/) et vérifiera que son test `edns512tcp` passe avec succès (entre autres tests).

{% include 2020_checker.html lang=site.data.2020_checker.fr %}

Action: Opérateurs de serveurs DNS Récursifs
--------------------------------------------

En ce qui concerne le DNS Récursif, on retrouve plus ou moins les mêmes prérequis que pour le DNS faisant Autorité: répondre aux requêtes DNS sur TCP (port 53) et utilisation d'une taille de tampon EDNS  _(d'environ 1220 octets)_ qui ne causera pas de fragmentation. _N'oubliez pas de vérifier vos pare-feux !_

Enfin, dernière point important, _les résolveurs **DOIVENT** répéter les requêtes via TCP s'ils reçoivent une réponse UDP tronquée (avec le bit TC=1 défini) !_

Action: Fournisseurs de logiciels DNS
-------------------------------------

En tant que fournisseur de logiciel DNS, il est important de se **conformer aux standards** et d'utiliser une _**taille de tampon EDNS par défaut** (environ 1220 octets)_ qui ne causera pas de fragmentation.

Les standards pertinents sont principalement les [RFC 7766](https://tools.ietf.org/html/rfc7766), [RFC 6891 section 6.2.3.](https://tools.ietf.org/html/rfc6891#section-6.2.3)
et [RFC 6891 section 6.2.4.](https://tools.ietf.org/html/rfc6891#section-6.2.4).

La motivation pour ce changement est décrite dans les documents [IETF draft intarea-frag-fragile section 6.1](https://tools.ietf.org/html/draft-ietf-intarea-frag-fragile-10#section-6.1) et [IETF draft iab-protocol-maintenance](https://datatracker.ietf.org/doc/draft-iab-protocol-maintenance/).

Comment tester?
---------------

Vous pouvez utiliser le testeur de l'ISC indiqué dans la section [Action: Opérateurs de serveurs DNS faisant Autorité](#action-opérateurs-de-serveurs-dns-faisant-autorité).

Vous pouvez également tester en utilisant les lignes de commande suivantes:

```shell
$ dig +tcp @auth_IP yourdomain.example.
$ dig +tcp @resolver_IP yourdomain.example.
$ dig @resolver_IP test.knot-resolver.cz. TXT
```

Toutes les requêtes DNS doivent aboutir et les commandes avec ou sans l'option `+tcp` doivent retourner la même chose. Si vous êtes un fournisseur de service, vous pouvez aussi tester vos serveurs faisant autorité et récursifs en autorisant DNS sur TCP et en changeant la configuration pour la taille par défaut du tampon EDNS:

- BIND
```
options {
    edns-udp-size 1220;
    max-udp-size 1220;
};
```

- Knot DNS
```
server:
    max-udp-payload: 1220
```

- Knot Resolver
```
net.bufsize(1220)
```

- PowerDNS Authoritative
```
udp-truncation-threshold=1220
```

- PowerDNS Recursor
```
edns-outgoing-bufsize=1220
udp-truncation-threshold=1220
```

- Unbound
```
server:
    edns-buffer-size: 1220
```

- NSD
```
server:
    ipv4-edns-size: 1220
    ipv6-edns-size: 1220
```

La configuration ci-dessus n'aura aucun impact si tout fonctionne correctement, mais certaines requêtes échoueront si TCP n'est pas disponible.

Précédents flag days
====================

Voici une liste des précédents flag days:
- [2019 EDNS workarounds](/2019/)

Qui est derrière DNS flag day?
==============================

L'initiative DNS flag day est soutenue par les fournisseurs de logiciels DNS et par les fournisseurs de service, et supportée par [DNS Operations, Analysis, and Research Center (DNS-OARC)](https://www.dns-oarc.net/), dont la plupart des acteurs de la communité est membre.

Si vous avez des questions techniques à propos du DNS flag day, vous pouvez souscrire à la [mailing-liste DNS-operations](https://lists.dns-oarc.net/mailman/listinfo/dns-operations) et les poser sur cette mailing-liste.

Rentrer en contact
==================

Pour les demandes média et presse, envoyez un email à media (at) dns-oarc.net en indiquant "DNS Flag Day" dans le sujet de l'email.

- Web: <https://dnsflagday.net/>
- Twitter: <https://twitter.com/dnsflagday>
- Annonces: <https://lists.dns-oarc.net/mailman/listinfo/dns-announce>
- Discussion: <https://lists.dns-oarc.net/mailman/listinfo/dns-operations>

Supporters
==========

{% include 2020_supporters.html %}

FAQ
===

- Q: Est-ce que DNS sur UDP est fini ?

  A: Non, DNS sur UDP sera toujours le transport principal car il est hautement évolutif, efficace au niveau ressources, et tolérant aux pannes.

- Q: TL;DR [RFC 7766](https://tools.ietf.org/html/rfc7766)

  A: DNS **DOIT** fonctionner sur TCP!

- Q: Est-ce que tout va s'arrêter de fonctionner le <date à confirmer> 2020 ?

  A: Non pas tout ! Seul un faible pourcentage de sites sera affecté, et ce nombre diminue au fur et à mesure que les opérateurs s'affairent pour mettre à jour leurs systèmes. A la date qui sera annoncée, les opérateurs des principaux résolveurs DNS arrêteront de tolérer les comportements qui ne respectent pas les standards publiés, donc ce changement n'affectera pas les sites qui suivent les standards. A la date annoncée, les éditeurs de logiciels DNS changeront le comportement _**dans les nouvelles versions logicielles**_, donc ce changement affectera également petit à petit ceux qui opèrent leurs propres résolveurs DNS.

- Q: Pourquoi le transport TCP est-il si important ?

  A: Bloquer TCP, ou ne pas être capable de supporter TCP, pourrait mener à des échecs de résolution et des timeouts applicatifs.

     Qui plus est, normalement TCP implémente une fonctionnalité nommée "Path MTU Discovery" qui peut éviter la fragmentation des segments TCP. TCP rend aussi plus difficile l'usurpation des réponses DNS.

     Enfin, le support de TCP était recommandé depuis les toutes premières spécifications du standard, mais certains implémenteurs ont interprété cela comme optionnel, donc il y a environ 10 ans (Août 2010), la [RFC 5966](https://tools.ietf.org/html/rfc5966) a clarifié le fait que le support de TCP était absolument nécessaire pour être conforme aux standard Internet pour le DNS.

- Q: Pourquoi ne pas simplement tout basculer en TCP ?

  A: DNS sur UDP est très bien pour les petits paquets qui ne requièrent pas de fragmentation IP. Il peut toujours être utilisé pour ce type de messages DNS, qui constituent la majeure partie du trafic Internet. Tout basculer en TCP rajouterait une charge inutile sur les services DNS. Il serait faisable en principe d'avoir uniquement DNS sur TCP, mais c'est plus lent que DNS sur UDP, dans le meilleur des cas par un facteur de 4 (en se réferrant au travail de Baptiste Jonglez [présenté au RIPE76](https://ripe76.ripe.net/archives/video/63/)), et cela pourrait limiter le nombre de connexions simultanées qu'un serveur DNS peut accepter.

- Q: Est-ce que ce Flag Day nécessitera une mise à jour logicielle ?

  A: Un logiciel DNS qui suit les standards publiés n'aura pas besoin d'être mis à jour et continuera à fonctionner. Par exemple, les versions supportées des principaux serveurs DNS open source continueront de fonctionner correctement.

     Le bon fonctionnement d'un déploiement spécifique dépendra de la façon dont le logiciel a été configuré, et de la configuration du pare-feu utilisé. Les logiciels DNS moins utilisés, personnalisés ou propriétaires pourraient ne pas être conformes, et nécessiter une mise à jour.

- Q: Est-ce que cette obligation de DNS sur TCP est un standard DNS ?

  A: Absolument. La [RFC 1035](https://tools.ietf.org/html/rfc1035)
     "Section 4.2 Transport" liste explicitement les transports UDP et TCP comme égaux. Qui plus est, la [RFC 7766](https://tools.ietf.org/html/rfc7766) rend l'implémentation de DNS sur TCP obligatoire pour les éditeurs DNS. S'il reste à la discrétion de l'opérateur d'autoriser le traffic sur le port TCP 53, l'incapacité de répondre en TCP peut entrainer des échecs de résolution dans le cas où les réponses DNS sont plus grandes que la taille du tampon EDNS choisie côté client.

- Q: Je souhaite apporter mon support à DNS flag day 2020, comment puis-je aider ?

  A: Excellente initiative !  Vous pouvez vous rajouter en tant que supporter en créant une [pull request](https://github.com/dns-violations/dnsflagday/pulls) et en rajoutant votre nom, logo et URL à `_data/2020_supporters.yml`, ou en créant une [issue](https://github.com/dns-violations/dnsflagday/issues/new) et en fournissant les mêmes informations.
