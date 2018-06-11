<div class="translations">
<nav>
	<a href="/cs"><img alt="Česky" src="/flags/cs.svg"/></a>
	<a href="/"><img alt="English" src="/flags/en.svg"/></a>
	<a href="/es"><img alt="Español" src="/flags/es.svg"/></a>
</nav>
</div>

¿Qué está pasando?
==================
Los sistemas DNS modernos sufren de demoras innecesarias y dificultad para desarrollar nuevas funcionalidades. Para remediar este problema, los vendedores de software DNS [BIND (ISC)](https://www.isc.org/blogs/end-to-bandaids/), 
[Knot Resolver (CZ.NIC)](https://en.blog.nic.cz/2018/03/14/together-for-better-stability-speed-and-further-extensibility-of-the-dns-ecosystem/), [PowerDNS](https://blog.powerdns.com/2018/03/22/removing-edns-workarounds/), y Unbound (NLnet Labs) eliminarán ciertos parches provisorios el 1 de Febrero de 2019.

Este cambio solo afectará a sitios que operan software incorrecto. ¿Te afectará a ti?

Dueños de dominios
==================
Por favor revise si su dominio está correcto:
<div id="domain-checker">
       <form action="https://ednscomp.isc.org/ednscomp" method="GET" target="_blank">
               <fieldset>
                      <legend>Revise su dominio</legend>
                      <label for="zone">Nombre de dominio (sin www):
                               <input type="text" name="zone" id="zone" required>
                       </label>
                       <input type="submit" value="¡Pruebe!">
                       <noscript>¡Su navegador no soporta JavaScript! El reporte técnico será mostrado en una ventana nueva.<br>
El resultado de la prueba [ednscomp](https://ednscomp.isc.org/ednscomp) debe ser un mensaje verde `All Ok` ("Todo bien"). Si recibe cualquier otro resultado, su sistema DNS será afectado por este cambio, y su dominio podría quedar inaccesible. En este caso, por favor ¡contacte al administrador DNS de su dominio y pida que lo corrija!
                       </noscript>
               </fieldset>
       </form>
</div>
<script><!-- translate the form above and these constants, please keep the whitespaces! -->
const domainCheckerInit = {
       placeIntoElement: document.getElementById( "domain-checker" ),
       texts: {
               formTitle: 'Revise su dominio',
               labelText: 'Nombre de dominio (sin www): ',
               submitText: '¡Pruebe!',
               reportOkHtml: ': <span style="color: green;">¡Todo Bien!</span>',
               reportFailHtml: ': <span style="color: red;">¡Este dominio tiene uno o más problemas!</span> Si el problema persiste, contacte a su administrador DNS y cuéntele de https://dnsflagday.net/ y',
               reportLinkText: ' reporte técnico ',  // text before URL to report
       },
       status: {
               loading: 'Prueba en progreso, por favor espere… Puede tomar varias decenas de segundos.',
               done: 'Prueba finalizada:',
               errorApi: '¡Error de comunicación! API no disponible… por favor reintente más tarde',
               errorInput: '¡Entrada inválida! IDN aún no está soportado.',
       },
};
</script>
<script src="/domain-checker.js"></script>
<br>

Administradores DNS
===================
Es posible revisar su servidor DNS usando la herramienta [ednscomp](https://ednscomp.isc.org/ednscomp). Ingrese el nombre de alguno de los dominios hospedados en su servidor DNS en el campo `zone name` y presione el botón `Submit`.

El resultado de las pruebas de [ednscomp](https://ednscomp.isc.org/ednscomp) debe ser el mensaje en verde `All Ok`.

Si hay algún problema, la herramienta ednscomp entregará una explicación para cada prueba fallida. Las errores típicos son causados por:
* software DNS que funciona incorrectamente
* configuración de cortafuegos ("firewall") incorrecta

Para solucionar estos problemas por favor actualice su software DNS a la última versión estable, y pruebe otra vez. Si las pruebas siguen fallando, por favor revise la configuración del cortafuegos.

**Los cortafuegos no deben descartar paquetes DNS** con extensiones EDNS, incluyendo extensiones que aún son desconocidas en el momento. El software moderno de DNS puede desarrollar nuevas extensiones (por ejemplo [DNS cookies](https://tools.ietf.org/html/rfc7873) para protegerse de ataques DoS). Los cortafuegos que descartan paquetes DNS con estas extensiones están empeorando la situación para todos, incluyendo ataques DoS de mayor magnitud, e induciendo mayor latencia en el tráfico DNS.

Desarrolladores de software DNS
===============================
El principal cambio es que los vendedores de software DNS arriba mencionados comenzarán a interpretar los "tiempos de espera agotados" ("timeouts") como una señal de problema en la red, o en el servidor. A partir del 1 de Febrero de 2019, **no habrá ningún intento de desactivar EDNS** como reacción a un tiempo de espera agotado.

En la práctica esto significa que todos los servidores DNS que **no respondan a las consultas EDNS** serán tratados como *muertos*.

Por favor pruebe sus implementaciones usando la herramienta [ednscomp](https://ednscomp.isc.org/ednscomp) para asegurarse de manejar EDNS adecuadamente. El código fuente de la herramienta también se [encuentra disponible](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing).

Es importante notar que EDNS no es obligatorio de implementar todavía. Si decide no soportar EDNS, lo puede hacer, siempre que su software responda de acuerdo al [estándar EDNS, sección 7](https://tools.ietf.org/html/rfc6891#section-7).

Presentaciones
==============

 * DNS-OARC 28 (en inglés): [abstract](https://indico.dns-oarc.net/event/28/contributions/515/), [slides](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [video](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)
 * LOADAYS 2018 (en inglés): [abstract](http://loadays.org/pages/dnsupdate.html), [slides](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)
 * RIPE 76 (en inglés): [slides](https://ripe76.ripe.net/presentations/159-edns.pdf), [video](https://ripe76.ripe.net/archives/video/161)

Herramientas
============

 * [ednscomp, prueba de compatibilidad EDNS de ISC](https://ednscomp.isc.org/), [código fuente](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)
 * [DNSViz](http://dnsviz.net/)

Apoyan
======

[![PowerDNS](/images/powerdns.png)](https://www.powerdns.com/)

[![ISC](/images/isc.png)](https://www.isc.org/)

[![NLnet Labs](/images/nlnetlabs.svg)](https://nlnetlabs.nl/)

[![CZ.NIC](/images/cznic.png)](https://www.nic.cz/)

[![Quad9](/images/quad9.png)](https://quad9.net/)

[![CleanBrowsing](https://cleanbrowsing.org/images/CleanBrowsing-logo-small-dark.png)](https://cleanbrowsing.org/)

Lecturas adicionales
====================
 * [Minimal EDNS compliance requirements](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)
