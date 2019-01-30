---
title: 2019
lang: es
redirect_from:
  - /es/
---

¿Qué está pasando?
==================
El [DNS](https://es.wikipedia.org/wiki/Sistema_de_nombres_de_dominio) actual sufre de demoras innecesarias y dificultad para desarrollar nuevas funcionalidades. Para remediar este problema, los [proveedores de software DNS](#apoyan) y [sistemas de DNS públicos](#apoyan) eliminarán ciertos parches provisorios el 1 de Febrero de 2019.

Este cambio solo afectará a sitios que operan software que no respeta los estándares. ¿Te afectará a ti?

Dueños de dominios
==================
Por favor revise si su dominio está correcto:
{% include checker.html lang=site.data.checker.es %}

Operadores de "resolvers" DNS
=============================

En los días cercanos al 1 de febrero de 2019, los más importantes proveedores de software resolutor ("resolver") de código abierto, lanzarán nuevas actualizaciones que implementarán un manejo estricto del estándar EDNS. Específicamente, las versiones que introducen estos cambios son:

* BIND 9.13.3 (development) y 9.14.0 (production)
* Knot Resolver ya tiene un manejo estricto de EDNS en todas sus versiones actuales
* PowerDNS Recursor 4.2.0
* Unbound 1.9.0

Además los [sistemas de DNS público indicados más abajo](#apoyan) también aplicarán estos cambios.

Operadores de servidores DNS
============================
Para revisar su compatibilidad con EDNS le recomendamos usar el formulario de arriba, que entrega resultados simplificados para un dominio.

También es posible revisar su servidor DNS usando la herramienta [ednscomp](https://ednscomp.isc.org/ednscomp) que entrega un detalle técnico detallado. Ingrese el nombre de alguno de los dominios hospedados en su servidor DNS en el campo `zone name` y presione el botón `Submit`.

El resultado de las pruebas de [ednscomp](https://ednscomp.isc.org/ednscomp) debe ser el mensaje en verde `All Ok`.

Una infraestructura mínima que permita sobrevivir el "DNS flag day" no debe tener ningún resultado `timeout` (tiempo de espera agotado) en ninguna de las pruebas de DNS "plain" ni "EDNS version 0", de la herramienta [ednscomp](https://ednscomp.isc.org/ednscomp). Por favor tenga en cuenta que una infraestructura que sólo cumpla este mínimo no será compatible con los estándares y tendrá otros problemas tarde o temprano. Por esta razón **recomendamos encarecidamente obtener la compatibilidad completa con EDNS (todas las pruebas en `ok`)** en vez de solo preocuparse por lo mínimo, para evitar problemas en el futuro.

Si hay algún problema, la herramienta ednscomp entregará una explicación para cada prueba fallida. Las errores típicos son causados por:
* software DNS que funciona incorrectamente
* configuración de cortafuegos ("firewall") incorrecta

Para solucionar estos problemas por favor actualice su software DNS a la última versión estable, y pruebe otra vez. Si las pruebas siguen fallando, por favor revise la configuración del cortafuegos.

**Los cortafuegos no deben descartar paquetes DNS** con extensiones EDNS, incluyendo extensiones que aún son desconocidas en el momento. El software moderno de DNS puede desarrollar nuevas extensiones (por ejemplo [DNS cookies](https://tools.ietf.org/html/rfc7873) para protegerse de ataques DoS). Los cortafuegos que descartan paquetes DNS con estas extensiones están empeorando la situación para todos, incluyendo ataques DoS de mayor magnitud, e induciendo mayor latencia en el tráfico DNS.

Ayuda con algunos proveedores:
* Las versiones antiguas de Juniper SRX descartan por defecto los paquetes EDNS - para deshabilitarlo, use: `# set security alg dns doctoring none`. Actualice a las últimas versiones para tener soporte EDNS.
* [Akamai](https://community.akamai.com/customers/s/article/CloudSecurityDNSFlagDayandAkamai20190115151216?language=en_US)
* [BlueCat está listo](https://www.bluecatnetworks.com/blog/dns-flag-day-is-coming-and-bluecat-is-ready/)
* [Citrix](https://support.citrix.com/article/CTX241493)
* [F5 BIG-IP](https://support.f5.com/csp/article/K07808381?sf206085287=1)
* [Infoblox](https://community.infoblox.com/t5/Community-Blog/DNS-Flag-Day/ba-p/15843?es_p=8449211)
* [Microsoft Azure](https://azure.microsoft.com/en-us/updates/azure-dns-flag-day/)

Desarrolladores de software DNS
===============================
El principal cambio es que los vendedores de software DNS arriba mencionados comenzarán a interpretar los "tiempos de espera agotados" ("timeouts") como una señal de problema en la red o en el servidor. A partir del 1 de Febrero de 2019, **no habrá ningún intento de desactivar EDNS** como reacción a un tiempo de espera agotado.

En la práctica esto significa que todos los servidores DNS que **no respondan a las consultas EDNS** serán tratados como *muertos*.

Por favor pruebe sus implementaciones usando la herramienta [ednscomp](https://ednscomp.isc.org/ednscomp) para asegurarse de manejar EDNS adecuadamente. El código fuente de la herramienta también se [encuentra disponible](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing).

Es importante notar que EDNS no es obligatorio de implementar todavía. Si decide no soportar EDNS, lo puede hacer, siempre que su software responda de acuerdo al [estándar EDNS, sección 7](https://tools.ietf.org/html/rfc6891#section-7).

Investigadores
==============
Existen algunas herramientas que pueden interesar a Investigadores y otros interesados, como Operadores de TLD:
 * [EDNS compliance statistics](https://ednscomp.isc.org/) generadas por [EDNS compliance test suite](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) por ISC
 * [EDNS zone scanner](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/) por CZ.NIC que busca evaluar el impacto en la práctica del día "DNS flag day"

Por favor revise las metodologías respectivas antes de interpretar los datos. En cualquier caso, no dude en ponerse en contacto con los autores de cada herramienta, utilizando los enlaces Gitlab indicados arriba.

Presentaciones
==============

 * LACNOG 2018: [presentación](http://www.lacnic.net/innovaportal/file/3207/1/edns-flag-day.pdf), [video](https://www.youtube.com/watch?v=_hCGucH0kRU)
 * DNS-OARC 28 (en inglés): [abstract](https://indico.dns-oarc.net/event/28/contributions/515/), [slides](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [video](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)
 * LOADAYS 2018 (en inglés): [abstract](http://loadays.org/pages/dnsupdate.html), [slides](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)
 * RIPE 76 (en inglés): [slides](https://ripe76.ripe.net/presentations/159-edns.pdf), [video](https://ripe76.ripe.net/archives/video/161)
 * DNS-OARC 29 (en inglés): [abstract](https://indico.dns-oarc.net/event/29/contributions/662/), [slides](https://indico.dns-oarc.net/event/29/contributions/662/attachments/634/1063/EDNS_Flag_Day_-_OARC29.pdf)

Herramientas
============

 * [ednscomp, prueba de compatibilidad EDNS de ISC](https://ednscomp.isc.org/), [código fuente](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)
 * [DNSViz](http://dnsviz.net/)

Contacto
========

 * Si tiene comentarios sobre este sitio web, por favor indíquelos en el [repositorio dnsflagday](https://github.com/dns-violations/dnsflagday/issues) en Github
 * Los comentarios sobre el resultado de las pruebas o de la [herramienta ednscomp](https://ednscomp.isc.org/ednscomp) pertenecen al proyecto [DNS Compliance Testing](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) en el Gitlab de ISC

Apoyan
======
{% include supporters.html %}

Lecturas adicionales
====================
 * [Minimal EDNS compliance requirements](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)
