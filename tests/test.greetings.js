 const assert = require('assert');
const CategoryService = require('../services/category-service');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-pg12345.localhost:2020/tests.greetings.js';

const pool = new Pool({
    connectionString
});

describe('greeted', async function(){


    it('should be able to add name', async function(){
        let  greetings = Greetings();{
            await greetings.update(
                name
            )
        } 
        assert.deepStrictEqual(1, greetings.length);
    });

    after(function(){
        pool.end();
    })
})