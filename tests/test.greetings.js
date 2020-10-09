const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/my_products_test';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from greet_Names;");
      
    });

    it('should pass the db test', async function(){
        
        // the Factory Function is called CategoryService
        let categoryService = CategoryService(pool);
        await categoryService.add({
            description : "Diary"
        });

        let categories = await categoryService.all();
        assert.equal(1, categories.length);

    });

    after(function(){
        pool.end();
    })
});