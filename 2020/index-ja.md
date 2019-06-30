---
title: 2020
lang: ja-JP
redirect_from:
  - /
  - /en/
  - /zh-CN/
  - /ru/
  - /pt-br/
  - /es/
  - /de/
  - /cs/
  - /2020/en/
  - /2020/zh-CN/
  - /2020/ru/
  - /2020/pt-br/
  - /2020/es/
  - /2020/de/
  - /2020/cs/
flagdayyear: 2020
---


<img class="logo float-right" alt="DNS flag day logo" src="/images/DNS_Flag.svg">

はじめに(謝辞)
==============

[2019 DNS flag day](/2019/) は成功裏に終わりました。
名前解決に時間がかかるなどの世界中のインターネット利用者に影響を及ぼす問題に対して、
インターネットコミュニティの参加者は連携して解決に当たりました。
インターネットをより良くするために協調して尽力した全てのオペレーターに対して謝意を表します。

過去に行われた、または将来行われる予定の DNS flag day の概要は下記です。
[https://youtu.be/mH_elg9EUWw?t=649](https://youtu.be/mH_elg9EUWw?t=649) (英語)

内容
====
- [What's next?](#whats-next)
- [DNS Flag Day 2020](#dns-flag-day-2020)
  - [Note: Work in progress](#note-work-in-progress)
  - [Action: Authoritative DNS Operators](#action-authoritative-dns-operators)
  - [Action: DNS Resolver Operators](#action-dns-resolver-operators)
  - [Action: DNS software vendors](#action-dns-software-vendors)
  - [How to test?](#how-to-test)
- [Previous flag days](#previous-flag-days)
- [Who's behind DNS flag day?](#whos-behind-dns-flag-day)
- [Get in touch](#get-in-touch)
- [FAQ](#faq)

次回予告
========

次回の DNS flag day は、現在計画中です。
その内容は、 IP パケットのフラグメンテーション (fragmentation) が引き起こす、
運用上の、またはセキュリティの問題に特化したものになる予定です。

新しい情報については [dns-announce メーリングリスト](https://lists.dns-oarc.net/mailman/listinfo/dns-announce) (英語) を購読する、
または [Twitter の @dnsflagday](https://www.twitter.com/dnsflagday) (英語)  をフォローすることで受け取ることができます。

DNS Flag Day 2020
=================

DNS コミュニティは、相互運用性を持続させ、性能に影響を与える問題を解消するために議論を行っています。
これは業界のメーリングリストや、 [DNS-OARC 30](https://www.dns-oarc.net/oarc30) のパネルディスカッション
([セッションの録画](https://youtu.be/mH_elg9EUWw?t=680) (英語)  と
[発表資料](https://indico.dns-oarc.net/event/31/contributions/678/attachments/673/1102/dns_flag_day_panel.pdf) (英語) 
)といったカンファレンスで行われています。

DNS Flag Day 2020 の計画に関する提案は、
[RIPE78](https://ripe78.ripe.net) にて CZ.NIC の Petr Špaček 氏と ISC の Ondřej Surý 氏から行われました。
([セッションの録画](https://ripe78.ripe.net/archives/video/28) (英語)  と
[発表資料](https://ripe78.ripe.net/presentations/53-plenary.pdf) (英語))
今回は、 IP フラグメンテーション (fragmentation) が引き起こす問題にフォーカスしたものとなります。

IP フラグメンテーション は、現在のインターネットにおける問題となっています。
とりわけ、 大きなサイズの DNS メッセージに関して
フラグメンテーションが正しく動作したとしても、 DNS を保護するには不十分なのです。
- Bonica R. et al, "[IP Fragmentation Considered Fragile](https://tools.ietf.org/html/draft-bonica-intarea-frag-fragile)", Work in Progress, July 2018
- Huston G., "[IPv6, Large UDP Packets and the DNS](http://www.potaroo.net/ispcol/2017-08/xtn-hdrs.html)",  August 2017
- Fujiwara K., "[Measures against cache poisoning attacks using IP fragmentation in DNS](https://indico.dns-oarc.net/event/31/contributions/692/)", May 2019

IP fragmentation is a problem on the Internet today, especially when it
comes to large DNS messages. And even if fragmentation works it might not be
secure enough for DNS.
- Bonica R. et al, "[IP Fragmentation Considered Fragile](https://tools.ietf.org/html/draft-bonica-intarea-frag-fragile)", Work in Progress, July 2018
- Huston G., "[IPv6, Large UDP Packets and the DNS](http://www.potaroo.net/ispcol/2017-08/xtn-hdrs.html)",  August 2017
- Fujiwara K., "[Measures against cache poisoning attacks using IP fragmentation in DNS](https://indico.dns-oarc.net/event/31/contributions/692/)", May 2019

これらの問題は、フラグメンテーションが起きないような EDNS バッファーサイズを尊重し、
かつ EDNS バッファーサイズが十分に大きくないときには UDP から TCP に切り替えることを
DNS に許容することで解決できます。

注意: まだ確定ではありません
----------------------------

このウェブサイト自身や、 DNS flag day 2020 に関するいくつかの点はまだ作業中です。
- 2020 DNS Flag Day の _確定した日付_ はまだ決まっていません
- **注意** _確定したEDNS バッファーサイズの推奨値_ はまだ合意に至っていません。
  現在の概算値は 1200 近辺 (1220, 1232, ...) ですが、
  これは IPv6 においてフラグメンテーションのリスクを限定的にするためです。

いずれにせよ、技術的な要件は明確です。
つまり、オペレーターや開発者は DNS flag day 2020 に向けてテストを行ったり、
システムを修正することで備えておくことができます。

ご意見やご提案をお持ちの方は、
[dns-operations](https://lists.dns-oarc.net/mailman/listinfo/dns-operations)
メーリングリスト (英語) で行われている議論に参加してください。

対応: 権威DNSサーバーのオペレーター
-----------------------------------

権威DNSサーバー側では、 TCP (53 番ポート) での DNS 問い合わせにも応答することで、
対応することができます。 _ファイアウォールの設定も忘れずに確認して下さい!_

加えて、 EDNS バッファーサイズをフラグメンテーションされないサイズに設定することも行うべきです。
推奨値は 1220 バイト近辺になりますが、議論中です。 

最後に、 _権威DNSサーバーは、問い合わせに含まれる EDNS バッファーサイズを超える大きさで応答
**してはいけません**!_

**最新情報!** お持ちのドメインを下記に入力して "Test!" をクリックすることで、確認することができます。
このテストは [ISC の EDNS Compliance Tester](https://ednscomp.isc.org/)
を内部で使っていて、それに含まれる `edns512udp` テストが成功するかを確認しています。
加えて、他のテストで一般的に標準規格に準拠していることを確認しています。

{% include 2020_checker.html lang=site.data.2020_checker.en %}

対応: フルサービスリゾルバーのオペレーター
------------------------------------------

フルサービスリゾルバー (キャッシュ DNS サーバー) 側でも、権威 DNS サーバーで求められていることと同じです。
TCP (53 番ポート) での DNS 問い合わせにも応答し、フラグメンテーションされないような
EDNS バッファーサイズ _(1220 バイト近辺)_ を設定してください。
_ファイアウォールの設定も忘れずに確認して下さい!_

そして、これが最も大切なことですが、
_フルサービスリゾルバーが切り詰められた UDP 応答 (TC=1 がセットされたもの) を受け取った場合、
TCP で再度問い合わせを行わなければ **なりません**_

**フルサービスリゾルバーのクライアントのためのテストは現在開発中です。**

対応: DNS ソフトウェア製品のベンダー
------------------------------------

DNS ソフトウェア製品のベンダーとしては、 *標準規格に準拠* することが重要です。
また、フラグメンテーションされないように _**EDNS バッファーサイズのデフォルト値** (1220 バイト近辺)_
を設定することも重要です。

関連する標準規格は主に
[RFC 7766](https://tools.ietf.org/html/rfc7766) 、
[RFC 6891 section 6.2.3.](https://tools.ietf.org/html/rfc6891#section-6.2.3) 、そして
[RFC 6891 section 6.2.4.](https://tools.ietf.org/html/rfc6891#section-6.2.4) です。

この変更の動機については、
[IETF のインターネットドラフト intarea-frag-fragile section 6.1](https://tools.ietf.org/html/draft-ietf-intarea-frag-fragile-10#section-6.1) と
 [IETF のインターネットドラフト iab-protocol-maintenance](https://datatracker.ietf.org/doc/draft-iab-protocol-maintenance/)
にて解説されています。

テスト方法
----------

ドメインの管理者の方、または権威 DNS サーバーの管理者の方は、
ドメインをテストする Web ベースのツールが公開されています。
[対応: 権威DNSサーバーのオペレーター](#action-authoritative-dns-operators) を参照してください。

クライアントやフルサービスリゾルバーのためのテストツールについては現在作業中です。
準備ができたら、このページで公開する予定です。

他の方法として、コンソールで下記のコマンドを入力することでもテストできます:

```shell
$ dig +tcp @auth_IP yourdomain.example.
$ dig +tcp @resolver_IP yourdomain.example.
$ dig @resolver_IP test.knot-resolver.cz. TXT
```

上記の DNS 問い合わせはすべて成功するはずです。
また `+tcp` というオプションなしでコマンドを実行したときと同じ応答が返ってくるはずです。
DNS サービスの提供者の方は、 TCP (53 番ポート) での
DNS 問い合わせに応答するかどうか権威 DNS サーバーやフルサービスリゾルバーをテストし、
必要に応じて下記のように EDNS バッファーサイズのデフォルト値を変更することができます:

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

変更前に何の問題もなくサービスできていれば、上記の設定変更を適用しても影響はありません。
ただし、 TCP で応答していない場合には、一部の問い合わせが失敗するようになるでしょう。

過去のflag day
==============

過去に行われた flag day のリストは下記の通りです:
- [2019 EDNS workarounds](/2019/)

Who's behind DNS flag day?
==========================

DNS flag day の試みは、 DNS のソフトウェアやサービスの提供者からなるコミュニティによって主導されています。
また、 [The DNS Operations, Analysis, and Research Center (DNS-OARC)](https://www.dns-oarc.net/) からサポートを受けています。前述のコミュニティのほとんどは DNS-OARC のメンバーでもあります。

DNS flag dayに関する技術的な質問については、
[dns-operations](https://lists.dns-oarc.net/mailman/listinfo/dns-operations)
メーリングリスト (英語) を購読してください。

最新情報を得る
==============

報道関係のお問い合わせについては、 media (at) dns-oarc.net にご連絡ください (英語) 。
件名に "DNS Flag Day" を含めてください。

- Web: <https://dnsflagday.net/>
- Twitter: <https://twitter.com/dnsflagday>
- Announcements: <https://lists.dns-oarc.net/mailman/listinfo/dns-announce>
- Discussion: <https://lists.dns-oarc.net/mailman/listinfo/dns-operations>

FAQ
===

- 質問: UDP での DNS はもう使われないのですか?

  回答: いいえ。 UDP での DNS 問い合わせは、スケーラビリティがあって要求されるリソースが少ないこと、
        耐障害性の観点から、引き続き主流のままでしょう。

- 質問: [RFC 7766](https://tools.ietf.org/html/rfc7766) が長すぎて読めません。

  回答: 一言で: DNS は TCP でも動作 **すべきです**!

- 質問: 2020 年のある日に、全てが動かなくなるのですか?

  回答: 全て、というわけではありません! 影響を受けるのはわずかですし、
        それらについてもオペレーターの努力により減少しつつあります。
	DNS Flag Day 2020 の日程が発表され、その日に主要なフルサービスリゾルバーのオペレーターが
	標準規格に準拠しない壊れた挙動を許容しないようになったとしても、
	標準規格に準拠しているサイトに影響を与えることはないでしょう。
	また、 flag day の日に挙動が変わるのは _**その日以降にリリースされる新しいソフトウェア**_ です。
	自前でフルサービスリゾルバーを運用している方々への影響の広がりはゆっくりになるでしょう。

- 質問: なぜ TCP サポートが重要なのですか?

  回答: TCP をブロックしていたり、 TCP のサポートに誤りがあったりすると、
        名前解決に失敗し、アプリケーションのレベルでタイムアウトが起こるでしょう。

	さらに、通常 TCP は経路MTU探索 (Path MTU Discovery) を実装しています。
	これにより、 TCP セグメントのフラグメンテーションを回避するようになっています。
	また、 TCP により DNS 応答を偽装するのが困難になります。

	最後に、 TCP のサポートは初期の標準規格から推奨されていました。
	しかしながら、実装者によっては TCP を任意であるとみなしていました。
	2010 年 8 月 (10 年ほど前です) に公開された
        [RFC 5966](https://tools.ietf.org/html/rfc5966) 
	によって、 DNSの標準規格に準拠するには TCP のサポートが必須であることが明確化されました。

- 質問: なぜ TCP だけ使うようにしないのですか?

  回答: UDP の DNS は、 IP フラグメンテーションが必要ないくらい小さなパケットに適しています。
        インターネット上でやりとりされる DNS メッセージのほとんどはそのような小さなサイズであり、
        現在でも UDP が使われています。
        DNS の全てを TCP に移行するとなると、多くの DNS サービスに負荷がかかる可能性があります。
	原理的には DNS で TCP だけ使うことは実現可能ですが、 UDP よりも遅くなります。
	最良の条件でも 4 倍ほど遅くなるという研究結果もあります。
        (Baptiste Jonglez 氏による
	[RIPE76 でのプレゼンテーション](https://ripe76.ripe.net/archives/video/63/))
	これに加えて、 DNS サーバーが同時に処理できる接続数に制限が加わってしまう可能性もあります。

- 質問: 今回の DNS Flag Day に対応するためには、ソフトウェアを更新する必要があるのでしょうか?

  回答: お使いの DNS ソフトウェア製品が最新の標準規格に準拠していれば、
        問題なくお使いいただけます。ソフトウェアの更新は必要ありません。
        一般的に、メジャーな OSS の DNS ソフトウェア製品で
	サポートの切れていないバージョンをお使いであれば、問題ないでしょう。
        ソフトウェアに問題がなくても、お使いの環境が正しく標準規格に準拠できているかどうかは
        ソフトウェアの設定内容やファイアウォールの設定に依存します。
        また、一般に広く利用されていない・カスタムメイド・ OSS ではないソフトウェアについては
        最新の標準規格に準拠していない恐れがあります。
	この場合、更新が必要になるでしょう。

- 質問: DNS での TCP サポートは、本当に必須なのですか?

  回答: はい、必須です。 [RFC 1035](https://tools.ietf.org/html/rfc1035) の
        Section 4.2 Transport にて、 UDP と TCP は同等に扱うと明示的に記載されています。
        さらに、 [RFC 7766](https://tools.ietf.org/html/rfc7766) では
        DNS での TCP サポートを必須として、 DNS ソフトウェア製品のベンダーに要求しています。
        DNS サービスを TCP の 53 番ポートで受け付けるかどうかは各オペレーターの
        裁量の範囲です。しかしながら、 TCP をサポートしていない場合には、
        クライアントの EDNS バッファーサイズを超える応答に関して、名前解決が
        失敗することになるでしょう。
