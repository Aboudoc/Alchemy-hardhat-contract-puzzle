const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    // generate a vanity addresses
    const address = "0x006204Ba764f534e97B86Def9312f83088939F93";
    const PRIVATE_KEY =
      "dc74756efab9719ec477bf8756720ef19b660b173db1284aee1b7ac92cecdb4e";

    //Fund the account
    const signer = ethers.provider.getSigner(0);
    await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther("1"),
    });

    const wallet = new ethers.Wallet(PRIVATE_KEY, ethers.provider);
    await game.connect(wallet).win();
    // await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
