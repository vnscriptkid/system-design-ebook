## kafka confluent

- kafka config: `/etc/kafka`
- kafka runnable: `/bin`

## create topic

```bash
docker exec -it kafka1 /bin/kafka-topics \
    --create \
    --bootstrap-server localhost:9091 \
    --replication-factor 3 \
    --partitions 3 \
    --topic purchases
```

## list all topics

```bash
docker exec -it kafka1 /bin/kafka-topics \
    --list \
    --bootstrap-server kafka1:19091
```

## describe a topic

```bash
docker exec -it kafka1 /bin/kafka-topics \
    --describe \
    --bootstrap-server kafka1:19091 \
    --topic purchases
```

## push message to a topic

```bash
./kafka-console-producer --bootstrap-server kafka1:19091 --topic purchases
```

## view topic msg of a topic

```bash
docker exec -it kafka3 /bin/kafka-console-consumer \
  --from-beginning \
  --bootstrap-server kafka1:19091 \
  --topic purchases
```
