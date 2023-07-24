//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

//import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract ClassToken is ERC20{
    //在构造函数中，首先调用了 ERC20 合约的构造函数，
    //传入了代币的名称 "ClassToken" 和符号 "CLT"。这样就在合约中创建了一个 ERC20 代币，名称为 ClassToken，符号为 CLT。
    //在这一行代码中，ERC20(“MyCoin”, “MC”) 并不是返回值的意思，而是调用了 ERC20 合约的构造函数，
    //传入了两个参数，分别是 “MyCoin” 和 “MC”，表示代币的名称和符号。
    constructor(uint256 initialSupply) ERC20("ClassToken", "CLT") {
        //使用 _mint() 方法将指定数量的代币分配给合约部署者（即消息发送者 msg.sender
        _mint(msg.sender, initialSupply);
    }
}
