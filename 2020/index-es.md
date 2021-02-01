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

Contenido
=========
- [¿Qué viene ahora?](#qué-viene-ahora)
- [DNS Flag Day 2020](#dns-flag-day-2020)
  - [Acción: Operadores de DNS Autoritativos](#acción-operadores-de-dns-autoritativos)
  - [Acción: Operadores de DNS Resolutor](#acción-operadores-de-dns-resolutor)
  - [Acción: Proveedores de software DNS](#acción-proveedores-de-software-dns)
  - [¿Cómo probar?](#cómo-probar)
- [¿Quién está detrás del "DNS flag day"?](#quién-está-detrás-del-dns-flag-day)
- [Contacto](#contacto)
- [Apoyan](#apoyan)
- [FAQ](#faq)
- ["Flag days" anteriores](#flag-days-anteriores)

¿Qué viene ahora?
=================

El próximo "DNS flag day" está planificado para el 1 de octubre de 2020. Se
enfocará en los problemas operacionales y de seguridad en el DNS causados
por la fragmentación de los paquetes IP (Internet Protocol).

En este sitio puede encontrar una descripción detallada del problema, los
cambios que se realizarán en 2020-10-01, y formas de probar sus sistemas antes
de la fecha.

También se puede suscribir a la [lista de correo dns-announce](https://lists.dns-oarc.net/mailman/listinfo/dns-announce) (en inglés), o siga a [@dnsflagday en Twitter](https://www.twitter.com/dnsflagday)
para recibir notificaciones antes cambios significativos.

La fecha exacta
===============

**2020-10-01** (Primero de octubre de 2020).

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

La fragmentación IP no es confiable en la Internet actual, y puede causar
fallas en la transmisión de los mensajes grandes de DNS enviados vía UDP.
Pero incluso cuando la fragmentación funciona,
puede no ser suficientemente seguro para el DNS. Es teóricamente posible
falsificar *partes* de un mensaje DNS fragmentado, sin que sea fácilmente
detectable en el receptor.
- Bonica R. et al, "[IP Fragmentation Considered Fragile](https://tools.ietf.org/html/draft-bonica-intarea-frag-fragile)", Work in Progress, July 2018
- Huston G., "[IPv6, Large UDP Packets and the DNS](https://www.potaroo.net/ispcol/2017-08/xtn-hdrs.html)",  August 2017
- Fujiwara K., "[Measures against cache poisoning attacks using IP fragmentation in DNS](https://indico.dns-oarc.net/event/31/contributions/692/)", May 2019
- Fujiwara K. et al, "[Avoid IP fragmentation in DNS](https://tools.ietf.org/html/draft-fujiwara-dnsop-avoid-fragmentation)", September 2019

Recientemente hubo un paper y una presentación [Defragmenting DNS - Determining
the optimal maximum UDP response size for DNS](https://indico.dns-oarc.net/event/36/contributions/776/)
por Axel Koolhaas y Tjeerd Slokker en colaboración con NLnet Labs, que exploró
los datos reales mundiales usando sondas de RIPE Atlas, donde los investigadores
sugieren distintos valores para IPv6 e IPv6 en diferentes escenarios. Es
importante que los operadores conozcan las particularidades de su ambiente,
pero los valores por defecto en el software DNS debe reflejar el mínimo
tamaño seguro, que es **1232**.

Los problemas de fragmentación pueden ser abordados mediante a) configurando
los servidores para limitar los mensajes DNS enviados sobre UDP en un
tamaño que no ocasione fragmentación en enlaces de red típicos, y b)
asegurándose que los servidores DNS pueden cambiar desde UDP a TCP
cuando una respuesta DNS es demasiado grande para caber en este tamaño
limitado.

Consideraciones sobre el Tamaño de los Mensajes
-----------------------------------------------

El tamaño óptimo de un mensaje DNS para evitar la fragmentación IP
y que al mismo tiempo minimice el uso de TCP dependerá de la
Unidad de Transmisión Máxima (MTU) de los enlaces físicos de red
que conectan los dos extremos de la comunicación. Desafortunadamente,
no existe aún un mecanismo estándar para los implementadores de
servidores DNS para acceder a esta información. Hasta que ese
estándar exista, recomendamos que el tamaño de búfer EDNS sea,
_por defecto_, de un tamaño lo suficientemente pequeño para
evitar la fragmentación en la mayoría de los enlaces de red en
uso al día de hoy.

Un búfer EDNS de tamaño 1232 bytes evitará la fragmentación en
casi todas las redes actuales. Esto está basado en un MTU de
1280, el que es requerido por la especificación IPv6, menos los
48 bytes de los encabezados IPv6 y UDP; además de los resultados
de la investigación mencionada anteriormente.

Es importante notar que este es un valor _por defecto_, que es
útil cuando no hay disponible más información. Los operadores
pueden configurar valores más grandes si es que sus redes soportan
tamaños de paquetes mayores, y están seguros que no habrá riesgo
de fragmentación. Los proveedores de servidores DNS pueden
usar valores más grandes (o más pequeños) si tienen información
de MTU disponible desde el kernel.


Acción: Operadores de DNS Autoritativos
---------------------------------------

En el lado autoritativo, lo que debería hacer para solucionar estos
problemas es asegurarse que sus servidores DNS pueden responder
consultas DNS sobre TCP (puerto 53).
_¡Recuerde revisar también su(s) cortafuegos (firewalls)!_, ya que
algunos de ellos bloquean TCP/53.

También debería configurar sus servidores para negociar un
tamaño de búfer EDNS que no cause fragmentación.
El valor recomendado es de 1232 bytes.

Y por último, _¡los servidores DNS Autoritativos **NO DEBEN** enviar
respuestas más grandes que el tamaño del buffer EDNS solicitado!_

Ya puede revisar su dominio ingresándolo acá abajo y presionando "Test!".Esta herramienta de prueba usa el [EDNS Compliance Tester de ISC](https://ednscomp.isc.org/)
y revisará que la prueba `edns512tcp` es exitosa, entre otras pruebas de
compatibilidad general.

{% include 2020_checker.html lang=site.data.2020_checker.es %}

Acción: Operadores de DNS Resolutor
-----------------------------------

En el lado del resolutor ("resolver"), son más o menos los mismos
requisitos que para el autoritativo: asegurarse que sus servidores pueden
responder consultas DNS sobre
TCP (puerto 53) y configurar un tamaño de búfer EDNS de 1232 bytes para
evitar la fragmentación. _¡Recuerde revisar su(s) cortafuegos (firewalls)
para evitar problemas con DNS sobre TCP!_.

Muy importante: _¡los resolutores **DEBEN** repetir
sus consultas sobre TCP si reciben una respuesta UDP truncada (con el
bit TC=1 encendido)!_

**¡NUEVO!** Esta herramienta revisará su navegador, sistema y DNS resolutor
de su ISP cargando una imagen en una dirección URL específica que solo puede
ser resuelta si hay soporte TCP en el último resolutor que consulta al
autoritativo. Para más información revise [Check My DNS](https://cmdns.dev.dns-oarc.net)
que es el mecanismo que utiliza esta herramienta.

{% include 2020_cli_checker.html lang=site.data.2020_checker.es %}

Acción: Proveedores de software DNS
-----------------------------------

Como proveedor de software DNS es importante ser **compatible con los estándares**
y usar un tamaño por defecto de buffer EDNS (1232 bytes) que no cause
fragmentación en enlaces de red típicos.

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

Nuestra herramienta basada en web para clientes y operadores de
DNS resolutores puede ser encontrada más arriba en la sección
[Acción: Operadores de DNS Resolutor](#acción-operadores-de-dns-resolutor)


También puede probar usando los siguientes comandos CLI:

```shell
$ dig +tcp @auth_IP yourdomain.example.
$ dig +tcp @resolver_IP yourdomain.example.
$ dig @resolver_IP test.knot-resolver.cz. TXT
```

Todas las consultas DNS deben ser exitosas, y los comandos con la
opción `+tcp` y sin ella deben retornar lo mismo.

Si es un proveedor
de servicio puede probar sus servicios autoritativos y
resolutores configurando los siguientes
tamaños por defecto de buffer EDNS:

{% include 2020_server_configs.md %}

La configuración indicada no ocasionará cambios visibles en caso que
todo funcione correctamente, pero algunas consultas fallarán en su
resolución si el transporte TCP no está disponible.

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

- P: TL;DR [RFC 7766](https://tools.ietf.org/html/rfc7766)

  R: ¡El DNS **DEBE** funcionar sobre TCP!

- P: ¿Está muerto DNS sobre UDP?

  R: No, El DNS sobre UDP seguirá siendo el principal medio de transporte, ya que es
     escalable masivamente, muy eficiente en recursos y tolerante a fallas.

- P: ¿Todo se romperá en 2020-10-01?

  R: ¡No! Las últimas mediciones muestran que solo un [pequeño porcentaje](https://github.com/dns-violations/dnsflagday/issues/139#issuecomment-673489183) de sitios está afectado.
     En la fecha del flag-day los proveedores de software cambiarán su comportamiento
     por defecto en sus lanzamientos de software nuevo, de tal forma que el tamaño
     por defecto de los mensajes usados sobre UDP sean 1232 bytes.
     A medida que estos nuevos lanzamientos sean instalados, los sitios que
     respondan con tamaño de mensaje DNS más grandes que 1232 bytes, y que
     además no puedan responder consultas vía TCP, fallarán en su resolución.
     Note que estos sitios además ya son inestables hoy mismo.

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

- P: ¿Y qué pasará cuando queramos usar tamaños de paquete más grandes en el futuro?

  R: Nuestro objetivo es simplemente evitar la fragmentación IP
     escogiendo un tamaño _por defecto_ de búfer EDNS que funcionará
     bien en una red típica actual. No es un cambio permanente a
     ninguna especificación DNS. Los valores por defecto siempre
     podrán ser corregidos localmente si hay disponible más y mejor
     información. Si se logra tener disponible un método estándar para
     obtener información de MTU desde el kernel, se usará eso.

- P: ¿Este Flag Day requerirá una actualización de software?

  R: En la mayoría de los casos esto no será necesario. El software DNS que respeta los estándares no requiere actualización,
     y seguirá funcionando. Todas las versiones soportadas de los
     servidores DNS de código abierto más importantes ya funcionan
     correctamente, y continuarán haciéndolo. Todas ellas pueden ser
     configuradas para usar los tamaños de búfer EDNS recomendados,
     incluso si es que aún no son actualizados para usar los nuevos
     tamaños por defecto.

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

Flag days anteriores
====================

Esta es una lista de los "flag days" anteriores:
- [2019, parches provisorios en EDNS](/2019/)


El [DNS flag day 2019](/2019/) fue un acontecimiento muy exitoso. La comunidad de
Internet trabajó en conjunto y corrigió los problemas que causaban demoras en todos
los usuarios de Internet. Quisiéramos agradecer a todos los operadores que cooperaron
y ayudaron en hacer de Internet un mejor lugar.

Un resumen del "DNS flag day" pasado y de los futuros se puede encontrar en:
[https://youtu.be/mH_elg9EUWw?t=649](https://youtu.be/mH_elg9EUWw?t=649).

