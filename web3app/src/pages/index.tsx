// src/pages/index.tsx
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from "next/link"
import { VStack, Heading, Box, LinkOverlay, LinkBox} from "@chakra-ui/layout"
import { Text, Button } from '@chakra-ui/react'
import { useState,useEffect } from 'react'
import {ethers} from "ethers"
import ReadERC20 from "../components/ReadERC20"
import TransferERC20  from "../components/TransferERC20"

//declare 关键字用于告诉编译器有一个已经存在的变量、函数、类或命名空间，它们已经定义在其他地方，
//例如在前端开发中使用的 window 对象。在这种情况下，declare 关键字声明了一个全局变量或命名空间，
//使得 TypeScript 编译器能够识别这些变量或命名空间，并在代码中使用它们。

declare let window:any;

//NextPage 是 Next.js 框架中的一个类型别名（type alias），它用于定义一个 React 组件类型
const Home: NextPage = () => {
  const [balance,setBalance] = useState<String | undefined>();
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()
  const [chainId, setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()

  //watch currentAccount，set other info
  useEffect(()=>{
    //防止下边赋空值
    if(!currentAccount || !ethers.isAddress(currentAccount)) return
    //client side code
    if(!window.ethereum) return


    //get info
    const provider = new ethers.BrowserProvider(window.ethereum)  
    provider.getBalance(currentAccount as string).then((result)=>{
      setBalance(ethers.formatEther(result))
    })
    provider.getNetwork().then((result)=>{
      setChainId(Number(result.chainId))
      setChainName(result.name)
    })

  },[currentAccount])



  //点击连接
  const onClickConnect = ()=>{
    //window.ethereum injected by metamask
    if(!window.ethereum){
      console.log("please install MetaMask")
      return
    }
    //we can do it using etherjs
    // v5
    //provider = new ethers.providers.Web3Provider(window.ethereum)
    //  v6:
    const provider = new ethers.BrowserProvider(window.ethereum)  
    provider.send("eth_requestAccounts", [])
    .then((accounts)=>{
      //set currentAccount
      if(accounts.length>0) setCurrentAccount(accounts[0])
    })
    .catch((e)=>console.log(e))

  }

  //点击取消连接
  const onClickDisconnect = () => {
    console.log("onClickDisConnect")
    setBalance(undefined)
    setCurrentAccount(undefined)
  }





  return (
    <>
      {/* header */}
      <Head>
        <title>My DAPP</title>
      </Head>

      {/* title */}
      <Heading as="h3"  my={4}>Explore Web3</Heading>     

      <VStack>


        {/* read */}
        <Box w='100%' my={4}>
        {currentAccount  
          ? <Button type="button" w='100%' onClick={onClickDisconnect}>
                Account:{currentAccount}
            </Button>
          : <Button type="button" w='100%' onClick={onClickConnect}>
                  Connect MetaMask
              </Button>
        }
        </Box>
        {currentAccount  
          ?<Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Account info</Heading>
          <Text>ETH Balance of current account: {balance}</Text>
          <Text>Chain Info: ChainId {chainId} name {chainname}</Text>
        </Box>
        :<></>
        }

        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Read ClassToken Info</Heading>
          <ReadERC20 
            addressContract='0x5FbDB2315678afecb367f032d93F642f64180aa3'
            currentAccount={currentAccount}
          />
        </Box>

        {/* write */}
        <Box  mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg">
          <Heading my={4}  fontSize='xl'>Transfer Classtoken</Heading>
          <TransferERC20 
            addressContract='0x5FbDB2315678afecb367f032d93F642f64180aa3'
            currentAccount={currentAccount}
          />
        </Box>

        

      </VStack>

    </>
  )
}

export default Home
