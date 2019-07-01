---
title: 2020
lang: es
redirect_from:
  - /es/
  - /2020/es/
flagdayyear: 2020
---

{% include 2020_languages.html %}

<img class="logo float-right" alt="DNS flag day logo" src="/images/DNS_Flag.svg">

¡Gracias!
=========

El [DNS flag day 2019](/2019/) fue un acontecimiento muy exitoso. La comunidad de
Internet trabajó en conjunto y corrigió los problemas que causaban demoras en todos
los usuarios de Internet. Quisiéramos agradecer a todos los operadores que cooperaron
y ayudaron en hacer de Internet un mejor lugar.

Un resumen del "DNS flag day" pasado y de los futuros se puede encontrar en:
[https://youtu.be/mH_elg9EUWw?t=649](https://youtu.be/mH_elg9EUWw?t=649).

Contenido
=========
- [¿Qué viene ahora?](#qué-viene-ahora)
- [DNS Flag Day 2020](#dns-flag-day-2020)
  - [Nota: Trabajo en marcha](#nota-trabajo-en-marcha)
  - [Acción: Operadores de DNS Autoritativos](#acción-operadores-de-dns-autoritativos)
  - [Acción: Operadores de DNS Resolutor](#acción-operadores-de-dns-resolutor)
  - [Acción: Proveedores de software DNS](#acción-proveedores-de-software-dns)
  - [¿Cómo probar?](#cómo-probar)
- ["Flag days" anteriores](#flag-days-anteriores)
- [¿Quién está detrás del "DNS flag day"?](#quién-está-detrás-del-dns-flag-day)
- [Contacto](#contacto)
- [Apoyan](#apoyan)
- [FAQ](#faq)

¿Qué viene ahora?
=================

El próximo "DNS flag day" está siendo planificado en estos momentos. Se
enfocará en los problemas operacionales y de seguridad en el DNS causados
por la fragmentación de los paquetes IP (Internet Protocol).

Por favor suscríbase a la [lista de correo dns-announce](https://lists.dns-oarc.net/mailman/listinfo/dns-announce) (en inglés), o siga a [@dnsflagday en Twitter](https://www.twitter.com/dnsflagday)
para recibir avisos apenas se encuentre disponible más información.

DNS Flag Day 2020
=================

La comunidad DNS ha estado discutiendo persistentemente sobre
problemas de interoperabilidad y desempeño del sistema DNS en
listas de correo de la industria y en conferencias como
el panel de discusión en [DNS-OARC 30](https://www.dns-oarc.net/oarc30)
([video](https://youtu.be/mH_elg9EUWw?t=680),
[diapositivas](https://indico.dns-oarc.net/event/31/contributions/678/attachments/673/1102/dns_flag_day_panel.pdf)).

El plan propuesto para el DNS flag day 2020 fue anunciado en
[RIPE78](https://ripe78.ripe.net) por Petr Špaček, CZ.NIC y Ondřej Surý,
ISC ([video](https://ripe78.ripe.net/archives/video/28),
[diapositivas](https://ripe78.ripe.net/presentations/53-plenary.pdf)). En esta
oportunidad nos enfocaremos en los problemas con la fragmentación IP de
los paquetes DNS.

La fragmentación IP es un problema actual en Internet, especialmente cuando
se trata de largos mensajes DNS. Pero incluso cuando la fragmentación funciona,
puede no ser suficientemente seguro para el DNS.
- Bonica R. et al, "[IP Fragmentation Considered Fragile](https://tools.ietf.org/html/draft-bonica-intarea-frag-fragile)", Work in Progress, July 2018
- Huston G., "[IPv6, Large UDP Packets and the DNS](http://www.potaroo.net/ispcol/2017-08/xtn-hdrs.html)",  August 2017
- Fujiwara K., "[Measures against cache poisoning attacks using IP fragmentation in DNS](https://indico.dns-oarc.net/event/31/contributions/692/)", May 2019

Estos problemas se solucionan al respetar el tamaño de "buffer" EDNS
que no cause fragmentación, y permitiendo que el DNS se traslade
desde UDP a TCP cuando no es suficiente con los tamaños grandes de buffer.

Nota: Trabajo en marcha
-----------------------

Este sitio web y algunos aspectos del DNS flag day 2020 son aún un trabajo
en progreso.
- La _fecha exacta_ para el DNS Flag Day 2020 no está aún determinada.
- **Tenga en cuenta** que los _tamaños exactos recomendados para el buffer EDNS_
no se han acordado aún, siendo la actual estimación alrededor de 1200
(1220, 1232, ...) para limitar el riesgo de fragmentación en IPv6.

No obstante, los requisitos técnicos ya son lo suficientemente claros
como para que los operadores y desarrolladores puedan comenzar a
preparse, haciendo pruebas y corrigiendo sus sistemas.

Si tiene comentarios o sugerencias por favor únase a la discusión en
la lista de correo
[dns-operations](https://lists.dns-oarc.net/mailman/listinfo/dns-operations).

Acción: Operadores de DNS Autoritativos
---------------------------------------

En el lado autoritativo, lo que debería hacer para solucionar estos
problemas es responder consultas DNS sobre TCP (puerto 53).
_¡Recuerde revisar también su(s) cortafuegos (firewalls)!_

También debería usar un tamaño de buffer EDNS que no cause fragmentación.
El valor recomendado es alrededor de 1220 bytes, pero está aún en
discusión.

Y por último, _¡los servidores DNS Autoritativos **NO DEBEN** enviar
respuestas más grandes que el tamaño del buffer EDNS solicitado!_

**¡NUEVO!** Ya puede revisar su dominio ingresándolo acá abajo y presionando "Test!".
Esta herramienta de prueba usa el [EDNS Compliance Tester de ISC](https://ednscomp.isc.org/)
y revisará que la prueba `edns512tcp` es exitosa, entre otras pruebas de
compatibilidad general.

{% include 2020_checker.html lang=site.data.2020_checker.es %}

Acción: Operadores de DNS Resolutor
-----------------------------------

En el lado del resolutor ("resolver"), son más o menos los mismos
requisitos que para el autoritativo: responder consultas DNS sobre
TCP (puerto 53) y usar un tamaño de buffer EDNS que no cause
fragmentación _(~1220 bytes)_. _¡Recuerde revisar su(s) cortafuegos (firewalls)!_.

Y por último es muy importante que _¡los resolutores **DEBEN** repetir
sus consultas sobre TCP si reciben una respuesta UDP truncada (con el
bit TC=1 encendido)!_

**¡El sitio de pruebas para clientes de un resolutor DNS está en desarrollo!**

Acción: Proveedores de software DNS
-----------------------------------

Como proveedor de software DNS es importante ser **compatible con los estándares**
y usar un _**tamaño por defecto de buffer EDNS** (~1220)_ que no cause
fragmentación.

Los estándares relevantes son principalmente los
[RFC 7766](https://tools.ietf.org/html/rfc7766),
[RFC 6891 sección 6.2.3.](https://tools.ietf.org/html/rfc6891#section-6.2.3)
y [RFC 6891 sección 6.2.4.](https://tools.ietf.org/html/rfc6891#section-6.2.4).

La motivación para el cambio está descrita en el [IETF draft intarea-frag-fragile section 6.1](https://tools.ietf.org/html/draft-ietf-intarea-frag-fragile-10#section-6.1) y [IETF draft iab-protocol-maintenance](https://datatracker.ietf.org/doc/draft-iab-protocol-maintenance/).

¿Cómo probar?
-------------

Si es titular de un nombre de dominio u operador de un DNS autoritativo,
puede usar nuestra herramienta de pruebas basada en web para revisar un
dominio. La puede encontrar en la sección
[Acción: Operadores de DNS Autoritativos](#action-authoritative-dns-operators).

Estamos trabajando en una herramienta de pruebas basada en web para
clientes y operadores de resolutores DNS. Una vez que esté lista la
podrán encontrar en esta página.

También puede probar usando los siguientes comandos CLI:

```shell
$ dig +tcp @auth_IP yourdomain.example.
$ dig +tcp @resolver_IP yourdomain.example.
$ dig @resolver_IP test.knot-resolver.cz. TXT
```

Todas las consultas DNS deben ser exitosas, y los comandos con la
opción `+tcp` y sin ella deben retornar lo mismo. Si es un proveedor
de servicio también puede probar sus servicios autoritativos y
resolutores activando DNS sobre TCP y cambiando la configuración
con el tamaño por defecto de buffer EDNS:

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

La configuración indicada no ocasionará cambios visibles en caso que
todo funcione correctamente, pero algunas consultas fallarán en su
resolución si el transporte TCP no está disponible.

Flag days anteriores
====================

Esta es una lista de los "flag days" anteriores:
- [2019, parches provisorios en  EDNS](/2019/)

¿Quién está detrás del DNS flag day?
====================================

El esfuerzo DNS Flag Day está empujado por la comunidad de proveedores
de software y servicios DNS, y es apoyado por
[El Centro de Operaciones, Análisis e Investigación del DNS (DNS-OARC)](https://www.dns-oarc.net/)
del cual la mayoría de la comunidad es miembro.

Si tiene consultas técnicas acerca del DNS flag day, puede unirse a
[la lista de correo DNS-operations](https://lists.dns-oarc.net/mailman/listinfo/dns-operations)
y preguntar ahí (solo en inglés).

Contacto
============

Para consultas de prensa y medios, por favor utilice el correo
media (at) dns-oarc.net y por favor incluya el texto
“DNS Flag Day" en el asunto ("subject") del correo.

- Web: <https://dnsflagday.net/>
- Twitter: <https://twitter.com/dnsflagday>
- Anuncios: <https://lists.dns-oarc.net/mailman/listinfo/dns-announce>
- Discusión: <https://lists.dns-oarc.net/mailman/listinfo/dns-operations>

Apoyan
======

{% include 2020_supporters.html %}

FAQ
===

- P: ¿Está muerto DNS sobre UDP?

  R: No, El DNS sobre UDP seguirá siendo el principal medio de transporte, ya que es
     escalable masivamente, muy eficiente en recursos y tolerante a fallas.

- P: Un resumen de [RFC 7766](https://tools.ietf.org/html/rfc7766) ("TL;DR")

  R: ¡El DNS **DEBE** funcionar sobre TCP!

- P: ¿Todo se romperá en la fecha-por-decidir del 2020?

  R: ¡No todo! Solo un pequeño porcentaje de sitios está afectado, y este número
     se está reduciendo a medida que los operadores trabajan en solucionar sus
     problemas. En la fecha pronta a anunciar los operadores de resolutores
     DNS más importantes dejarán de tolerar las malas conductas que no respetan
     los estándares, así que este cambio no afectará a los sitios que sí respetan
     los estándares. Además, en la fecha anunciada, los proveedores de software
     DNS cambiarán su comportamiente **en las nuevas versiones de su software**,
     por lo que este cambio irá afectando gradualmente a quienes operan sus propios
     resolutores DNS.

- P: ¿Por qué es tan importante el soporte TCP?

  R: El bloqueo a TCP, o fallar en el soporte TCP, puede ocasionar fallas
     en la resolución y tiempos de espera agotados a nivel de las aplicaciones.

     Asimismo, TCP normalmente implementa "Path MTU Discovery" y puede evitar
     la fragmentación IP en los segmentos TCP. También hace más difícil la
     falsificación ("spoof") de respuestas DNS.

     Finalmente, el soporte TCP ha sido recomendado desde las especificaciones
     iniciales del estándar, pero algunos implementadores consideraron que
     eso podía interpretarse como que TCP era opcional. Por esto, cerca de diez
     años atrás (Agosto 2010), el
     [RFC 5966](https://tools.ietf.org/html/rfc5966) dejó en claro que el
     soporte TCP es un requisito absoluto para la compatibilidad con los
     estándares DNS en Internet.

- P: ¿Por qué no cambiarse a sólo TCP?

  R: El DNS sobre UDP es suficiente para los paquetes pequeños que no
     requieren fragmentación IP. Todavía puede ser usado para esa clase de
     mensajes DNS, las que forman la mayoría del tráfico en Internet.
     Cambiarse completamente a TCP puede causar estrés en los servicios
     DNS. Aunque en principio el DNS sólo sobre TCP debería ser posible,
     es más lento que el DNS sobre UDP por un factor de 4 en el mejor de
     los casos (basado en el trabajo de Baptiste Jonglez
     [presentado en RIPE76](https://ripe76.ripe.net/archives/video/63/)),
     y puede limitar el número de conexiones DNS que un servidor puede
     aceptar simultáneamente.

- P: ¿Este Flag Day requerirá una actualización de software?

  R: El software DNS que respeta los estándares no requiere actualización,
     y seguirá funcionando. Por ejemplo, las versiones soportadas de los
     servidores DNS de código abierto más importantes continuarán funcionando
     correctamente.

     Si un desarrollo en particular es compatible o no depende en la forma
     en que el software está configurado, y en la configuración de cortafuegos
     usada en ese sitio. El software DNS menos comúnmente usado, o los sistemas
     propietarios, pueden no ser compatibles, y pueden requerir actualizaciones.

- P: ¿El requisito de DNS sobre TCP es actualmente estándar?

  R: Sí, lo es.  El [RFC 1035](https://tools.ietf.org/html/rfc1035)
     Sección 4.2 Transport, explícitamente lista ambos transportes UDP y
     TCP como iguales. Por otra parte, el [RFC 7766](https://tools.ietf.org/html/rfc7766)
     hace el requerimiento de DNS sobre TCP mandatorio de implementar para los
     proveedores DNS. Aunque es discreción del operador el permitir tráfico
     en el puerto 53 TCP, la incapacidad de responder sobre TCP puede llevar
     a fallos de resolución, en el caso de respuestas DNS más grandes que el
     tamaño del buffer EDNS elegido en el lado del cliente.

- P: Me gustaría apoyar el DNS flag day 2020, ¿qué puedo hacer?

  R: ¡Es genial oírlo! Puede agregarse usted mismo como partidario
     haciendo un [pull request](https://github.com/dns-violations/dnsflagday/pulls) y
     agregar su nombre, imagen y URL en `_data/2020_supporters.yml`; o ingresar
     un [ticket](https://github.com/dns-violations/dnsflagday/issues/new)
     entregando la misma información.
