module.exports = function Greetings(pool) {



    async function setName(name) {
         var regex = /[^A-Za-z]/g
        var rgxnumber = name.replace(regex,'')
        var numerious = rgxnumber.charAt(0).toUpperCase() + rgxnumber.slice(1).toLowerCase()
        
        var check = 'select name from greeted where name = $1'
        const results = await pool.query(check, [numerious])

        if (results.rows.length === 0) {
            let theNames = 'insert into greeted(name, counter) values ($1,$2)';
            await pool.query(theNames, [numerious, 1])
            console.log("Added");
        }

        else {

            let updates = 'update greeted set counter = counter+1  where name = $1';
            await pool.query(updates, [numerious])
        }

    }

    async function getNames() {
        var namesMap = {}

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
        var regex = /[^A-Za-z]/g
        var rgxnumber = name.replace(regex,'')
        var numerious = rgxnumber.charAt(0).toUpperCase() + rgxnumber.slice(1).toLowerCase()
        
        await setName(name);
        if (radioButton == "English") {
            return "Hello, " + numerious;
        }
        else if (radioButton == "Afrikaans") {
            return "Môre, " + numerious;
        }
        else if (radioButton == "Isixhosa") {
            return "Molo, " + numerious;
        } 
    }

    // async function getNamesCounted(name) {
    //     return namesMap[name]
    // }

    async function getMessage(name, counter) {
        return `Hello, ${name} has been greeted ${counter} times`

    }
    async function resetBtn(){
        await pool.query('delete from greeted')

    }
    

    return {
        code,
        setName,
        getNames,
        counter,
        getMessage,
        getCounter,
        resetBtn
    }
}
