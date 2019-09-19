# nats-cli
Advanced CLI tool and debugger for NATS server

### Usage

```
$ nats --help
```
### Configuration

By default, nats-cli looks for a `.natsrc` file in the current folder or home folder of the user. 
The format of the `.natsrc` file is JSON. 

```json
{
  "url": "nats://0.0.0.0:4222",
  ...
  "protocols": {
    "kafka": {
      "broker_url": "https://.../",
      "username": "joe",
      "password": "doe"
    },
    "websocket": {
      "url": "wss://.../"
    },
    "http": {
      "url": "https://.../"
    }
  }
}
```

### Publish

These are examples using the full publish notation:

```
$ nats pub --subject event.account --text created

$ nats pub --subject event.account --json {"status":"ok","id":123,"ref":["abc"],"customer":{"name":"Joe","age":32}}

$ nats pub --subject event.account --json status="created",id=123,ref=["abc"],customer.name="Joe",customer.age=32

$ nats pub --subject event.account --file-text words.txt

$ nats pub --subject event.account --file-json users.json

$ nats pub --subject event.account --file-binary image.png

$ nats pub --subject event.account --url-text https://abc.com/words.txt

$ nats pub --subject event.account --url-html https://abc.com/page.html

$ nats pub --subject event.account --url-json https://abc.com/users.json

$ nats pub --subject event.account --url-binary https://abc.com/image.png

# HTTP mode

$ nats pub --http --url https://abc.com/def --json status="created",id=123,age=32
```

### Compact syntax

The compact syntax is only enabled if the `.natsrc` file exits in the current or home folder

```bash
$ n p event.account created

$ n p event.account {"status":"ok","id":123,"ref":["abc"],"customer":{"name":"Joe","age":32}}

$ n p event.account status="created",id=123,ref=["abc"],customer.name="Joe",customer.age=32

$ n p event.account words.txt # infers text file from extension

$ n p event.account users.json # json file is the default

$ n p event.account image.png # automatically checks if file is text, json or binary
```

### Protocol convertion

```bash
# publish selected kafka topic data to NATS, only supports kafka JSON data
$ nats relay --subject=event.account --protocol=kafka --kafka-topic="user.accounts" --kafka-stream-throtle=5000

# publish websocket messages to NATS, only supports websocket JSON data
$ nats relay --subject=event.account --protocol=websocket --websocket-throtle=5000

# publish HTTP response messages to NATS, only supports JSON data response, GET request
$ nats relay --subject=event.account --protocol=http --http-endpoint https://abc.com/user/12 --http-polling-interval=5000

# publish messages from one NATS server to another, only supports JSON data
$ nats relay --subject=user.products --protocol=nats --remote-nats-subject=user.accounts
```

