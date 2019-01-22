O que está acontecendo?
=======================
O sistemas de [DNS](https://pt.wikipedia.org/wiki/Domain_Name_System) atuais sofrem demoras desnecessárias e dificuldade para lançar novas funcionalidades. Para remediar esses problemas, [desenvolvedores](#apoiadores) e grandes [provedores](#apoiadores) públicos de DNS irão remover certas modificações (workarounds) no dia 1 de Fevereiro de 2019.

Essa mudança impacta apenas sites que operam software que não esteja seguindo os padrões publicados. Você será impactado?

Donos de Domínios
=================
Por favor verifique se seu domínio será impactado:
{% include checker.html lang=site.data.checker.ptbr %}

Administradores de DNS
======================
Para começar a entender como está sua conformidade com o EDNS, recomendamos que você utilize o formulário acima que irá produzir um relatório simplificado para o domínio inteiro.

É também possível testar seus servidores de DNS diretamente utilizando a ferramenta [ednscomp](https://ednscomp.isc.org/ednscomp) que mostra um relatório técnico detalhado. Entre com o nome da zona hospedada nos seus servidores de DNS no campo `zone name` e clique no botão `Submit`.

O resultado dos testes de [ednscomp](https://ednscomp.isc.org/ednscomp) devem ser uma mensagem em verde dizendo `Tudo Ok`.

Para ter o mínimo necessário para que seu domínio continue funcionando após o 2019 DNS flag day, nenhum teste de DNS e e EDNS versão 0 deve ter o resultado `timeout`, de acordo com a ferramenta [ednscomp](https://ednscomp.isc.org/ednscomp). É importante resaltar que ter apenas o mínimo necessário poderá causar outros problemas cedo ou tarde. Por essa razão **nós recomendados que garanta que todos os testes EDNS estejam `ok`** em vez de fazer apenas as correções mínimas ou você poderá ter novos problemas no futuro próximo.

Se forem encontrados problemas, a ferramenta ednscomp irá mostrar uma explicação para cada teste que falhou. Falhas nesses testes são tipicamente causadas por:
* software de DNS com problemas
* configuração de firewall com problemas

Para consertar esses problemas, por favor atualize seu software de DNS para a última versão estável disponível e rode os testes novamente. Se os testes ainda assim falharem, por favor verifique a configuração do seu firewall.

**Firewalls não devem bloquear pacotes de DNS com extensões EDNS**, incluindo extensões desconhecidas. Softwares de DNS modernos podem implementar novas extensões (ex. [DNS cookies](https://tools.ietf.org/html/rfc7873) para proteger contra ataques DoS). Firewalls que bloqueiam pacotes de DNS com essas extensões apenas pioram a situação para todo mundo, fazendo com que ataques de DoS sejam piores e a latência do trafêgo de DNS seja mais alta.

Desenvolvedores de software de DNS
==================================
A maior mudança será que sistemas de DNS dos desenvolvedores acima irão interpretar timeouts como um sinal de problemas na rede ou no servidor. Começando no dia 1 de Fevereiro de 2019, não haverá **nenhuma tentativa de desabilitar EDNS** caso uma solicitação de DNS gere um timeout.

Isso significa que todos os servidores de DNS que **não responderem à solicitações EDNS** serão tratados como *inativos*.

Por favor teste sua implementação usando a ferramenta [ednscomp](https://ednscomp.isc.org/ednscomp) para garantir que você está tratando requisições EDNS adequadamente. O código fonte dessa ferramenta [está disponível](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing).

É importante pontuar que o suporte à EDNS ainda não é obrigatório. Se você decidir não suportar EDNS, não haverá nenhum problema desde seu software responda à solicitações de acordo com a [seção 7 do padrão EDNS](https://tools.ietf.org/html/rfc6891#section-7).

Pesquisadores
=============
Pesquisadores e outros envolvidos, tais como operadores de TLD, poderam se interessar pelos documentos abaixo:
 * [Estatísticas de conformidade EDNS](https://ednscomp.isc.org/) geradas pela [suíte de testes de conformidade EDNS](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing) do ISC
 * [EDNS zone scanner](https://gitlab.labs.nic.cz/knot/edns-zone-scanner/) por CZ.NIC que permite avaliar o impacto real do DNS flag day

 Por favor leia as respectivas metodologias antes de interpretar os dados. Em qualquer caso, não hesite em entrar em contato com os autores das ferramentas usando os links acima.

Apresentações
=============

 * DNS-OARC 28: [abstract](https://indico.dns-oarc.net/event/28/contributions/515/), [slides](https://indico.dns-oarc.net/event/28/contributions/515/attachments/490/799/Removing_EDNS_Workarounds.pdf), [video](https://www.youtube.com/watch?v=9YYH8JFH_bY&feature=youtu.be&t=5198)
 * LOADAYS 2018: [abstract](http://loadays.org/pages/dnsupdate.html), [slides](http://loadays.org/files/plexis-edns-workaround-removal-loadays-2018.pdf), [video](https://www.youtube.com/watch?v=OXbbH0ORmSY)
 * RIPE 76: [slides](https://ripe76.ripe.net/presentations/159-edns.pdf), [video](https://ripe76.ripe.net/archives/video/161)
 * DNS-OARC 29: [abstract](https://indico.dns-oarc.net/event/29/contributions/662/), [slides](https://indico.dns-oarc.net/event/29/contributions/662/attachments/634/1063/EDNS_Flag_Day_-_OARC29.pdf)

Ferramentas
===========

 * [ISC EDNS Compliance tester](https://ednscomp.isc.org/), [source code](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing)
 * [DNSViz](http://dnsviz.net/)

Contatos
========

 * Comentários sobre este site podem ser adicionados no [repositório do dnsflagday](https://github.com/dns-violations/dnsflagday/issues) no Github
 * Comentários sobre os resultados de testes gerados por esse site ou pela [ferramenta ednscomp](https://ednscomp.isc.org/ednscomp) deve ser feitos no site do projeto [DNS Compliance Testing](https://gitlab.isc.org/isc-projects/DNS-Compliance-Testing).

Apoiadores
==========
{% include supporters.html %}

Leitura Adicional
=================
 * [Minimal EDNS compliance requirements](https://datatracker.ietf.org/doc/draft-spacek-edns-camel-diet/)
 * [“The DNS Camel”, or, the rise in DNS complexity](https://blog.powerdns.com/2018/03/22/the-dns-camel-or-the-rise-in-dns-complexit/)
