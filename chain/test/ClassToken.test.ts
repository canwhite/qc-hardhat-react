import { expect } from "chai";
import { ethers } from "hardhat";

describe("ClassToken", function () {
  // item,add async
  it("Should have the correct initial supply", async function () {
    // 初始化一个以wei为单位的币值，作为下边实例参数
    const initialSupply = ethers.utils.parseEther("10000.0");
    // 工厂方法创建
    const ClassToken = await ethers.getContractFactory("ClassToken");
    // 拿到实例
    const token = await ClassToken.deploy(initialSupply);
    // 部署
    await token.deployed();

    // 将实例和初始值做对比
    expect(await token.totalSupply()).to.equal(initialSupply);
  });
});
