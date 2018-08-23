<img class="logo" alt="DNS flag day logo" src="/images/DNS_Flag.svg">

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
               reportOkHtml: ': <span style="color: green;">¡Todo Bien!</span></div>' +
                '<div><img style="height: 5em;" src="/signs/ok.svg"/></div>' +
                '<div>Este dominio está completamente listo, ¡Felicidades!',
                reportCompatibleHtml: ': <span style="color: orange;">¡Problemas menores detectados!</span></div>' +
                '<div><img style="height: 5em;" src="/signs/compatible.svg"/></div>' +
                '<div>Este dominio continuará funcionando después del día "DNS Flag Day" del 2019, PERO no respeta los últimos estándares DNS. A consecuencia de esto, este dominio no soporta las últimas características de seguridad y puede ser un objetivo fácil para ataques de red, entre otros problemas en el futuro. Recomendamos que su administrador del dominio corrija los problemas listados acá',
                reportHighLatency: ': <span style="color: red;">¡Serios problemas detectados!</span></div>' +
                '<div><img style="height: 5em;" src="/signs/high_latency.svg"/></div>' +
                '<div>Este dominio encontrará problemas después del día "DNS Flag Day" del 2019. En la práctica funcionará, PERO los clientes experimentarán demoras al acceder a este dominio. ¡Recomendamos que solicite una corrección a su administrador de dominio! Puede enviarle la información en https://dnsflagday.net/ y',
                reportFailHtml: ': <span style="font-weight: bold; color: red;">¡Error fatal detectado!</span></div>' +
                '<div><img style="height: 5em;" src="/signs/dead.svg"/></div>' +
                '<div>¡Este dominio DEJARÁ DE FUNCIONAR después del día "DNS Flag Day" del 2019! Por favor repita la prueba para descartar errores temporales de red. Si el problema persiste, debe contactar a su administrador de dominio y exigir su corrección. Puede enviarle la información en https://dnsflagday.net/ y',
                reportTestErrorHtml: ': La prueba no pudo realizarse debido a un error. Por favor asegúrese que el nombre de dominio ingresado se refiere a una <strong>zona DNS</strong>, por ej. use "example.com" en vez de "www.example.com". Reintente para eliminar posibles fallas de red temporales, o revise',
                reportLinkText: ' el informe técnico ',  // text before URL to report
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

Investigadores
==============
Existen algunas herramientas que pueden interesar a Investigadores y otros interesados, como Operadores de TLD:
 * [EDNS compliance statistics](https://ednscomp.isc.org/) generadas por [EDNS compliance test suite](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) por ISC
 * [EDNS zone scanner](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/) por CZ.NIC que busca evaluar el impacto en la práctica del día "DNS flag day"

Por favor revise las metodologías respectivas antes de interpretar los datos. En cualquier caso, no dude en ponerse en contacto con los autores de cada herramienta, utilizando los enlaces Gitlab indicados arriba.

Presentaciones
==============

 * DNS-OARC 28 (en inglés): [abstract](https://indico.dns-oarc.net/event/28/contributions/515/), [slides](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [video](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)
 * LOADAYS 2018 (en inglés): [abstract](http://loadays.org/pages/dnsupdate.html), [slides](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)
 * RIPE 76 (en inglés): [slides](https://ripe76.ripe.net/presentations/159-edns.pdf), [video](https://ripe76.ripe.net/archives/video/161)

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
<script id="do-not-translate-randomize-this-section" src="/supporters-randomiser.js" defer></script>

[![PowerDNS](/images/powerdns.png)](https://www.powerdns.com/)

[![ISC](/images/isc.png)](https://www.isc.org/)

[![NLnet Labs](/images/nlnetlabs.svg)](https://nlnetlabs.nl/)

[![CZ.NIC](/images/cznic.svg)](https://www.nic.cz/)

[![Quad9](/images/quad9.png)](https://quad9.net/)

[![CleanBrowsing](https://cleanbrowsing.org/images/CleanBrowsing-logo-small-dark.png)](https://cleanbrowsing.org/)

[![Cloudflare](/images/cloudflare.png)](https://www.cloudflare.com/)

Lecturas adicionales
====================
 * [Minimal EDNS compliance requirements](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)
