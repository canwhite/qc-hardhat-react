import React, { useEffect,useState } from 'react';
import { Text, Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel } from '@chakra-ui/react'
import {ethers,Contract,parseEther} from "ethers"
import {ERC20ABI as abi} from 'abi/ERC20ABI'
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"


//props type
interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

//定义一个window
declare let window:any;


//创建组件
export default function TransferERC20(props:Props){
    const addressContract = props.addressContract
    const currentAccount = props.currentAccount
    const [amount,setAmount] = useState<string>('100')
    const [toAddress, setToAddress]=useState<string>("")


    async function transfer(event:React.FormEvent) {
        event.preventDefault()
        //如果metamask没有注入，则返回
        if(!window.ethereum) return    
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = provider.getSigner()
        const erc20:Contract = new ethers.Contract(addressContract, abi, await signer)
        //交易需要Contract，Contract需要signer
        //which is state-change function of ERC20 smart contract.
        erc20.transfer(toAddress,parseEther(amount))
        .then((tr: TransactionResponse)=>{
            console.log(`TransactionResponse TX hash: ${tr.hash}`)
            tr.wait().then((receipt:TransactionReceipt)=>{console.log("transfer receipt",receipt)})
        })
        .catch((e:Error)=>console.log(e))

    }

    const handleChange = (value:string) => setAmount(value)

    return (
        <form onSubmit={transfer}>
            <FormControl>
                <FormLabel htmlFor='amount'>Amount: </FormLabel>
                <NumberInput defaultValue={amount} min={10} max={1000} onChange={handleChange}>
                    <NumberInputField />
                </NumberInput>
                <FormLabel htmlFor='toaddress'>To address: </FormLabel>
                <Input id="toaddress" type="text" required  onChange={(e) => setToAddress(e.target.value)} my={3}/>
                <Button type="submit" isDisabled={!currentAccount}>Transfer</Button>
            </FormControl>
        </form>
    )

}