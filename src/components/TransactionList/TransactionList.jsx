import {React,useState,useEffect} from 'react';



const maxRecords=3;

function TransactionList({transactions,title,editTransactions,balance,setBalance}) {

    const[editId,setEditId]=useState(0);
    const [isDisplayEditor,setIsDisplayEditor]=useState(false);

    const [currentTransactions,setCurrentTransactions]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(0);



    useEffect(()=>{
        const startIndex=(currentPage-1)*maxRecords;
        const endIndex=Math.min(currentPage*maxRecords,transactions.length);


        setCurrentTransactions([...transactions].slice(startIndex,endIndex));
        setTotalPages(Math.ceil(transactions.length/maxRecords))

    },[currentPage,transactions])






  return (
    <div>TransactionList</div>
  )
}

export default TransactionList