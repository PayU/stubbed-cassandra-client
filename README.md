# stubbed-cassandra-client

A javascript client for Stubbed Cassandra.

Priming and querying stand-alone Stubbed Cassandra could be a painful task. The aim of of this stubbed-cassandra-client is to ease this pain by providing an simple API, that developers can easily use.

## Example

```js
// queries.js
const scassandra = require('stubbed-cassandra-client');
const consistency = scassandra.constants.consistency;
const PreparedSingle = scassandra.PreparedSingle;

const BOOK = {id: '34ed29ed-89ec-4ccd-96ea-a2a704b93711', name: 'Snow Crash', author: 'Neal Stephenson'}

module.exports.storeBook = new PreparedSingle({
    query: 'INSERT INTO books_table (id, name, author) VALUES(?,?,?,?,?,?,?,?) USING TTL ?',
    variable_types: ['uuid', 'text', 'text'],
    consistency: consistency.localQuorum
});

module.exports.getBook = new PreparedSingle({
    query: 'SELECT * FROM books_table WHERE id = ?',
    variable_types: ['uuid'],
    rows: [BOOK],
    consistency: consistency.localQuorum
});
```

```js
// books.test.js
const { init, constants, primeAll } = require('stubbed-cassandra-client');
const { results } = constants;

const queries = require('./queries');

describe('Integration tests', function () {
    before(async function () {
        await stubbedClient.init({
            scassanadra_address: process.env.CASSANDRA_MOCK_ADDRESS,
            cassandra_keyspace: process.env.CASSANDRA_KEYSPACE,
            queries
        });
        await stubbedClient.resetAll(); // reset older tests primed queries
        await stubbedClient.primeAll(); // prime queries from queries.js
    });

    afterEach(async function () {
        await stubbedClient.resetHistory(); // reset execution history
    });

    describe('POST /books', function () {
        const book = {
            id: 'c8f195f6-5eb2-4d61-9639-cc16252ba98e',
            name: "The Hitchhiker's Guide to the Galaxy",
            author: 'Douglas Adams'
        }

        it('Should store book details in Cassandra', async function () {
            await api.post(book)
            const executedQueries = await queries.storeBook.getExecutions();
            should(executedQueries).have.lengthOf(1);
        });
    });
});
```

## Currently supported query types

- PreparedSingle
- QuerySingle