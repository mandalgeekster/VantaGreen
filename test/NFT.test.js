const { assert } = require("chai")

const NFTContract = artifacts.require("./NFTContract.sol")

require("chai").use(require("chai-as-promised")).should()

contract("NFTContract", (accounts) => { 
    let contract

    before(async () => {
        contract = await NFTContract.deployed()
    })

    describe("deployment", async() => {
        it("deploys successfully", async() => {
            const address = contract.address
            console.log(address)
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it("has a name", async() => {
            const name = await contract.name()
            assert.equal(name, "NFTFood")
        })

        it("has a symbol", async() => {
            const symbol = await contract.symbol()
            assert.equal(symbol, "NFTFOOD")
        })
    })

    describe("minting", async () => {
        it("creates a new token", async () => {
            const result = await contract.mint("1");
            const total_supply = await contract.token_count()
            // console.log("Result = ", result)
            console.log("total_supply = ", total_supply.toNumber())
            assert.equal(total_supply.toNumber(), 1)

            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 0, "id is correct")
            assert.equal(event.from, "0x0000000000000000000000000000000000000000", "from is correct")
            assert.equal(event.to, accounts[0], "to is correct")

            // FAILURE:
            // await contract.mint("1").should.be.rejected
        })
    })

})