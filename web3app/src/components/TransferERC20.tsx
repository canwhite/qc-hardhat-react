import React, { useEffect,useState } from 'react';
import { Text, Button, Input , NumberInput,  NumberInputField,  FormControl,  FormLabel } from '@chakra-ui/react'

//props type
interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

//创建组件
export default function TransferERC20(props:Props){
    const addressContract = props.addressContract
    const currentAccount = props.currentAccount
    const [amount,setAmount] = useState<string>('100')
    const [toAddress, setToAddress]=useState<string>("")


    async function transfer(event:React.FormEvent) {
        event.preventDefault()
        console.log("transfer clicked")
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