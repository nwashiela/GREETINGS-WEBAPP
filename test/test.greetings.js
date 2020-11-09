const assert = require("assert");
const Greetings = require('../greetings');
const pg = require("pg");
	const Pool = pg.Pool;
	const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg1212@localhost:5432/tests.users';
	const pool = new Pool({
		connectionString
	});
	
describe("The kittens in", function () {

	beforeEach(async function () {
		await pool.query("delete from greeted");
	});

	it("should be able to setName", async function () {
		let greetings = Greetings(pool);
		 await greetings.setName("Aza");
	
		let results = await greetings.getNames()
		
		// how many bookings should have been added?
		assert.deepStrictEqual(results,{'Aza':1});

	});

	it("should be able to count ", async function () {
		let greetings = Greetings(pool);
		
		 await greetings.setName("Lisa");
		 await greetings.setName("Babie");
		 await greetings.setName("Connie");
		 await greetings.setName("Lisa");

		
		let results = await greetings.getCounter("Lisa")
		
		// how many bookings should have been added?
		assert.deepStrictEqual(results,2);
		
	});

	it("should be able to getCounter", async function () {

		let greetings = Greetings(pool);
		await greetings.setName("aza");
		await greetings.setName("lisa");
		await greetings.setName("babie");


	   let results = await greetings.counter()
	   
	   // how many bookings should have been added?
	   assert.deepStrictEqual(results,3);
	});
	it("should be able to greet ", async function () {

		let greetings = Greetings(pool);
		let passMsg = await greetings.code("Ntosh","Isixhosa");
		let message = await greetings.code("Lisa","Isixhosa");
		let messages = await greetings.code("Sisipho","Isixhosa");
		
	   
	   // how many bookings should have been added?
	   assert.strictEqual(passMsg,'Molo, Ntosh');
	   assert.strictEqual(message,'Molo, Lisa');
	   assert.strictEqual(messages,'Molo, Sisipho');

	});

	it("should be able to get Messages ", async function () {

		let greetings = Greetings(pool);
		let passMsg = await greetings.getMessage("Ntosh","2");
		let message = await greetings.getMessage("Lisa","7");
		let greetMessage = await greetings.getMessage("Sphenkosi","8");
		
		
	   assert.strictEqual(passMsg,'Hello, Ntosh has been greeted 2 times');
	   assert.strictEqual(message,'Hello, Lisa has been greeted 7 times');
	   assert.strictEqual(greetMessage,'Hello, Sphenkosi has been greeted 8 times');


	});

	it("should be able to resetBtn", async function () {

		let greetings = Greetings(pool);
			
		await greetings.setName("Lisa");
		await greetings.setName("Babie");
		await greetings.setName("Connie");
		await greetings.setName("Lisa");
		await greetings.resetBtn();

		let results = await greetings.getNames()
		
		
	   // how many bookings should have been added?
	   assert.deepEqual({}, results)
	});

	after(function() {
		pool.end();
	})

});
