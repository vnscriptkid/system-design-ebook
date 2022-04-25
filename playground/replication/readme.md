## notes

```bash
docker run --name pmaster -p 5432:5432 -v /Users/vnscriptkid/Desktop/Personal/SD-EBOOK/playground/replication/pmaster_data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=postgres -d postgres

docker logs pmaster

docker run --name pslave -p 5433:5432 -v /Users/vnscriptkid/Desktop/Personal/SD-EBOOK/playground/replication/pslave_data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=postgres -d postgres

docker stop pmaster pslave
```

## master side

```bash
psql -U postgres -p 5432 -c "CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD 'secret'"
```

- `pg_hba.conf`

```conf
host replication postgres all md5
```

## slave side

- `postgresql.conf`

```conf
primary_conninfo = 'application_name=slave1 host=vnscriptkid post=5432 user=replicator password=secret'
```

```bash
pg_basebackup -h host.docker.internal -p 5432 -U replicator -D /var/lib/postgresql/data -Fp -R -Xs -P
cd $PGDATA
touch standby.signal
```

```sql
select * from pg_stat_replication;
```
