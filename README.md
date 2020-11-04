[https://dnsflagday.net](https://dnsflagday.net)

Thank you!
==========

The [DNS flag day 2019](https://dnsflagday.net/2019/) was very successful event and the Internet community
worked together and fixed problems which were causing delays and other
problems for Internet users worldwide. We would like to thank to all
operators who cooperated and helped to make Internet a better place.

Summary of the past and future DNS flag days can be found e.g. in
[https://youtu.be/mH_elg9EUWw?t=649](https://youtu.be/mH_elg9EUWw?t=649).

What's next?
============

Next round of DNS flag day is being planned right now, with focus on
operational and security problems in DNS caused by Internet Protocol
fragmentation.

Please subscribe to [mailing list dns-announce](https://lists.dns-oarc.net/mailman/listinfo/dns-announce)
or follow [dnsflagday Twitter](https://www.twitter.com/dnsflagday)
to receive notification when more information becomes available.

DNS Flag Day 2020
=================

The DNS community has been discussing persistent interoperability and
performance issues with the DNS system on industry mailing lists and at
conferences such as [DNS-OARC 30](https://www.dns-oarc.net/oarc30) panel
discussion ([video](https://youtu.be/mH_elg9EUWw?t=680),
[slides](https://indico.dns-oarc.net/event/31/contributions/678/attachments/673/1102/dns_flag_day_panel.pdf)).

The proposed plan for the DNS flag day 2020 was announced at
[RIPE78](https://ripe78.ripe.net) by Petr Špaček, CZ.NIC and Ondřej Surý,
ISC ([video](https://ripe78.ripe.net/archives/video/28),
[slides](https://ripe78.ripe.net/presentations/53-plenary.pdf)). This time,
we will focus on the problems with IP fragmentation of DNS packets.

Please see https://dnsflagday.net/2020/ for more information.

Who's behind DNS flag day?
==========================

The DNS flag day effort is community driven by DNS software and service
providers, and supported by [The DNS Operations, Analysis, and Research Center (DNS-OARC)](https://www.dns-oarc.net/)
which most in the community are members of.

If you have technical questions around DNS flag day you can join
[the DNS-operations mailing list](https://lists.dns-oarc.net/mailman/listinfo/dns-operations)
and ask them there.

Get in touch
============

For press & media inquiries please use media (at) dns-oarc.net and please put
“DNS Flag Day" in the email subject line.

- Web: <https://dnsflagday.net/>
- Twitter: <https://twitter.com/dnsflagday>
- Announcements: <https://lists.dns-oarc.net/mailman/listinfo/dns-announce>
- Discussion: <https://lists.dns-oarc.net/mailman/listinfo/dns-operations>

Want to build this locally?
===========================

In `Gemfile`, put:

```
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins

```

Then, to build (and keep building after every edit, run:

```
docker run --rm -v "$PWD:/srv/jekyll" -v "$PWD/vendor/bundle:/usr/local/bundle" -it jekyll/jekyll jekyll build --watch
```

Then, in `_site/`, run:

```
python3 -mhttp.server
```
