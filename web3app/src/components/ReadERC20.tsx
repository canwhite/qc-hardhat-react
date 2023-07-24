/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,useState } from "react";
import { Text} from '@chakra-ui/react'
//引入abi和ethers
import {ERC20ABI as abi} from "abi/ERC20ABI"
import {ethers} from "ethers"


interface Props {
    addressContract: string,
    currentAccount: string | undefined
}
////declare 关键字用于告诉编译器有一个已经存在的变量、函数、类或命名空间，它们已经定义在其他地方
declare let window:any;

export default function ReadERC20(props:Props){
  const addressContract = props.addressContract
  const currentAccount = props.currentAccount
  //读取数据
  const [totalSupply,setTotalSupply]=useState<string>()
  const [symbol,setSymbol]= useState<string>("")

  //加一个balance
  const [balance, SetBalance] =useState<number|undefined>(undefined)
  
  //call when currentAccount change
  useEffect(()=>{
    if(!window.ethereum) return
    if(!currentAccount) return

    queryTokenBalance(window)
  
  },[currentAccount])

  const queryTokenBalance  = (window:any)=>{
    //查余额
    const provider = new ethers.BrowserProvider(window.ethereum)
    const erc20 = new ethers.Contract(addressContract, abi, provider);

    erc20.balanceOf(currentAccount)
    .then((result:string)=>{
        SetBalance(Number(ethers.formatEther(result)))
    })
    .catch((err)=>{
      console.log(err);
    })

  }




  useEffect(()=>{
    //如果全局没有注入，直接出来完事
    if(!window.ethereum) return
    const provider = new ethers.BrowserProvider(window.ethereum) 
    //通过contract拿到代币实例
    const erc20 = new ethers.Contract(addressContract, abi, provider);
    //然后调用erc已经实现的abi对应的方法
    //symbol目测是CLT
    erc20.symbol().then((result:string)=>{
      setSymbol(result)
    }).catch((err)=>{
      console.log(err);
    })


    erc20.totalSupply().then((result: string) => {
      setTotalSupply(ethers.formatEther(result));
    }).catch((err) => {
      console.error(err);
    });

  },[])//call only once


  
  return (
    <div>
        <Text><b>ERC20 Contract</b>: {addressContract}</Text>
        <Text><b>ClassToken totalSupply</b>:{totalSupply} {symbol}</Text>
        <Text my={4}><b>ClassToken in current account</b>: {balance} {symbol}</Text>
    </div>
    )
}
  