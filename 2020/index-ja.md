---
title: 2020
lang: ja-JP
redirect_from:
  - /ja/
  - /2020/ja/
flagdayyear: 2020
---

{% include 2020_languages.html %}

<img class="logo float-right" alt="DNS Flag Day logo" src="/images/DNS_Flag.svg">

はじめに(謝辞)
==============

[2019 DNS Flag Day](/2019/) は成功裏に終わりました。
名前解決に時間がかかるなどの世界中のインターネット利用者に影響を及ぼす問題に対して、
インターネットコミュニティの参加者は連携して解決に当たりました。
インターネットをより良くするために協調して尽力した全てのオペレーターに対して謝意を表します。

過去に行われた、または将来行われる予定の DNS Flag Day の概要はこの動画などで確認できます。
[https://youtu.be/mH_elg9EUWw?t=649](https://youtu.be/mH_elg9EUWw?t=649) (英語)

内容
====
- [次回予告](#%E6%AC%A1%E5%9B%9E%E4%BA%88%E5%91%8A)
- [DNS Flag Day 2020](#dns-flag-day-2020)
  - [注意: まだ確定ではありません](#%E6%B3%A8%E6%84%8F-%E3%81%BE%E3%81%A0%E7%A2%BA%E5%AE%9A%E3%81%A7%E3%81%AF%E3%81%82%E3%82%8A%E3%81%BE%E3%81%9B%E3%82%93)
  - [対応: 権威DNSサーバーのオペレーター](#%E5%AF%BE%E5%BF%9C-%E6%A8%A9%E5%A8%81dns%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AE%E3%82%AA%E3%83%9A%E3%83%AC%E3%83%BC%E3%82%BF%E3%83%BC)
  - [対応: フルサービスリゾルバーのオペレーター](#%E5%AF%BE%E5%BF%9C-%E3%83%95%E3%83%AB%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%83%AA%E3%82%BE%E3%83%AB%E3%83%90%E3%83%BC%E3%81%AE%E3%82%AA%E3%83%9A%E3%83%AC%E3%83%BC%E3%82%BF%E3%83%BC)
  - [対応: DNS ソフトウェア製品のベンダー](#%E5%AF%BE%E5%BF%9C-dns-%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E8%A3%BD%E5%93%81%E3%81%AE%E3%83%99%E3%83%B3%E3%83%80%E3%83%BC)
  - [テスト方法](#%E3%83%86%E3%82%B9%E3%83%88%E6%96%B9%E6%B3%95)
- [過去の DNS Flag Day](#%E9%81%8E%E5%8E%BB%E3%81%AE-dns-flag-day)
- [誰が行っているの?](#%E8%AA%B0%E3%81%8C%E8%A1%8C%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE)
- [最新情報を得る](#%E6%9C%80%E6%96%B0%E6%83%85%E5%A0%B1%E3%82%92%E5%BE%97%E3%82%8B)
- [協力者](#%E5%8D%94%E5%8A%9B%E8%80%85)
- [FAQ](#faq)

次回予告
========

次回の DNS Flag Day は、現在計画中です。
その内容は、 IP パケットのフラグメンテーション (fragmentation) が引き起こす、
運用上のまたはセキュリティの問題に特化したものになる予定です。

新しい情報については [dns-announce メーリングリスト](https://lists.dns-oarc.net/mailman/listinfo/dns-announce) (英語) を購読する、
または [Twitter の @dnsflagday](https://www.twitter.com/dnsflagday) (英語)  をフォローすることで受け取ることができます。

確定した日付
============

**2020 年 10 月 1 日**

DNS Flag Day 2020
=================

DNS コミュニティは、相互運用性を持続させ、性能に影響を与える問題を解消するために議論を行っています。
これは業界のメーリングリストや、 [DNS-OARC 30](https://www.dns-oarc.net/oarc30) のパネルディスカッション
([セッションの録画](https://youtu.be/mH_elg9EUWw?t=680) (英語)  と
[発表資料](https://indico.dns-oarc.net/event/31/contributions/678/attachments/673/1102/dns_flag_day_panel.pdf) (英語))
といったカンファレンスで行われています。

DNS Flag Day 2020 の計画に関する提案は、
[RIPE78](https://ripe78.ripe.net) にて CZ.NIC の Petr Špaček 氏と ISC の Ondřej Surý 氏から行われました。
([セッションの録画](https://ripe78.ripe.net/archives/video/28) (英語)  と
[発表資料](https://ripe78.ripe.net/presentations/53-plenary.pdf) (英語))
この年は、 IP フラグメンテーションが引き起こす問題にフォーカスします。

IP フラグメンテーションは、現在のインターネットでは正しく動作するか信頼できないものです。
また、 UDP で 大きなサイズの DNS メッセージが送信された際に、転送の失敗を引き起こす原因になりえます。
たとえ IP フラグメンテーションが正しく動作したとしても、セキュリティの面では不十分でしょう。
なぜなら、フラグメントされた DNS メッセージの *一部* を偽装することは理論的に可能であり、
受信側で簡単にそれを検知する方法はないからです。
- Bonica R. et al, "[IP Fragmentation Considered Fragile](https://tools.ietf.org/html/draft-bonica-intarea-frag-fragile)", Work in Progress, July 2018
- Huston G., "[IPv6, Large UDP Packets and the DNS](https://www.potaroo.net/ispcol/2017-08/xtn-hdrs.html)", August 2017
- Fujiwara K., "[Measures against cache poisoning attacks using IP fragmentation in DNS](https://indico.dns-oarc.net/event/31/contributions/692/)", May 2019
- Fujiwara K. et al, "[Avoid IP fragmentation in DNS](https://tools.ietf.org/html/draft-fujiwara-dnsop-avoid-fragmentation)", September 2019

最近、 Axel Koolhaas 氏 と Tjeerd Slokker 氏 によって発表された論文とプレゼンテーション
[Defragmenting DNS - Determining the optimal maximum UDP response size for DNS
](https://indico.dns-oarc.net/event/36/contributions/776/) では、 NLnet Labs と共同で
RIPE Atlas のプローブを利用して現実世界のデータが調査されました。
その結果として、 IPv4 と IPv6 で、またシナリオ (訳注: スタブリゾルバーとフルサービスリゾルバー)
によって異なる値が提案されています。
環境に応じた値に設定することは、環境を把握している運用者にとっては現実的なことですので、
DNS ソフトウェアのデフォルト値としては、最小で安全なサイズである **1232** を反映するべきでしょう。

これらの問題を解決するには、下記の全てを行う必要があります。
a) UDP で送信する DNS メッセージについて、一般的なネットワークリンクでフラグメンテーションが起きないようなサイズに制限するようサーバーを設定する
b) DNS 応答のサイズが大きく、前述の制限したバッファーサイズを超えてしまう場合には、 DNS サーバーで UDP から TCP に切り替えられるようにする

メッセージサイズに関する検討
----------------------------

IP フラグメンテーションを避けつつ TCP をなるべく使わないような DNS メッセージサイズの最適値は、
ネットワークのエンドポイント同士をつなぐ物理的なリンクの最大転送単位 (Maximum Transmission Unit: MTU) に依存するでしょう。
残念なことに、 DNS サーバーソフトウェアの実装者がその情報にアクセスできる標準的な仕組みはまだありません。
標準的な仕組みが提供されるようになるまでは、
EDNS バッファーサイズが現在の一般的なネットワークリンクでフラグメンテーションを引き起こさないよう十分に小さなサイズに
_デフォルトで_ 設定されていることを推奨します。

1232 バイトの EDNS バッファーサイズは、現在のほぼすべてのネットワークにおいてフラグメンテーションを回避することができます。
この値は IPv6 の仕様で必須とされている 1280 バイトの MTU 値に基づいていて、さらに IPv6 ヘッダーと UDP ヘッダーのために
48 バイトを引いた値です。そして、前述の調査結果にも基づいています。

この推奨値は、より良い情報が得られない場合の _デフォルトの_ 値に関するものであることに留意してください。
運用者の方は、管理しているネットワークがより大きなデータフレームをサポートしていて、
IP フラグメンテーションのリスクがないことが確実であれば、より大きな値を設定しても構いません。
DNS サーバーのベンダーは、カーネルから MTU に関するより良い情報を得られる場合には、
より大きな(または、より小さな)パケットサイズを使っても構いません。

対応: 権威DNSサーバーのオペレーター
-----------------------------------

権威DNSサーバーの運用者の方は、サーバーが TCP (53 番ポート) での DNS 問い合わせにも応答できるようにすることで、
対応することができます。 TCP/53 をブロックする製品もありますので、 _ファイアウォールも忘れずに確認してください_ 。

加えて、 EDNS バッファーサイズをフラグメンテーションを引き起こさないサイズにネゴシエートするように、
サーバーを設定することも行うべきです。
ここでの推奨値は 1232 バイトです。

_権威DNSサーバーは、問い合わせで指定された EDNS バッファーサイズを超える大きさで応答
**してはいけません**!_

お持ちのドメインを下記に入力して "テスト!" をクリックすることで、サーバーを確認することができます。
このテストは [ISC の EDNS Compliance Tester](https://ednscomp.isc.org/)
を内部で使っていて、それに含まれる `edns512udp` テストが成功するかを確認しています。
加えて、他のテストで一般的に標準規格に準拠していることを確認しています。

{% include 2020_checker.html lang=site.data.2020_checker.ja %}

対応: フルサービスリゾルバーのオペレーター
------------------------------------------

フルサービスリゾルバー (キャッシュ DNS サーバー) 側でも、権威 DNS サーバーで求められていることと同じです。
TCP (53 番ポート) での DNS 問い合わせにも応答すること、そしてフラグメンテーションされないように
EDNS バッファーサイズとして 1232 バイトを設定してください。
TCP の DNS に問題がないよう、ファイアウォールも忘れずに確認してください。

そして、これが最も大切なことですが、
_フルサービスリゾルバーが切り詰められた UDP 応答 (TC=1 がセットされたもの) を受け取った場合、
TCP で再度問い合わせを行わなければ **なりません**_!

**最新情報!** このチェッカーは、お使いのブラウザー・システム・ ISP のフルサービスリゾルバーをテストします。
テスト用の権威 DNS サーバーに直接問い合わせるフルサービスリゾルバーが TCP をサポートしている時にだけ名前解決できる
URL の画像を読み込むことで確認します。
詳細は、このチェッカーが利用している [Check My DNS](https://cmdns.dev.dns-oarc.net) (英語) をご覧ください。

{% include 2020_cli_checker.html lang=site.data.2020_checker.ja %}

対応: DNS ソフトウェア製品のベンダー
------------------------------------

DNS ソフトウェア製品のベンダーとしては、 *標準規格に準拠する* ことが重要です。
また、一般的なネットワークリンクでフラグメンテーションされないような EDNS バッファーサイズのデフォルト値
(1232 バイト) を設定することも重要です。

関連する標準規格は
[RFC 7766](https://tools.ietf.org/html/rfc7766) 、
[RFC 6891 section 6.2.3.](https://tools.ietf.org/html/rfc6891#section-6.2.3) 、そして
[RFC 6891 section 6.2.4.](https://tools.ietf.org/html/rfc6891#section-6.2.4) などがあります。

この試みの動機については、
[IETF のインターネットドラフト intarea-frag-fragile section 6.1](https://tools.ietf.org/html/draft-ietf-intarea-frag-fragile-10#section-6.1) と
[IETF のインターネットドラフト iab-protocol-maintenance](https://datatracker.ietf.org/doc/draft-iab-protocol-maintenance/)
にて解説されています。

テスト方法
----------

ドメインの管理者の方、または権威 DNS サーバーの管理者の方は、
ドメインをテストする Web ベースのツールが公開されています。
[対応: 権威DNSサーバーのオペレーター](#%E5%AF%BE%E5%BF%9C-%E6%A8%A9%E5%A8%81dns%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AE%E3%82%AA%E3%83%9A%E3%83%AC%E3%83%BC%E3%82%BF%E3%83%BC) を参照してください。

クライアントやフルサービスリゾルバーの運用者のための Web ベースのテストツールは、
[対応: フルサービスリゾルバーのオペレーター](#%E5%AF%BE%E5%BF%9C-%E3%83%95%E3%83%AB%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%83%AA%E3%82%BE%E3%83%AB%E3%83%90%E3%83%BC%E3%81%AE%E3%82%AA%E3%83%9A%E3%83%AC%E3%83%BC%E3%82%BF%E3%83%BC) を参照してください。

他の方法として、コンソールで下記のコマンドを入力することでもテストできます:

```shell
$ dig +tcp @auth_IP yourdomain.example.
$ dig +tcp @resolver_IP yourdomain.example.
$ dig @resolver_IP test.knot-resolver.cz. TXT
```

上記の DNS 問い合わせはすべて成功するはずです。
また `+tcp` というオプションなしでコマンドを実行したときと同じ応答が返ってくるはずです。

DNS サービスの提供者の方は、権威 DNS サーバーやフルサービスリゾルバーを下記のように
EDNS バッファーサイズのデフォルト値を変更してテストすることができます:

- BIND
```
options {
    edns-udp-size 1232;
    max-udp-size 1232;
};
```

- Knot DNS
```
server:
    max-udp-payload: 1232
```

- Knot Resolver
```
net.bufsize(1232)
```

- PowerDNS Authoritative
```
udp-truncation-threshold=1232
```

- PowerDNS Recursor
```
edns-outgoing-bufsize=1232
udp-truncation-threshold=1232
```

- Unbound
```
server:
    edns-buffer-size: 1232
```

- NSD
```
server:
    ipv4-edns-size: 1232
    ipv6-edns-size: 1232
```

変更前に何の問題もなくサービスできていれば、上記の設定変更を適用しても影響はありません。
TCP で応答していない場合には、一部の問い合わせが失敗するようになるでしょう。

過去の DNS Flag Day
===================

過去に行われた DNS Flag Day のリストは下記の通りです:
- [2019 EDNS workarounds](/2019/)

誰が行っているの?
=================

DNS Flag Day の試みは、 DNS のソフトウェアやサービスの提供者からなるコミュニティによって主導されています。
また、 [The DNS Operations, Analysis, and Research Center (DNS-OARC)](https://www.dns-oarc.net/) からサポートを受けています。
前述のコミュニティのほとんどは DNS-OARC のメンバーでもあります。

DNS Flag Day に関する技術的な質問については、
[dns-operations メーリングリスト](https://lists.dns-oarc.net/mailman/listinfo/dns-operations) (英語)
を購読してください。

最新情報を得る
==============

報道関係のお問い合わせについては、 media (at) dns-oarc.net にご連絡ください (英語) 。
件名に "DNS Flag Day" を含めてください。

- Web: <https://dnsflagday.net/>
- Twitter: <https://twitter.com/dnsflagday>
- Announcements: <https://lists.dns-oarc.net/mailman/listinfo/dns-announce>
- Discussion: <https://lists.dns-oarc.net/mailman/listinfo/dns-operations>

協力者
======

{% include 2020_supporters.html %}

FAQ
===

- 質問: [RFC 7766](https://tools.ietf.org/html/rfc7766) が長すぎて読めません。

  回答: 一言で: DNS は TCP でも動作 **すべきです**!

- 質問: UDP での DNS はもう使われないのですか?

  回答: いいえ。 UDP での DNS 問い合わせは、スケーラビリティがあること、要求されるリソース量が少ないこと、
        耐障害性の観点から、引き続き主流のままでしょう。

- 質問: 2020 年のある日に、全てが動かなくなるのですか?

  回答: いいえ! 影響を受けるのはわずかです。
        DNS Flag Day 2020 の日程が発表され次第、 DNS ソフトウェア製品のベンダーは新しいリリースの際に、
        UDP でのメッセージサイズのデフォルト値を 1232 バイトとするようにデフォルトの挙動を変更するでしょう。
        そのような新しい製品が普及すると、 1232 バイトよりも大きな DNS 応答を返すものの TCP での
        DNS に応答しないサイトについては、名前解決に失敗するでしょう。
        そのようなサイトは現時点でも信頼できないことに留意してください。

- 質問: なぜ TCP サポートが重要なのですか?

  回答: TCP をブロックしていたり、 TCP のサポートに誤りがあったりすると、
        名前解決に失敗し、アプリケーションのレベルでタイムアウトが起こるでしょう。

	さらに、通常 TCP は経路MTU探索 (Path MTU Discovery) を実装しています。
	これにより、 TCP セグメントのフラグメンテーションを回避するようになっています。
	また、 TCP により DNS 応答を偽装するのが困難になります。

	TCP のサポートは最初期の標準規格から推奨されていました。
	しかしながら、実装者によっては TCP を任意であるとみなしていました。
	2010 年 8 月に公開された
	[RFC 5966](https://tools.ietf.org/html/rfc5966) によって、インターネットにおける
	DNS の標準規格に準拠するには TCP のサポートが必須であることが明確化されました。

- 質問: なぜ TCP だけ使うようにしないのですか?

  回答: UDP の DNS は、 IP フラグメンテーションが必要ないくらい小さなパケットに適しています。
        インターネット上でやりとりされる DNS メッセージの多くはそのような小さなサイズであり、
        現在でも UDP が使われています。
        DNS の全てを TCP に移行するとなると、多くの DNS サービスに負荷がかかる可能性があります。
        原理的には DNS で TCP だけ使うことは実現可能でしょうが、 UDP よりも遅くなります。
        少なくとも 4 倍ほど遅くなるという研究結果
        (Baptiste Jonglez 氏による
        [RIPE76 でのプレゼンテーション](https://ripe76.ripe.net/archives/video/63/) (英語))
        もあります。
        これに加えて、 DNS サーバーが同時に処理できる接続数に制限が加わってしまう可能性もあります。

- 質問: 将来的に、もっと大きなパケットサイズを使いたくなった場合はどうするのですか?

  回答: 我々のゴールは、現在の一般的なネットワークリンクで問題なく動くように EDNS バッファーサイズの
        _デフォルト_ を選ぶことで、 IP フラグメンテーションの問題を回避することです。
        これは、どの DNS の仕様に対しても恒久的な変更を加えるものではありません。
        デフォルト値は、より良い情報が得られるようになった時点でいつでもローカルで変更可能です。
        カーネルから MTU に関する情報を取得する標準的な方法が利用可能になれば、
        それを使うようにすることもできます。

- 質問: 今回の DNS Flag Day に対応するためには、ソフトウェアを更新する必要があるのでしょうか?

  回答: ほとんどの場合、ソフトウェアの更新は必要ありません。
        発行されている標準規格に準拠している DNS ソフトウェア製品については、
        更新することなく動き続けるでしょう。
        メジャーな OSS の DNS ソフトウェア製品でサポートされているバージョンであれば、
        現在も、そして将来も問題ないでしょう。
        それらの製品については、デフォルト値が古い値のまま更新されていなかったとしても、
        EDNS バッファーサイズの推奨値を使うよう設定することができます。

- 質問: DNS での TCP サポートは、本当に必須なのですか?

  回答: はい、必須です。 [RFC 1035](https://tools.ietf.org/html/rfc1035) の
        Section 4.2 Transport にて、 UDP と TCP は同等に扱うと明示的に記載されています。
        さらに、 [RFC 7766](https://tools.ietf.org/html/rfc7766) では
        DNS での TCP サポートを必須として、 DNS ソフトウェア製品のベンダーに要求しています。
        DNS サービスを TCP の 53 番ポートで受け付けるかどうかは各オペレーターの
        裁量の範囲です。しかしながら、 TCP をサポートしていない場合には、
        クライアントの EDNS バッファーサイズを超える応答に関して、名前解決が
        失敗することになるでしょう。

- 質問: DNS Flag Day 2020 の協力者になりたいのですが、何をしたらいいですか?

  回答: ありがとうございます!
        [プルリクエスト](https://github.com/dns-violations/dnsflagday/pulls)
        を送って名前や画像、 URL を DNS Flag Day 2020 の協力者として
        `_data/2020_supporters.yml` に追加することができます。
        プルリクエストの代わりに、 [Issue](https://github.com/dns-violations/dnsflagday/issues/new)
        を作成して同じ情報を送っていただくこともできます。
