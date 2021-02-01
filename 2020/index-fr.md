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

Le [DNS Flag Day 2019](/2019/) a été un succès. La communauté Internet a travaillé de manière concertée, ce qui a permis de résoudre des problèmes qui causaient des délais pour les utilisateurs d'Internet. Nous souhaitons remercier tous les opérateurs qui ont coopéré et ont contribué à un Internet meilleur.

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

Le prochain DNS Flag Day est actuellement en cours de planification. Il se concentrera sur les problèmes opérationnels et de sécurité dans le DNS, causés par la fragmentation des packets IP (Internet Protocol).

Veuillez vous abonner à la [mailing list dns-announce](https://lists.dns-oarc.net/mailman/listinfo/dns-announce) ou suivre [@dnsflagday sur Twitter](https://www.twitter.com/dnsflagday) pour recevoir une notification quand davantage d'informations seront disponibles.

DNS Flag Day 2020
=================

La communauté DNS a discuté des problèmes persistants d'interoperabilité et de performance du DNS sur les mailing-lists, ainsi qu'à des conférences telles que [DNS-OARC 30](https://www.dns-oarc.net/oarc30)  ([video](https://youtu.be/mH_elg9EUWw?t=680),
[slides](https://indico.dns-oarc.net/event/31/contributions/678/attachments/673/1102/dns_flag_day_panel.pdf)).

L'approche proposée pour le DNS Flag Day 2020 a été annoncée lors du [RIPE78](https://ripe78.ripe.net) par Petr Špaček, de CZ.NIC et Ondřej Surý,
de l'ISC ([video](https://ripe78.ripe.net/archives/video/28),
[slides](https://ripe78.ripe.net/presentations/53-plenary.pdf)). Cette année, nous allons nous concentrer sur les problèmes de fragmentation IP des paquets DNS.

La fragmentation IP n'est pas fiable sur Internet aujourd'hui, et peut causer des problèmes de transmission quand de larges messages DNS sont envoyés via UDP. Même quand la fragmentation fonctionne, elle pourrait ne pas être sécurisée; il est en théorie possible d'usurper une *partie* d'un message DNS fragmenté, sans que cela soit facilement détectable par la partie recevant le message.

- Bonica R. et al, "[IP Fragmentation Considered Fragile](https://tools.ietf.org/html/draft-bonica-intarea-frag-fragile)", Work in Progress, Juillet 2018
- Huston G., "[IPv6, Large UDP Packets and the DNS](https://www.potaroo.net/ispcol/2017-08/xtn-hdrs.html)",  Août 2017
- Fujiwara K., "[Measures against cache poisoning attacks using IP fragmentation in DNS](https://indico.dns-oarc.net/event/31/contributions/692/)", Mai 2019

Ces problèmes peuvent être résolus en a) configurant les serveurs pour qu'ils limitent les messages envoyés en UDP à une taille qui ne déclenchera pas la fragmentation sur les liens réseaux typiques,  et b) en s'assurant que les serveurs DNS puissent basculer d'UDP à TCP quand une réponse DNS est trop grande pour rentrer dans cette taille tampon limitée.

Considérations sur la Taille des Messages
-----------------------------------------
La taille optimale d'un message DNS pour éviter la fragmentation IP, tout en minimisant l'utilisation de TCP, dépendra du MTU (Maximum Transmission Unit) du lien réseau physique qui connecte les deux parties. Malheureusement, il n'y a pas encore de mécanisme standard pour les fournisseurs de serveur DNS permettant d'accéder à cette information. D'ici à ce qu'un tel standard existe, nous recommandons que la taille tampon EDNS soit, par _défaut_, configurée sur une valeur assez petite pour éviter la fragmentation sur la majorité des liens réseaux utilisés aujourd'hui.

Une taille tompon EDNS de 1232 bits évitera une fragmentation sur presque tous les réseaux actuels. Cette valeur se base sur un MTU de 1280, qui est requis par la spécification IPv6, moins 48 bits pour les entêtes IPv6 et UDP.

Veuillez noter que cette recommandation est pour une valeur par _défaut_, et est donc à utiliser lorsqu'aucune autre meilleure information n'est disponible. Les opérateurs peuvent toujours configurer des valeurs plus grandes si leurs réseaux supportent des trames de données plus grandes et s'ils sont certains qu'il n'y a pas de risque de fragmentation IP. Les fournisseurs de serveurs DNS peuvent utiliser des tailles de paquet plus grandes (ou plus petites) si de meilleures information à propos du MTO sont rendues disponibles par le kernel. 

Note: Travail en cours
----------------------

Ce site web et certains aspects du DNS flag day 2020 sont toujours en cours de finalisation.
- La _date exacte_ pour le DNS Flag Day 2020 n'a pas encore été arrêtée.

Néanmoins, les prérequis techniques sont déjà suffisament clairs et les opérateurs et développeurs peuvent dores et déjà tester et reconfigurer leurs systèmes.

Si vous avez des commentaires ou des suggestions, merci de rejoindre la discussion sur la mailing-list [dns-operations](https://lists.dns-oarc.net/mailman/listinfo/dns-operations).

Action: Opérateurs de serveurs DNS faisant Autorité
---------------------------------------------------

Si vous êtes un opérateur de serveur DNS faisant Autorité, ce que vous pouvez faire pour contribuer est de vous assurer que vos serveurs DNS peuvent répondre aux requêtes DNS sur TCP (port 53). _Vérifiez aussi vos pare-feux !_ car certains bloquent TCP/53.

Vous devriez aussi configurer vos serveurs pour négocier une taille tampon EDNS qui ne causera pas de fragmentation. La recommandation ici est de 1232 bits.

_Les serveurs DNS faisant Autorité **NE DOIVENT PAS** envoyer de réponses plus grandes que la taille du tampon EDNS demandée._

Vous pouvez maintenant tester vos serveurs en rentrant votre domaine dans le formulaire ci-dessous et en pressant "Test!". Ce testeur utilise l'[EDNS Compliance Tester de l'ISC](https://ednscomp.isc.org/) et vérifiera que son test `edns512tcp` passe avec succès (entre autres tests).

{% include 2020_checker.html lang=site.data.2020_checker.fr %}

Action: Opérateurs de serveurs DNS Récursifs
--------------------------------------------

En ce qui concerne le DNS Récursif, on retrouve plus ou moins les mêmes prérequis que pour le DNS faisant Autorité: répondre aux requêtes DNS sur TCP (port 53) et utilisation d'une taille de tampon EDNS  _de 1232 bits_ qui ne causera pas de fragmentation. _N'oubliez pas de vérifier vos pare-feux pour éviter les problèmes de DNS sur TCP !_

Enfin, dernière point important, _les résolveurs **DOIVENT** renvoyer les requêtes via TCP s'ils reçoivent une réponse UDP tronquée (avec le bit TC=1 défini) !_

**NOUVEAU !** Cet outil de vérification testera votre navigateur, votre système et le résolveur DNS de votre FAI, en chargeant une image à partir d'une URL spécifique qui peut uniquement être résolue si le dernier résolveur DNS qui requête le DNS faisant Autorité supporte TCP. Pour plus d'information, consultez la page [Check My DNS](https://cmdns.dev.dns-oarc.net) qui est utilisée par cet outil. 

{% include 2020_cli_checker.html lang=site.data.2020_checker.fr %}

Action: Fournisseurs de logiciels DNS
-------------------------------------

Il est important pour les fournisseurs de logiciel DNS de se **conformer aux standards** et d'utiliser une _**taille de tampon EDNS par défaut** (1232 bits)_ qui ne causera pas de fragmentation.

Les standards pertinents sont principalement les [RFC 7766](https://tools.ietf.org/html/rfc7766), [RFC 6891 section 6.2.3.](https://tools.ietf.org/html/rfc6891#section-6.2.3)
et [RFC 6891 section 6.2.4.](https://tools.ietf.org/html/rfc6891#section-6.2.4).

La motivation pour ce changement est décrite dans les documents [IETF draft intarea-frag-fragile section 6.1](https://tools.ietf.org/html/draft-ietf-intarea-frag-fragile-10#section-6.1) et [IETF draft iab-protocol-maintenance](https://datatracker.ietf.org/doc/draft-iab-protocol-maintenance/).

Comment tester?
---------------

Si vous êtes le propriétaire d'un domaine ou l'opérateur d'un serveur DNS faisant Autorité, vous pouvez utiliser notre outil de vérification en ligne pour tester votre domaine; vous pouvez le trouver dans la section [Action: Opérateurs de serveurs DNS faisant Autorité](#action-opérateurs-de-serveurs-dns-faisant-autorité).

Notre outil de vérification en ligne pour les clients et les opérateurs de résolveurs DNS se trouve dans la section [Action: Opérateurs de serveurs DNS Récursifs](#action-opérateurs-de-serveurs-dns-récursifs).

Vous pouvez également tester en utilisant les lignes de commande suivantes:

```shell
$ dig +tcp @auth_IP yourdomain.example.
$ dig +tcp @resolver_IP yourdomain.example.
$ dig @resolver_IP test.knot-resolver.cz. TXT
```

Toutes les requêtes DNS doivent aboutir et les commandes avec ou sans l'option `+tcp` doivent retourner la même chose.

Si vous êtes un FAI, vous pouvez tester vos serveurs faisant autorité et récursifs en changeant la configuration pour la taille par défaut du tampon EDNS:

{% include 2020_server_configs.md %}

La configuration ci-dessus n'aura aucun impact si tout fonctionne correctement, mais certaines requêtes échoueront si TCP n'est pas disponible.

Précédents flag days
====================

Voici une liste des précédents Flag Days:
- [2019 EDNS workarounds](/2019/)

Qui est derrière DNS Flag Day?
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

- Q: TL;DR [RFC 7766](https://tools.ietf.org/html/rfc7766)

  A: DNS **DOIT** fonctionner sur TCP !

- Q: Est-ce que DNS sur UDP est fini ?

  A: Non, DNS sur UDP sera toujours le transport principal car il est hautement évolutif, efficace au niveau ressources, et tolérant aux pannes.

- Q: Est-ce que tout va s'arrêter de fonctionner le <date à confirmer> 2020 ?

  A: Non pas tout ! Seul un faible pourcentage de sites sera affecté. A la date qui sera annoncée, les fournisseurs de logiciels DNS changeront le comportement **dans les nouvelles versions logicielles**, afin que la taille par défaut d'un message sur UDP soit de 1232 bits. Au fur et à mesure que ces versions seront déployées, les sites qui retournent des réponses DNS supérieures à 1232 bits mais qui ne peuvent pas répondre aux requêtes DNS sur TCP, pourraient échouer à résoudre. Veuillez noter que ces sites sont déjà peu fiables aujourd'hui. 

- Q: Pourquoi le transport TCP est-il si important ?

  A: Bloquer TCP, ou ne pas être capable de supporter TCP, pourrait mener à des échecs de résolution et des timeouts applicatifs.

     Qui plus est, normalement TCP implémente une fonctionnalité nommée "Path MTU Discovery" qui peut éviter la fragmentation des segments TCP. TCP rend aussi plus difficile l'usurpation des réponses DNS.

     Enfin, le support de TCP était recommandé depuis les toutes premières spécifications du standard, mais certains implémenteurs ont interprété cela comme optionnel, donc il y a environ 10 ans (Août 2010), la [RFC 5966](https://tools.ietf.org/html/rfc5966) a clarifié le fait que le support de TCP était absolument nécessaire pour être conforme aux standard Internet pour le DNS.

- Q: Pourquoi ne pas simplement tout basculer en TCP ?

  A: DNS sur UDP est très bien pour les petits paquets qui ne requièrent pas de fragmentation IP. Il peut toujours être utilisé pour ce type de messages DNS, qui constituent la majeure partie du trafic Internet. Tout basculer en TCP rajouterait une charge inutile sur les services DNS. Il serait faisable en principe d'avoir uniquement DNS sur TCP, mais c'est plus lent que DNS sur UDP, dans le meilleur des cas par un facteur de 4 (en se réferrant au travail de Baptiste Jonglez [présenté au RIPE76](https://ripe76.ripe.net/archives/video/63/)), et cela pourrait limiter le nombre de connexions simultanées qu'un serveur DNS peut accepter.

- Q: Et si nous voulons utiliser des tailles de paquets plus grandes dans le futur ?

  A: Notre but est simplement d'éviter la fragmentation IP en choisissant une taille de tampon EDNS _par défaut_ qui fonctionnera bien sur les réseaux d'aujourd'hui. Ce n'est pas un changement permanent aux spécifications DNS. Les valeurs par défaut peuvent toujours être remplacées localement si une meilleure information est disponible. Si une méthode standard pour récupérer le MTU depuis le kernel devient disponible, elle peut également être utilisée.

- Q: Est-ce que ce Flag Day nécessitera une mise à jour logicielle ?

  A: Dans la plupart des cas, non. Un logiciel DNS qui suit les standards publiés n'aura pas besoin d'être mis à jour et continuera à fonctionner. Les versions supportées des principaux serveurs DNS open source continueront de fonctionner correctement. Ces logiciels DNS peuvent tous être configurés pour utiliser la taille tampon EDNS recommandée, même s'ils n'ont pas encore été mis à jour pour utiliser la taille par défaut.

     Le bon fonctionnement d'un déploiement spécifique dépendra de la façon dont le logiciel a été configuré, et de la configuration du pare-feu utilisé. Les logiciels DNS moins utilisés, personnalisés ou propriétaires pourraient ne pas être conformes, et nécessiter une mise à jour.

- Q: Est-ce que cette obligation de DNS sur TCP est un standard DNS ?

  A: Absolument. La [RFC 1035](https://tools.ietf.org/html/rfc1035)
     "Section 4.2 Transport" liste explicitement les transports UDP et TCP comme égaux. Qui plus est, la [RFC 7766](https://tools.ietf.org/html/rfc7766) rend l'implémentation de DNS sur TCP obligatoire pour les éditeurs DNS. S'il reste à la discrétion de l'opérateur d'autoriser le traffic sur le port TCP 53, l'incapacité de répondre en TCP peut entrainer des échecs de résolution dans le cas où les réponses DNS sont plus grandes que la taille du tampon EDNS choisie côté client.

- Q: Je souhaite apporter mon support à DNS flag day 2020, comment puis-je aider ?

  A: Excellente initiative !  Vous pouvez vous rajouter en tant que supporter en créant une [pull request](https://github.com/dns-violations/dnsflagday/pulls) et en rajoutant votre nom, logo et URL à `_data/2020_supporters.yml`, ou en créant une [issue](https://github.com/dns-violations/dnsflagday/issues/new) et en fournissant les mêmes informations.
