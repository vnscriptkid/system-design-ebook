## kafka confluent

- kafka config: `/etc/kafka`
- kafka runnable: `/bin`

## create topic

```bash
docker exec -it kafka1 /bin/kafka-topics \
    --create \
    --bootstrap-server kafka1:9091 \
    --replication-factor 3 \
    --partitions 3 \
    --topic purchases
```

## verify

```bash
docker exec -it kafka1 /bin/kafka-topics \
    --list \
    --bootstrap-server 127.0.0.1:59092
```
