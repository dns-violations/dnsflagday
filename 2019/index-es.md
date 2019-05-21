---
title: 2019
lang: es
redirect_from:
  - /2019/es/
flagdayyear: 2019
---

{% include 2019_languages.html %}

**Esta es la versión de archivo de la página que describe el evento finalizado en febrero de 2019. La información relevante para hoy se puede encontrar en la página principal [dnsflagday.net](https://dnsflagday.net/).**

¿Qué está pasando?
==================
El [DNS](https://es.wikipedia.org/wiki/Sistema_de_nombres_de_dominio) actual es innecesariamente lento e ineficiente, producto de los esfuerzos necesarios para adecuarse a unos pocos sistemas DNS que no son compatibles con los estándares del protocolo, que ya tienen dos décadas de existencia.

Para asegurar la sostenibilidad futura del sistema, ya es tiempo de terminar con estas adecuaciones y corregir los sistemas incompatibles. Este cambio hará que la operación del DNS sea más eficiente, y también permitirá a los operadores desplegar nuevas funcionalidades, incluyendo nuevos mecanismos de protección contra ataques [DDoS].

Los proveedores de software y sistemas públicos DNS [listados en este sitio](#supporters) se han coordinado para eliminar estas adecuaciones de las implementaciones DNS no compatibles de sus softwares y servicios a partir del día **1 de Febrero de 2019**. Este cambio afectará solo a los sitios que operan con software no compatible.

Para más información por favor seleccione al grupo que usted pertenece:

- [Soy un usuario de Internet, sin nombres de dominio propios](#users)
- [Tengo nombre(s) de dominio](#domain-holders)
- [Soy un administrador de DNS](#dns-admins)
- [Soy un experto en DNS (Desarrollador de software DNS, Investigador, etc.)](#experts)


<a name="users"></a>

Soy un usuario de Internet
==========================

No hay ninguna razón para preocuparse si es un usuario de Internet y no posee sus nombre(s) de dominio propios. Este cambio sólo le afectará indirectamente, y no es necesario que tome ningún otra acción. ¡Muchas gracias por su interés en el [DNS]!


<a name="domain-holders"></a>

Tengo nombre(s) de dominio
==========================

Si usted es titular de algún(os) nombre(s) de dominio, por favor utilice el formulario acá abajo para revisar si su dominio está listo para los cambios. El resultado le indicará si es necesario que tome alguna acción correctiva.

{% include 2019_checker.html lang=site.data.2019_checker.es %}

Tenga presente que si tiene múltiples zonas en el mismo servidor o cluster de servidores, es suficiente con probar una sola zona. Vea los [detalles técnicos de las pruebas](#test-details) para más información.


<a name="dns-admins"></a>

Soy un administrador de DNS
===========================

El impacto de estos cambios para el lado de los clientes del DNS se describe en la sección para [Operadores de resolutores (resolvers) DNS](#resolver-ops). Un pequeño porcentaje de servidores autoritativos deberán hacer los cambios [descritos abajo](#auth-ops). Más abajo describimos los [detalles técnicos de las pruebas](#test-details) y las [herramientos para expertos](#experts).


<a name="resolver-ops"></a>

Operadores de resolutores (resolvers) DNS
-----------------------------------------
En los días cercanos al 1 de febrero de 2019, los más importantes proveedores de software resolutor ("resolver") de código abierto, lanzarán nuevas actualizaciones que dejarán de adecuarse a las respuestas fuera del estándar. Este cambio afectará a los servidores autoritativos que no respetan ni el estándar original del DNS de 1987 ([RFC1035]) ni los nuevos estándares [EDNS] de 1999 ([RFC2671] y [RFC6891]). Además, los más importantes [operadores de resolutores DNS públicos indicados abajo](#supporters) también eliminarán las adecuaciones, con lo que estos cambios afectarán a los usuarios y proveedores que utilizan estos servicios DNS públicos.

Los sitios hospedados en servidores autoritativos incompatibles podrían ser inalcanzables a través de los resolutores actualizados. El [formulario web de arriba](#domain-holders) puede ser una herramienta útil para investigar los problemas con algún dominio en particular. Los dominios que fallan repetidamente estas pruebas tienen algún problema con el software DNS que utilizan, o bien con su configuración de cortafuegos (firewall); pero no pueden ser corregidos por los operadores de DNS resolutores.

Las siguientes versiones de DNS resolutores (resolvers) no se adecuarán a las respuestas [EDNS] fuera del estándar:

* BIND 9.13.3 (development) y 9.14.0 (production)
* Knot Resolver ya tiene un manejo estricto de EDNS en todas sus versiones actuales
* PowerDNS Recursor 4.2.0
* Unbound 1.9.0


<a name="auth-ops"></a>

Operadores de servidores DNS
----------------------------
Después del primero de febrero de 2019 los más importantes [operadores de resolutores de DNS públicos indicados abajo](#supporters) eliminarán las adecuaciones para las faltas al estándar. Este cambio afectará a los dominios hospedados en servidores autoritativos que no respetan ni el estándar original del DNS de 1987 ([RFC1035]) ni los nuevos estándares [EDNS] de 1999 ([RFC2671] y [RFC6891]). Los dominios incompatibles pueden volverse inalcanzables a través de estos servicios.

Recomendamos que tome los siguientes pasos preparatorios para evitar problemas operacionales:
1. Pruebe sus servidores autoritativos usando el [formulario de pruebas de arriba](#domain-holders). Es suficiente con probar una sola zona DNS hospedada en un conjunto particular de servidores autoritativos. (Si cualquier zona particular pasa las pruebas, con eso es suficiente, porque las pruebas no dependen del contenido de la zona).
1. Los resultados pueden verse afectados por inestablidades aleatorias en la red. Algunas de las pruebas analizan los tiempos de respuesta agotados (timeouts), los que pueden deberse a un software DNS inadecuado, algún cortafuegos bloqueando la respuesta, o por pérdidas de paquetes en Internet. Si se reporta algún problema, por favor reintente la prueba.
1. Si el dominio probado falla las pruebas, por favor actualice su software DNS a la última versión y repita las pruebas. Si las pruebas siguen fallando incluso después de la actualización del software DNS, por favor revise la configuración de su cortafuegos.
1. **Los cortafuegos (firewalls) no deben descartar paquetes DNS** con extensiones [EDNS], incluyendo las extensiones desconocidas pero que siguen los estándares.

Puede encontrar información relevante para algunos proveedores aquí:
  * [Akamai](https://community.akamai.com/customers/s/article/CloudSecurityDNSFlagDayandAkamai20190115151216?language=en_US)
  * [Citrix](https://support.citrix.com/article/CTX241493)
  * [BlueCat](https://www.bluecatnetworks.com/blog/dns-flag-day-is-coming-and-bluecat-is-ready/)
  * [efficient iP](http://www.efficientip.com/dns-flag-day-notes/)
  * [F5 BIG-IP](https://support.f5.com/csp/article/K07808381?sf206085287=1)
  * [Google](https://groups.google.com/d/msg/public-dns-announce/-qaRKDV9InA/CsX-2fJpBAAJ)
  * [Infoblox](https://community.infoblox.com/t5/Community-Blog/DNS-Flag-Day/ba-p/15843?es_p=8449211)
  * [Pulse Secure](https://kb.pulsesecure.net/articles/Pulse_Secure_Article/KB43996)
  * Juniper: Las versiones antiguas de Juniper SRX descartan por defecto los paquetes EDNS. La solución es deshabilitar el DNS doctoring mediante `# set security alg dns doctoring none`. Actualice a las últimas versiones para tener soporte EDNS.
  * [Microsoft Azure](https://azure.microsoft.com/en-us/updates/azure-dns-flag-day/), [Microsoft DNS](https://support.microsoft.com/en-sg/help/4489468/windows-server-domain-name-system-dns-flag-day-compliance)

Si el problema persiste después de actualizar su software DNS y cortafuegos por favor contacte a su proveedores de cortafuegos y solicite los parches.


<a name="test-details"></a>

Detalle de las pruebas
----------------------
Su nombre de dominio puede o no incluir `www` al comienzo, por ejemplo `www.dominio.com` o solo `dominio.com`. Si no está seguro, sugerimos que pruebe con ambos. Los nombres que no son zonas DNS serán reportados, indicando que esta es la causa más probable de las fallas. No es algo para preocuparse.


<a name="mass-scanning"></a>

### Escaneo masivo

El [formulario de prueba de arriba](#domain-holders) usa la herramienta [ednscomp](https://ednscomp.isc.org/ednscomp) hospedada en nuestros servidores, que es un servicio de baja capacidad, disponible solo para chequeos individuales. Si necesita hacer consultas masivas, debe usar las [herramientas indicadas más abajo](#tools) hospedadas en sus propias instalaciones. Por favor no intente automatizar consultas usando este sitio web, su uso excesivo será limitado o bloqueado.

### Obteniendo el detalle de los resultados de las pruebas

El [formulario de prueba de arriba](#domain-holders) usa la herramienta [ednscomp](https://ednscomp.isc.org/ednscomp) para las pruebas técnicas individuales, y estos resultados parciales son agrupados y resumidos por la aplicación web.

También puede probar sus servidores DNS usando directamente la herramienta [ednscomp](https://ednscomp.isc.org/ednscomp) que entrega un reporte técnico mucho más detallado. Simplemente ingrese el nombre de alguna de las zonas hospedadas en sus servidores DNS en el campo `zone name` y cliquee el botón `Submit`.

El resultado resumen (summary) de [ednscomp](https://ednscomp.isc.org/ednscomp) deberá idealmente ser el mensaje en verde `All Ok`.

### Configuración de funcionamiento mínimo

Una infraestructura mínima que permita sobrevivir el "DNS flag day" de 2019 no debe tener ningún resultado `timeout` (tiempo de espera agotado) en ninguna de las pruebas de DNS "plain" ni "EDNS version 0", de la herramienta [ednscomp](https://ednscomp.isc.org/ednscomp). Las fallas en las pruebas EDNS(1) no causarán problemas inmediatos.

Por favor tenga en cuenta que una infraestructura que sólo cumpla este mínimo no será compatible con los estándares y tendrá otros problemas tarde o temprano. Por esta razón **recomendamos encarecidamente obtener la compatibilidad completa con EDNS (todas las pruebas en `ok`)** en vez de solo preocuparse por lo mínimo.

Si hay algún problema, la herramienta ednscomp entregará una explicación para cada prueba fallida. Las errores típicos son causados por:
* software DNS que funciona incorrectamente
* configuración de cortafuegos ("firewall") incorrecta

**Los cortafuegos no deben descartar paquetes DNS** con extensiones EDNS, incluyendo extensiones que aún son desconocidas en el momento. El software moderno de DNS puede desarrollar nuevas extensiones (por ejemplo [DNS cookies](https://tools.ietf.org/html/rfc7873) para protegerse de ataques DoS). Los cortafuegos que descartan paquetes DNS con estas extensiones están empeorando la situación para todos, incluyendo ataques DoS de mayor magnitud, e induciendo mayor latencia en el tráfico DNS.


<a name="experts"></a>

Soy un experto en DNS
=====================

Desarrolladores de software DNS
-------------------------------
El principal cambio es que los vendedores de software DNS arriba mencionados comenzarán a interpretar los "tiempos de espera agotados" ("timeouts") como una señal de problema en la red o en el servidor. A partir del 1 de Febrero de 2019, **no habrá ningún intento de desactivar EDNS** como reacción a un tiempo de espera agotado.

En la práctica esto significa que todos los servidores DNS que **no respondan a todas las consultas EDNS** serán tratados como *muertos*.

Por favor pruebe sus implementaciones usando la herramienta [ednscomp](https://ednscomp.isc.org/ednscomp) para asegurarse de manejar EDNS adecuadamente. El código fuente de la herramienta también se [encuentra disponible](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing).

Es importante notar que EDNS no es obligatorio de implementar todavía. Si decide no soportar EDNS, es correcto no hacerlo, siempre que su software responda de acuerdo al [estándar EDNS, sección 7](https://tools.ietf.org/html/rfc6891#section-7).

En otras palabras, el software que implementa correctamente el estándar DNS original [RFC1035] de 1987 no necesita ningún cambio. Solo el software no compatible debe ser corregido.


<a name="researchers"></a>

Investigadores
--------------
Existen algunas herramientas que pueden interesar a Investigadores y otros interesados, como Operadores de TLD:

 * [EDNS compliance statistics](https://ednscomp.isc.org/) generadas por [EDNS compliance test suite](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) por ISC
 * Las [Presentaciones](#presentations) indicadas más abajo
 * [Herramientas](#tools) para escaneo masivo, etc.


<a name="presentations"></a>

Presentaciones
==============

Audiencia en general
--------------------
* LACNOG 2018: DNS Flag Day, el fin de los parches provisorios para EDNS [presentación](http://www.lacnic.net/innovaportal/file/3207/1/edns-flag-day.pdf), [video](https://www.youtube.com/watch?v=_hCGucH0kRU)
* RIPE 77: Will your DNS break in 2019? [slides](https://ripe77.ripe.net/presentations/7-flagday.pdf), [video](https://ripe77.ripe.net/archives/video/2233/)
* LOADAYS 2018: Is Your DNS Server Up-To-Date [abstract](http://loadays.org/pages/dnsupdate.html), [slides](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)
* UKNOF 2019: DNS Flag Day and Beyond [presentation](https://indico.uknof.org.uk/event/44/contributions/580/)

Técnicos
--------
* DNS-OARC 29: A tale of five ccTLDs [abstract](https://indico.dns-oarc.net/event/29/contributions/662/), [slides](https://indico.dns-oarc.net/event/29/contributions/662/attachments/634/1063/EDNS_Flag_Day_-_OARC29.pdf)
* DNS-OARC 29: Estimating impact of the (E)DNS flag day [abstract](https://indico.dns-oarc.net/event/29/contributions/644/), [slides](https://indico.dns-oarc.net/event/29/contributions/644/attachments/632/1018/edns.pdf), [video](https://youtu.be/rneu1lnJmUI?list=PLCAxS3rufJ1cOBd1D4K4QJFmLcSypixh3&t=3001)
* DNS-OARC 28: First announcement [abstract](https://indico.dns-oarc.net/event/28/contributions/515/), [slides](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [video](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)


<a name="tools"></a>

Herramientas
============

Investigadores y otros interesados como grandes operadores de DNS pueden estar interesados en:

 * [ednscomp, prueba de compatibilidad EDNS de ISC](https://ednscomp.isc.org/), [código fuente](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) para probar todos los aspectos de compatibilidad EDNS
 * [EDNS zone scanner](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/tree/master) para escaneo masivo y evaluación del impacto operativo real del DNS flag day, por CZ.NIC
 * [Testing EDNS Compatibility with dig](https://kb.isc.org/docs/edns-compatibility-dig-queries)
 * [DNSViz](http://dnsviz.net/)

Por favor revise las metodologías respectivas antes de interpretar los datos. En cualquier caso, no dude en ponerse en contacto con los autores de las herramientas usando los enlaces indicados arriba.


Contactos
=========

 * Si tiene comentarios sobre este sitio web, por favor indíquelos en el [repositorio dnsflagday](https://github.com/dns-violations/dnsflagday/issues) en Github
 * Los comentarios sobre el resultado de las pruebas o de la [herramienta ednscomp](https://ednscomp.isc.org/ednscomp) pertenecen al proyecto [DNS Compliance Testing](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) en el Gitlab de ISC


Apoyan
======
{% include 2019_supporters.html %}

Lecturas adicionales
====================
 * [Minimal EDNS compliance requirements](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)

[DDoS]: https://es.wikipedia.org/wiki/Ataque_de_denegaci%C3%B3n_de_servicio
[DNS]: https://es.wikipedia.org/wiki/Sistema_de_nombres_de_dominio
[RFC1035]: https://tools.ietf.org/html/rfc1035
[EDNS]: https://es.wikipedia.org/wiki/Mecanismos_de_extension_de_DNS
[RFC2671]: https://tools.ietf.org/html/rfc2671
[RFC6891]: https://tools.ietf.org/html/rfc6891
