module.exports = function Greetings(pool) {


    var namesMap = {}

    async function setName(name) {
        var check = 'select name from greeted where name = $1'
        const results = await pool.query(check, [name])

        if (results.rows.length === 0) {
            let theNames = 'insert into greeted(name, counter) values ($1,$2)';
            await pool.query(theNames, [name, 1])
            console.log("Added");
        }

        else {

            let updates = 'update greeted set counter = counter+1  where name = $1';
            await pool.query(updates, [name])
        }

    }

    async function getNames() {
        const sql = 'select * from greeted'
        const results = await pool.query(sql)
        results.rows.forEach(function (user) {
            namesMap[user.name] = user.counter
        });

        return namesMap;
    }

    async function getCounter(name) {
        const check = 'select * from greeted where name = $1'
        const results = await pool.query(check, [name])
        return results.rows[0]["counter"]
    }

    async function counter() {
        const sqlCount = await pool.query('select * from greeted')


        return sqlCount.rows.length;

    }

    async function code(name, radioButton) {
        await setName(name);
        if (radioButton == "English") {
            return "Hlw, " + name;
        }
        else if (radioButton == "Afrikaans") {
            return "More, " + name;
        }
        else if (radioButton == "Isixhosa") {
            return "Molo, " + name;
        }
    }

    async function getNamesCounted(name) {
        return namesMap[name]
    }

    async function getMessage(name, counter) {
        return `Hello, ${name} has been greeted ${counter} times`

    }

    return {
        code,
        setName,
        getNames,
        counter,
        getNamesCounted,
        getMessage,
        getCounter
    }
}