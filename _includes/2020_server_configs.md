- BIND
```
options {
    edns-udp-size 1232;
    max-udp-size 1232;
};
```

- CoreDNS
```
. {
    bufsize 1232
    file db.example.or
    log
}
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


