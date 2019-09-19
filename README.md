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
  "url": "nats://0.0.0.0:4222"
}
```

#### Publish

These are examples using the full publish notation:

```
$ nats pub --subject event.account --text created

$ nats pub --subject event.account --json {"status":"ok","id":123,"ref":["abc"],"customer":{"name":"Joe","age":32}}

$ nats pub --subject event.account --json status="created",id=123,ref=["abc"],customer.name="Joe",customer.age=32

$ nats pub --subject event.account --file-text words.txt

$ nats pub --subject event.account --file-json users.json

$ nats pub --subject event.account --file-binary image.png

# HTTP mode

$ nats pub --http --url https://abc.com/def --json status="created",id=123,age=32
```

#### Compact syntax

The compact syntax is only enabled if the `.natsrc` file exits in the current or home folder

```
$ n p event.account created

$ n p event.account {"status":"ok","id":123,"ref":["abc"],"customer":{"name":"Joe","age":32}}

$ n p event.account status="created",id=123,ref=["abc"],customer.name="Joe",customer.age=32

$ n p event.account words.txt # infers text file from extension

$ n p event.account users.json # json file is the default

$ n p event.account image.png # automatically checks if file is text, json or binary
```